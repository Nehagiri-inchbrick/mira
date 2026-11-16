/* ==========================================================================
   MIRA VERDE - LANDING PAGE INTERACTION CONTROLLER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
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

  // Scroll to Top Enquiry Form CTA Buttons
  const scrollToFormButtons = document.querySelectorAll('.js-scroll-to-enquiry');
  scrollToFormButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('topEnquiryCard');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Add subtle gold pulse highlight effect
        target.style.transition = 'box-shadow 0.4s ease, transform 0.4s ease';
        target.style.boxShadow = '0 0 0 3px #dfc488, 0 24px 60px rgba(20, 40, 30, 0.35)';
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

  // Tour / Video Capsule Click Trigger
  const tourPlayBtn = document.getElementById('tourPlayBtn');
  if (tourPlayBtn) {
    tourPlayBtn.addEventListener('click', () => {
      alert('Opening Mira Verde Tbilisi Hills Virtual Presentation & Master Plan Tour.');
    });
  }
});
