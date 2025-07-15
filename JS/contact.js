 const currentLocation = window.location.pathname;
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach(link => {
    const linkPath = link.getAttribute("href");
    if (currentLocation.includes(linkPath)) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
      mobileToggle.innerHTML = mainNav.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
  }

  // Header scroll effect
  let lastScrollY = window.scrollY;
  const header = document.querySelector('header');

  window.addEventListener('scroll', () => {
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

  // FAQ accordion functionality
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      const icon = question.querySelector('i');
      
      question.classList.toggle('active');
      answer.classList.toggle('active');

      faqQuestions.forEach(otherQuestion => {
        if (otherQuestion !== question) {
          otherQuestion.classList.remove('active');
          otherQuestion.nextElementSibling.classList.remove('active');
        }
      });
    });
  });

  // Form submission handler
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const submitBtn = this.querySelector('button[type="submit"]');
      const btnText = submitBtn.querySelector('.btn-text');
      const originalText = btnText.textContent;
      
      submitBtn.disabled = true;
      btnText.textContent = 'Sending...';
      
      setTimeout(() => {
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.innerHTML = `
          <i class="fas fa-check-circle"></i>
          <h3>Thank You!</h3>
          <p>Your message has been successfully sent. We'll get back to you within 24 hours.</p>
        `;
        this.parentNode.insertBefore(successMessage, this.nextSibling);
        this.style.display = 'none';
        
        setTimeout(() => {
          this.reset();
          btnText.textContent = originalText;
          submitBtn.disabled = false;
          successMessage.remove();
          this.style.display = 'block';
        }, 5000);
      }, 1500);
    });
  }

  document.getElementById('current-year').textContent = new Date().getFullYear();
});

