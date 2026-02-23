const rideCards = document.querySelectorAll(".ride-card");
const selectBtn = document.querySelector(".select-btn");

rideCards.forEach(card => {
  card.addEventListener("click", () => {

    rideCards.forEach(c => c.classList.remove("active"));
    card.classList.add("active");

    const rideName = card.dataset.name;
    selectBtn.textContent = "Select " + rideName;

  });
});


const pickupTime = document.getElementById("pickupTime");

function calculatePrice(base){

  let price = parseFloat(base);

  // Night surcharge
  if(pickupTime && pickupTime.value){
    const hour = new Date(pickupTime.value).getHours();
    if(hour >= 22 || hour <= 5){
      price += 5;
    }
  }

  return price.toFixed(2);
}

rideCards.forEach(card => {
  card.addEventListener("click", () => {

    rideCards.forEach(c => c.classList.remove("active"));
    card.classList.add("active");

    const rideName = card.dataset.name;
    const base = card.dataset.base;

    const finalPrice = calculatePrice(base);

    selectBtn.textContent = `Select ${rideName} - $${finalPrice}`;

  });
});


selectBtn.addEventListener("click", () => {

  const paymentMethod = document.querySelector("select").value;

  if(paymentMethod === "Cash"){
    alert("Ride Booked Successfully!");
  } else {
    const modal = new bootstrap.Modal(document.getElementById('paymentModal'));
    modal.show();
  }

});
