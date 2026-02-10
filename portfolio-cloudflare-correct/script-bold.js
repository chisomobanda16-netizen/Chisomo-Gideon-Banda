// Bold Portfolio JavaScript - Enhanced Interactions

// Mobile Navigation Toggle with enhanced functionality
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close mobile menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Close mobile menu if open
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            
            // Smooth scroll to target
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect with enhanced styling
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Portfolio Filter System with enhanced animations
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        portfolioItems.forEach((item, index) => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1) translateY(0)';
                }, index * 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8) translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Portfolio Item Click Handler - NEW
document.addEventListener('DOMContentLoaded', function() {
    const portfolioItemsClickable = document.querySelectorAll('.portfolio-item');
    
    portfolioItemsClickable.forEach(item => {
        item.style.cursor = 'pointer';
        
        item.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Get project details from the item
            const titleElement = item.querySelector('h3');
            const title = titleElement ? titleElement.textContent.trim() : '';
            
            console.log('Clicked item:', title); // Debug log
            
            // Different behavior based on project type
            if (title === 'Visual Storytelling') {
                // Visual Storytelling opens dedicated page
                console.log('Opening Visual Storytelling page'); // Debug log
                window.location.href = 'visual-storytelling.html';
                
            } else if (title === 'Photo Storytelling') {
                // Photo Storytelling opens dedicated page
                console.log('Opening Photo Storytelling page'); // Debug log
                window.location.href = 'photo-storytelling.html';
                
            } else if (title === 'Corporate Event Coverage') {
                // Corporate Event Coverage opens dedicated page
                console.log('Opening Corporate Event Coverage page'); // Debug log
                window.location.href = 'corporate-event-coverage.html';
                
            } else if (title === 'Storytelling Trainings and Co-creation Sessions') {
                // Storytelling Trainings opens dedicated page
                console.log('Opening Storytelling Trainings page'); // Debug log
                window.location.href = 'storytelling-trainings.html';
                
            } else {
                // Default behavior for other items
                const category = item.getAttribute('data-category');
                const imageSrc = item.querySelector('img').src;
                const description = item.querySelector('p').textContent;
                
                const params = new URLSearchParams({
                    title: title,
                    category: category,
                    description: description,
                    image: imageSrc
                });
                
                const detailUrl = `portfolio-detail.html?${params.toString()}`;
                window.location.href = detailUrl;
            }
        });
        
        // Add hover effect to indicate clickable
        item.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.portfolio-overlay');
            if (overlay) {
                overlay.style.opacity = '1';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.portfolio-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
            }
        });
    });
});

// Active navigation highlighting with smooth transitions
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Enhanced scroll animations with Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Add staggered animation for grid items
            if (entry.target.classList.contains('portfolio-item')) {
                const items = Array.from(document.querySelectorAll('.portfolio-item'));
                const index = items.indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.1}s`;
            }
        }
    });
}, observerOptions);

// Add fade-in class to elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.portfolio-item, .achievement-item, .partnership-item, .client-category, .skill-item, .card, .contact-item');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Enhanced parallax effects
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image img');
    const heroBadge = document.querySelector('.hero-badge');
    
    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.4}px) scale(${1 + scrolled * 0.0003}) rotateY(${-5 + scrolled * 0.01}deg)`;
    }
    
    if (heroBadge && scrolled < window.innerHeight) {
        heroBadge.style.transform = `translateY(${scrolled * 0.2}px) scale(${1 + scrolled * 0.0002})`;
    }
});

// Enhanced loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Staggered entrance animation for hero elements
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-description, .hero-buttons');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            el.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.320, 1)';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Animate hero image with perspective
    const heroImage = document.querySelector('.hero-image-wrapper');
    if (heroImage) {
        setTimeout(() => {
            heroImage.style.opacity = '0';
            heroImage.style.transform = 'perspective(1000px) rotateY(-15deg) translateX(-50px)';
            
            setTimeout(() => {
                heroImage.style.transition = 'all 1s cubic-bezier(0.23, 1, 0.320, 1)';
                heroImage.style.opacity = '1';
                heroImage.style.transform = 'perspective(1000px) rotateY(-5deg) translateX(0)';
            }, 100);
        }, 600);
    }
});

// Enhanced loading styles
const loadingStyles = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .fade-in {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s cubic-bezier(0.23, 1, 0.320, 1);
    }
    
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;

const loadingStyleSheet = document.createElement('style');
loadingStyleSheet.textContent = loadingStyles;
document.head.appendChild(loadingStyleSheet);

// Performance optimization - throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations here
}, 100));

// Add hover effect to cards
document.querySelectorAll('.card, .skill-item, .contact-item').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add typing effect to hero badge
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect
document.addEventListener('DOMContentLoaded', () => {
    const heroBadge = document.querySelector('.hero-badge');
    if (heroBadge) {
        const originalText = heroBadge.textContent;
        setTimeout(() => {
            typeWriter(heroBadge, originalText, 70);
        }, 1000);
    }
});
