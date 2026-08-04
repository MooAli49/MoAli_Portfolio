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

// Expose observation function to window for dynamically rendered elements
window.observeAnimatedElements = function(elements) {
    if (!elements) return;
    elements.forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(el);
    });
};

// Observe static elements present at initial load time
document.addEventListener("DOMContentLoaded", () => {
    const staticElements = document.querySelectorAll(".project-card, .skill-category, .timeline-content");
    if (staticElements.length > 0) {
        window.observeAnimatedElements(staticElements);
    }
});
