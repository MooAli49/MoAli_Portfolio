// ==========================================
// MAIN ENTRY POINT & EASTER EGG
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    // Kick off dynamic rendering of skills, projects, and timeline
    if (typeof window.renderAllData === "function") {
        window.renderAllData();
    }
});

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
