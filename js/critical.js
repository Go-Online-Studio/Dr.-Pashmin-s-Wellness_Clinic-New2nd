/* ========================================
   CRITICAL.JS - Header Injection
   ======================================== */
document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // 1. Inject Topbar & Navbar
  const headerEl = document.getElementById("mainNavbar");
  if (headerEl) {
    headerEl.innerHTML = `
    <nav class="navbar navbar-expand-lg sticky-top">
        <div class="container">
          <a class="navbar-brand" href="index.html">
            <img src="images/DrPashmin_s_WellnessClinicLogo.webp" alt="Dr. Pashmin's Wellness Clinic">
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul class="navbar-nav align-items-center">
              <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
              
               <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Treatments
                </a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="skin-laser.html">Skin & Laser</a></li>
                  <li><a class="dropdown-item" href="hair-restoration.html">Hair Restoration</a></li>
                  <li><a class="dropdown-item" href="weight-management.html">Weight Management</a></li>
                  <li><a class="dropdown-item" href="ayurvedic-therapies.html">Ayurveda</a></li>
                </ul>
              </li>

              <li class="nav-item"><a class="nav-link" href="about.html">About Us</a></li>
              <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
              <li class="nav-item ms-lg-3">
                <a href="contact.html" class="btn btn-primary btn-sm px-4 py-2">Book Appointment</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    `;

    // 2. Automatically set the "active" class based on current page URL
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = headerEl.querySelectorAll(".navbar-nav .nav-link");
    
    navLinks.forEach((link) => {
      const linkHref = link.getAttribute("href");
      if (linkHref && linkHref.split("?")[0] === currentPage) {
        link.classList.add("active");
      }
    });

    // ===== NAVBAR SCROLL BEHAVIOR =====
  const navbar = document.getElementById("mainNavbar");
  const onScrollState = () => {
    if (!navbar) return;
    navbar.classList.toggle("scrolled", window.scrollY > 118);
  };
  window.addEventListener("scroll", onScrollState, { passive: true });
  onScrollState();
  }
});