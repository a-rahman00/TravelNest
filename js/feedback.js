const feedbackForm = document.getElementById("feedbackForm");
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const userMessage = document.getElementById("userMessage");
const feedbackMessage = document.getElementById("feedbackMessage");

const faqQuestions = document.querySelectorAll(".faq-question");

// Feedback form validation
feedbackForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const nameValue = userName.value;
    const emailValue = userEmail.value;
    const messageValue = userMessage.value;

    if (nameValue === "" || emailValue === "" || messageValue === "") {
        feedbackMessage.textContent = "Please fill all fields.";
        return;
    }

    if (!emailValue.includes("@")) {
        feedbackMessage.textContent = "Please enter a valid email address.";
        return;
    }

    let feedbackList = getFromLocalStorage("feedbackList");

    if (feedbackList === null) {
        feedbackList = [];
    }

    const feedback = {
        name: nameValue,
        email: emailValue,
        message: messageValue
    };

    feedbackList.push(feedback);
    saveToLocalStorage("feedbackList", feedbackList);

    feedbackMessage.textContent = "Thank you! Your feedback has been submitted.";

    userName.value = "";
    userEmail.value = "";
    userMessage.value = "";
});

// FAQ accordion
faqQuestions.forEach(function (question) {
    question.addEventListener("click", function () {
        const answer = question.nextElementSibling;
        answer.classList.toggle("show");
    });
});