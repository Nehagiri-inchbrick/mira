/* ==========================================================================
   MIRA VERDE - LANDING PAGE INTERACTION CONTROLLER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const mainNav = document.getElementById('mainNav');

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close menu when clicking nav links
    const navLinks = mainNav.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  // Enquiry Form Handling & Submission
  const enquiryForm = document.getElementById('topEnquiryForm');
  const successModal = document.getElementById('successModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalClientName = document.getElementById('modalClientName');

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const fullName = document.getElementById('fullName').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const residenceType = document.getElementById('residenceType') ? document.getElementById('residenceType').value : '';
      const notesEl = document.getElementById('notes');
      const notes = notesEl ? notesEl.value.trim() : '';

      if (!fullName || !email || !phone) {
        alert('Please fill in all required fields.');
        return;
      }

      // Display personal confirmation in modal
      if (modalClientName) {
        modalClientName.textContent = fullName;
      }

      if (successModal) {
        successModal.classList.add('active');
      }

      // Reset form
      enquiryForm.reset();
    });
  }

  // Close Modal
  if (closeModalBtn && successModal) {
    closeModalBtn.addEventListener('click', () => {
      successModal.classList.remove('active');
    });

    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        successModal.classList.remove('active');
      }
    });
  }

  // Newsletter Form
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('.newsletter-input');
      if (emailInput && emailInput.value.trim()) {
        alert('Thank you for subscribing to Mira Developments private market updates.');
        emailInput.value = '';
      }
    });
  }

  // Scroll to Top Enquiry Form CTA Buttons
  const scrollToFormButtons = document.querySelectorAll('.js-scroll-to-enquiry');
  scrollToFormButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('topEnquiryCard');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Add subtle pulse highlight effect
        target.style.transition = 'box-shadow 0.4s ease, transform 0.4s ease';
        target.style.boxShadow = '0 0 0 4px #9b7424, 0 20px 50px rgba(155, 116, 36, 0.4)';
        target.style.transform = 'scale(1.02)';
        setTimeout(() => {
          target.style.boxShadow = '';
          target.style.transform = '';
        }, 1200);

        const firstInput = document.getElementById('fullName');
        if (firstInput) firstInput.focus();
      }
    });
  });

  // Tour / Video Play Button
  const tourPlayBtn = document.getElementById('tourPlayBtn');
  if (tourPlayBtn) {
    tourPlayBtn.addEventListener('click', () => {
      alert('Opening Mira Verde Hillside Virtual Tour & Master Plan Animation.');
    });
  }

  // Header elevation on scroll (if present)
  const siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        siteHeader.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
      } else {
        siteHeader.style.boxShadow = 'none';
      }
    });
  }
});
