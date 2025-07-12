    // Header scroll effect
    let lastScrollY = window.scrollY;
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
      // Shadow effect
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      // Hide on scroll down, show on scroll up
      if (window.scrollY > lastScrollY && window.scrollY > 80) {
        header.classList.add('hide-header');
      } else {
        header.classList.remove('hide-header');
      }
      lastScrollY = window.scrollY;
    });

    // Team card hover effect
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
      });
    });
 