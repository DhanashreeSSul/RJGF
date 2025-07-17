
  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  const header = document.querySelector('header');
  let lastScrollY = window.scrollY;

  // Toggle mobile menu
  mobileMenuToggle?.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Close all dropdowns when closing mobile menu
    if (!navLinks.classList.contains('active')) {
      document.querySelectorAll('.dropdown-content').forEach(dropdown => {
        dropdown.style.display = 'none';
      });
      document.querySelectorAll('.dropdown').forEach(dropdown => {
        dropdown.classList.remove('active');
      });
    }
  });

  // Handle dropdown toggles on mobile
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      if (window.innerWidth <= 992) {
        e.preventDefault();
        const dropdown = this.parentElement;
        const dropdownContent = this.nextElementSibling;
        
        // Close other dropdowns
        document.querySelectorAll('.dropdown').forEach(item => {
          if (item !== dropdown) {
            item.classList.remove('active');
            item.querySelector('.dropdown-content').style.display = 'none';
          }
        });
        
        // Toggle current dropdown
        dropdown.classList.toggle('active');
        dropdownContent.style.display = dropdown.classList.contains('active') ? 'block' : 'none';
      }
    });
  });

  // Handle dropdowns on desktop
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

  // Close mobile menu when clicking a link
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

  // Set active links based on current page
  function setActiveLinks() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
      const linkPath = link.getAttribute('href').split('/').pop();
      if (currentPath === linkPath) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
  setActiveLinks();

  // Handle window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth > 992) {
      // Reset mobile menu when resizing to desktop
      mobileMenuToggle.classList.remove('active');
      navLinks.classList.remove('active');
      
      // Reset dropdowns
      document.querySelectorAll('.dropdown-content').forEach(dropdown => {
        dropdown.style.display = 'none';
      });
    }
  });
