// ==========================================
// THEME TOGGLE FUNCTIONALITY
// ==========================================
const themeToggle = document.getElementById("themeToggle");
const html = document.documentElement;

// Load saved theme from localStorage or default to light
const savedTheme = localStorage.getItem("theme") || "light";
html.setAttribute("data-theme", savedTheme);

// Update icon based on current theme
function updateThemeIcon() {
    const currentTheme = html.getAttribute("data-theme");
    const sunIcon = `<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>`;
    const moonIcon = `<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>`;
    if (themeToggle) {
        const svgEl = themeToggle.querySelector("svg");
        if (svgEl) {
            svgEl.innerHTML = currentTheme === "dark" ? moonIcon : sunIcon;
        }
    }
}

updateThemeIcon();

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";

        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        updateThemeIcon();
    });
}

// ==========================================
// MOBILE NAVIGATION TOGGLE
// ==========================================
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav__link");

if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
        navToggle.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    // Close mobile menu when clicking a link
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navToggle.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove("active");
            navMenu.classList.remove("active");
        }
    });
}

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

// ==========================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed nav height
            window.scrollTo({
                top: offsetTop,
                behavior: "smooth",
            });
        }
    });
});

// ==========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

// Observe all project cards and skill categories
document
    .querySelectorAll(".project-card, .skill-category, .timeline-content")
    .forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(el);
    });

// ==========================================
// ACTIVE NAVIGATION LINK ON SCROLL
// ==========================================
window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll(".section");
    const navLinks = document.querySelectorAll(".nav__link");

    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;

        if (
            window.pageYOffset >= sectionTop &&
            window.pageYOffset < sectionTop + sectionHeight
        ) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.style.color = "";
        if (link.getAttribute("href") === `#${current}`) {
            link.style.color = "var(--accent-primary)";
        }
    });
});

// ==========================================
// CONSOLE MESSAGE (Easter Egg)
// ==========================================
console.log(
    "%c👋 Hello, fellow developer!",
    "color: #0ea5e9; font-size: 20px; font-weight: bold;",
);
console.log(
    "%cInterested in how this was built? Check out the source code!",
    "color: #64748b; font-size: 14px;",
);
console.log(
    "%cBuilt with vanilla HTML, CSS, and JavaScript - no frameworks needed! 🚀",
    "color: #10b981; font-size: 14px;",
);
