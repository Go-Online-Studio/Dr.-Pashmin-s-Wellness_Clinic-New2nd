let currentFilter = "all";
let allServices = [];

document.addEventListener("DOMContentLoaded", () => {
  loadServicesData();
});

async function loadServicesData() {
  try {
    const response = await fetch("services.json");
    if (response.ok) {
      const data = await response.json();
      allServices = data.services;
      initializePage();
    }
  } catch (error) {
    console.error("Error loading services:", error);
  }
}

function initializePage() {
  generateCategoryFilters();
  checkURLParams();
  displayServices(allServices);
}

function checkURLParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category");
  if (category) {
    currentFilter = category;
    setTimeout(filterAndDisplayServices, 50);
  }
}

function generateCategoryFilters() {
  const categories = ["all", ...new Set(allServices.map(s => s.category))];
  const container = document.getElementById("categoryFilters");
  if (container) {
    container.innerHTML = categories.map(cat =>
      `<button class="btn ${cat === "all" ? "btn-primary" : "btn-outline-secondary"} filter-btn m-1" data-category="${cat}">
        ${cat === "all" ? "All Services" : cat}
      </button>`
    ).join("");
    
    container.querySelectorAll(".filter-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        currentFilter = e.target.dataset.category;
        filterAndDisplayServices();
      });
    });
  }
}

function filterAndDisplayServices() {
  let filtered = currentFilter === "all" ? allServices : allServices.filter(s => s.category === currentFilter);
  displayServices(filtered);
}

function displayServices(services) {
  const grid = document.getElementById("serviceGrid");
  if (!grid) return;

  if (services.length === 0) {
    grid.innerHTML = `<div class="col-12 text-center py-5">No services found.</div>`;
    return;
  }

  grid.innerHTML = services.map(s => `
    <div class="col-lg-4 col-md-6 mb-4" data-aos="fade-up">
      <a href="service-detail.html?id=${s.id}" class="d-block">
        <div class="service-card">
          <div class="service-img">
            <img src="${s.images[0]}" alt="${s.name}" loading="lazy">
          </div>
          <div class="service-info">
            <span class="category-tag">${s.category}</span>
            <h4 class="mt-2 mb-3 text-dark">${s.name}</h4>
            <p class="text-muted" style="font-size: 0.9rem;">${s.description.substring(0, 80)}...</p>
            <span class="text-primary fw-bold" style="font-size: 0.9rem;">View Details <iconify-icon icon="mdi:arrow-right"></iconify-icon></span>
          </div>
        </div>
      </a>
    </div>
  `).join("");
}
