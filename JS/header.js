  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  const header = document.querySelector('header');
  let lastScrollY = window.scrollY;

  // Mobile menu toggle
  mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Dropdown toggle for mobile
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      if (window.innerWidth <= 992) {
        e.preventDefault();
        const parent = toggle.closest('.dropdown');
        const content = parent.querySelector('.dropdown-content');
        const isActive = parent.classList.contains('active');

        // Close all dropdowns
        document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
        document.querySelectorAll('.dropdown-content').forEach(c => c.style.display = 'none');

        if (!isActive) {
          parent.classList.add('active');
          content.style.display = 'block';

          // Delay removal to allow selection
          content.addEventListener('mouseleave', () => {
            setTimeout(() => {
              parent.classList.remove('active');
              content.style.display = 'none';
            }, 300); // Adjust timing here if needed
          });
        }
      }
    });
  });

  // Close menu on link click (mobile)
  document.querySelectorAll('.nav-links a:not(.dropdown-toggle)').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 992) {
        mobileMenuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  });

  // Header scroll behavior
  window.addEventListener('scroll', () => {
    if (!header) return;

    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (window.scrollY > lastScrollY && window.scrollY > 80) {
      header.classList.add('hide-header');
    } else {
      header.classList.remove('hide-header');
    }

    lastScrollY = window.scrollY;
  });

  // Set active link
  function setActiveLinks() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
      const linkPath = link.getAttribute('href').split('/').pop();
      link.classList.toggle('active', currentPath === linkPath);
    });
  }
  setActiveLinks();

  // Window resize behavior
  window.addEventListener('resize', () => {
    if (window.innerWidth > 992) {
      mobileMenuToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.querySelectorAll('.dropdown-content').forEach(d => d.style.display = 'none');
      document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
    }
  });

