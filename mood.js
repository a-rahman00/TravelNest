const soundButtons = document.querySelectorAll(".sound-btn");
const moodDestinationList = document.getElementById("moodDestinationList");
const trackingResult = document.getElementById("trackingResult");

// Sound buttons
soundButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const soundId = button.getAttribute("data-sound");
        const sound = document.getElementById(soundId);

        if (sound.paused) {
            sound.play();
            button.textContent = "Stop Sound";
        } else {
            sound.pause();
            sound.currentTime = 0;

            if (soundId === "beachSound") {
                button.textContent = "Beach Sound";
            } else if (soundId === "forestSound") {
                button.textContent = "Forest Sound";
            } else {
                button.textContent = "City Sound";
            }
        }
    });
});

// Show destination list
function displayMoodDestinations() {
    moodDestinationList.innerHTML = "";

    destinations.forEach(function (destination) {
        const card = document.createElement("div");
        card.className = "mood-card";

        card.innerHTML = `
            <h3>${destination.name}</h3>
            <p>${destination.country}</p>
            <button class="track-btn" onclick="markDestination('${destination.name}', 'Visited')">Visited</button>
            <button class="track-btn" onclick="markDestination('${destination.name}', 'Planned')">Planned</button>
        `;

        moodDestinationList.appendChild(card);
    });
}

// Mark destination visited/planned
function markDestination(destinationName, status) {
    let tracking = getFromLocalStorage("travelTracking");

    if (tracking === null) {
        tracking = [];
    }

    const item = {
        name: destinationName,
        status: status
    };

    tracking.push(item);
    saveToLocalStorage("travelTracking", tracking);

    displayTracking();
}

// Display saved tracking
function displayTracking() {
    let tracking = getFromLocalStorage("travelTracking");

    if (tracking === null || tracking.length === 0) {
        trackingResult.innerHTML = "<p>No destinations tracked yet.</p>";
        return;
    }

    trackingResult.innerHTML = "";

    tracking.forEach(function (item) {
        const card = document.createElement("div");
        card.className = "saved-budget-card";

        card.innerHTML = `
            <h3>${item.name}</h3>
            <p>Status: ${item.status}</p>
        `;

        trackingResult.appendChild(card);
    });
}

displayMoodDestinations();
displayTracking();