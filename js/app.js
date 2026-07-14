/**
 * Wealth 財 — Digital Library Application
 * Shelves, hover tooltips, modal with meat paragraphs & applications
 */
(function () {
  "use strict";

  const BOOKS_PER_SHELF = 12;
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

  function uniqueCategories(books) {
    const set = new Set(books.map((b) => b.category));
    return ["All", ...[...set].sort()];
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

  function chunk(arr, size) {
    const out = [];
    for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
    return out;
  }

  function truncate(str, n) {
    if (!str) return "";
    return str.length > n ? str.slice(0, n - 1) + "…" : str;
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

    div.innerHTML = `
      <div class="book-spine">
        <span class="book-title-spine">${escapeHtml(truncate(book.title, 28))}</span>
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

    $("#book-count") &&
      ($("#book-count").textContent = `${books.length} volumes`);

    const shelves = chunk(books, BOOKS_PER_SHELF);
    container.innerHTML = "";

    shelves.forEach((shelfBooks, i) => {
      const row = document.createElement("div");
      row.className = "shelf-row";
      const start = i * BOOKS_PER_SHELF + 1;
      const end = start + shelfBooks.length - 1;

      row.innerHTML = `
        <div class="shelf-label">Shelf ${String(i + 1).padStart(2, "0")} · ${start}–${end}</div>
        <div class="shelf"></div>
        <div class="shelf-plank" aria-hidden="true"></div>
      `;

      const shelf = row.querySelector(".shelf");
      shelfBooks.forEach((book) => shelf.appendChild(bookElement(book)));
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
