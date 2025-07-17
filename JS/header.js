/* -------------------------------
     Header Behavior
  ------------------------------- */
  const header = document.querySelector('header');
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  let lastScrollY = window.scrollY;

  function handleHeaderScroll() {
    header.classList.toggle('scrolled', window.scrollY > 10);

    header.classList.toggle(
      'hide-header',
      window.scrollY > lastScrollY && window.scrollY > 80
    );

    lastScrollY = window.scrollY;
  }

  window.addEventListener('scroll', handleHeaderScroll);

  /* -------------------------------
     Mobile Menu
  ------------------------------- */
  function toggleMobileMenu() {
    mobileMenuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');

    if (!navLinks.classList.contains('active')) {
      document.querySelectorAll('.dropdown-content').forEach(dropdown => {
        dropdown.style.display = 'none';
      });
    }
  }

  mobileMenuToggle.addEventListener('click', toggleMobileMenu);

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 992) {
        mobileMenuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  });

  /* -------------------------------
     Active Link Highlight
  ------------------------------- */
  function setActiveLinks() {
    const currentLocation = window.location.pathname;
    document.querySelectorAll("nav a").forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle(
        'active',
        currentLocation.includes(href) && href !== '#'
      );
    });
  }

  setActiveLinks();

  /* -------------------------------
     Dropdowns
  ------------------------------- */
  function initDropdowns() {
    // Close dropdowns if click outside
    document.addEventListener('click', e => {
      if (!e.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown-content').forEach(dropdown => {
          dropdown.style.display = 'none';
        });
      }
    });

    // Mobile dropdown toggles
    document.querySelectorAll('.dropdown > a').forEach(toggle => {
      toggle.addEventListener('click', e => {
        if (window.innerWidth <= 992) {
          e.preventDefault();
          const dropdownContent = toggle.nextElementSibling;
          const isOpen = dropdownContent.style.display === 'block';

          document.querySelectorAll('.dropdown-content').forEach(d => {
            d.style.display = 'none';
          });

          if (!isOpen) {
            dropdownContent.style.display = 'block';
          }
        }
      });
    });

    // Desktop hover dropdowns
    if (window.innerWidth > 992) {
      document.querySelectorAll('.dropdown').forEach(dropdown => {
        dropdown.addEventListener('mouseenter', () => {
          dropdown.querySelector('.dropdown-content').style.display = 'block';
        });
        dropdown.addEventListener('mouseleave', () => {
          dropdown.querySelector('.dropdown-content').style.display = 'none';
        });
      });
    }
  }

  initDropdowns();
