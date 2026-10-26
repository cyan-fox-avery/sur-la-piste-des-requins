/* Tag Along — Wild Archive UI (v0.20.0 module split).
   Extracted from script.js (push size limit). Loaded after archive-data.js,
   before script.js. Owns the Archive tab renderer + license URL registry. */
/* ---------- Wild Archive (v0.17.0, progressive since v0.24.0) ----------
   Real-world photography and footage of every tagged species. Unlocks
   per-tag from the first tag (Mira-approved v0.24.0); previously win-gated. All media was hand-curated by Avery + Mira — mostly Wikimedia
   Commons (CC BY / CC BY-SA / CC0 / public domain), plus select iNaturalist
   photographs (CC BY-NC, with the project non-commercial notice);
   attribution is shown per asset, with the true source labeled.
   Species not yet in the live roster stay hidden until they're added. */
/* v1.5.11: Archive tab is always visible (stable 8-tab layout). Until
   unlocked it is greyed out and unclickable; Sarah's intro text enables it. */
function updateArchiveTab() {
  const btn = document.querySelector('.tab[data-tab="archive"]');
  if (!btn) return;
  const locked = !state.archiveUnlocked;
  btn.classList.toggle("tab-locked", locked);
  btn.disabled = locked;
  btn.setAttribute("aria-disabled", locked ? "true" : "false");
}
/* v1.6.3-beta: Archive search + sort. Session-only state, mirroring the
   Research tab's search behavior. sort: "name" | "newest" | "oldest" | "iucn". */
const archiveFilters = { q: "", sort: "name" };
function archiveMatches(s) {
  const q = archiveFilters.q;
  if (q) {
    const ql = q.toLowerCase();
    const media = (typeof ARCHIVE_MEDIA !== "undefined" && ARCHIVE_MEDIA[s.id]) || {};
    const sci = media.scientific || "";
    if (!s.name.toLowerCase().includes(ql) && !sci.toLowerCase().includes(ql)) return false;
  }
  return true;
}
/* v1.6.3-beta: IUCN severity rank for sorting (most threatened first). */
const ARCHIVE_IUCN_RANK = { CR: 0, EN: 1, VU: 2, NT: 3, LC: 4 };
/* v1.6.3-beta Mira review fix: newest/oldest must not rely on Date.parse of
   the localized display string — it may return NaN depending on browser
   language, and same-day tags compare equal. Use the numeric taggedAt
   timestamp (stored by confirmTag()) instead. Legacy saves without taggedAt
   fall back to the insertion order of state.tagged, mirroring
   taggedChronological(); ties break on name so the order is always stable.
   archiveDateRanks is rebuilt for each sort (reset in renderArchive). */
let archiveDateRanks = null;
function archiveBuildDateRanks() {
  const map = {};
  Object.keys(state.tagged || {}).forEach((sid, idx) => {
    const t = state.tagged[sid] || {};
    map[sid] = { ts: (t.taggedAt != null) ? t.taggedAt : null, idx };
  });
  return map;
}
function archiveSortCompare(a, b) {
  const mode = archiveFilters.sort;
  if (mode === "newest" || mode === "oldest") {
    if (!archiveDateRanks) archiveDateRanks = archiveBuildDateRanks();
    const ra = archiveDateRanks[a.id] || { ts: null, idx: 0 };
    const rb = archiveDateRanks[b.id] || { ts: null, idx: 0 };
    const newestFirst = mode === "newest";
    /* Mirror taggedChronological(): real timestamps when both have them,
       insertion order otherwise. */
    if (ra.ts != null && rb.ts != null && ra.ts !== rb.ts) {
      return newestFirst ? rb.ts - ra.ts : ra.ts - rb.ts;
    }
    if (ra.idx !== rb.idx) {
      return newestFirst ? rb.idx - ra.idx : ra.idx - rb.idx;
    }
    return a.name.localeCompare(b.name, "fr-CA"); /* stable tiebreak, always A-Z */
  }
  if (mode === "iucn") {
    const abbrOf = (s) => (typeof IUCN_ABBR !== "undefined" && IUCN_ABBR[s.status]) || s.status;
    const ra = ARCHIVE_IUCN_RANK[abbrOf(a)] ?? 9;
    const rb = ARCHIVE_IUCN_RANK[abbrOf(b)] ?? 9;
    if (ra !== rb) return ra - rb;
    return a.name.localeCompare(b.name, "fr-CA");
  }
  return a.name.localeCompare(b.name, "fr-CA"); /* "name" default */
}
/* v0.17.0 review fix: canonical license URLs so the Archive's credit line
   links the license itself, not just names it. Public-domain assets get no
   CC link (and no copyright symbol — "Credit:" instead of "©"). */
const LICENSE_URLS = {
  "CC BY 4.0": "https://creativecommons.org/licenses/by/4.0/",
  "CC BY 3.0": "https://creativecommons.org/licenses/by/3.0/",
  "CC BY 2.0": "https://creativecommons.org/licenses/by/2.0/",
  "CC BY 2.5": "https://creativecommons.org/licenses/by/2.5/",
  "CC BY 3.0 AU": "https://creativecommons.org/licenses/by/3.0/au/",
  "CC BY-SA 2.5": "https://creativecommons.org/licenses/by-sa/2.5/",
  "CC BY-SA 4.0": "https://creativecommons.org/licenses/by-sa/4.0/",
  "CC BY-SA 3.0": "https://creativecommons.org/licenses/by-sa/3.0/",
  "CC BY-SA 2.0": "https://creativecommons.org/licenses/by-sa/2.0/",
  "CC BY-SA 1.0": "https://creativecommons.org/licenses/by-sa/1.0/",
  "CC0": "https://creativecommons.org/publicdomain/zero/1.0/",
  /* v0.20.0: NC licenses allowed for exceptional images (project policy:
     Tag Along is free and non-commercial; NC assets carry a licenseNote and
     would be removed/replaced before any commercial use). */
  "CC BY-NC 4.0": "https://creativecommons.org/licenses/by-nc/4.0/"
};
function archiveAssetHtml(a, isPrimary) {
  const label = a.label ? `<span class="archive-label">${esc(a.label)}</span>` : "";
  const isPD = /public domain/i.test(a.license || "") || a.license === "CC0";
  const licUrl = LICENSE_URLS[a.license];
  const licHtml = licUrl
    ? `<a href="${licUrl}" target="_blank" rel="noopener">${esc(a.license)}</a>`
    : esc(a.license);
  const trimNote = a.trimmed ? " · extrait de la vidéo originale" : "";
  /* v0.20.0: sourceLabel (default Wikimedia Commons) for iNaturalist/FishBase
     attribution; licenseNote for the NC project-policy notice. */
  const srcLabel = a.sourceLabel || "Wikimedia Commons";
  const credit = `<p class="archive-credit">${isPD ? "Crédit" : "©"} ${esc(a.credit)} · ${licHtml}${trimNote} · <a href="${esc(a.page)}" target="_blank" rel="noopener">${esc(srcLabel)} ↗</a></p>`;
  const ncNote = a.licenseNote ? `<p class="archive-nc">${esc(a.licenseNote)}</p>` : "";
  let mediaHtml;
  if (a.type === "video" && a.play) {
    // v0.17.0 review fix: curated clip boundaries. Media fragments (#t=start,end)
    // are honored by modern browsers incl. iOS Safari, so the Archive presents
    // the excerpt Avery chose instead of the whole source video.
    const clip = (a.clipStart != null && a.clipEnd != null) ? `#t=${a.clipStart},${a.clipEnd}` : "";
    mediaHtml = `<video class="archive-media${isPrimary ? " primary" : ""}" controls muted playsinline preload="none"${a.image ? ` poster="${esc(a.image)}"` : ""} src="${esc(a.play + clip)}"></video>`;
  } else if (a.framing === "landscape-crop") {
    // v0.17.1: portrait GIF reframed as landscape (crop + 90deg rotate in CSS).
    mediaHtml = `<div class="gif-landscape-frame"><img src="${esc(a.image)}" alt="${esc(a.caption)}" loading="lazy"></div>`;
  } else if (a.framing === "detail-crop" && a.detailCrop) {
    /* v0.20.0 Mira review fix: a genuine detail view cropped from the source
       image via CSS (the sawshark rostrum). Coordinates are in source pixels;
       background-position math: p% aligns p% of the scaled image with p% of
       the frame, so p = start / (full - window) * 100. */
    const dc = a.detailCrop;
    const bgW = (dc.iw / dc.w * 100).toFixed(1);
    const bgH = (dc.ih / dc.h * 100).toFixed(1);
    const posX = (dc.x / (dc.iw - dc.w) * 100).toFixed(1);
    const posY = (dc.y / (dc.ih - dc.h) * 100).toFixed(1);
    mediaHtml = `<a href="${esc(a.full || a.image)}" target="_blank" rel="noopener">` +
      `<div class="detail-crop-frame" role="img" aria-label="${esc(a.caption)}" style="` +
      `aspect-ratio:${dc.w}/${dc.h};` +
      `background-image:url('${esc(a.image)}');` +
      `background-size:${bgW}% ${bgH}%;` +
      `background-position:${posX}% ${posY}%;"></div></a>`;
  } else {
    mediaHtml = `<a href="${esc(a.full || a.image)}" target="_blank" rel="noopener"><img class="archive-media${isPrimary ? " primary" : ""}" src="${esc(a.image)}" alt="${esc(a.caption)}" loading="lazy"></a>`;
  }
  return `<figure class="archive-asset${isPrimary ? " primary" : ""}">${label}${mediaHtml}<figcaption>${esc(a.caption)}</figcaption>${credit}${ncNote}</figure>`;
}
function renderArchive() {
  const list = $("archiveList");
  if (!list || typeof ARCHIVE_MEDIA === "undefined") return;
  /* v2.5.11-beta: stop any playing clip BEFORE the list is rebuilt.
     pauseVideosIn also notifies the background sync explicitly — the
     clip's own pause event is queued and may fire only after the
     element is detached, when it can no longer be heard. */
  if (typeof pauseVideosIn === "function") pauseVideosIn(list);
  list.innerHTML = "";
  /* v1.5.10-beta: the Archive shows ONLY sharks the player has tagged.
     The locked-species teaser list is gone — no tantalizing teasers.
     It's a gallery of earned photographs, not a catalogue.
     v1.2.0-beta Mira review: unlocked species first (the reward).
     v0.17.0 review fix: the archive promise is "the real animals you tagged."
     A species dossier requires an actual tag, so a future roster expansion
     (e.g. salmon) can't leak into a returning player's Archive before they
     tag one. */
  const abbrFor = (status) => (typeof IUCN_ABBR !== "undefined" && IUCN_ABBR[status]) || status;
  /* v1.6.3-beta: search filter + sort order applied to tagged sharks.
     Reset per-sort date ranks so the sort always uses current state. */
  archiveDateRanks = null;
  const entries = SHARKS.filter(s => {
    const media = ARCHIVE_MEDIA[s.id];
    if (!media || media.future) return false;
    if (!state.tagged[s.id]) return false; /* untagged species are not rendered at all */
    return archiveMatches(s);
  }).sort(archiveSortCompare);
  entries.forEach(s => {
    const media = ARCHIVE_MEDIA[s.id];
    const t = state.tagged[s.id];
    const yourShark = t.researchId
      ? `<p class="hook">Ton requin${t.name ? ` ${esc(t.name)}` : ""} ${idLine(t)}${t.date ? ` \u2014 marqué le ${esc(t.date)}` : ""}${t.location ? ` · lieu de marquage : ${esc(t.location)}` : ""}</p>`
      : "";
    /* v1.5.10-beta: row head matches the Research page — common name first,
       then the color-coded abbreviated IUCN badge. No checkmark. */
    const abbr = abbrFor(s.status);
    const row = document.createElement("div");
    row.className = "guide-row";
    row.innerHTML = `
      <button type="button" class="guide-row-head" aria-expanded="false">
        <span class="guide-row-name">${s.name}</span>
        <span class="latin">${media.scientific}</span>
        <span class="status-pill iucn-${abbr}" title="Liste rouge de l'UICN : ${s.statusFr || s.status}">${abbr}</span>
        <span class="guide-caret" aria-hidden="true">\u25be</span>
      </button>
      <div class="guide-row-body hidden">
        <button type="button" class="guide-close" aria-label="Fermer les détails de ${s.name}">\u2715</button>
        <p class="latin detail-scientific">${media.scientific}</p>
        ${yourShark}
        ${media.comingSoon
          ? `<p class="hook">📸 Images à venir — sélection en cours.</p>`
          : media.assets.map((a, i) => archiveAssetHtml(a, i === 0)).join("")}
      </div>`;
    const head = row.querySelector(".guide-row-head");
    const body = row.querySelector(".guide-row-body");
    /* v2.0.0-beta: ✕ close button, matching the Research tab's expanded cards. */
    const closeBtn = body.querySelector(".guide-close");
    if (closeBtn) closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (typeof collapseGuideRow === "function") collapseGuideRow(row);
    });
    head.addEventListener("click", () => {
      /* v1.7.22-beta: accordion — opening one entry closes any other open
         entry (shared collapseGuideRow helper from script.js). Only one
         archive entry is expanded at a time. */
      const wasHidden = body.classList.contains("hidden");
      if (wasHidden && typeof collapseGuideRow === "function") {
        list.querySelectorAll(".guide-row.open").forEach(other => {
          if (other !== row) collapseGuideRow(other, false);
        });
      }
      const isHidden = body.classList.toggle("hidden");
      head.setAttribute("aria-expanded", String(!isHidden));
      /* v1.5.22-beta: match the Research tab — toggling "open" makes the
         expanded card overlay its neighbors (absolute/fixed positioning)
         instead of pushing them down. Rising z-index keeps the most
         recently opened card on top. */
      row.classList.toggle("open", !isHidden);
      /* v2.0.0-beta: the z-index goes on the dropdown body, NOT the row —
         the row header must slide under the sticky tab bar instead of
         painting over it (iPad clip report). */
      if (!isHidden) {
        try { body.style.zIndex = String(++guideOverlayZ); }
        catch (e) { body.style.zIndex = "30"; }
      } else {
        body.style.zIndex = "";
      }
    });
    list.appendChild(row);
  });
}
/* v1.6.3-beta: wire the Archive search input and sort buttons once the DOM
   is ready. archive-ui.js loads after the tab markup, before script.js, so
   this uses document.* directly instead of the $ helper. */
(function initArchiveTools() {
  try {
    const search = document.getElementById("archiveSearch");
    if (search) search.addEventListener("input", () => {
      archiveFilters.q = search.value.trim();
      renderArchive();
    });
    const sortBtns = document.querySelectorAll("[data-asort]");
    sortBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        archiveFilters.sort = btn.dataset.asort;
        sortBtns.forEach(b => b.setAttribute("aria-pressed", String(b === btn)));
        renderArchive();
      });
    });
  } catch (e) { /* renderArchive re-renders regardless */ }
})();

