/* =====================================================================
   JOIS DATA FILE  -  the ONLY place to edit when adding issues/articles.
   - Every entry must be a real article. Never add placeholder or invented entries.
   - doi: leave "" unless the author has registered a real one (e.g. via Zenodo).
     A DOI line only appears when this field is filled.
   - status: "Preprint; peer review pending" until review is complete, then "Peer reviewed".
     Never use "Peer reviewed" before two reviewers have reported and the Editor-in-Chief has accepted.
   - streams: numbers of the research streams above, e.g. [1, 3].
   - received / accepted: optional dates, shown in the pop-up.
   - pdf: path or URL of the PDF (PDFs live in the jois-pdfs folder). It opens in a new window/tab.
   ===================================================================== */
window.JOIS = {
  /* The seven research streams (Statuta Fundamentalia s.7.2). Articles refer to them by number. */
  streams: [
    "ISM History & Theology",
    "Systematic Theology & Biblical Doctrine",
    "Sacramental Science & Altar Energetics",
    "Metaphysical Science & Spiritual Mind Healing",
    "Christian Mysticism & Esoteric Theology",
    "Ecumenical & Interfaith Theology",
    "Pastoral Psychology & Ethical Leadership"
  ],
  /* PREPRINTS: listed separately. Under the manual (D5) the web page carries a preprint only where the author
     is an editor and review cannot yet be arranged. A preprint is NOT an article published in JOIS,
     is never called peer reviewed, and is not counted as a published article.
     When review is complete and the Editor-in-Chief accepts, move the entry into an issue below,
     remove "preprint: true", set status to "Peer reviewed", and fill pages and dates. */
  preprints: [
        {
          id: "a5", sample: false, preprint: true,
          title: "Christus Victor and the Necessity of the Work: Patristic Universal Hope and Bohdey\u2019s Evolutionary Soteriology in Dialogue",
          authors: "Mar Elisha Thoma",
          cite: "Thoma, M. E.",
          affil: "Herman Adrian Spruit Research Collegium (HASRC)",
          status: "Preprint; peer review pending", streams: [2, 3, 5],
          type: "Analytical Treatise", pages: "", published: "16 Nov 2026",
          abstract: "This article argues that the patristic claim of a complete divine victory over sin and death and the esoteric claim that the soul must still do its own work of growth are complementary rather than rival accounts of salvation. It reads Gustaf Aul\u00e9n\u2019s Christus Victor model and the patristic tradition of universal hope (Irenaeus, Origen, Gregory of Nyssa, and Kallistos Ware\u2019s \u201chopeful universalism\u201d) alongside the evolutionary soteriology of Bishop Bohdey of the Australian Church of Antioch (ACOA), as compiled by Archbishop Frank Bugge and informed by the Theosophical and Liberal Catholic literature of Besant and Leadbeater. Using a comparative theological method, it proposes that the Victory is the objective change in the human situation, while the Work is the means by which each person comes to participate in that change. The Sacraments are presented as the principal means of participation. The article also sets out the limits of the proposal: the conciliar history of apokatastasis, the problem of reincarnation, the place of human freedom, and the unpublished status of its central source.",
          keywords: ["Christus Victor", "apokatastasis", "universal salvation", "recapitulation", "Sacramental Science", "Bishop Bohdey", "Theosophy", "Independent Sacramental Movement"],
          pdf: "jois-pdfs/Thoma_2026_Christus_Victor.pdf", size: "230 KB", doi: ""
        },
        {
          id: "a1", sample: false, preprint: true,
          title: "The Science of the Sacraments: Herman Adrian Spruit\u2019s Meta-Catholic Synthesis and the Operative Mechanics of the Altar",
          authors: "The Most Reverend Mar Elisha Thoma, FHASRC (Founding)",
          cite: "Thoma, M. E.",
          affil: "Herman Adrian Spruit Research Collegium (HASRC)",
          status: "Preprint; peer review pending", streams: [1, 3],
          type: "Analytical Treatise", pages: "1\u201318", published: "13 Oct 2026",
          abstract: "This foundational treatise investigates the synthesis achieved by Patriarch Herman Adrian Spruit (1911\u20131994) within the Independent Sacramental Movement (ISM), focusing on his reconciliation of traditional Catholic sacramental realism with mid-twentieth-century metaphysical mental science and clairvoyant liturgical mechanics. Drawing on Charles Webster Leadbeater\u2019s observations of the Eucharistic thought-form and Spruit\u2019s engagement with Ernest Holmes\u2019 Religious Science movement, the paper examines the shift from exoteric scholastic transubstantiation to an operative \u201cscience of the sacraments.\u201d It further evaluates the ecclesiological consequences of this meta-Catholic synthesis, notably \u201csacramental justice,\u201d unconditional communion, and co-equal female apostolic succession.",
          keywords: ["Herman Adrian Spruit", "Independent Sacramental Movement", "Sacramental Science", "Meta-Catholicism", "Esoteric Liturgics"],
          pdf: "jois-pdfs/HASRC_Inaugural_Monograph_Spruit_Sacramental_Science.pdf", size: "420 KB", doi: ""
        }
  ],
  /* ISSUES: add an issue here only when it has real, peer-reviewed articles ready to list.
     An issue with an empty articles list and upcoming: true shows as "in preparation". */
  issues: [
    {
      id: "v1n1", volume: 1, number: 1, year: 2026,
      title: "Inaugural Issue", published: "In preparation", upcoming: true,
      articles: []
    }
  ]
};

/* ---------- shared helpers + article pop-up (used by both pages) ---------- */
(function () {
  var J = window.JOIS;
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); };
  J.esc = esc;

  J.find = function (id) {
    for (var p = 0; p < (J.preprints || []).length; p++)
      if (J.preprints[p].id === id) return { issue: null, art: J.preprints[p] };
    for (var i = 0; i < J.issues.length; i++) for (var j = 0; j < J.issues[i].articles.length; j++)
      if (J.issues[i].articles[j].id === id) return { issue: J.issues[i], art: J.issues[i].articles[j] };
    return null;
  };
  J.citation = function (r) {
    var a = r.art, i = r.issue;
    if (!i) return a.cite + " (" + a.published.slice(-4) + "). " + a.title + " [Preprint; peer review pending]. Herman Adrian Spruit Research Collegium." + (a.doi ? " https://doi.org/" + a.doi : "");
    return a.cite + " (" + i.year + "). " + a.title + " <em>Journal of Inner Spirituality</em>, " + i.volume + "(" + i.number + "), " + a.pages + "." + (a.doi ? " https://doi.org/" + a.doi : "");
  };

  var modal;
  function build() {
    modal = document.createElement("div");
    modal.id = "art-modal";
    modal.className = "hidden fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6";
    modal.innerHTML =
      '<div data-close class="absolute inset-0 bg-obsidian-900/60 backdrop-blur-sm"></div>' +
      '<div role="dialog" aria-modal="true" aria-labelledby="m-title" class="relative bg-linen-50 w-full sm:max-w-3xl max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border gold-border card-shadow">' +
      '<button data-close aria-label="Close" class="absolute top-4 right-4 w-9 h-9 rounded-full bg-white border gold-border flex items-center justify-center text-obsidian-900 hover:bg-linen-100"><i data-lucide="x" class="w-4 h-4"></i></button>' +
      '<div id="m-body" class="p-6 sm:p-9"></div></div>';
    document.body.appendChild(modal);
    modal.addEventListener("click", function (e) { if (e.target.hasAttribute("data-close") || e.target.closest("[data-close]")) J.close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") J.close(); });
  }

  J.open = function (id) {
    var r = J.find(id); if (!r) return;
    if (!modal) build();
    var a = r.art, i = r.issue;
    document.getElementById("m-body").innerHTML =
      '<div class="flex flex-wrap items-center gap-2 pr-10">' +
        '<span class="px-3 py-1 rounded-full bg-gold-300/40 border gold-border text-xs font-serif font-semibold text-obsidian-900">' + esc(a.type) + '</span>' +
        '<span class="px-3 py-1 rounded-full border gold-border text-xs font-medium ' + (a.status === 'Peer reviewed' ? 'bg-white text-obsidian-900' : 'bg-linen-200 text-obsidian-800') + '">' + esc(a.status) + '</span>' +
      '</div>' +
      '<h2 id="m-title" class="font-serif text-2xl sm:text-3xl leading-tight text-obsidian-900 mt-4">' + esc(a.title) + '</h2>' +
      '<p class="font-serif text-lg font-bold text-obsidian-900 mt-3">' + esc(a.authors) + '</p>' +
      '<p class="text-xs text-obsidian-800/70">' + esc(a.affil) + '</p>' +
      '<div class="flex flex-wrap gap-x-6 gap-y-1 mt-4 pt-3 border-t gold-border text-xs font-mono text-obsidian-800/70">' +
        (i ? '<span>Vol. ' + i.volume + ' No. ' + i.number + ' (' + i.year + ')</span><span>pp. ' + esc(a.pages) + '</span>' : '<span>Preprint</span>') + '<span>' + (a.received ? 'Received ' + esc(a.received) + ' &bull; ' : '') + (a.accepted ? 'Accepted ' + esc(a.accepted) + ' &bull; ' : '') + (i ? 'Published ' : 'Posted ') + esc(a.published) + '</span>' +
        (a.doi ? '<span>DOI: ' + esc(a.doi) + '</span>' : '') + '</div>' +
      (i ? '' : '<p class="mt-5 p-3.5 rounded-xl bg-linen-200/70 border gold-border text-xs leading-relaxed text-obsidian-800/85"><strong>Preprint.</strong> Peer review is pending. Its author is an editor of the journal, so review is still being arranged. A preprint is not an article published in JOIS and is never called peer reviewed (Editorial Policy &amp; Style Manual, D2 and D5).</p>') +
      '<h3 class="font-serif text-xl text-obsidian-900 mt-6">Summary</h3><div class="w-12 h-0.5 gold-foil my-2"></div>' +
      '<p class="text-sm text-obsidian-800/85 font-light leading-relaxed text-justify">' + esc(a.abstract) + '</p>' +
      '<p class="text-xs mt-4"><strong class="text-obsidian-900">Research streams:</strong> <span class="text-obsidian-800/75">' + a.streams.map(function (n) { return n + '. ' + esc(J.streams[n - 1]); }).join('; ') + '</span></p>' +
      '<p class="text-xs mt-2"><strong class="text-obsidian-900">Keywords:</strong> <span class="italic text-obsidian-800/75">' + a.keywords.map(esc).join(", ") + '</span></p>' +
      '<div class="mt-6 p-4 rounded-xl bg-white border gold-border"><p class="text-[11px] uppercase tracking-wider font-semibold text-obsidian-800/60 mb-1">How to cite (APA 7th)</p>' +
        '<p id="m-cite" class="text-xs font-mono leading-relaxed text-obsidian-800/85">' + J.citation(r) + '</p>' +
        '<button id="m-copy" class="mt-3 text-xs font-semibold uppercase tracking-wider text-gold-700 hover:text-gold-600 inline-flex items-center gap-1.5"><i data-lucide="copy" class="w-3.5 h-3.5"></i><span>Copy citation</span></button></div>' +
      '<div class="mt-6 flex flex-col sm:flex-row gap-3">' +
        '<a href="' + esc(a.pdf) + '" target="_blank" rel="noopener" class="flex-1 py-3.5 px-6 rounded-2xl bg-obsidian-900 hover:bg-gold-600 text-linen-50 flex items-center justify-center gap-3 text-xs font-serif font-bold uppercase tracking-wider transition"><i data-lucide="file-text" class="w-4 h-4 text-gold-400"></i><span>Read full text (PDF)</span></a>' +
        '<button data-close class="py-3.5 px-6 rounded-2xl border gold-border bg-white hover:bg-linen-100 text-xs font-semibold uppercase tracking-wider text-obsidian-900">Close</button></div>' +
      '<p class="text-[11px] text-obsidian-800/55 font-mono mt-3">PDF (A4) &bull; ' + esc(a.size) + ' &bull; CC-BY-SA 4.0 &bull; Opens in a new window</p>';
    document.getElementById("m-copy").onclick = function () {
      var b = this;
      navigator.clipboard.writeText(document.getElementById("m-cite").innerText).then(function () {
        b.querySelector("span").innerText = "Copied"; setTimeout(function () { b.querySelector("span").innerText = "Copy citation"; }, 1800);
      });
    };
    modal.classList.remove("hidden"); document.body.style.overflow = "hidden";
    if (window.lucide) lucide.createIcons();
    if (location.hash !== "#" + id) history.replaceState(null, "", "#" + id);
  };
  J.close = function () {
    if (!modal || modal.classList.contains("hidden")) return;
    modal.classList.add("hidden"); document.body.style.overflow = "";
    history.replaceState(null, "", location.pathname + location.search);
  };

  /* one article row, used by home (current issue) and archive */
  J.row = function (a) {
    return '<button type="button" onclick="JOIS.open(\'' + a.id + '\')" class="w-full text-left group py-5 px-1 flex gap-5 items-start border-b gold-border hover:bg-white/70 transition">' +
      '<div class="hidden sm:block w-14 shrink-0 text-xs font-mono text-obsidian-800/50 pt-1">' + esc(a.pages || '') + '</div>' +
      '<div class="flex-1 min-w-0">' +
        '<div class="flex flex-wrap items-center gap-2 mb-1.5"><span class="text-[10px] uppercase tracking-widest font-semibold text-gold-700">' + esc(a.type) + '</span>' +
          (a.preprint ? '<span class="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-gold-300/50 text-obsidian-900 font-semibold">Preprint &bull; peer review pending</span>' : '') + '</div>' +
        '<h3 class="font-serif text-xl sm:text-2xl leading-snug text-obsidian-900 group-hover:text-gold-700 transition">' + esc(a.title) + '</h3>' +
        '<p class="text-xs text-obsidian-800/75 mt-1.5">' + esc(a.authors) + '</p></div>' +
      '<span class="shrink-0 mt-1 text-[11px] uppercase tracking-wider font-semibold text-gold-700 inline-flex items-center gap-1">Summary<i data-lucide="arrow-up-right" class="w-3.5 h-3.5"></i></span></button>';
  };

  document.addEventListener("DOMContentLoaded", function () {
    if (window.lucide) lucide.createIcons();
    if (location.hash.length > 1 && J.find(location.hash.slice(1))) J.open(location.hash.slice(1));
  });
})();
