const signinForm = document.getElementById("signin-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("toggle-password");


// =========================
// SHOW / HIDE PASSWORD
// =========================

togglePassword.addEventListener("click", () => {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePassword.textContent = "Hide";
    } else {
        passwordInput.type = "password";
        togglePassword.textContent = "Show";
    }
});


// =========================
// FORM SUBMIT
// =========================

signinForm.addEventListener("submit", (event) => {
    event.preventDefault();

    clearErrors();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    let isValid = true;


    // Validate email
    if (email === "") {
        showError(emailInput, "Please enter your email");
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError(emailInput, "Please enter a valid email");
        isValid = false;
    }


    // Validate password
    if (password === "") {
        showError(passwordInput, "Please enter your password");
        isValid = false;
    } else if (password.length < 8) {
        showError(
            passwordInput,
            "Password must be at least 8 characters"
        );

        isValid = false;
    }


    // If everything is valid
    if (isValid) {
        console.log("Form is valid");

        console.log("Email:", email);
        console.log("Password:", password);

        // Later:
        // auth.js → backend API
    }
});


// =========================
// EMAIL VALIDATION
// =========================

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


// =========================
// SHOW ERROR
// =========================

function showError(input, message) {

    const error = document.createElement("p");

    error.className = "input-error";

    error.textContent = message;

    input.parentElement.appendChild(error);

    input.classList.add("input-invalid");
}


// =========================
// CLEAR ERRORS
// =========================

function clearErrors() {

    document
        .querySelectorAll(".input-error")
        .forEach(error => error.remove());

    document
        .querySelectorAll(".input-invalid")
        .forEach(input => {
            input.classList.remove("input-invalid");
        });
}


// =========================
// GOOGLE LOGIN
// =========================

document
    .getElementById("google-login")
    .addEventListener("click", () => {

        console.log("Google login clicked");

        // Later connect to OAuth
    });


// =========================
// GITHUB LOGIN
// =========================

document
    .getElementById("github-login")
    .addEventListener("click", () => {

        console.log("GitHub login clicked");

        // Later connect to OAuth
    });