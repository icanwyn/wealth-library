/**
 * Wealth 財 — Digital Library Application
 * Category shelves, hover tooltips, modal with meat paragraphs & applications
 */
(function () {
  "use strict";

  /** Preferred library aisle order (unknown categories sort alphabetically after) */
  const CATEGORY_ORDER = [
    "Value Investing",
    "Growth Investing",
    "Stock Picking",
    "Indexing",
    "Markets",
    "Allocation",
    "Risk",
    "Uncertainty",
    "Trading",
    "Analysis",
    "Quant",
    "Special Situations",
    "Research",
    "Behavior",
    "Psychology",
    "Mental Models",
    "Decision Making",
    "Personal Finance",
    "Foundations",
    "Mindset",
    "Lifestyle",
    "Wealth Habits",
    "Debt",
    "Habits",
    "Business",
    "Institutional",
    "Theory",
    "History",
    "Biography",
    "Crisis",
    "Scandal",
    "Wall Street",
    "Deals",
    "Macro",
    "Economics",
    "Inequality",
    "Inflation",
    "Money",
    "Banking",
    "Crypto",
    "Ethics",
    "Strategy",
  ];

  const state = {
    filter: "All",
    query: "",
    activeBook: null,
  };

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  function getBooks() {
    return window.WEALTH_BOOKS || [];
  }

  function categoryRank(cat) {
    const i = CATEGORY_ORDER.indexOf(cat);
    return i === -1 ? 1000 : i;
  }

  function uniqueCategories(books) {
    const set = new Set(books.map((b) => b.category).filter(Boolean));
    const sorted = [...set].sort((a, b) => {
      const d = categoryRank(a) - categoryRank(b);
      return d !== 0 ? d : a.localeCompare(b);
    });
    return ["All", ...sorted];
  }

  function filterBooks(books) {
    let list = books;
    if (state.filter !== "All") {
      list = list.filter((b) => b.category === state.filter);
    }
    if (state.query.trim()) {
      const q = state.query.trim().toLowerCase();
      list = list.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q) ||
          (b.short && b.short.toLowerCase().includes(q))
      );
    }
    return list;
  }

  /** Group filtered books into category shelves (sorted by library order) */
  function groupByCategory(books) {
    const map = new Map();
    books.forEach((book) => {
      const cat = book.category || "General";
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat).push(book);
    });

    return [...map.entries()]
      .sort((a, b) => {
        const d = categoryRank(a[0]) - categoryRank(b[0]);
        return d !== 0 ? d : a[0].localeCompare(b[0]);
      })
      .map(([category, items]) => ({
        category,
        books: items.slice().sort((a, b) => {
          const y = (a.year || 0) - (b.year || 0);
          return y !== 0 ? y : a.title.localeCompare(b.title);
        }),
      }));
  }

  /** Spine height/width so the full title fits vertically */
  function spineMetrics(title) {
    const len = (title || "").length;
    // Vertical text: ~px per character at base spine font
    let fontRem = 0.72;
    let pxPerChar = 9.4;
    if (len > 38) {
      fontRem = 0.56;
      pxPerChar = 7.4;
    } else if (len > 28) {
      fontRem = 0.62;
      pxPerChar = 8.2;
    } else if (len > 18) {
      fontRem = 0.68;
      pxPerChar = 8.9;
    }

    const chrome = 78; // padding + band + year
    const height = Math.round(
      Math.min(460, Math.max(260, chrome + len * pxPerChar + 12))
    );
    // Wider spines read better for vertical titles
    const width = len > 32 ? 72 : len > 20 ? 66 : 60;
    return { height, width, fontRem };
  }

  function renderFilters(categories) {
    const el = $("#filters");
    if (!el) return;
    el.innerHTML = categories
      .map(
        (c) =>
          `<button type="button" class="filter-btn${
            c === state.filter ? " active" : ""
          }" data-filter="${c}">${c}</button>`
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
      $("#book-count") &&
        ($("#book-count").textContent = "0 volumes");
      return;
    }

    const shelves = groupByCategory(books);
    const catCount = shelves.length;

    $("#book-count") &&
      ($("#book-count").textContent =
        catCount === 1
          ? `${books.length} volumes · ${shelves[0].category}`
          : `${books.length} volumes · ${catCount} shelves`);

    container.innerHTML = "";

    shelves.forEach((shelf, i) => {
      const row = document.createElement("div");
      row.className = "shelf-row";
      row.dataset.category = shelf.category;
      const n = shelf.books.length;
      const volLabel = n === 1 ? "1 volume" : `${n} volumes`;

      row.innerHTML = `
        <div class="shelf-label">
          <span class="shelf-cat">${escapeHtml(shelf.category)}</span>
          <span class="shelf-meta">${volLabel}</span>
        </div>
        <div class="shelf" role="list" aria-label="${escapeHtml(shelf.category)}"></div>
        <div class="shelf-plank" aria-hidden="true"></div>
      `;

      // Stagger entrance slightly by aisle index
      row.style.animationDelay = `${Math.min(i * 0.05, 0.45)}s`;

      const shelfEl = row.querySelector(".shelf");
      shelf.books.forEach((book) => {
        const el = bookElement(book);
        el.setAttribute("role", "listitem");
        shelfEl.appendChild(el);
      });
      container.appendChild(row);
    });
  }

  function openModal(book) {
    state.activeBook = book;
    const overlay = $("#modal-overlay");
    const modal = $("#modal");
    if (!overlay || !modal) return;

    const img = book.image || "";
    const paragraphs = book.paragraphs || [];
    const applications = book.applications || [];

    // Map each paragraph to a rotating application for expand
    const appForPara = (i) => {
      if (!applications.length) return null;
      return applications[i % applications.length];
    };

    modal.innerHTML = `
      <div class="modal-hero">
        <img src="${escapeHtml(img)}" alt="" loading="lazy" onerror="this.style.background='#2a2a2a'" />
        <button type="button" class="modal-close" aria-label="Close">×</button>
        <div class="modal-hero-content">
          <span class="category-tag">${escapeHtml(book.category || "Finance")}</span>
          <h2>${escapeHtml(book.title)}</h2>
          <p class="meta">${escapeHtml(book.author)} · ${book.year || ""}</p>
        </div>
      </div>
      <div class="modal-body">
        <div class="essence-block">
          <div class="label">Essence · 神髄</div>
          <p>${escapeHtml(book.essence || book.short || "")}</p>
        </div>

        <h3 class="section-title"><span class="jp-mark">要</span> The Meat — Top 10 Insights</h3>
        <p class="expand-hint">Click any insight to expand a real-world application for today’s lifestyle.</p>
        <ol class="meat-list">
          ${paragraphs
            .map((p, i) => {
              const app = appForPara(i);
              return `
              <li data-index="${i}" tabindex="0">
                <span class="para-text">${escapeHtml(p)}</span>
                ${
                  app
                    ? `<div class="app-expand">
                        <div class="app-label">Real-world application</div>
                        <div class="app-title">${escapeHtml(app.title)}</div>
                        <div class="app-body">${escapeHtml(app.body)}</div>
                      </div>`
                    : ""
                }
              </li>`;
            })
            .join("")}
        </ol>

        <div class="applications-section">
          <h3 class="section-title"><span class="jp-mark">実</span> Lifestyle Applications</h3>
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
                  <div class="app-card-body-inner">${escapeHtml(a.body)}</div>
                </div>
              </div>`
              )
              .join("")}
          </div>
        </div>
      </div>
    `;

    overlay.classList.add("open");
    document.body.style.overflow = "hidden";

    modal.querySelector(".modal-close").addEventListener("click", closeModal);

    // Expand paragraphs on click
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

    // App cards accordion
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
        $$(".filter-btn", filters).forEach((b) =>
          b.classList.toggle("active", b.dataset.filter === state.filter)
        );
        renderShelves();
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
        }, 180);
      });
    }

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
    renderFilters(uniqueCategories(books));
    renderShelves();
    bindGlobal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
