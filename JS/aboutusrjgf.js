document.addEventListener('DOMContentLoaded', () => {
  
  /* -------------------------------
     Hero Slider
  ------------------------------- */
  function initHeroSlider() {
    const slides = document.querySelectorAll('.slide');
    const controls = document.querySelectorAll('.control');
    const heroSection = document.querySelector('.hero-section');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
      slides.forEach(s => s.classList.remove('active'));
      controls.forEach(c => c.classList.remove('active'));

      slides[index].classList.add('active');
      controls[index].classList.add('active');

      const slideContent = slides[index].querySelector('.slide-content');
      if (slideContent) {
        slideContent.style.animation = 'none';
        setTimeout(() => {
          slideContent.style.animation = 'fadeInUp 1s ease';
        }, 10);
      }
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }

    function startSlider() {
      slideInterval = setInterval(nextSlide, 4000);
    }

    if (slides.length > 0) {
      startSlider();

      heroSection.addEventListener('mouseenter', () => clearInterval(slideInterval));
      heroSection.addEventListener('mouseleave', startSlider);

      controls.forEach((control, index) => {
        control.addEventListener('click', () => {
          currentSlide = index;
          showSlide(currentSlide);
          clearInterval(slideInterval);
          slideInterval = setInterval(nextSlide, 4000);
        });
      });
    }
  }

  initHeroSlider();

  /* -------------------------------
     Achievement Counters
  ------------------------------- */
  function initAchievementCounters() {
    const achievementSection = document.querySelector('.achievements-section');
    let achievementsAnimated = false;

    function animateValue(el, start, end, duration) {
      let startTimestamp = null;
      const step = timestamp => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        el.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }

    function checkAchievementsInView() {
      if (!achievementSection) return;
      const rect = achievementSection.getBoundingClientRect();
      const inView = rect.top <= window.innerHeight * 0.75 && rect.bottom >= window.innerHeight * 0.25;

      if (inView && !achievementsAnimated) {
        document.querySelectorAll('.achievement-number').forEach(num => {
          animateValue(num, 0, parseInt(num.getAttribute('data-count')), 2000);
        });
        achievementsAnimated = true;
      }
    }

    if (achievementSection) {
      window.addEventListener('scroll', checkAchievementsInView);
      window.addEventListener('load', checkAchievementsInView);
    }
  }

  initAchievementCounters();

  /* -------------------------------
     Testimonials Scroll
  ------------------------------- */

  function initTestimonialScroll() {
    const container = document.querySelector('.testimonials-scroll');
    if (!container) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener('mousedown', e => {
      isDown = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
      container.style.cursor = 'grabbing';
    });

    container.addEventListener('mouseleave', () => {
      isDown = false;
      container.style.cursor = 'grab';
    });

    container.addEventListener('mouseup', () => {
      isDown = false;
      container.style.cursor = 'grab';
    });

    container.addEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2;
      container.scrollLeft = scrollLeft - walk;
    });

    container.addEventListener('touchstart', e => {
      isDown = true;
      startX = e.touches[0].pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });

    container.addEventListener('touchend', () => {
      isDown = false;
    });

    container.addEventListener('touchmove', e => {
  if (!isDown) return;
  
  const x = e.touches[0].pageX - container.offsetLeft;
  const walk = (x - startX) * 2;
  container.scrollLeft = scrollLeft - walk;

  // Only prevent default if it's horizontal scrolling
  if (Math.abs(walk) > 10) e.preventDefault();
}, { passive: false });

  }

  initTestimonialScroll();

  /* -------------------------------
     Animate on Scroll
  ------------------------------- */
  function initScrollAnimations() {
    const elements = document.querySelectorAll(
      '.vmv-card, .ov-card, .value-item, .achievement-item, .testimonial-card'
    );

    function checkInView() {
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isInView = rect.top <= window.innerHeight * 0.75 &&
                         rect.bottom >= window.innerHeight * 0.25;
        el.classList.toggle('animate', isInView);
      });
    }

    if (elements.length > 0) {
      window.addEventListener('scroll', checkInView);
      window.addEventListener('load', checkInView);
    }
  }

  initScrollAnimations();

  /* -------------------------------
     Partner Logo Animation
  ------------------------------- */
  function initPartnerLogoAnimation() {
    const logos = document.querySelectorAll('.partner-logo');
    if (!logos.length) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        entry.target.classList.toggle('float', entry.isIntersecting);
      });
    }, { threshold: 0.2 });

    logos.forEach(logo => observer.observe(logo));
  }

  initPartnerLogoAnimation();
});
