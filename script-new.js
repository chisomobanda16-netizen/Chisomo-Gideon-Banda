// Creative Portfolio JavaScript

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// Creative letter animation for title
document.addEventListener('DOMContentLoaded', () => {
    const letters = document.querySelectorAll('.letter');
    letters.forEach((letter, index) => {
        letter.style.setProperty('--letter-index', index);
    });
});

// Portfolio Filter System
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.creative-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Scroll animations with Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Stagger animation for portfolio items
            if (entry.target.classList.contains('creative-item')) {
                const items = Array.from(document.querySelectorAll('.creative-item'));
                const index = items.indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.1}s`;
            }
        }
    });
}, observerOptions);

// Add fade-in class to elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.creative-item, .achievement-item, .partnership-item, .client-category, .skill-item');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroBg = document.querySelector('.hero-bg-animation');
    const gradientOrb = document.querySelector('.gradient-orb');
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    if (heroBg) {
        heroBg.style.transform = `translateY(${scrolled * 0.3}px) scale(${1 + scrolled * 0.0005})`;
    }
    if (gradientOrb) {
        gradientOrb.style.transform = `translate(-50%, -50%) scale(${1 + scrolled * 0.0002})`;
    }
});

// Active navigation highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Creative portfolio lightbox
const portfolioGridItems = document.querySelectorAll('.creative-item');
portfolioGridItems.forEach(item => {
    item.addEventListener('click', function(e) {
        if (!e.target.closest('.overlay-icons')) {
            const img = this.querySelector('img');
            const title = this.querySelector('.overlay-content h3').textContent;
            const description = this.querySelector('.overlay-content p').textContent;
            
            const lightbox = document.createElement('div');
            lightbox.className = 'creative-lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-overlay">
                    <div class="lightbox-content">
                        <div class="lightbox-header">
                            <h3>${title}</h3>
                            <button class="lightbox-close">&times;</button>
                        </div>
                        <div class="lightbox-image">
                            <img src="${img.src}" alt="${title}">
                        </div>
                        <div class="lightbox-description">
                            <p>${description}</p>
                        </div>
                        <div class="lightbox-nav">
                            <button class="lightbox-prev"><i class="fas fa-chevron-left"></i></button>
                            <button class="lightbox-next"><i class="fas fa-chevron-right"></i></button>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';
            
            // Close lightbox
            const closeLightbox = () => {
                lightbox.remove();
                document.body.style.overflow = '';
            };
            
            lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
            lightbox.querySelector('.lightbox-overlay').addEventListener('click', function(e) {
                if (e.target === this) closeLightbox();
            });
            
            // Keyboard navigation
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') closeLightbox();
            });
        }
    });
});

// Add lightbox styles
const lightboxStyles = `
    .creative-lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
    }
    
    .lightbox-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.95);
        backdrop-filter: blur(20px);
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
        background: linear-gradient(135deg, #1a1a2e, #16213e);
        border-radius: 20px;
        overflow: hidden;
        border: 2px solid rgba(255,107,53,0.3);
        animation: slideUp 0.3s ease;
    }
    
    .lightbox-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        background: rgba(255,107,53,0.1);
        border-bottom: 1px solid rgba(255,107,53,0.3);
    }
    
    .lightbox-header h3 {
        color: #ff6b35;
        font-size: 1.5rem;
        margin: 0;
    }
    
    .lightbox-close {
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        transition: all 0.3s ease;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .lightbox-close:hover {
        background: rgba(255,107,53,0.3);
        transform: rotate(90deg);
    }
    
    .lightbox-image {
        padding: 2rem;
        text-align: center;
    }
    
    .lightbox-image img {
        max-width: 100%;
        max-height: 60vh;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    }
    
    .lightbox-description {
        padding: 0 2rem 2rem;
        text-align: center;
    }
    
    .lightbox-description p {
        color: rgba(255,255,255,0.8);
        font-size: 1.1rem;
        line-height: 1.6;
    }
    
    .lightbox-nav {
        position: absolute;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 1rem;
    }
    
    .lightbox-nav button {
        width: 50px;
        height: 50px;
        background: rgba(255,107,53,0.3);
        border: none;
        border-radius: 50%;
        color: white;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 1.2rem;
    }
    
    .lightbox-nav button:hover {
        background: #ff6b35;
        transform: scale(1.1);
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideUp {
        from { 
            opacity: 0;
            transform: translateY(50px);
        }
        to { 
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = lightboxStyles;
document.head.appendChild(styleSheet);

// Floating animation for hero elements
const floatElements = document.querySelectorAll('.float-element');
floatElements.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.5}s`;
});

// Dynamic particle generation
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'dynamic-particle';
    particle.style.cssText = `
        position: fixed;
        width: ${Math.random() * 4 + 1}px;
        height: ${Math.random() * 4 + 1}px;
        background: #ff6b35;
        border-radius: 50%;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        opacity: ${Math.random() * 0.5 + 0.2};
        pointer-events: none;
        z-index: 1;
        animation: particleFloat ${Math.random() * 10 + 10}s linear infinite;
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 20000);
}

// Create particles periodically
setInterval(createParticle, 2000);

// Add particle animation
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFloat {
        from {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        to {
            transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Typing effect for tagline
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
    const taglineElement = document.querySelector('.tagline-text');
    if (taglineElement) {
        const originalText = taglineElement.textContent;
        typeWriter(taglineElement, originalText, 70);
    }
});

// Mouse trail effect
let mouseTrail = [];
const maxTrailLength = 20;

document.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.className = 'mouse-trail';
    trail.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: radial-gradient(circle, #ff6b35, transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        transform: translate(-50%, -50%);
        animation: trailFade 1s ease forwards;
    `;
    
    document.body.appendChild(trail);
    mouseTrail.push(trail);
    
    if (mouseTrail.length > maxTrailLength) {
        const oldTrail = mouseTrail.shift();
        oldTrail.remove();
    }
    
    setTimeout(() => {
        trail.remove();
        mouseTrail = mouseTrail.filter(t => t !== trail);
    }, 1000);
});

// Add trail animation
const trailStyle = document.createElement('style');
trailStyle.textContent = `
    @keyframes trailFade {
        from {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0);
        }
    }
`;
document.head.appendChild(trailStyle);

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Staggered entrance animation
    const elements = document.querySelectorAll('.hero-text > *');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            el.style.transition = 'all 0.8s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Add loading styles
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
        transform: translateY(30px);
        transition: all 0.6s ease;
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
