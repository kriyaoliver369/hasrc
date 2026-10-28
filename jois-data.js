/* =====================================================================
   JOIS DATA FILE  -  the ONLY place to edit when adding issues/articles.
   - Entries with sample:true are ILLUSTRATIVE placeholders (fake names,
     pages, sizes). Replace or delete them when real papers arrive.
   - doi (FAKE examples below, for layout only): leave "" unless the author registered one (e.g. via Zenodo).
     A DOI line only appears when this field is filled.
   - pdf: path or URL of the PDF. It opens in a new window/tab.
   ===================================================================== */
window.JOIS = {
  issn: "2980-412X",
  issues: [
    {
      id: "v1n2", volume: 1, number: 2, year: 2026,
      title: "Contemplative Practice & Liturgy", published: "Planned: Jan 2027", upcoming: true,
      articles: []
    },
    {
      id: "v1n1", volume: 1, number: 1, year: 2026,
      title: "Inaugural Issue", published: "13 Oct 2026",
      articles: [
        {
          id: "a1", sample: false,
          title: "The Science of the Sacraments: Herman Adrian Spruit’s Meta-Catholic Synthesis and the Operative Mechanics of the Altar",
          authors: "The Most Reverend Mar Elisha Thoma, FHASRC (Founding)",
          cite: "Thoma, M. E.",
          affil: "Herman Adrian Spruit Research Collegium (HASRC)",
          type: "Treatise", pages: "1–18", published: "13 Oct 2026",
          abstract: "This foundational treatise investigates the synthesis achieved by Patriarch Herman Adrian Spruit (1911–1994) within the Independent Sacramental Movement (ISM), focusing on his reconciliation of traditional Catholic sacramental realism with mid-twentieth-century metaphysical mental science and clairvoyant liturgical mechanics. Drawing on Charles Webster Leadbeater’s observations of the Eucharistic thought-form and Spruit’s engagement with Ernest Holmes’ Religious Science movement, the paper examines the shift from exoteric scholastic transubstantiation to an operative “science of the sacraments.” It further evaluates the ecclesiological consequences of this meta-Catholic synthesis, notably “sacramental justice,” unconditional communion, and co-equal female apostolic succession.",
          keywords: ["Herman Adrian Spruit", "Independent Sacramental Movement", "Sacramental Science", "Meta-Catholicism", "Esoteric Liturgics"],
          pdf: "HASRC_Inaugural_Monograph_Spruit_Sacramental_Science.pdf", size: "420 KB", doi: "10.5281/zenodo.1234501"
        },
        {
          id: "a2", sample: true,
          title: "Silence as Sacrament: A Conceptual Reading of Contemplative Prayer in Early Desert Sources",
          authors: "Sample Author One", cite: "Author, S. O.",
          affil: "Sample Institution, Country",
          type: "Research Article", pages: "19–34", published: "13 Oct 2026",
          abstract: "Sample abstract for layout illustration only. This paper would examine how silence is framed as a sacramental act in selected desert-tradition sources, setting out the primary texts, the standpoint of the reader, and the argument in three movements. Replace this text with the author’s submitted abstract (150–250 words).",
          keywords: ["Contemplative prayer", "Desert tradition", "Silence", "Sacramental theology"],
          pdf: "sample-article-2.pdf", size: "512 KB", doi: "10.5281/zenodo.1234502"
        },
        {
          id: "a3", sample: true,
          title: "An Annotated Edition of a Twentieth-Century Consecration Rite",
          authors: "Sample Author Two; Sample Author Three", cite: "Author, S. T., & Author, S. T.",
          affil: "Sample Archive, Country",
          type: "Annotated Document", pages: "35–52", published: "13 Oct 2026",
          abstract: "Sample abstract for layout illustration only. This entry would present a historical document with a transcription, textual notes and a short commentary on provenance. Replace with the real abstract.",
          keywords: ["Liturgical history", "Annotated edition", "Consecration rite"],
          pdf: "sample-article-3.pdf", size: "388 KB", doi: "10.5281/zenodo.1234503"
        },
        {
          id: "a4", sample: true,
          title: "Gratitude and Inner Life in a Parish Community: A Structured Case Study",
          authors: "Sample Author Four", cite: "Author, S. F.",
          affil: "Sample Institution, Country",
          type: "Case Study", pages: "53–68", published: "13 Oct 2026",
          abstract: "Sample abstract for layout illustration only. This case study would describe a single community, the data gathered, and the limits of generalisation. Replace with the real abstract.",
          keywords: ["Gratitude", "Parish life", "Case study", "Spiritual formation"],
          pdf: "sample-article-4.pdf", size: "455 KB", doi: "10.5281/zenodo.1234504"
        }
      ]
    }
  ]
};

/* ---------- shared helpers + article pop-up (used by both pages) ---------- */
(function () {
  var J = window.JOIS;
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); };
  J.esc = esc;

  J.find = function (id) {
    for (var i = 0; i < J.issues.length; i++) for (var j = 0; j < J.issues[i].articles.length; j++)
      if (J.issues[i].articles[j].id === id) return { issue: J.issues[i], art: J.issues[i].articles[j] };
    return null;
  };
  J.citation = function (r) {
    var a = r.art, i = r.issue;
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
        (a.sample ? '<span class="px-2.5 py-1 rounded-full bg-linen-200 text-[10px] uppercase tracking-wider font-semibold text-obsidian-800/70">Sample entry</span>' : '') +
      '</div>' +
      '<h2 id="m-title" class="font-serif text-2xl sm:text-3xl leading-tight text-obsidian-900 mt-4">' + esc(a.title) + '</h2>' +
      '<p class="font-serif text-lg font-bold text-obsidian-900 mt-3">' + esc(a.authors) + '</p>' +
      '<p class="text-xs text-obsidian-800/70">' + esc(a.affil) + '</p>' +
      '<div class="flex flex-wrap gap-x-6 gap-y-1 mt-4 pt-3 border-t gold-border text-xs font-mono text-obsidian-800/70">' +
        '<span>Vol. ' + i.volume + ' No. ' + i.number + ' (' + i.year + ')</span><span>pp. ' + esc(a.pages) + '</span><span>' + esc(a.published) + '</span>' +
        (a.doi ? '<span>DOI: ' + esc(a.doi) + '</span>' : '') + '</div>' +
      '<h3 class="font-serif text-xl text-obsidian-900 mt-6">Summary</h3><div class="w-12 h-0.5 gold-foil my-2"></div>' +
      '<p class="text-sm text-obsidian-800/85 font-light leading-relaxed text-justify">' + esc(a.abstract) + '</p>' +
      '<p class="text-xs mt-4"><strong class="text-obsidian-900">Keywords:</strong> <span class="italic text-obsidian-800/75">' + a.keywords.map(esc).join(", ") + '</span></p>' +
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
      '<div class="hidden sm:block w-14 shrink-0 text-xs font-mono text-obsidian-800/50 pt-1">' + esc(a.pages) + '</div>' +
      '<div class="flex-1 min-w-0">' +
        '<div class="flex flex-wrap items-center gap-2 mb-1.5"><span class="text-[10px] uppercase tracking-widest font-semibold text-gold-700">' + esc(a.type) + '</span>' +
        (a.sample ? '<span class="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-linen-200 text-obsidian-800/60 font-semibold">Sample</span>' : '') + '</div>' +
        '<h3 class="font-serif text-xl sm:text-2xl leading-snug text-obsidian-900 group-hover:text-gold-700 transition">' + esc(a.title) + '</h3>' +
        '<p class="text-xs text-obsidian-800/75 mt-1.5">' + esc(a.authors) + '</p></div>' +
      '<span class="shrink-0 mt-1 text-[11px] uppercase tracking-wider font-semibold text-gold-700 inline-flex items-center gap-1">Summary<i data-lucide="arrow-up-right" class="w-3.5 h-3.5"></i></span></button>';
  };

  document.addEventListener("DOMContentLoaded", function () {
    if (window.lucide) lucide.createIcons();
    if (location.hash.length > 1 && J.find(location.hash.slice(1))) J.open(location.hash.slice(1));
  });
})();
