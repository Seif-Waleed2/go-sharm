document.addEventListener("DOMContentLoaded", function () {

  let currentStep = 1;

  const panels = document.querySelectorAll(".step-panel");
  const steps = document.querySelectorAll(".step");
  const nextBtn = document.getElementById("nextBtn");
  const backBtn = document.getElementById("backBtn");

  const aiWrapper = document.querySelector(".ai-wrapper");
  const aiLoading = document.querySelector(".ai-loading");
  const aiResult = document.querySelector(".ai-result");

  const tripTitle = document.getElementById("tripTitle");
  const itineraryContainer = document.getElementById("itineraryContainer");

  // =============================
  // STEP NAVIGATION
  // =============================

  function updateStepUI() {
    panels.forEach(panel => panel.classList.remove("active"));
    steps.forEach(step => step.classList.remove("active"));

    panels[currentStep - 1].classList.add("active");
    steps[currentStep - 1].classList.add("active");

    backBtn.style.display = currentStep === 1 ? "none" : "inline-block";

    nextBtn.textContent = currentStep === 3 ? "Generate Plan ✨" : "Next";
  }

  nextBtn.addEventListener("click", function () {
    if (currentStep < 3) {
      currentStep++;
      updateStepUI();
    } else {
      generatePlan();
    }
  });

  backBtn.addEventListener("click", function () {
    if (currentStep > 1) {
      currentStep--;
      updateStepUI();
    }
  });

  updateStepUI();


  // =============================
  // TRIP TYPE SELECTION
  // =============================

  const tripCards = document.querySelectorAll(".trip-card");

  tripCards.forEach(card => {
    card.addEventListener("click", function () {
      tripCards.forEach(c => c.classList.remove("active"));
      this.classList.add("active");
    });
  });


  // =============================
  // INTEREST TAGS SELECTION
  // =============================

  const tags = document.querySelectorAll(".tag");

  tags.forEach(tag => {
    tag.addEventListener("click", function () {
      this.classList.toggle("active");
    });
  });


  // =============================
  // AI PLAN GENERATOR
  // =============================

  function generatePlan() {

    if (!aiWrapper || !aiLoading || !aiResult) {
      console.error("Missing required elements (.ai-wrapper, .ai-loading, .ai-result)");
      return;
    }

    aiWrapper.classList.add("d-none");
    aiLoading.classList.remove("d-none");

    setTimeout(() => {

      aiLoading.classList.add("d-none");
      aiResult.classList.remove("d-none");

      tripTitle.textContent = "Your vacation in Sharm El Sheikh";

      itineraryContainer.innerHTML = `
        <div class="day-card">
          <h5>Day 1</h5>
          <p>Dahab Center Mall</p>
          <p>Soho Square</p>
        </div>
        <div class="day-card">
          <h5>Day 2</h5>
          <p>Desert Safari Adventure</p>
          <p>Sea Beach Aqua Park</p>
        </div>
        <div class="day-card">
          <h5>Day 2</h5>
          <p>Desert Safari Adventure</p>
          <p>Sea Beach Aqua Park</p>
        </div>
        <div class="day-card">
          <h5>Day 2</h5>
          <p>Desert Safari Adventure</p>
          <p>Sea Beach Aqua Park</p>
        </div>
      `;

    }, 1500);
  }

});
