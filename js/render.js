// ==========================================
// DATA RENDERER MODULE
// ==========================================
async function renderSkills() {
    const container = document.querySelector(".skills__grid");
    if (!container) return;

    try {
        const response = await fetch("data/skills.json");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const skillsData = await response.json();

        container.innerHTML = skillsData.map(category => `
            <div class="skill-category">
              <h3 class="skill-category__title">${category.category}</h3>
              <div class="skill-tags">
                ${category.tags.map(tag => `<span class="skill-tag">${tag}</span>`).join("")}
              </div>
            </div>
        `).join("");

        attachObservers(container);
    } catch (error) {
        console.error("Error loading skills data:", error);
        container.innerHTML = `<p style="color: var(--text-secondary);">Unable to load skills data. Please ensure you are running via a local HTTP server (e.g. npx serve).</p>`;
    }
}

async function renderProjects() {
    const container = document.querySelector(".projects__grid");
    if (!container) return;

    try {
        const response = await fetch("data/projects.json");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const projectsData = await response.json();

        container.innerHTML = projectsData.map(project => {
            const headerHtml = project.badge
                ? `<div class="project-card__header">
                     <h3 class="project-card__title">${project.emoji} ${project.title}</h3>
                     <span class="project-card__badge">${project.badge}</span>
                   </div>`
                : `<h3 class="project-card__title">${project.emoji} ${project.title}</h3>`;

            return `
              <article class="project-card${project.featured ? " project-card--featured" : ""}">
                <div class="project-card__image">
                  <img
                    src="${project.image}"
                    alt="${project.title}"
                    onerror="this.parentElement.style.display = 'none'"
                  />
                </div>
                <div class="project-card__content">
                  ${headerHtml}
                  <p class="project-card__description">${project.description}</p>
                  <ul class="project-card__list">
                    ${project.features.map(feat => `<li>${feat}</li>`).join("")}
                  </ul>
                  <div class="project-card__tech">
                    ${project.tech.map(tech => `<span class="tech-badge">${tech}</span>`).join("")}
                  </div>
                  <a
                    href="${project.github}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="project-card__link"
                  >
                    View on GitHub
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3m-2 16H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7z"/>
                    </svg>
                  </a>
                </div>
              </article>
            `;
        }).join("");

        attachObservers(container);
    } catch (error) {
        console.error("Error loading projects data:", error);
        container.innerHTML = `<p style="color: var(--text-secondary);">Unable to load projects data. Please ensure you are running via a local HTTP server (e.g. npx serve).</p>`;
    }
}

async function renderTimeline() {
    const container = document.querySelector(".timeline");
    if (!container) return;

    try {
        const response = await fetch("data/timeline.json");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const timelineData = await response.json();

        container.innerHTML = timelineData.map(item => `
            <div class="timeline-item">
              <div class="timeline-marker"></div>
              <div class="timeline-content">
                ${item.date ? `<div class="timeline-date">${item.date}</div>` : ""}
                <h3 class="timeline-title">${item.title}</h3>
                ${item.subtitle ? `<div class="timeline-subtitle">${item.subtitle}</div>` : ""}
                <p class="timeline-description">${item.description}</p>
              </div>
            </div>
        `).join("");

        attachObservers(container);
    } catch (error) {
        console.error("Error loading timeline data:", error);
        container.innerHTML = `<p style="color: var(--text-secondary);">Unable to load timeline data. Please ensure you are running via a local HTTP server (e.g. npx serve).</p>`;
    }
}

function attachObservers(container) {
    if (typeof window.observeAnimatedElements === "function") {
        const targets = container.querySelectorAll(".project-card, .skill-category, .timeline-content");
        window.observeAnimatedElements(targets);
    }
}

window.renderAllData = async function() {
    await Promise.all([
        renderSkills(),
        renderProjects(),
        renderTimeline()
    ]);
};
