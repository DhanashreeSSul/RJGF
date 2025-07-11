document.addEventListener('DOMContentLoaded', function() {
  // Hero Slider
  const slides = document.querySelectorAll('.slide');
  const controls = document.querySelectorAll('.control');
  let currentSlide = 0;
  
  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    controls.forEach(control => control.classList.remove('active'));
    
    slides[index].classList.add('active');
    controls[index].classList.add('active');
    
    // Add animation to slide content
    const slideContent = slides[index].querySelector('.slide-content');
    slideContent.style.animation = 'none';
    setTimeout(() => {
      slideContent.style.animation = 'fadeInUp 1s ease';
    }, 10);
  }
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }
  
  // Auto slide change every 4 seconds
  let slideInterval = setInterval(nextSlide, 4000);
  
  // Pause on hover
  const heroSection = document.querySelector('.hero-section');
  heroSection.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
  });
  
  heroSection.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 4000);
  });
  
  // Manual control
  controls.forEach((control, index) => {
    control.addEventListener('click', () => {
      currentSlide = index;
      showSlide(currentSlide);
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 4000);
    });
  });
  
  // Animate numbers in achievements section
  function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.innerHTML = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
  
  // Scroll trigger for achievements
  const achievementSection = document.querySelector('.achievements-section');
  const achievementNumbers = document.querySelectorAll('.achievement-number');
  let achievementsAnimated = false;
  
  function checkAchievementsInView() {
    const rect = achievementSection.getBoundingClientRect();
    const isInView = (rect.top <= window.innerHeight * 0.75) && (rect.bottom >= window.innerHeight * 0.25);
    
    if (isInView && !achievementsAnimated) {
      achievementNumbers.forEach(number => {
        const target = parseInt(number.getAttribute('data-count'));
        animateValue(number.id, 0, target, 2000);
      });
      achievementsAnimated = true;
    }
  }
  
  // Initialize
  achievementNumbers.forEach((number, index) => {
    number.id = 'achievement-' + index;
  });
  
  // Scroll events
  window.addEventListener('scroll', checkAchievementsInView);
  window.addEventListener('load', checkAchievementsInView);
  
  // Testimonial horizontal scroll
const testimonialsScroll = document.querySelector('.testimonials-scroll');
let isDown = false;
let startX;
let scrollLeft;

testimonialsScroll.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX - testimonialsScroll.offsetLeft;
  scrollLeft = testimonialsScroll.scrollLeft;
  testimonialsScroll.style.cursor = 'grabbing';
});

testimonialsScroll.addEventListener('mouseleave', () => {
  isDown = false;
  testimonialsScroll.style.cursor = 'grab';
});

testimonialsScroll.addEventListener('mouseup', () => {
  isDown = false;
  testimonialsScroll.style.cursor = 'grab';
});

testimonialsScroll.addEventListener('mousemove', (e) => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - testimonialsScroll.offsetLeft;
  const walk = (x - startX) * 2;
  testimonialsScroll.scrollLeft = scrollLeft - walk;
});

// Touch support for mobile
testimonialsScroll.addEventListener('touchstart', (e) => {
  isDown = true;
  startX = e.touches[0].pageX - testimonialsScroll.offsetLeft;
  scrollLeft = testimonialsScroll.scrollLeft;
});

testimonialsScroll.addEventListener('touchend', () => {
  isDown = false;
});

testimonialsScroll.addEventListener('touchmove', (e) => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.touches[0].pageX - testimonialsScroll.offsetLeft;
  const walk = (x - startX) * 2;
  testimonialsScroll.scrollLeft = scrollLeft - walk;
});
    // Header scroll effect
  const header = document.querySelector('header');
  let lastScrollY = window.scrollY;
  
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
  
  // Initialize animations
  const animateOnScrollElements = document.querySelectorAll('.vmv-card, .ov-card, .value-item, .achievement-item, .testimonial-card');
  
  function checkElementsInView() {
    animateOnScrollElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const isInView = (rect.top <= window.innerHeight * 0.75) && (rect.bottom >= window.innerHeight * 0.25);
      
      if (isInView) {
        element.classList.add('animate');
      }
    });
  }
  
  window.addEventListener('scroll', checkElementsInView);
  window.addEventListener('load', checkElementsInView);
});