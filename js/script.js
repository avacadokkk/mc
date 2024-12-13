function openNearestMcDonalds() {
    // Check if geolocation is supported
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
  
          // Google Maps search for McDonald's nearby the user's location
          const mapsUrl = `https://www.google.com/maps/search/McDonald's/@${latitude},${longitude},15z`;
          
          // Open Google Maps in a new tab
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
    // Show the welcome modal every time the page loads
    const modal = document.getElementById("welcomeModal");
    modal.style.display = "flex";
  
    // Close modal when clicking on the close button
    const closeModal = document.getElementById("closeModal");
    closeModal.addEventListener("click", function () {
      document.getElementById("welcomeModal").style.display = "none";
    });
  
    // Optional: Close modal when clicking outside of it
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
    const totalSlides = slides.length;
  
    // Move to the next slide
    slideIndex++;
    if (slideIndex >= totalSlides) {
      slideIndex = 0;
    }
  
    // Update the slide display
    updateSlides();
  
    // Reset the auto-scroll timer
    autoSlideTimeout = setTimeout(showSlides, 5000); // Change slide every 5 seconds
  }
  
  function updateSlides() {
    const slides = document.getElementsByClassName("slide");
  
    // Move the slides container to show the current slide
    const offset = slideIndex * -100; // Calculate offset based on slide index
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.transform = `translateX(${offset}%)`;
    }
  }
  
  function changeSlide(n) {
    const slides = document.getElementsByClassName("slide");
  
    // Clear the existing auto-scroll timeout
    clearTimeout(autoSlideTimeout);
  
    // Adjust the slide index based on user input
    slideIndex += n;
    if (slideIndex < 0) {
      slideIndex = slides.length - 1; // Wrap to the last slide
    } else if (slideIndex >= slides.length) {
      slideIndex = 0; // Wrap to the first slide
    }
  
    // Update the slide display and reset the auto-scroll timer
    updateSlides();
    autoSlideTimeout = setTimeout(showSlides, 5000);
  }
  
  // Start the slideshow
  showSlides();
  
  function toggleHighlight(checkbox) {
    const item = checkbox.closest('.item');
    const image = item.querySelector('img');
  
    if (checkbox.checked) {
      image.classList.add('highlighted');
    } else {
      image.classList.remove('highlighted');
    }
  }
  
  // Array to store selected items
// Declare `selectedItems` once as a global variable at the top
let selectedItems = []; 

function toggleSelection(itemElement, itemName) {
  const image = itemElement.querySelector("img");

  // Toggle selection
  if (selectedItems.includes(itemName)) {
    selectedItems = selectedItems.filter(item => item !== itemName);
    itemElement.classList.remove("selected");
  } else {
    selectedItems.push(itemName);
    itemElement.classList.add("selected");
  }
}

// Function to get applicable offers based on selected items
function getSpecialOffers() {
  const offerResults = document.getElementById("offer-results");
  offerResults.innerHTML = ""; // Clear previous results

  // Define special offers with their requirements
  const offers = [
    {
      name: "2薯條 + 1霜淇淋 ",
      items: ["薯條", "霜淇淋"],
      price: "89元"
    },
    {
      name: "2薯條 + 2霜淇淋 + 1大麥克 ",
      items: [ "薯條", "霜淇淋", "大麥克"],
      price: "129元"
    },
    {
      name: "1大麥克 + 1薯條 ",
      items: ["大麥克", "薯條"],
      price: "59元"
    },
    {
        name: "2雙層牛肉吉事堡 + 2薯條 ",
        items: ["雙層牛肉吉事堡", "薯條"],
        price: "99元"
      },
      {
        name: "2雙層牛肉吉事堡 + 2大麥克 ",
        items: ["雙層牛肉吉事堡", "大麥克"],
        price: "139元"
      },

      {
        name: "6pc雞塊 + 1霜淇淋 ",
        items: ["雞塊", "霜淇淋"],
        price: "49元"
      },

      {
        name: "1雙層牛肉吉事堡 + 1霜淇淋 ",
        items: ["雙層牛肉吉事堡", "霜淇淋"],
        price: "79元"

      },

      {
        name: "1雙層牛肉吉事堡 + 1霜淇淋 +1薯條 ",
        items: ["雙層牛肉吉事堡", "霜淇淋","薯條"],
        price: "99元"
        
      },


    {
        name: "10pc雞塊 + 1冰炫風 ",
        items: ["雞塊", "冰炫風"],
        price: "69元"
    }



    // Add more offers as needed
  ];

  // Helper function to check if all items in an offer are in the selected items
  function isOfferApplicable(offerItems) {
    const selectedItemsCopy = [...selectedItems];
    return offerItems.every(item => {
      const index = selectedItemsCopy.indexOf(item);
      if (index > -1) {
        selectedItemsCopy.splice(index, 1); // Remove matched item
        return true;
      }
      return false;
    });
  }

  // Find applicable offers
  const applicableOffers = offers.filter(offer => isOfferApplicable(offer.items));

  // Display applicable offers
  if (applicableOffers.length > 0) {
    applicableOffers.forEach(offer => {
      const offerElement = document.createElement("p");
      offerElement.innerHTML = `<strong>${offer.name}</strong>: ${offer.price}`;
      offerResults.appendChild(offerElement);
    });
  } else {
    offerResults.innerHTML = "<p>No offers available for the selected items.</p>"
  }
}
