// ===================================
// Portfolio - Interactive Features
// ===================================

// Interactive DNA Helix Background Animation
(function() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrame;
    let rotation = 0;
    let mouse = {
        x: null,
        y: null,
        influence: 0
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
    
    // DNA Helix configuration
    const helixConfig = {
        centerX: canvas.width / 2,
        centerY: canvas.height / 2,
        radius: 80,
        height: canvas.height * 1.2,
        pointsPerStrand: 60,
        rotationSpeed: 0.005,
        baseRadius: 8,
        connectionDistance: 30
    };
    
    // Colors for DNA strands
    const colors = {
        strand1: { r: 102, g: 126, b: 234 },  // Purple-blue
        strand2: { r: 118, g: 75, b: 162 },   // Deep purple
        base1: { r: 255, g: 94, b: 98 },      // Coral
        base2: { r: 129, g: 212, b: 250 }     // Light blue
    };
    
    // Create DNA helix points
    function createHelixPoint(index, strandOffset, rotation) {
        const yStep = helixConfig.height / helixConfig.pointsPerStrand;
        const y = index * yStep - helixConfig.height / 2;
        const angle = (index * 0.3) + rotation + strandOffset;
        
        const x = helixConfig.centerX + Math.cos(angle) * helixConfig.radius;
        const z = Math.sin(angle) * helixConfig.radius;
        const screenY = y + helixConfig.centerY;
        
        return { x, y: screenY, z, angle };
    }
    
    // Draw glowing sphere
    function drawBase(x, y, z, radius, color, isConnection = false) {
        // Calculate size based on depth (z position)
        const depthScale = (z + helixConfig.radius) / (helixConfig.radius * 2);
        const size = radius * (0.5 + depthScale * 0.5);
        const alpha = 0.4 + depthScale * 0.4;
        
        // Mouse interaction - bases grow when mouse is near
        let finalSize = size;
        if (mouse.x && mouse.y) {
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 150) {
                const growth = (1 - distance / 150) * 0.5;
                finalSize = size * (1 + growth);
            }
        }
        
        // Create gradient
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, finalSize * 2);
        gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`);
        gradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.5})`);
        gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
        
        // Draw base
        ctx.beginPath();
        ctx.arc(x, y, finalSize * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw solid center
        ctx.beginPath();
        ctx.arc(x, y, finalSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.9})`;
        ctx.fill();
        
        // Glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = `rgba(${color.r}, ${color.g}, ${color.b}, 0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0;
    }
    
    // Draw connection between base pairs
    function drawConnection(x1, y1, z1, x2, y2, z2, color) {
        const avgZ = (z1 + z2) / 2;
        const depthScale = (avgZ + helixConfig.radius) / (helixConfig.radius * 2);
        const alpha = 0.3 + depthScale * 0.4;
        
        const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
        gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`);
        gradient.addColorStop(0.5, `rgba(255, 255, 255, ${alpha * 0.5})`);
        gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`);
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();
    }
    
    // Draw DNA strand curve
    function drawStrand(points, color) {
        if (points.length < 2) return;
        
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        
        for (let i = 1; i < points.length - 1; i++) {
            const xc = (points[i].x + points[i + 1].x) / 2;
            const yc = (points[i].y + points[i + 1].y) / 2;
            ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
        }
        
        const last = points[points.length - 1];
        ctx.lineTo(last.x, last.y);
        
        const gradient = ctx.createLinearGradient(
            helixConfig.centerX, 
            0, 
            helixConfig.centerX, 
            canvas.height
        );
        gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0.1)`);
        gradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, 0.3)`);
        gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0.1)`);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update center position
        helixConfig.centerX = canvas.width / 2;
        helixConfig.centerY = canvas.height / 2;
        
        // Update rotation with mouse influence
        let rotationSpeed = helixConfig.rotationSpeed;
        if (mouse.x && mouse.y) {
            const mouseInfluence = (mouse.x / canvas.width - 0.5) * 0.01;
            rotationSpeed += mouseInfluence;
        }
        rotation += rotationSpeed;
        
        // Create points for both strands
        const strand1Points = [];
        const strand2Points = [];
        
        for (let i = 0; i < helixConfig.pointsPerStrand; i++) {
            strand1Points.push(createHelixPoint(i, 0, rotation));
            strand2Points.push(createHelixPoint(i, Math.PI, rotation));
        }
        
        // Sort by z-depth for proper layering
        const allPoints = [];
        for (let i = 0; i < helixConfig.pointsPerStrand; i++) {
            allPoints.push({
                strand1: strand1Points[i],
                strand2: strand2Points[i],
                index: i
            });
        }
        allPoints.sort((a, b) => a.strand1.z - b.strand1.z);
        
        // Draw strands
        drawStrand(strand1Points, colors.strand1);
        drawStrand(strand2Points, colors.strand2);
        
        // Draw connections and bases (back to front)
        allPoints.forEach(point => {
            const s1 = point.strand1;
            const s2 = point.strand2;
            
            // Check if bases are close enough to connect
            const angleDiff = Math.abs(Math.cos(s1.angle) - Math.cos(s2.angle));
            if (angleDiff < 0.3) {
                // Draw connection
                drawConnection(s1.x, s1.y, s1.z, s2.x, s2.y, s2.z, colors.base1);
            }
            
            // Draw bases
            const baseColor1 = point.index % 2 === 0 ? colors.base1 : colors.base2;
            const baseColor2 = point.index % 2 === 0 ? colors.base2 : colors.base1;
            
            drawBase(s1.x, s1.y, s1.z, helixConfig.baseRadius, baseColor1);
            drawBase(s2.x, s2.y, s2.z, helixConfig.baseRadius, baseColor2);
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
