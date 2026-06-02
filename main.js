// Reusable function to save data into localStorage
function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// Reusable function to get data from localStorage
function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

// Hamburger menu
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
        navLinks.classList.toggle("show");
    });
}

// Auto-changing travel quotes
let quoteIndex = 0;
const travelQuote = document.getElementById("travelQuote");

if (travelQuote) {
    setInterval(function () {
        quoteIndex++;

        if (quoteIndex >= travelQuotes.length) {
            quoteIndex = 0;
        }

        travelQuote.textContent = "“" + travelQuotes[quoteIndex] + "”";
    }, 3000);
}

// Destination of the Day
const destinationOfDay = document.getElementById("destinationOfDay");

if (destinationOfDay) {
    const today = new Date();
    const dayNumber = today.getDate();

    const selectedDestination = destinations[dayNumber % destinations.length];

    destinationOfDay.innerHTML = `
        <h3>${selectedDestination.name}, ${selectedDestination.country}</h3>
        <p>${selectedDestination.description}</p>
    `;
}

// Newsletter form
const newsletterForm = document.getElementById("newsletterForm");
const newsletterEmail = document.getElementById("newsletterEmail");
const newsletterMessage = document.getElementById("newsletterMessage");

if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = newsletterEmail.value;

        if (email === "") {
            newsletterMessage.textContent = "Please enter your email.";
            return;
        }

        saveToLocalStorage("newsletterEmail", email);

        newsletterMessage.textContent = "Thank you for subscribing!";
        newsletterEmail.value = "";
    });
}
// Register service worker for PWA
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js");
}