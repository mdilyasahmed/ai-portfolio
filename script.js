// ===================================
// Portfolio - Interactive Features
// ===================================

// Interactive Floating Bubbles Background Animation
(function() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let bubbles = [];
    let animationFrame;
    let mouse = {
        x: null,
        y: null,
        radius: 150
    };
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Track mouse position
    canvas.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });
    
    canvas.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });
    
    // Bubble colors
    const colors = [
        { r: 102, g: 126, b: 234 },  // Purple-blue
        { r: 118, g: 75, b: 162 },   // Deep purple
        { r: 255, g: 94, b: 98 },    // Coral
        { r: 129, g: 212, b: 250 },  // Light blue
        { r: 255, g: 183, b: 77 }    // Orange
    ];
    
    // Bubble class with mouse interaction
    class Bubble {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.baseRadius = Math.random() * 30 + 20;
            this.radius = this.baseRadius;
            this.vx = (Math.random() - 0.5) * 1;
            this.vy = (Math.random() - 0.5) * 1;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.opacity = Math.random() * 0.3 + 0.2;
            this.pulseSpeed = Math.random() * 0.02 + 0.01;
            this.pulsePhase = Math.random() * Math.PI * 2;
        }
        
        update() {
            // Mouse interaction - bubbles move away from cursor
            if (mouse.x && mouse.y) {
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    const angle = Math.atan2(dy, dx);
                    this.vx += Math.cos(angle) * force * 0.5;
                    this.vy += Math.sin(angle) * force * 0.5;
                    
                    // Increase size near mouse
                    this.radius = this.baseRadius * (1 + force * 0.5);
                } else {
                    this.radius = this.baseRadius;
                }
            } else {
                this.radius = this.baseRadius;
            }
            
            // Apply velocity
            this.x += this.vx;
            this.y += this.vy;
            
            // Add some friction
            this.vx *= 0.98;
            this.vy *= 0.98;
            
            // Keep some base movement
            if (Math.abs(this.vx) < 0.5) this.vx += (Math.random() - 0.5) * 0.1;
            if (Math.abs(this.vy) < 0.5) this.vy += (Math.random() - 0.5) * 0.1;
            
            // Bounce off edges with smooth wrapping
            if (this.x < -50) this.x = canvas.width + 50;
            if (this.x > canvas.width + 50) this.x = -50;
            if (this.y < -50) this.y = canvas.height + 50;
            if (this.y > canvas.height + 50) this.y = -50;
            
            // Pulsing effect
            this.pulsePhase += this.pulseSpeed;
        }
        
        draw() {
            const pulse = Math.sin(this.pulsePhase) * 5;
            const currentRadius = this.radius + pulse;
            
            // Create gradient for bubble
            const gradient = ctx.createRadialGradient(
                this.x, this.y, 0,
                this.x, this.y, currentRadius
            );
            
            gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity * 0.8})`);
            gradient.addColorStop(0.5, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity * 0.4})`);
            gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
            
            // Add glow effect
            ctx.shadowBlur = 20;
            ctx.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
            ctx.fill();
            ctx.shadowBlur = 0;
            
            // Add shimmer highlight
            const highlightGradient = ctx.createRadialGradient(
                this.x - currentRadius * 0.3,
                this.y - currentRadius * 0.3,
                0,
                this.x - currentRadius * 0.3,
                this.y - currentRadius * 0.3,
                currentRadius * 0.5
            );
            
            highlightGradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity * 0.3})`);
            highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
            ctx.fillStyle = highlightGradient;
            ctx.fill();
        }
    }
    
    // Initialize bubbles
    const bubbleCount = window.innerWidth < 768 ? 15 : 25;
    for (let i = 0; i < bubbleCount; i++) {
        bubbles.push(new Bubble());
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        bubbles.forEach(bubble => {
            bubble.update();
            bubble.draw();
        });
        
        animationFrame = requestAnimationFrame(animate);
    }
    
    animate();
    
    // Pause animation when page is hidden (performance)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationFrame);
        } else {
            animate();
        }
    });
})();

// Mobile Menu Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation highlighting & navbar scroll effect
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    const navbar = document.getElementById('navbar');

    // Add shadow to navbar on scroll
    if (window.pageYOffset > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - 200)) {
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

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for scroll animations
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Animate skill cards on scroll
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    
    observer.observe(card);
});

// Animate project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'scale(0.95)';
    card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    
    observer.observe(card);
});

// Animate timeline items
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
    
    observer.observe(item);
});

// Animate publication card
const publicationCards = document.querySelectorAll('.publication-card');
publicationCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'scale(0.95)';
    card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
    
    observer.observe(card);
});

// Animate contact cards
const contactCards = document.querySelectorAll('.contact-card');
contactCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.5s ease ${index * 0.2}s, transform 0.5s ease ${index * 0.2}s`;
    
    observer.observe(card);
});

// Animate about sections
const aboutSections = document.querySelectorAll('.about-section');
aboutSections.forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = `opacity 0.5s ease ${index * 0.15}s, transform 0.5s ease ${index * 0.15}s`;
    
    observer.observe(section);
});

// Animate credentials
const credentialItems = document.querySelectorAll('.credential-item');
credentialItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = `opacity 0.4s ease ${index * 0.1}s, transform 0.4s ease ${index * 0.1}s`;
    
    observer.observe(item);
});

// Back to Top Button
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopButton.setAttribute('aria-label', 'Back to top');
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
`;

document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.style.opacity = '1';
        backToTopButton.style.visibility = 'visible';
    } else {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.visibility = 'hidden';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

backToTopButton.addEventListener('mouseenter', () => {
    backToTopButton.style.transform = 'scale(1.1)';
});

backToTopButton.addEventListener('mouseleave', () => {
    backToTopButton.style.transform = 'scale(1)';
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navToggle && navMenu && !navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Initialize - Set first nav link as active
if (window.pageYOffset === 0) {
    const firstLink = document.querySelector('.nav-link[href="#home"]');
    if (firstLink) {
        firstLink.classList.add('active');
    }
}

console.log('Portfolio JavaScript loaded successfully!');
