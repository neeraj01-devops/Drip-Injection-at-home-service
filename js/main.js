/**
 * Drip & Injection at Home Service - Gurugram
 * Comprehensive Frontend Interactive Logic
 * - Mobile Navigation Drawer & Expandable Submenu
 * - Accessible Desktop Dropdown with Click & Keyboard Support
 * - Gallery Lightbox & Filtering System
 * - Contact Form Pre-Triage WhatsApp Dispatch
 * - Accordion FAQ Interaction
 * - Sticky Header State
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Mobile Navigation Drawer ---
  const mobileToggle = document.getElementById('mobileNavToggle');
  const mobileClose = document.getElementById('mobileNavClose');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileOverlay = document.getElementById('mobileOverlay');

  function openDrawer() {
    if (mobileDrawer && mobileOverlay) {
      mobileDrawer.classList.add('active');
      mobileOverlay.classList.add('active');
      mobileToggle?.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (mobileDrawer && mobileOverlay) {
      mobileDrawer.classList.remove('active');
      mobileOverlay.classList.remove('active');
      mobileToggle?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (mobileClose) mobileClose.addEventListener('click', closeDrawer);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeDrawer);

  // --- 2. Mobile Submenu Toggle (Our Services) ---
  const mobileSubmenuToggle = document.getElementById('mobileServicesToggle') || document.getElementById('mobileSubmenuToggle');
  const mobileSubmenu = document.getElementById('mobileServicesMenu') || document.getElementById('mobileServicesList');

  if (mobileSubmenuToggle && mobileSubmenu) {
    mobileSubmenuToggle.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = mobileSubmenu.classList.toggle('open');
      mobileSubmenuToggle.setAttribute('aria-expanded', String(isOpen));
      const icon = mobileSubmenuToggle.querySelector('.dropdown-icon');
      if (icon) {
        icon.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
      }
    });
  }

  // --- 3. Desktop Services Dropdown (Click, Outside Click & Keyboard Escape) ---
  const servicesDropdownTrigger = document.getElementById('servicesDropdownTrigger');
  const navItemDropdown = servicesDropdownTrigger?.closest('.nav-item-dropdown');

  if (servicesDropdownTrigger && navItemDropdown) {
    servicesDropdownTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      const isCurrentlyOpen = navItemDropdown.classList.contains('is-open');
      navItemDropdown.classList.toggle('is-open', !isCurrentlyOpen);
      servicesDropdownTrigger.setAttribute('aria-expanded', String(!isCurrentlyOpen));
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!navItemDropdown.contains(e.target)) {
        navItemDropdown.classList.remove('is-open');
        servicesDropdownTrigger.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (navItemDropdown.classList.contains('is-open')) {
          navItemDropdown.classList.remove('is-open');
          servicesDropdownTrigger.setAttribute('aria-expanded', 'false');
          servicesDropdownTrigger.focus();
        }
        if (mobileDrawer && mobileDrawer.classList.contains('active')) {
          closeDrawer();
        }
      }
    });
  }

  // --- 4. Accordion FAQ Logic ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach((sibling) => {
          if (sibling !== item) sibling.classList.remove('active');
        });
        item.classList.toggle('active', !isActive);
        questionBtn.setAttribute('aria-expanded', String(!isActive));
      });
    }
  });

  // --- 5. Sticky Header Scroll Shadow Enhancement ---
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // --- 6. Gallery Lightbox & Filtering Logic ---
  const galleryCards = document.querySelectorAll('.gallery-card');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCategory = document.getElementById('lightboxCategory');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');

  function openLightbox(imgSrc, title, category, desc, alt) {
    if (lightboxModal && lightboxImg) {
      lightboxImg.src = imgSrc;
      lightboxImg.alt = alt || title;
      if (lightboxTitle) lightboxTitle.textContent = title;
      if (lightboxCategory) lightboxCategory.textContent = category;
      if (lightboxDesc) lightboxDesc.textContent = desc;
      lightboxModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
      if (lightboxImg) lightboxImg.src = '';
    }
  }

  galleryCards.forEach((card) => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      const title = card.getAttribute('data-title') || card.querySelector('.gallery-card-title')?.textContent || '';
      const category = card.getAttribute('data-category') || card.querySelector('.gallery-card-category')?.textContent || '';
      const desc = card.getAttribute('data-desc') || card.querySelector('.gallery-card-desc')?.textContent || '';
      const src = img?.getAttribute('src') || '';
      const alt = img?.getAttribute('alt') || '';
      openLightbox(src, title, category, desc, alt);
    });

    // Keyboard support (Enter/Space on focused card)
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal && lightboxModal.classList.contains('active')) {
      closeLightbox();
    }
  });

  // Gallery Filter Tabs
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      galleryCards.forEach((card) => {
        const itemCat = card.getAttribute('data-category-tag') || 'all';
        if (filter === 'all' || itemCat === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- 7. Contact Form Pre-Triage WhatsApp Dispatch ---
  const contactForm = document.getElementById('clinicalEnquiryForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('patientName')?.value.trim() || 'Patient';
      const phone = document.getElementById('patientPhone')?.value.trim() || '';
      const service = document.getElementById('requestedService')?.value || 'General Homecare';
      const prescription = document.getElementById('prescriptionStatus')?.value || 'Yes';
      const sector = document.getElementById('patientLocation')?.value.trim() || 'Gurugram';
      const notes = document.getElementById('enquiryNotes')?.value.trim() || 'None';

      const msg = `Hello, I would like to enquire about ${service} in Gurugram.\nName: ${name}\nPhone: ${phone}\nLocation: ${sector}\nDoctor Prescription Available: ${prescription}\nClinical Details: ${notes}`;
      const encodedMsg = encodeURIComponent(msg);
      window.open(`https://wa.me/918826575516?text=${encodedMsg}`, '_blank', 'noopener,noreferrer');
    });
  }
});
