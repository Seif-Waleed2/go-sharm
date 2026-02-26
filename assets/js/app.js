const tabs = document.querySelectorAll(".hero-tabs button");
const forms = document.querySelectorAll(".tab-content");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((btn) => {
      btn.classList.remove("active-tab");
      btn.classList.remove("btn-light");
      btn.classList.add("btn-outline-light");
    });

    tab.classList.add("active-tab");
    tab.classList.remove("btn-outline-light");
    tab.classList.add("btn-light");

    forms.forEach((form) => form.classList.remove("active-form"));

    const selectedForm = document.getElementById(tab.dataset.tab);
    if (selectedForm) {
      selectedForm.classList.add("active-form");
    }
  });
});

// Poular Places Scroll Function
function scrollPopular(direction) {
  const container = document.getElementById("popularScroll");
  const scrollAmount = 320;

  container.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth",
  });
}

const container = document.getElementById("popularScroll");
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");
const scrollAmount = 320;

function updateArrows() {
  const maxScrollLeft = container.scrollWidth - container.clientWidth;

  if (maxScrollLeft <= 0) {
    leftBtn.style.display = "none";
    rightBtn.style.display = "none";
    return;
  }

  if (container.scrollLeft <= 0) {
    leftBtn.style.display = "none";
  } else {
    leftBtn.style.display = "flex";
  }

  if (container.scrollLeft >= maxScrollLeft - 5) {
    rightBtn.style.display = "none";
  } else {
    rightBtn.style.display = "flex";
  }
}

leftBtn.addEventListener("click", () => {
  container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
});

rightBtn.addEventListener("click", () => {
  container.scrollBy({ left: scrollAmount, behavior: "smooth" });
});

container.addEventListener("scroll", updateArrows);
window.addEventListener("resize", updateArrows);

document.addEventListener("DOMContentLoaded", updateArrows);
