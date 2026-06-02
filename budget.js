const budgetForm = document.getElementById("budgetForm");
const budgetDestination = document.getElementById("budgetDestination");
const days = document.getElementById("days");
const dailyBudget = document.getElementById("dailyBudget");

const totalCost = document.getElementById("totalCost");
const budgetStatus = document.getElementById("budgetStatus");
const progressBar = document.getElementById("progressBar");

const saveBudgetBtn = document.getElementById("saveBudgetBtn");
const saveBudgetMessage = document.getElementById("saveBudgetMessage");
const savedBudgets = document.getElementById("savedBudgets");

let currentBudget = null;

// Calculate budget
budgetForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const destination = budgetDestination.value;
    const numberOfDays = Number(days.value);
    const budgetPerDay = Number(dailyBudget.value);

    if (destination === "" || numberOfDays <= 0 || budgetPerDay <= 0) {
        alert("Please fill all fields correctly.");
        return;
    }

    const total = numberOfDays * budgetPerDay;
    let status = "";
    let progress = 0;

    if (budgetPerDay < 50) {
        status = "Low Budget";
        progress = 35;
    } else if (budgetPerDay <= 150) {
        status = "Moderate Budget";
        progress = 65;
    } else {
        status = "Luxury Budget";
        progress = 100;
    }

    totalCost.textContent = "Total Cost: $" + total;
    budgetStatus.textContent = "Budget Status: " + status;
    progressBar.style.width = progress + "%";

    currentBudget = {
        destination: destination,
        days: numberOfDays,
        dailyBudget: budgetPerDay,
        total: total,
        status: status
    };
});

// Save budget to localStorage
saveBudgetBtn.addEventListener("click", function () {
    if (currentBudget === null) {
        saveBudgetMessage.textContent = "Please calculate a budget first.";
        return;
    }

    let budgets = getFromLocalStorage("savedBudgets");

    if (budgets === null) {
        budgets = [];
    }

    budgets.push(currentBudget);
    saveToLocalStorage("savedBudgets", budgets);

    saveBudgetMessage.textContent = "Budget saved successfully!";
    displaySavedBudgets();
});

// Display saved budgets
function displaySavedBudgets() {
    let budgets = getFromLocalStorage("savedBudgets");

    if (budgets === null || budgets.length === 0) {
        savedBudgets.innerHTML = "<p>No saved budgets yet.</p>";
        return;
    }

    savedBudgets.innerHTML = "";

    budgets.forEach(function (budget) {
        const card = document.createElement("div");
        card.className = "saved-budget-card";

        card.innerHTML = `
            <h3>${budget.destination}</h3>
            <p>Days: ${budget.days}</p>
            <p>Daily Budget: $${budget.dailyBudget}</p>
            <p>Total: $${budget.total}</p>
            <p>Status: ${budget.status}</p>
        `;

        savedBudgets.appendChild(card);
    });
}

displaySavedBudgets();