const destinationGrid = document.getElementById("destinationGrid");
const searchInput = document.getElementById("searchInput");
const continentFilter = document.getElementById("continentFilter");
const searchSuggestions = document.getElementById("searchSuggestions");

const destinationModal = document.getElementById("destinationModal");
const closeModal = document.getElementById("closeModal");

const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalAttractions = document.getElementById("modalAttractions");

const lowCost = document.getElementById("lowCost");
const mediumCost = document.getElementById("mediumCost");
const highCost = document.getElementById("highCost");

// Display destination cards
function displayDestinations(destinationList) {
    destinationGrid.innerHTML = "";

    destinationList.forEach(function (destination) {
        const card = document.createElement("div");
        card.className = "destination-card";

        card.innerHTML = `
            <img src="${destination.image}" alt="${destination.name}">
            <div class="destination-card-content">
                <h3>${destination.name}</h3>
                <p>${destination.country}</p>
                <p>${destination.continent}</p>
            </div>
        `;

        card.addEventListener("click", function () {
            openModal(destination);
        });

        destinationGrid.appendChild(card);
    });
}

// Open modal
function openModal(destination) {
    modalTitle.textContent = destination.name + ", " + destination.country;
    modalDescription.textContent = destination.description;

    modalAttractions.innerHTML = "";

    destination.attractions.forEach(function (attraction) {
        const li = document.createElement("li");
        li.textContent = attraction;
        modalAttractions.appendChild(li);
    });

    lowCost.textContent = destination.lowCost;
    mediumCost.textContent = destination.mediumCost;
    highCost.textContent = destination.highCost;

    destinationModal.style.display = "block";
}

// Close modal
closeModal.addEventListener("click", function () {
    destinationModal.style.display = "none";
});

// Close modal when clicking outside box
window.addEventListener("click", function (event) {
    if (event.target === destinationModal) {
        destinationModal.style.display = "none";
    }


});// Show live search suggestions
function showSuggestions() {
    const searchText = searchInput.value.toLowerCase();

    searchSuggestions.innerHTML = "";

    if (searchText === "") {
        searchSuggestions.style.display = "none";
        return;
    }

    const matchedDestinations = destinations.filter(function (destination) {
        return destination.name.toLowerCase().includes(searchText);
    });

    if (matchedDestinations.length === 0) {
        searchSuggestions.style.display = "none";
        return;
    }

    matchedDestinations.forEach(function (destination) {
        const suggestion = document.createElement("div");
        suggestion.className = "suggestion-item";
        suggestion.textContent = destination.name;

        suggestion.addEventListener("click", function () {
            searchInput.value = destination.name;
            searchSuggestions.style.display = "none";
            filterDestinations();
        });

        searchSuggestions.appendChild(suggestion);
    });

    searchSuggestions.style.display = "block";
}



// Search and filter
function filterDestinations() {
    const searchText = searchInput.value.toLowerCase();
    const selectedContinent = continentFilter.value;

    const filteredDestinations = destinations.filter(function (destination) {
        const matchesSearch = destination.name.toLowerCase().includes(searchText);
        const matchesContinent = selectedContinent === "all" || destination.continent === selectedContinent;

        return matchesSearch && matchesContinent;
    });

    displayDestinations(filteredDestinations);
}

searchInput.addEventListener("input", function () {
    showSuggestions();
    filterDestinations();
});
continentFilter.addEventListener("change", filterDestinations);

// Show all destinations when page loads
displayDestinations(destinations);