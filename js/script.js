function openNearestMcDonalds() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
  
          const mapsUrl = `https://www.google.com/maps/search/McDonald's/@${latitude},${longitude},15z`;
          window.open(mapsUrl, '_blank');
        },
        (error) => {
          alert("Unable to retrieve your location. Please check your browser settings and try again.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("welcomeModal");
    modal.style.display = "flex";
  
    const closeModal = document.getElementById("closeModal");
    closeModal.addEventListener("click", function () {
      document.getElementById("welcomeModal").style.display = "none";
    });
  
    window.onclick = function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };
  });
  
  let slideIndex = 0;
  let autoSlideTimeout;
  
  function showSlides() {
    const slides = document.getElementsByClassName("slide");
    slideIndex = (slideIndex + 1) % slides.length;
    updateSlides();
    autoSlideTimeout = setTimeout(showSlides, 5000); // 5 seconds
  }
  
  function updateSlides() {
    const slides = document.getElementsByClassName("slide");
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.transform = `translateX(${(i - slideIndex) * 100}%)`;
    }
  }
  
  function changeSlide(n) {
    clearTimeout(autoSlideTimeout);
    slideIndex = (slideIndex + n + slides.length) % slides.length;
    updateSlides();
    autoSlideTimeout = setTimeout(showSlides, 5000);
  }
  
  showSlides();
  
  let selectedItems = [];
  
  function toggleSelection(itemElement, itemName) {
    const image = itemElement.querySelector("img");
    if (selectedItems.includes(itemName)) {
      selectedItems = selectedItems.filter(item => item !== itemName);
      itemElement.classList.remove("selected");
    } else {
      selectedItems.push(itemName);
      itemElement.classList.add("selected");
    }
  }
  
  function getSpecialOffers() {
    const offerResults = document.getElementById("offer-results");
    offerResults.innerHTML = "";
  
    const offers = [
      { name: "2薯條 + 1霜淇淋", items: ["薯條", "霜淇淋"], price: "89元" },
      { name: "1大麥克 + 1薯條", items: ["大麥克", "薯條"], price: "59元" },
      { name: "10pc雞塊 + 1冰炫風", items: ["雞塊", "冰炫風"], price: "69元" },
    ];
  
    const isOfferApplicable = (offerItems) => offerItems.every(item => selectedItems.includes(item));
  
    const applicableOffers = offers.filter(offer => isOfferApplicable(offer.items));
  
    if (applicableOffers.length > 0) {
      applicableOffers.forEach(offer => {
        const offerElement = document.createElement("p");
        offerElement.innerHTML = `<strong>${offer.name}</strong>: ${offer.price}`;
        offerResults.appendChild(offerElement);
      });
    } else {
      offerResults.innerHTML = "<p>No offers available for the selected items.</p>";
    }
  }
  
