/* ========================================
   SCRIPT.JS - Footer & Interactivity
   ======================================== */
document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // ===== CONFIGURATION =====
  const CONFIG = {
    whatsappNumber: "918347345777", // Clinic WhatsApp
    callNumber: "+918347345777",    // Clinic Phone
    animationDuration: 800,
  };
  window.CLINIC_CONFIG = CONFIG;

  // ===== INJECT FOOTER =====
  const footerEl = document.getElementById("footer");
  if (footerEl) {
    // Ensure the container has the .footer class for styling
    footerEl.classList.add("footer");
    footerEl.innerHTML = `
      <div class="container">
        <div class="row gy-4">
          <div class="col-lg-4 col-md-6">
            <a class="footer-brand" href="index.html">
              <img loading="lazy" src="images/DrPashmin_s_WellnessClinicLogo.webp" alt="DrPashmin_s_WellnessClinicLogo">
            </a>
            <p class="text-muted pe-md-4">A holistic wellness and aesthetic center dedicated to delivering medically supervised, result-oriented treatments.</p>
            <div class="d-flex gap-3 mt-4 socialLinks">
              <a target="_blank" href="https://www.facebook.com/p/Dr-Pashmins-Wellness-Clinic-100086181289817/" class="fs-5"><iconify-icon icon="mdi:facebook"></iconify-icon></a>
              <a target="_blank" href="https://www.instagram.com/dr_pashmin/" class="fs-5"><iconify-icon icon="mdi:instagram"></iconify-icon></a>
              <a target="_blank" href="https://in.linkedin.com/in/dr-pashmin-ansari-20a68a92" class="fs-5"><iconify-icon icon="ri:linkedin-fill"></iconify-icon></a>
            </div>
          </div>
          <div class="col-lg-2 col-md-6 footer-col">
            <h5>Quick Links</h5>
            <ul class="footer-links">
              <li><a href="index.html">Home</a></li>
              <li><a href="about.html">About Clinic</a></li>
              <li><a href="skin-laser.html">Skin & Laser</a></li>
              <li><a href="contact.html">Contact Us</a></li>
            </ul>
          </div>
          <div class="col-lg-3 col-md-6 footer-col">
            <h5>Our Treatments</h5>
            <ul class="footer-links">
              <li><a href="weight-management.html">Weight Management</a></li>
              <li><a href="skin-laser.html">Skin & Laser</a></li>
              <li><a href="hair-restoration.html">Hair Restoration</a></li>
              <li><a href="ayurvedic-therapies.html">Ayurvedic Therapies</a></li>
              <li><a href="iv-drip-therapies.html">IV Drip Therapies</a></li>
            </ul>
          </div>
          <div class="col-lg-3 col-md-6 footer-col">
            <h5>Contact Info</h5>
            <ul class="footer-links contInfo">
              <li class="d-flex align-items-start gap-2 text-muted">
                <a class="locationLink d-flex align-items-start gap-2" target="_blank" href="https://maps.app.goo.gl/ZkmAzXqSYsJa7pDb8">
                  <iconify-icon icon="mdi:map-marker" class="text-primary mt-1 flex-shrink-0"></iconify-icon>
                  Earth Artica, 22/ GF, Vasna Bhayli Link Rd, Ashwamegh Nagar, Tandalja, Vadodara, Gujarat 390007
                </a>
              </li>
              <li class="d-flex align-items-center  gap-2 text-muted mt-3">
                <a href="tel:+918347345777" class="d-flex align-items-center gap-2 justify-content-center justify-content-md-start">
                  <iconify-icon icon="mdi:phone" class="text-primary"></iconify-icon> +91 83473 45777
                </a> 
              </li>
              <li class="d-flex align-items-center gap-2 text-muted mt-2">
                <a href="mailto:dr.pashminwellnessclinic@gmail.com" class="d-flex align-items-center justify-content-center justify-content-md-start gap-2">
                  <iconify-icon icon="mdi:gmail" class="text-primary"></iconify-icon> dr.pashminwellnessclinic@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom text-center text-muted mt-5">
          &copy; <span id="year"></span> Dr. Pashmin's Wellness Clinic. All Rights Reserved. Designed & Developed by <a href="https://shriiitrackingsolution.in/" target="_blank"><abbr title="Shriii Tracking Solution">STS</abbr></a>
        </div> 
      </div>
    `;
  }

  // WhatsApp URL Adjuster (Device-based Detection)
  (function () {
    const mobileLink = `https://api.whatsapp.com/send?phone=${CONFIG.whatsappNumber}`;
    const desktopLink = `https://web.whatsapp.com/send?phone=${CONFIG.whatsappNumber}`;

    function isMobileDevice() {
      return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    function updateWhatsAppLink() {
      const isMobile = isMobileDevice();
      const targetLink = isMobile ? mobileLink : desktopLink;

      document.querySelectorAll(".set-url-target").forEach(el => {
        el.setAttribute("href", targetLink);
      });
    }

    window.addEventListener("resize", updateWhatsAppLink);
    window.addEventListener("load", updateWhatsAppLink);
  })();

  // ===== DYNAMIC YEAR =====
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ===== INJECT FAB BUTTONS (WhatsApp & Call) =====
  const injectFABs = () => {
    if (document.getElementById("dynamic-fabs")) return;

    const fabContainer = document.createElement("div");
    fabContainer.id = "dynamic-fabs";

    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const whatsappUrl = isMobile
      ? `https://api.whatsapp.com/send?phone=${CONFIG.whatsappNumber}`
      : `https://web.whatsapp.com/send?phone=${CONFIG.whatsappNumber}`;

    fabContainer.innerHTML = `
      <a href="tel:${CONFIG.callNumber}" class="fab-btn fab-call" rel="noopener" aria-label="Call us">
        <iconify-icon icon="mdi:phone"></iconify-icon>
      </a>
      <a href="${whatsappUrl}" class="fab-btn fab-whatsapp" rel="noopener" target="_blank" aria-label="Chat on WhatsApp">
        <svg xmlns="http://www.w3.org/2000/svg" width="29.77" height="30" viewBox="0 0 256 258"><defs><linearGradient id="SVGBRLHCcSy" x1="50%" x2="50%" y1="100%" y2="0%"><stop offset="0%" stop-color="#925575"/><stop offset="100%" stop-color="#E69472"/></linearGradient><linearGradient id="SVGHW6lecxh" x1="50%" x2="50%" y1="100%" y2="0%"><stop offset="0%" stop-color="#f9f9f9"/><stop offset="100%" stop-color="#fff"/></linearGradient></defs><path fill="url(#SVGBRLHCcSy)" d="M5.463 127.456c-.006 21.677 5.658 42.843 16.428 61.499L4.433 252.697l65.232-17.104a123 123 0 0 0 58.8 14.97h.054c67.815 0 123.018-55.183 123.047-123.01c.013-32.867-12.775-63.773-36.009-87.025c-23.23-23.25-54.125-36.061-87.043-36.076c-67.823 0-123.022 55.18-123.05 123.004"/><path fill="url(#SVGHW6lecxh)" d="M1.07 127.416c-.007 22.457 5.86 44.38 17.014 63.704L0 257.147l67.571-17.717c18.618 10.151 39.58 15.503 60.91 15.511h.055c70.248 0 127.434-57.168 127.464-127.423c.012-34.048-13.236-66.065-37.3-90.15C194.633 13.286 162.633.014 128.536 0C58.276 0 1.099 57.16 1.071 127.416m40.24 60.376l-2.523-4.005c-10.606-16.864-16.204-36.352-16.196-56.363C22.614 69.029 70.138 21.52 128.576 21.52c28.3.012 54.896 11.044 74.9 31.06c20.003 20.018 31.01 46.628 31.003 74.93c-.026 58.395-47.551 105.91-105.943 105.91h-.042c-19.013-.01-37.66-5.116-53.922-14.765l-3.87-2.295l-40.098 10.513z"/><path fill="#fff" d="M96.678 74.148c-2.386-5.303-4.897-5.41-7.166-5.503c-1.858-.08-3.982-.074-6.104-.074c-2.124 0-5.575.799-8.492 3.984c-2.92 3.188-11.148 10.892-11.148 26.561s11.413 30.813 13.004 32.94c1.593 2.123 22.033 35.307 54.405 48.073c26.904 10.609 32.379 8.499 38.218 7.967c5.84-.53 18.844-7.702 21.497-15.139c2.655-7.436 2.655-13.81 1.859-15.142c-.796-1.327-2.92-2.124-6.105-3.716s-18.844-9.298-21.763-10.361c-2.92-1.062-5.043-1.592-7.167 1.597c-2.124 3.184-8.223 10.356-10.082 12.48c-1.857 2.129-3.716 2.394-6.9.801c-3.187-1.598-13.444-4.957-25.613-15.806c-9.468-8.442-15.86-18.867-17.718-22.056c-1.858-3.184-.199-4.91 1.398-6.497c1.431-1.427 3.186-3.719 4.78-5.578c1.588-1.86 2.118-3.187 3.18-5.311c1.063-2.126.531-3.986-.264-5.579c-.798-1.593-6.987-17.343-9.819-23.64"/></svg>
      </a>
    `;
    document.body.appendChild(fabContainer);
  };
  injectFABs();

  // ===== BACK TO TOP BUTTON =====
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 500) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }
    }, { passive: true });

    backToTop.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ===== INITIALIZE AOS =====
  if (typeof AOS !== "undefined") {
    window.addEventListener('load', function () {
      setTimeout(function () {
        AOS.init({
          once: true,
          duration: CONFIG.animationDuration,
          offset: 50,
          easing: "ease-out-cubic",
        });
      }, 200);
    });
  }
});
