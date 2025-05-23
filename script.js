
document.addEventListener('DOMContentLoaded', function() {
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      if (this.getAttribute('href') !== '#') {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Form validation
  const contactForms = document.querySelectorAll('.contact-form');
  
  contactForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form fields
      const nameField = this.querySelector('[name="name"]');
      const emailField = this.querySelector('[name="email"]');
      const messageField = this.querySelector('[name="message"]');
      
      // Simple validation
      let isValid = true;
      
      if (nameField && nameField.value.trim() === '') {
        showError(nameField, 'Please enter your name');
        isValid = false;
      } else if (nameField) {
        removeError(nameField);
      }
      
      if (emailField) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailField.value.trim() === '') {
          showError(emailField, 'Please enter your email');
          isValid = false;
        } else if (!emailPattern.test(emailField.value)) {
          showError(emailField, 'Please enter a valid email address');
          isValid = false;
        } else {
          removeError(emailField);
        }
      }
      
      if (messageField && messageField.value.trim() === '') {
        showError(messageField, 'Please enter your message');
        isValid = false;
      } else if (messageField) {
        removeError(messageField);
      }
      
      if (isValid) {
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'alert alert-success mt-3';
        successMessage.textContent = 'Thank you! Your message has been sent. We will get back to you soon.';
        
        // Reset form
        this.reset();
        
        // Show success message
        this.appendChild(successMessage);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
          successMessage.remove();
        }, 5000);
      }
    });
  });
  
  function showError(field, message) {
    // Remove any existing error
    removeError(field);
    
    // Add error class
    field.classList.add('is-invalid');
    
    // Create error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    
    // Insert error message after field
    field.parentNode.appendChild(errorDiv);
  }
  
  function removeError(field) {
    field.classList.remove('is-invalid');
    
    // Remove error message if exists
    const errorMessage = field.parentNode.querySelector('.invalid-feedback');
    if (errorMessage) {
      errorMessage.remove();
    }
  }
  
  // Initialize any tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  if (typeof bootstrap !== 'undefined') {
    tooltipTriggerList.map(function(tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }
});
