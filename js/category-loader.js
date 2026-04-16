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
    "iv-drip-therapies.html": "iv-drip-therapies",
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
            <button type="button" class="btn btn-primary btn-sm mt-3" data-bs-toggle="modal" data-bs-target="#bookingModal" data-treatment="${treatment.title}">
              <iconify-icon icon="mdi:calendar-check"></iconify-icon> Book This Treatment
            </button>
          </div>
        </div>

      </div>`;
    })
    .join("");

  // 6. Re-initialize AOS after dynamic content injection
  if (typeof AOS !== "undefined") {
    AOS.refresh();
  }

  // 7. Inject Booking Modal and Handler
  if (!document.getElementById("bookingModal")) {
    const modalHtml = `
    <style>
      .modal-custom-input {
        border: none !important;
        border-bottom: 1px solid #dee2e6 !important;
        border-radius: 0 !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
        box-shadow: none !important;
        background-color: transparent !important;
        transition: border-color 0.3s ease;
        color: var(--dark) !important;
      }
      .modal-custom-input:focus {
        border-bottom-color: var(--primary-dark) !important;
      }
      .modal-custom-input::placeholder {
        color: #adb5bd !important;
        font-size: 0.95rem;
      }
    </style>
    <div class="modal fade" id="bookingModal" tabindex="-1" aria-labelledby="bookingModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow" style="border-radius: 12px;">
          <div class="modal-header border-0 pb-0">
            <h5 class="modal-title fw-bold" id="bookingModalLabel">Book Treatment</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="bookingModalForm" class="needs-validation" novalidate>
              <input type="hidden" id="bm_treatment" value="">
              <input type="hidden" id="bm_category" value="">
              
              <div class="mb-3">
                <label for="bm_name" class="form-label text-muted small fw-medium">Full Name</label>
                <input type="text" class="form-control modal-custom-input" id="bm_name" placeholder="John Doe" required>
                <div class="invalid-feedback" style="font-size: 0.8rem;">Please enter your full name.</div>
              </div>
              <div class="mb-3">
                <label for="bm_phone" class="form-label text-muted small fw-medium">Mobile Number</label>
                <input type="tel" class="form-control modal-custom-input" id="bm_phone" placeholder="+91 XXXXX XXXXX" required>
                <div class="invalid-feedback" style="font-size: 0.8rem;">Please enter a valid mobile number.</div>
              </div>
              <div class="mb-3">
                <label for="bm_address" class="form-label text-muted small fw-medium">Address</label>
                <textarea class="form-control modal-custom-input" id="bm_address" rows="2" placeholder="Your Address" required style="resize: none;"></textarea>
                <div class="invalid-feedback" style="font-size: 0.8rem;">Please enter your address.</div>
              </div>
              <div class="row gx-3">
                <div class="col-md-6 mb-3">
                  <label for="bm_date" class="form-label text-muted small fw-medium">Preferred Date</label>
                  <input type="date" class="form-control modal-custom-input" id="bm_date" required>
                  <div class="invalid-feedback" style="font-size: 0.8rem;">Please select a date.</div>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="bm_time" class="form-label text-muted small fw-medium">Preferred Time</label>
                  <input type="time" class="form-control modal-custom-input" id="bm_time" required>
                  <div class="invalid-feedback" style="font-size: 0.8rem;">Please select a time.</div>
                </div>
              </div>
              
              <button type="submit" class="btn w-100 py-3 mt-2 rounded-pill text-white d-flex justify-content-center align-items-center gap-2 outline-none" style="background-color: var(--primary-dark); font-weight:500; font-size:1.05rem; transition: all 0.3s; border:none; box-shadow: 0 4px 10px rgba(43, 120, 2, 0.2);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 15px rgba(43, 120, 2, 0.3)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 10px rgba(43, 120, 2, 0.2)';">
                Confirm Booking <iconify-icon icon="mdi:whatsapp" style="font-size: 1.3rem;"></iconify-icon>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>`;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    const bookingModal = document.getElementById("bookingModal");
    bookingModal.addEventListener("show.bs.modal", function (event) {
      const button = event.relatedTarget;
      const treatmentTitle = button.getAttribute("data-treatment");
      const categoryBanner = document.getElementById("categoryBannerTitle");
      const categoryTitle = categoryBanner ? categoryBanner.textContent : (categoryInfo ? categoryInfo.name : "Category");
      
      document.getElementById("bm_treatment").value = treatmentTitle;
      document.getElementById("bm_category").value = categoryTitle;
      
      const modalTitle = document.getElementById("bookingModalLabel");
      modalTitle.textContent = "Book: " + treatmentTitle;
    });

    const bookingForm = document.getElementById("bookingModalForm");
    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault();
      
      if (!bookingForm.checkValidity()) {
        e.stopPropagation();
        bookingForm.classList.add('was-validated');
        return;
      }

      const name = document.getElementById("bm_name").value.trim();
      const phone = document.getElementById("bm_phone").value.trim();
      const address = document.getElementById("bm_address").value.trim();
      const date = document.getElementById("bm_date").value;
      const time = document.getElementById("bm_time").value;
      const treatment = document.getElementById("bm_treatment").value;
      const category = document.getElementById("bm_category").value;

      // Google Sheets Submission
      const scriptURL = 'https://script.google.com/macros/s/AKfycbxWKsJAe-_8QYm8G1jvP8dGvSsmMf59xRXHSBJDBtShYeuAjGI2vOye5RUzqepZY9y5/exec'; // WARNING: You must use a Google Apps Script Web App URL here! Directly linking the Spreadsheet will cause a CORS error in the browser.
      
      const formData = new FormData();
      formData.append('Name', name);
      formData.append('Phone', phone);
      formData.append('Address', address);
      formData.append('Date', date);
      formData.append('Time', time);
      formData.append('Treatment', treatment);
      formData.append('Category', category);

      // Wrapper function to open WhatsApp after Google Sheet request completes
      const openWhatsApp = () => {
        // Formatting WhatsApp Message
        const whatsappMsg = `Hello Dr. Pashmin's Wellness Clinic,%0a%0aI would like to book a treatment.%0a%0a*Booking Details:*%0aCategory: ${category}%0aTreatment: ${treatment}%0a%0a*Patient Details:*%0aName: ${name}%0aPhone: ${phone}%0aAddress: ${address}%0aDate: ${date}%0aTime: ${time}`;
        
        const targetNumber = "918347345777";
        
        // Responsive WhatsApp link based on device
        const isMobileLocal = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
        const targetUrl = isMobileLocal 
            ? `https://wa.me/${targetNumber}?text=${whatsappMsg}` 
            : `https://web.whatsapp.com/send?phone=${targetNumber}&text=${whatsappMsg}`;
        
        // Open WhatsApp
        window.open(targetUrl, '_blank');
        
        // Close Modal and Reset Form
        const modalInstance = bootstrap.Modal.getInstance(bookingModal);
        if(modalInstance) {
            modalInstance.hide();
        }
        bookingForm.reset();
        bookingForm.classList.remove('was-validated');
      };

      // 1. Try sending to Google Sheets first
      fetch(scriptURL, { method: 'POST', body: formData, mode: 'no-cors' })
        .then(response => {
          console.log('Google Sheets request executed.');
          // 2. Open WhatsApp after request is done
          openWhatsApp();
        })
        .catch(error => {
          console.error('Error submitting to Google Sheets!', error.message);
          // Always fallback to opening WhatsApp so the user is not disrupted
          openWhatsApp();
        });
    });
  }
});
