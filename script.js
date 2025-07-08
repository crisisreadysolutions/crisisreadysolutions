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

  // Set active navigation item based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
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

// Enhanced image loading with lazy loading
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img');
  
  // Create loading placeholder
  const createLoadingPlaceholder = (img) => {
    const placeholder = document.createElement('div');
    placeholder.style.width = img.offsetWidth + 'px';
    placeholder.style.height = img.offsetHeight + 'px';
    placeholder.style.backgroundColor = '#f0f0f0';
    placeholder.style.borderRadius = '10px';
    placeholder.style.display = 'flex';
    placeholder.style.alignItems = 'center';
    placeholder.style.justifyContent = 'center';
    placeholder.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    return placeholder;
  };

  images.forEach(img => {
    if (img.complete && img.naturalHeight !== 0) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', function() {
        img.classList.add('loaded');
      });
      img.addEventListener('error', function() {
        img.style.display = 'none';
      });
    }
  });

  // Performance optimization: Debounce scroll events
  let ticking = false;
  function updateOnScroll() {
    if (!ticking) {
      requestAnimationFrame(revealOnScroll);
      ticking = true;
      setTimeout(() => { ticking = false; }, 10);
    }
  }
  
  window.addEventListener('scroll', updateOnScroll, { passive: true });
});

// Enhanced scroll animation
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal, .slide-in-left, .slide-in-right, .slide-in-up');

  reveals.forEach((element) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      element.classList.add('active');
    }
  });
}

// Add intersection observer for better performance
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, observerOptions);

// Observe all animation elements
document.addEventListener('DOMContentLoaded', function() {
  const animationElements = document.querySelectorAll('.reveal, .slide-in-left, .slide-in-right, .slide-in-up');
  animationElements.forEach(el => observer.observe(el));
});

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);