document.addEventListener('DOMContentLoaded', function() {
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Set active navigation item based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.classList.remove('active');
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
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



  // Initialize Bootstrap tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  if (typeof bootstrap !== 'undefined') {
    tooltipTriggerList.map(function(tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  // Enhanced image loading
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.classList.add('loading');
    if (img.complete && img.naturalHeight !== 0) {
      img.classList.remove('loading');
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', function() {
        img.classList.remove('loading');
        img.classList.add('loaded');
      });
      img.addEventListener('error', function() {
        // Optionally handle image errors, e.g., show a placeholder
        img.classList.remove('loading');
        img.style.display = 'none'; // Or set a placeholder src
      });
    }
  });

  // Intersection Observer for animations
  const animationElements = document.querySelectorAll('.reveal, .slide-in-left, .slide-in-right, .slide-in-up');
  if ("IntersectionObserver" in window) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Stop observing once animated
        }
      });
    }, observerOptions);
    animationElements.forEach(el => observer.observe(el));
  } else {
    // Fallback for older browsers
    animationElements.forEach(el => el.classList.add('active'));
  }
});