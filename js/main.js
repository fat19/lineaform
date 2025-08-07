// LineaForm Studio - Main JavaScript

// DOM Ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

function init() {
    initMobileMenu();
    initSmoothScroll();
    initScrollEffects();
    initTestimonialSlider();
    initForms();
    initImageLazyLoading();
    initAccessibility();
    initFAQ();
    initParallax();
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            const isExpanded = mobileMenu.classList.contains('hidden');
            mobileMenu.classList.toggle('hidden');
            
            // Update aria-expanded for accessibility
            mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle body scroll
            document.body.style.overflow = isExpanded ? 'hidden' : '';
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = mobileMenu.contains(event.target);
            const isClickOnToggle = mobileMenuToggle.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnToggle && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }
}

// Smooth Scroll for Anchor Links
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                history.pushState(null, null, href);
            }
        });
    });
}

// Scroll Effects
function initScrollEffects() {
    const header = document.querySelector('header');
    const scrollThreshold = 100;
    
    // Sticky header effect
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        if (scrollY > scrollThreshold) {
            header.classList.add('sticky-header');
        } else {
            header.classList.remove('sticky-header');
        }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
}

// Testimonial Slider
function initTestimonialSlider() {
    const testimonials = [
        {
            quote: "LineaForm transformed our vision into a breathtaking reality. Their attention to detail and innovative approach to sustainable design exceeded all our expectations.",
            author: "Sarah Chen",
            role: "CEO, Tech Innovations",
            avatar: ""
        },
        {
            quote: "Working with LineaForm was an exceptional experience. Their ability to blend modern aesthetics with functional design created a space that truly reflects our brand identity.",
            author: "Marcus Rodriguez",
            role: "Creative Director, Design Co.",
            avatar: ""
        },
        {
            quote: "The team's expertise in sustainable architecture helped us achieve our environmental goals while maintaining the highest standards of design excellence.",
            author: "Emma Thompson",
            role: "Sustainability Manager, Green Corp",
            avatar: ""
        }
    ];
    
    const slider = document.querySelector('.testimonial-slider');
    if (slider) {
        let currentIndex = 0;
        
        function updateSlider() {
            const slide = slider.querySelector('.testimonial-slide');
            const testimonial = testimonials[currentIndex];
            
            slide.innerHTML = `
                <blockquote class="text-2xl md:text-3xl font-light text-gray-900 leading-relaxed mb-8">
                    "${testimonial.quote}"
                </blockquote>
                <div class="flex items-center">
                    <div class="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                    <div>
                        <div class="font-medium text-gray-900">${testimonial.author}</div>
                        <div class="text-gray-600">${testimonial.role}</div>
                    </div>
                </div>
            `;
            
            // Add fade animation
            slide.style.opacity = '0';
            setTimeout(() => {
                slide.style.opacity = '1';
            }, 100);
        }
        
        // Auto-rotate testimonials
        setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            updateSlider();
        }, 5000);
    }
}

// Form handling
function initForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });
    
    // Contact form specific handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('footer form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterForm);
    }
}

// Contact form handling
function handleContactForm(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        showNotification('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
        form.reset();
        submitButton.textContent = 'Send Message';
        submitButton.disabled = false;
    }, 2000);
}

// Newsletter form handling
function handleNewsletterForm(e) {
    e.preventDefault();
    
    const form = e.target;
    const email = form.querySelector('input[type="email"]').value;
    const submitButton = form.querySelector('button[type="submit"]');
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    submitButton.disabled = true;
    submitButton.textContent = 'Subscribing...';
    
    setTimeout(() => {
        form.reset();
        submitButton.disabled = false;
        submitButton.textContent = 'Subscribe';
        showNotification('Successfully subscribed to our newsletter!', 'success');
    }, 1500);
}

// Image Lazy Loading
function initImageLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
}

// Accessibility Features
function initAccessibility() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-amber-600 text-white px-4 py-2 z-50';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transition-all duration-300 transform translate-x-full`;
    
    const colors = {
        success: 'bg-green-500 text-white',
        error: 'bg-red-500 text-white',
        info: 'bg-blue-500 text-white'
    };
    
    notification.className += ` ${colors[type] || colors.info}`;
    notification.textContent = message;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Parallax effect for hero section
function initParallax() {
    const heroSection = document.querySelector('.relative.h-screen');
    
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            const img = heroSection.querySelector('img');
            
            if (img) {
                img.style.transform = `translateY(${rate}px)`;
            }
        });
    }
}

// Initialize parallax after DOM load
document.addEventListener('DOMContentLoaded', initParallax);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced scroll handler
const debouncedScrollHandler = debounce(function() {
    // Handle scroll effects efficiently
    initScrollEffects();
}, 16);

window.addEventListener('scroll', debouncedScrollHandler);

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        init,
        isValidEmail,
        showNotification
    };
}
