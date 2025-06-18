// Loader
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    const loaderMessages = [
        'Initializing experience...',
        'Loading portfolio assets...',
        'Preparing animations...',
        'Almost ready...',
        'Welcome!'
    ];
    
    let messageIndex = 0;
    const messageElement = document.getElementById('loaderMessage');
    
    const messageInterval = setInterval(() => {
        if (messageIndex < loaderMessages.length) {
            messageElement.textContent = loaderMessages[messageIndex];
            messageIndex++;
        } else {
            clearInterval(messageInterval);
        }
    }, 400);
    
    setTimeout(() => {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 2500);
});

// Navigation
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
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

// Typewriter effect
const typewriterTexts = [
    'Building intelligent workflows',
    'Automating repetitive tasks',
    'Creating AI-powered solutions',
    'Transforming business processes',
    'Scaling operations effortlessly'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterElement = document.getElementById('typewriter');

function typeWriter() {
    const currentText = typewriterTexts[textIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeWriter, 1500);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typewriterTexts.length;
        setTimeout(typeWriter, 500);
    } else {
        setTimeout(typeWriter, isDeleting ? 50 : 100);
    }
}

typeWriter();

// Number counter animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const numberObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target;
            const targetValue = parseInt(statNumber.getAttribute('data-value'));
            const suffix = statNumber.nextElementSibling ? statNumber.nextElementSibling.textContent : '';
            
            let currentValue = 0;
            const increment = targetValue / 50;
            
            const updateNumber = () => {
                currentValue += increment;
                if (currentValue < targetValue) {
                    statNumber.textContent = Math.floor(currentValue);
                    requestAnimationFrame(updateNumber);
                } else {
                    statNumber.textContent = targetValue;
                }
            };
            
            updateNumber();
            numberObserver.unobserve(statNumber);
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-number[data-value]').forEach(stat => {
    numberObserver.observe(stat);
});

// Reveal on scroll
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// Particle Canvas Animation
const canvas = document.getElementById('particle-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 100;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
            this.opacity = Math.random() * 0.5 + 0.1;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width || this.x < 0) {
                this.speedX = -this.speedX;
            }
            
            if (this.y > canvas.height || this.y < 0) {
                this.speedY = -this.speedY;
            }
        }
        
        draw() {
            ctx.fillStyle = `rgba(255, 109, 90, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    function init() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    init();
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;
    
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: 'forwards' });
});

// Horizontal Scrolling for Projects
function createHorizontalScroll(containerClass, speed = 30) {
    const container = document.querySelector(containerClass);
    if (!container) return;
    
    const track = container.querySelector('.projects-track, .stories-track, .apps-row');
    if (!track) return;
    
    // Clone items for seamless loop
    const items = track.children;
    const itemsArray = Array.from(items);
    
    itemsArray.forEach(item => {
        const clone = item.cloneNode(true);
        track.appendChild(clone);
    });
}

// Initialize horizontal scrolling
document.addEventListener('DOMContentLoaded', () => {
    createHorizontalScroll('.projects-carousel');
    createHorizontalScroll('.stories-carousel');
    createHorizontalScroll('.apps-showcase');
});

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Magnetic Buttons
document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;
        
        btn.style.transform = `translate(${deltaX * 10}px, ${deltaY * 10}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// Skill Meters Animation
const skillMeters = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillFill = entry.target;
            const skillLevel = skillFill.style.getPropertyValue('--skill-level');
            
            setTimeout(() => {
                skillFill.style.width = skillLevel;
            }, 200);
            
            skillObserver.unobserve(skillFill);
        }
    });
}, observerOptions);

skillMeters.forEach(meter => {
    meter.style.width = '0';
    skillObserver.observe(meter);
});

// Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitButton.textContent = 'Message Sent!';
            contactForm.reset();
            
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 3000);
        }, 2000);
    });
}

// Add floating animation to elements
function addFloatingAnimation() {
    const floatingElements = document.querySelectorAll('.animate-float');
    
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
    });
}

addFloatingAnimation();

// Dynamic theme color based on scroll
let lastScrollPosition = 0;
const heroSection = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    const currentScrollPosition = window.scrollY;
    const heroHeight = heroSection ? heroSection.offsetHeight : 0;
    
    if (currentScrollPosition > heroHeight) {
        document.body.classList.add('scrolled-past-hero');
    } else {
        document.body.classList.remove('scrolled-past-hero');
    }
    
    lastScrollPosition = currentScrollPosition;
});

// Initialize AOS-like animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animationType = entry.target.getAttribute('data-aos');
                entry.target.classList.add('aos-animate', animationType);
                animateOnScroll.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    animatedElements.forEach(element => {
        animateOnScroll.observe(element);
    });
}

// FAQs Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        faqItems.forEach(faq => {
            faq.classList.remove('active');
        });
        
        // Open clicked item if it wasn't already open
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Initialize all animations on load
window.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    
    // Add parallax effect to hero elements
    const parallaxElements = document.querySelectorAll('.floating-shape');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
});