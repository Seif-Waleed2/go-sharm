const items = document.querySelectorAll(".explore-item");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const priceRange = document.getElementById("priceRange");
const priceValue = document.getElementById("priceValue");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const paginationContainer = document.querySelector(".pagination-container");

let visibleItems = 6;
let currentPage = 1;
const itemsPerPage = 6;

/* ================= HEART TOGGLE ================= */
document.querySelectorAll(".favorite-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.querySelector("i").classList.toggle("bi-heart");
    btn.querySelector("i").classList.toggle("bi-heart-fill");
    btn.classList.toggle("active-heart");
  });
});

/* ================= FILTER FUNCTION ================= */
const itemss = document.querySelectorAll(".explore-item");
const categoryButtons = document.querySelectorAll(".category-pill");

let activeCategory = "all";

/* ========= CATEGORY FILTER ========= */

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // active UI
    categoryButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    activeCategory = button.dataset.category;

    applyFilters();
  });
});

function applyFilters() {
  items.forEach((item) => {
    const itemCategory = item.dataset.category;

    if (activeCategory === "all" || itemCategory === activeCategory) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

/* ================= SORTING ================= */
sortSelect.addEventListener("change", () => {
  const sorted = Array.from(items).sort((a, b) => {
    return sortSelect.value === "low"
      ? a.dataset.price - b.dataset.price
      : b.dataset.price - a.dataset.price;
  });

  const container = document.querySelector(".row.g-4");
  sorted.forEach((el) => container.appendChild(el));
});

/* ================= LOAD MORE ================= */
function showItems() {
  items.forEach((item, index) => {
    item.style.display = index < visibleItems ? "block" : "none";
  });
}

loadMoreBtn.addEventListener("click", () => {
  visibleItems += 3;
  showItems();
  if (visibleItems >= items.length) {
    loadMoreBtn.style.display = "none";
  }
});

showItems();

/* ================= PAGINATION ================= */
function createPagination() {
  const pageCount = Math.ceil(items.length / itemsPerPage);
  paginationContainer.innerHTML = "";

  for (let i = 1; i <= pageCount; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = "btn btn-sm btn-outline-secondary mx-1";

    btn.addEventListener("click", () => {
      currentPage = i;
      const start = (i - 1) * itemsPerPage;
      const end = start + itemsPerPage;

      items.forEach((item, index) => {
        item.style.display = index >= start && index < end ? "block" : "none";
      });
    });

    paginationContainer.appendChild(btn);
  }
}

createPagination();
