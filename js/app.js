/**
 * Wealth 財 — Digital Library Application
 * 10 condensed shelves, hover tooltips, modal with applications
 */
(function () {
  "use strict";

  /**
   * Exactly 10 library shelves. Each maps original book.category values.
   * Order here = display order on the page.
   */
  const SHELVES = [
    {
      id: "value",
      name: "Value Investing",
      jp: "価値投資",
      blurb: "Graham, Buffett, and the margin of safety",
      categories: [
        "Value Investing",
        "Growth Investing",
        "Special Situations",
        "Research",
        "Quant",
      ],
    },
    {
      id: "picking",
      name: "Stock Picking",
      jp: "銘柄選択",
      blurb: "Lynch, Fisher, and finding winners early",
      categories: ["Stock Picking", "Growth Investing"],
    },
    {
      id: "index",
      name: "Indexing & Allocation",
      jp: "分散と配分",
      blurb: "Bogle, Bernstein, Swensen — own the haystack",
      categories: ["Indexing", "Allocation", "Institutional", "Theory"],
    },
    {
      id: "markets",
      name: "Markets & Analysis",
      jp: "市場と分析",
      blurb: "How markets move, charts, and market structure",
      categories: ["Markets", "Analysis", "Wall Street"],
    },
    {
      id: "risk",
      name: "Risk & Uncertainty",
      jp: "リスクと不確実性",
      blurb: "Taleb, Marks, and living with the unknown",
      categories: ["Risk", "Uncertainty", "Ethics", "Strategy"],
    },
    {
      id: "trading",
      name: "Trading Psychology",
      jp: "売買の心理",
      blurb: "Wizards, the zone, and process over prediction",
      categories: ["Trading", "Psychology"],
    },
    {
      id: "behavior",
      name: "Behavioral Finance",
      jp: "行動ファイナンス",
      blurb: "Kahneman, Thaler, Housel — the mind and money",
      categories: ["Behavior", "Mental Models", "Decision Making"],
    },
    {
      id: "personal",
      name: "Personal Finance",
      jp: "個人の家計",
      blurb: "Habits, debt, FI, and building a rich life",
      categories: [
        "Personal Finance",
        "Foundations",
        "Mindset",
        "Lifestyle",
        "Wealth Habits",
        "Debt",
        "Habits",
      ],
    },
    {
      id: "business",
      name: "Business & Venture",
      jp: "事業と起業",
      blurb: "Building companies, deals, and hard things",
      categories: ["Business", "Deals"],
    },
    {
      id: "history",
      name: "History, Crisis & Money",
      jp: "歴史・危機・貨幣",
      blurb: "Crashes, inequality, crypto, and the long story of capital",
      categories: [
        "History",
        "Biography",
        "Crisis",
        "Scandal",
        "Macro",
        "Economics",
        "Inequality",
        "Inflation",
        "Money",
        "Banking",
        "Crypto",
      ],
    },
  ];

  // Growth Investing is listed under both value and picking — assign once via first match
  // We'll use first-shelf-wins in resolveShelfId

  const state = {
    filter: "All", // "All" | shelf id
    query: "",
    activeBook: null,
  };

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  function getBooks() {
    return window.WEALTH_BOOKS || [];
  }

  /** First matching shelf wins (stable 10-aisle map) */
  function resolveShelf(book) {
    const cat = book.category || "";
    for (let i = 0; i < SHELVES.length; i++) {
      if (SHELVES[i].categories.includes(cat)) return SHELVES[i];
    }
    // Fallback: last shelf (history/misc) so nothing is orphaned
    return SHELVES[SHELVES.length - 1];
  }

  function shelfById(id) {
    return SHELVES.find((s) => s.id === id) || null;
  }

  function filterBooks(books) {
    let list = books.map((b) => ({ ...b, shelf: resolveShelf(b) }));

    if (state.filter !== "All") {
      list = list.filter((b) => b.shelf.id === state.filter);
    }

    if (state.query.trim()) {
      const q = state.query.trim().toLowerCase();
      list = list.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q) ||
          b.shelf.name.toLowerCase().includes(q) ||
          (b.short && b.short.toLowerCase().includes(q))
      );
    }
    return list;
  }

  /** Always produce up to 10 shelves (skip empty after filter/search) */
  function groupIntoTenShelves(books) {
    const buckets = new Map(SHELVES.map((s) => [s.id, []]));

    books.forEach((book) => {
      const shelf = book.shelf || resolveShelf(book);
      if (!buckets.has(shelf.id)) buckets.set(shelf.id, []);
      buckets.get(shelf.id).push(book);
    });

    return SHELVES.map((meta) => {
      const items = (buckets.get(meta.id) || []).slice().sort((a, b) => {
        const y = (a.year || 0) - (b.year || 0);
        return y !== 0 ? y : a.title.localeCompare(b.title);
      });
      return { ...meta, books: items };
    }).filter((s) => s.books.length > 0);
  }

  function spineMetrics(title) {
    const len = (title || "").length;
    // Larger spine type; height scales so full titles still fit
    let fontRem = 0.92;
    let pxPerChar = 12.2;
    if (len > 38) {
      fontRem = 0.74;
      pxPerChar = 9.6;
    } else if (len > 28) {
      fontRem = 0.8;
      pxPerChar = 10.6;
    } else if (len > 18) {
      fontRem = 0.86;
      pxPerChar = 11.4;
    }

    const chrome = 86;
    const height = Math.round(
      Math.min(520, Math.max(300, chrome + len * pxPerChar + 16))
    );
    const width = len > 32 ? 82 : len > 20 ? 74 : 68;
    return { height, width, fontRem };
  }

  function goHomeLibrary() {
    state.filter = "All";
    state.query = "";
    const search = $("#search-input");
    if (search) search.value = "";
    closeModal();
    renderFilters();
    renderShelves();
    updateBackBar();
    const lib = $("#library");
    if (lib) lib.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function updateBackBar() {
    const bar = $("#library-back-bar");
    if (!bar) return;
    const focused = state.filter !== "All" || state.query.trim();
    bar.hidden = !focused;
    if (!focused) return;

    const shelf = shelfById(state.filter);
    const label = state.query.trim()
      ? `Search: “${state.query.trim()}”`
      : shelf
        ? shelf.name
        : "Filtered view";

    const title = bar.querySelector(".back-bar-context");
    if (title) title.textContent = label;
  }

  function renderFilters() {
    const el = $("#filters");
    if (!el) return;

    const chips = [
      { id: "All", label: "All shelves" },
      ...SHELVES.map((s) => ({ id: s.id, label: s.name })),
    ];

    el.innerHTML = chips
      .map(
        (c) =>
          `<button type="button" class="filter-btn${
            c.id === state.filter ? " active" : ""
          }" data-filter="${c.id}">${escapeHtml(c.label)}</button>`
      )
      .join("");
  }

  function bookElement(book) {
    const div = document.createElement("button");
    div.type = "button";
    div.className = "book";
    div.setAttribute("aria-label", `${book.title} by ${book.author}`);
    div.dataset.id = book.id;
    div.style.setProperty("--spine", book.spine || "#2c3e50");
    div.style.setProperty("--accent", book.accent || "#c4a35a");

    const m = spineMetrics(book.title);
    div.style.setProperty("--book-h", `${m.height}px`);
    div.style.setProperty("--book-w", `${m.width}px`);
    div.style.setProperty("--spine-fs", `${m.fontRem}rem`);

    div.innerHTML = `
      <div class="book-spine">
        <span class="book-title-spine">${escapeHtml(book.title)}</span>
        <span class="band" aria-hidden="true"></span>
        <span class="book-year-spine">${book.year || ""}</span>
      </div>
      <div class="book-tooltip" role="tooltip">
        <div class="tt-title">${escapeHtml(book.title)}</div>
        <div class="tt-author">${escapeHtml(book.author)} · ${book.year || ""}</div>
        <div class="tt-desc">${escapeHtml(book.short || "")}</div>
      </div>
    `;

    div.addEventListener("click", () => openModal(book));
    return div;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderShelves() {
    const container = $("#shelves");
    if (!container) return;

    const books = filterBooks(getBooks());
    if (!books.length) {
      container.innerHTML =
        '<p class="no-results">何も見つかりません — No books match your search.</p>';
      if ($("#book-count")) $("#book-count").textContent = "0 volumes";
      updateBackBar();
      return;
    }

    const shelves = groupIntoTenShelves(books);
    const nShelves = shelves.length;

    if ($("#book-count")) {
      $("#book-count").textContent =
        nShelves === 1
          ? `${books.length} volumes · ${shelves[0].name}`
          : `${books.length} volumes · ${nShelves} shelves`;
    }

    container.innerHTML = "";

    shelves.forEach((shelf, i) => {
      const row = document.createElement("div");
      row.className = "shelf-row";
      row.id = `shelf-${shelf.id}`;
      row.dataset.shelf = shelf.id;
      const n = shelf.books.length;
      const volLabel = n === 1 ? "1 volume" : `${n} volumes`;

      row.innerHTML = `
        <div class="shelf-label">
          <span class="shelf-num">${String(i + 1).padStart(2, "0")}</span>
          <span class="shelf-cat">${escapeHtml(shelf.name)}</span>
          <span class="shelf-jp">${escapeHtml(shelf.jp || "")}</span>
          <span class="shelf-meta">${volLabel}</span>
        </div>
        <p class="shelf-blurb">${escapeHtml(shelf.blurb || "")}</p>
        <div class="shelf" role="list" aria-label="${escapeHtml(shelf.name)}"></div>
        <div class="shelf-plank" aria-hidden="true"></div>
      `;

      row.style.animationDelay = `${Math.min(i * 0.06, 0.5)}s`;

      const shelfEl = row.querySelector(".shelf");
      shelf.books.forEach((book) => {
        const el = bookElement(book);
        el.setAttribute("role", "listitem");
        shelfEl.appendChild(el);
      });
      container.appendChild(row);
    });

    updateBackBar();
  }

  /** Top-10 insights with detailed summary + per-insight application */
  function getInsights(book) {
    const pack =
      (window.WEALTH_BOOK_INSIGHTS && window.WEALTH_BOOK_INSIGHTS[book.id]) ||
      null;
    if (pack && pack.length) return pack;

    const paragraphs = book.paragraphs || [];
    const apps = book.applications || [];
    return paragraphs.map((p, i) => ({
      headline: p,
      detail: p,
      application: apps[i % Math.max(apps.length, 1)] || null,
    }));
  }

  function getApplications(book, insights) {
    const pack =
      (window.WEALTH_BOOK_APPLICATIONS &&
        window.WEALTH_BOOK_APPLICATIONS[book.id]) ||
      null;
    if (pack && pack.length) return pack;
    if (book.applications && book.applications.length) return book.applications;
    return insights
      .map((x) => x.application)
      .filter(Boolean)
      .slice(0, 5);
  }

  function formatAppBody(text) {
    return escapeHtml(text || "").replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br/>");
  }

  function openModal(book) {
    state.activeBook = book;
    const overlay = $("#modal-overlay");
    const modal = $("#modal");
    if (!overlay || !modal) return;

    const img = book.image || "";
    const insights = getInsights(book);
    const applications = getApplications(book, insights);
    const shelf = resolveShelf(book);

    modal.innerHTML = `
      <div class="modal-hero">
        <img src="${escapeHtml(img)}" alt="" loading="lazy" onerror="this.style.background='#2a2a2a'" />
        <button type="button" class="modal-close" aria-label="Back to library">×</button>
        <div class="modal-hero-content">
          <span class="category-tag">${escapeHtml(shelf.name)} · ${escapeHtml(book.category || "")}</span>
          <h2>${escapeHtml(book.title)}</h2>
          <p class="meta">${escapeHtml(book.author)} · ${book.year || ""}</p>
        </div>
      </div>
      <div class="modal-body">
        <button type="button" class="modal-back-library">
          <span class="modal-back-arrow" aria-hidden="true">←</span>
          Back to library
        </button>

        <div class="essence-block">
          <div class="label">Essence · 神髄</div>
          <p>${escapeHtml(book.essence || book.short || "")}</p>
        </div>

        <h3 class="section-title"><span class="jp-mark">要</span> The Meat — Top 10 Insights</h3>
        <p class="expand-hint">Click any insight for a detailed summary and a specific real-world application.</p>
        <ol class="meat-list">
          ${insights
            .map((insight, i) => {
              const app = insight.application;
              return `
              <li data-index="${i}" tabindex="0">
                <span class="para-text">${escapeHtml(insight.headline || "")}</span>
                <div class="app-expand">
                  <div class="insight-detail-block">
                    <div class="app-label">Detailed summary</div>
                    <p class="insight-detail">${escapeHtml(insight.detail || insight.headline || "")}</p>
                  </div>
                  ${
                    app
                      ? `<div class="insight-app-block">
                          <div class="app-label">Real-world application</div>
                          <div class="app-title">${escapeHtml(app.title || "")}</div>
                          <div class="app-body"><p>${formatAppBody(app.body)}</p></div>
                        </div>`
                      : ""
                  }
                </div>
              </li>`;
            })
            .join("")}
        </ol>

        <div class="applications-section">
          <h3 class="section-title"><span class="jp-mark">実</span> Lifestyle Applications</h3>
          <p class="expand-hint" style="margin-top:-0.35rem">Key practices distilled from this book—expand for the full playbook.</p>
          <div class="app-cards">
            ${applications
              .map(
                (a, i) => `
              <div class="app-card" data-app="${i}">
                <button type="button" class="app-card-header">
                  <span>${escapeHtml(a.title)}</span>
                  <span class="chevron">▼</span>
                </button>
                <div class="app-card-body">
                  <div class="app-card-body-inner"><p>${formatAppBody(a.body)}</p></div>
                </div>
              </div>`
              )
              .join("")}
          </div>
        </div>

        <button type="button" class="modal-back-library modal-back-library--bottom">
          <span class="modal-back-arrow" aria-hidden="true">←</span>
          Back to library
        </button>
      </div>
    `;

    overlay.classList.add("open");
    document.body.style.overflow = "hidden";

    modal.querySelector(".modal-close").addEventListener("click", closeModal);
    $$(".modal-back-library", modal).forEach((btn) => {
      btn.addEventListener("click", () => {
        closeModal();
        const lib = $("#library");
        if (lib) lib.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    $$(".meat-list li", modal).forEach((li) => {
      const toggle = () => {
        const was = li.classList.contains("expanded");
        $$(".meat-list li", modal).forEach((x) => x.classList.remove("expanded"));
        if (!was) li.classList.add("expanded");
      };
      li.addEventListener("click", toggle);
      li.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      });
    });

    $$(".app-card", modal).forEach((card) => {
      card.querySelector(".app-card-header").addEventListener("click", () => {
        const open = card.classList.contains("open");
        $$(".app-card", modal).forEach((c) => c.classList.remove("open"));
        if (!open) card.classList.add("open");
      });
    });
  }

  function closeModal() {
    const overlay = $("#modal-overlay");
    if (overlay) overlay.classList.remove("open");
    document.body.style.overflow = "";
    state.activeBook = null;
  }

  function bindGlobal() {
    const overlay = $("#modal-overlay");
    if (overlay) {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeModal();
      });
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });

    const filters = $("#filters");
    if (filters) {
      filters.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-filter]");
        if (!btn) return;
        state.filter = btn.dataset.filter;
        renderFilters();
        renderShelves();
        updateBackBar();
      });
    }

    const search = $("#search-input");
    if (search) {
      let t;
      search.addEventListener("input", () => {
        clearTimeout(t);
        t = setTimeout(() => {
          state.query = search.value;
          renderShelves();
          updateBackBar();
        }, 180);
      });
    }

    // Nav + floating back controls
    document.addEventListener("click", (e) => {
      const home = e.target.closest("[data-action='home-library']");
      if (home) {
        e.preventDefault();
        goHomeLibrary();
      }
    });

    const nav = $(".site-nav");
    if (nav) {
      window.addEventListener(
        "scroll",
        () => {
          nav.classList.toggle("scrolled", window.scrollY > 40);
        },
        { passive: true }
      );
    }
  }

  function init() {
    const books = getBooks();
    if (!books.length) {
      console.warn("WEALTH_BOOKS empty — check books.js load order");
    }
    renderFilters();
    renderShelves();
    bindGlobal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
