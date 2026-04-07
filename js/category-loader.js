/* ========================================
   CATEGORY-LOADER.JS
   Dynamic treatment renderer for category pages
   ======================================== */
document.addEventListener("DOMContentLoaded", async function () {
  "use strict";

  // 1. Detect current page and map to category key
  const pageMap = {
    "skin-laser.html": "skin-laser",
    "hair-restoration.html": "hair-restoration",
    "weight-management.html": "weight-management",
    "ayurvedic-therapies.html": "ayurvedic-therapies",
  };

  const currentPage = window.location.pathname.split("/").pop() || "";
  const categoryKey = pageMap[currentPage];

  if (!categoryKey) return;

  // 2. Fetch services.json
  let data;
  try {
    const response = await fetch("services.json");
    if (!response.ok) throw new Error("Failed to load services data");
    data = await response.json();
  } catch (error) {
    console.error("Category Loader Error:", error);
    return;
  }

  // 3. Get category info and filter treatments
  const categoryInfo = data.categories.find((c) => c.key === categoryKey);
  const treatments = data.treatments.filter((t) => t.category === categoryKey);

  if (!categoryInfo || treatments.length === 0) return;

  // 4. Populate banner content
  const bannerTitle = document.getElementById("categoryBannerTitle");
  const bannerTagline = document.getElementById("categoryBannerTagline");
  const bannerDesc = document.getElementById("categoryBannerDesc");

  if (bannerTitle) bannerTitle.textContent = categoryInfo.name;
  if (bannerTagline) bannerTagline.textContent = categoryInfo.tagline;
  if (bannerDesc) bannerDesc.textContent = categoryInfo.description;

  // 5. Render treatments into container
  const container = document.getElementById("treatmentContainer");
  if (!container) return;

  container.innerHTML = treatments
    .map((treatment, index) => {
      const isReversed = index % 2 !== 0;
      const delay = Math.min(index * 50, 300);

      const benefitsHtml = treatment.benefits
        .map(
          (b) => `
        <li>
          <iconify-icon icon="mdi:check-circle" class="benefit-icon"></iconify-icon>
          <span>${b}</span>
        </li>`
        )
        .join("");

      return `
      <div class="treatment-row ${isReversed ? "reversed" : ""}" data-aos="fade-up" data-aos-delay="${delay}">
        
        <div class="treatment-image-col">
          <div class="treatment-image-wrapper">
            <img src="${treatment.image_url}" alt="${treatment.title}" loading="lazy">
            <div class="treatment-image-overlay">
              <iconify-icon icon="${treatment.icon}" class="treatment-overlay-icon"></iconify-icon>
            </div>
          </div>
        </div>

        <div class="treatment-content-col">
          <div class="treatment-content">
            <div class="treatment-number">${String(index + 1).padStart(2, "0")}</div>
            <h3 class="treatment-title">${treatment.title}</h3>
            <p class="treatment-description">${treatment.persuasive_description}</p>
            <ul class="treatment-benefits">
              ${benefitsHtml}
            </ul>
            <a href="contact.html" class="btn btn-primary btn-sm mt-3">
              <iconify-icon icon="mdi:calendar-check"></iconify-icon> Book This Treatment
            </a>
          </div>
        </div>

      </div>`;
    })
    .join("");

  // 6. Re-initialize AOS after dynamic content injection
  if (typeof AOS !== "undefined") {
    AOS.refresh();
  }
});
