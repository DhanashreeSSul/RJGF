document.addEventListener('DOMContentLoaded', function() {
  

  // FAQ accordion functionality
  const faqQuestions = document.querySelectorAll('.faq-question');
  if (faqQuestions.length > 0) {
    faqQuestions.forEach(question => {
      question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        question.classList.toggle('active');
        answer.classList.toggle('active');
      });
    });
  }

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
          <p>Your message has been successfully sent.</p>
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

  // Update copyright year
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});