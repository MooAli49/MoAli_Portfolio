// ==========================================
// CONTACT FORM VALIDATION & SUBMISSION
// ==========================================
const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validate individual field
function validateField(input, errorElement, validationFn) {
    if (!input || !errorElement) return false;
    const value = input.value.trim();
    const isValid = validationFn(value);

    if (!isValid) {
        errorElement.classList.add("active");
        input.style.borderColor = "#ef4444";
        return false;
    } else {
        errorElement.classList.remove("active");
        input.style.borderColor = "";
        return true;
    }
}

if (nameInput) {
    nameInput.addEventListener("blur", () => {
        validateField(
            nameInput,
            document.getElementById("nameError"),
            (val) => val.length > 0,
        );
    });
}

if (emailInput) {
    emailInput.addEventListener("blur", () => {
        validateField(
            emailInput,
            document.getElementById("emailError"),
            (val) => emailRegex.test(val),
        );
    });
}

if (subjectInput) {
    subjectInput.addEventListener("blur", () => {
        validateField(
            subjectInput,
            document.getElementById("subjectError"),
            (val) => val.length > 0,
        );
    });
}

if (messageInput) {
    messageInput.addEventListener("blur", () => {
        validateField(
            messageInput,
            document.getElementById("messageError"),
            (val) => val.length > 10,
        );
    });
}

// Form submission
if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Validate all fields
        const isNameValid = validateField(
            nameInput,
            document.getElementById("nameError"),
            (val) => val.length > 0,
        );
        const isEmailValid = validateField(
            emailInput,
            document.getElementById("emailError"),
            (val) => emailRegex.test(val),
        );
        const isSubjectValid = validateField(
            subjectInput,
            document.getElementById("subjectError"),
            (val) => val.length > 0,
        );
        const isMessageValid = validateField(
            messageInput,
            document.getElementById("messageError"),
            (val) => val.length > 10,
        );

        // If all fields are valid, submit via FormSubmit AJAX API
        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const subject = subjectInput.value.trim();
            const message = messageInput.value.trim();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const formSuccess = document.getElementById("formSuccess");

            // Disable button & set loading state
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerText = "Sending Message...";
            }

            fetch("https://formsubmit.co/ajax/Ma8510007@gmail.com", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    _subject: `Portfolio Contact: ${subject}`,
                    message: message,
                    _captcha: "false"
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (formSuccess) {
                        formSuccess.innerText = "✅ Thank you! Your message has been sent directly to Mohamed.";
                        formSuccess.style.display = "block";
                        setTimeout(() => { formSuccess.style.display = "none"; }, 6000);
                    }
                    contactForm.reset();
                })
                .catch(error => {
                    console.error("FormSubmit Error, falling back to mailto:", error);
                    // Fallback to mailto if network fails
                    const mailtoLink = `mailto:Ma8510007@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
                    window.location.href = mailtoLink;
                })
                .finally(() => {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerText = "Send Message";
                    }
                });
        }
    });
}
