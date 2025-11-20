// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Smooth scroll to a specific section
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * Open Client Portal (mock function)
 */
function openPortal() {
    alert('Redirecting to Client Portal...\n\nIn a real application, this would navigate to your portal dashboard.');
    // window.location.href = '/portal';
}

/**
 * Handle contact form submission
 */
function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Get form values
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const message = form.querySelector('textarea').value;
    
    // Mock form submission
    console.log('Form submitted:', { name, email, message });
    
    // Show success message
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '✓ Message Sent!';
    submitBtn.style.backgroundColor = '#10B981';
    
    // Reset form
    form.reset();
    
    // Restore button after 3 seconds
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.backgroundColor = '';
    }, 3000);
}

// ============================================
// NAVIGATION & SCROLL EFFECTS
// ============================================

/**
 * Add active state to navigation links based on scroll position
 */
function updateNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const section = document.querySelector(link.getAttribute('href'));
        
        if (section) {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                navLinks.forEach(l => l.style.color = '');
                link.style.color = 'var(--primary-color)';
            }
        }
    });
}

/**
 * Add scroll effects to elements
 */
function handleScrollEffects() {
    const elements = document.querySelectorAll('.service-card, .team-card, .blog-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementHeight = element.getBoundingClientRect().height;
        
        if (elementTop < window.innerHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================

let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    
    // Update navigation active state
    updateNavigation();
    
    // Handle scroll effects
    handleScrollEffects();
    
    // Add shadow effect when scrolled
    if (scrollTop > 10) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    }
    
    lastScrollTop = scrollTop;
});

// ============================================
// INITIALIZE ANIMATIONS
// ============================================

/**
 * Initialize fade-in animations for elements
 */
function initializeAnimations() {
    const elementsToAnimate = document.querySelectorAll(
        '.service-card, .team-card, .blog-card'
    );
    
    elementsToAnimate.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    });
}

// ============================================
// SMOOTH SCROLL BEHAVIOR
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// MODAL/PORTAL FUNCTIONALITY
// ============================================

/**
 * Show a modal notification
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background-color: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 2000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// KEYBOARD NAVIGATION
// ============================================

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any modals if present
        console.log('Escape key pressed');
    }
});

// ============================================
// FORM VALIDATION
// ============================================

/**
 * Validate contact form
 */
function validateContactForm() {
    const form = document.querySelector('.contact-form');
    if (form) {
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                if (input.value.trim() === '') {
                    input.style.borderColor = '#EF4444';
                } else {
                    input.style.borderColor = '#E5E7EB';
                }
            });
        });
    }
}

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

/**
 * Lazy load images (if added in future)
 */
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// ============================================
// PAGE INITIALIZATION
// ============================================

/**
 * Initialize all features when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('ProCorp Website Initialized');
    
    // Initialize animations
    initializeAnimations();
    
    // Validate forms
    validateContactForm();
    
    // Initialize lazy loading
    initializeLazyLoading();
    
    // Trigger initial scroll effects
    handleScrollEffects();
    
    // Log version
    console.log('ProCorp v1.0 - Professional Business Website');
});

// ============================================
// RESPONSIVE MENU (for mobile)
// ============================================

/**
 * Toggle mobile menu
 */
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            navLinks.classList.remove('active');
        }
    }
});

// ============================================
// ANALYTICS & TRACKING
// ============================================

/**
 * Track button clicks
 */
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        console.log('Button clicked:', button.textContent);
    });
});

/**
 * Track section views
 */
function trackSectionViews() {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('Section viewed:', entry.target.id);
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => observer.observe(section));
}

trackSectionViews();

// ============================================
// EXPORT FOR TESTING
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        scrollToSection,
        openPortal,
        handleFormSubmit,
        showNotification,
        validateContactForm
    };
}
