const generatorForm = document.getElementById("generatorForm");
const travelType = document.getElementById("travelType");
const budgetRange = document.getElementById("budgetRange");
const tripResult = document.getElementById("tripResult");
const surpriseBtn = document.getElementById("surpriseBtn");
const saveWishlistBtn = document.getElementById("saveWishlistBtn");

const wishlistMessage = document.getElementById("wishlistMessage");
const wishlistBox = document.getElementById("wishlistBox");

let currentSuggestion = null;

// Generate random destination
function generateTrip() {
    const selectedType = travelType.value;
    const selectedBudget = budgetRange.value;

    if (selectedType === "" || selectedBudget === "") {
        alert("Please select travel type and budget range.");
        return;
    }

    const matchedDestinations = destinations.filter(function (destination) {
        return destination.type === selectedType && destination.budget === selectedBudget;
    });

    if (matchedDestinations.length === 0) {
        tripResult.innerHTML = "<p>No matching destination found. Try another option.</p>";
        currentSuggestion = null;
        return;
    }

    const randomIndex = Math.floor(Math.random() * matchedDestinations.length);
    currentSuggestion = matchedDestinations[randomIndex];

    tripResult.innerHTML = `
        <div class="suggestion-card">
            <img src="${currentSuggestion.image}" alt="${currentSuggestion.name}">
            <h3>${currentSuggestion.name}</h3>
            <p>${currentSuggestion.country}</p>
            <p>${currentSuggestion.description}</p>
        </div>
    `;
}

// Form submit
generatorForm.addEventListener("submit", function (event) {
    event.preventDefault();
    generateTrip();
});

// Surprise me again button
surpriseBtn.addEventListener("click", function () {
    generateTrip();

    surpriseBtn.classList.add("button-animation");

    setTimeout(function () {
        surpriseBtn.classList.remove("button-animation");
    }, 500);
});

// Save to wishlist
saveWishlistBtn.addEventListener("click", function () {
    if (currentSuggestion === null) {
        wishlistMessage.textContent = "Please generate a destination first.";
        return;
    }

    let wishlist = getFromLocalStorage("wishlist");

    if (wishlist === null) {
        wishlist = [];
    }

    wishlist.push(currentSuggestion);
    saveToLocalStorage("wishlist", wishlist);

    wishlistMessage.textContent = "Destination saved to wishlist!";
    displayWishlist();
});

// Display wishlist
function displayWishlist() {
    let wishlist = getFromLocalStorage("wishlist");

    if (wishlist === null || wishlist.length === 0) {
        wishlistBox.innerHTML = "<p>No destinations saved yet.</p>";
        return;
    }

    wishlistBox.innerHTML = "";

    wishlist.forEach(function (destination) {
        const card = document.createElement("div");
        card.className = "saved-budget-card";

        card.innerHTML = `
            <h3>${destination.name}</h3>
            <p>${destination.country}</p>
            <p>${destination.type}</p>
        `;

        wishlistBox.appendChild(card);
    });
}

displayWishlist();