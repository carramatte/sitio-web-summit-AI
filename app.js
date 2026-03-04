// GSAP Plugins Registration
gsap.registerPlugin(ScrollTrigger);

// Prevent scrolling while loading
document.body.style.overflow = 'hidden';

// ==========================================
// 1. CUSTOM CURSOR (Lag effect)
// ==========================================
const cursor = document.getElementById('custom-cursor');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

const animateCursor = () => {
    let dx = mouseX - cursorX;
    let dy = mouseY - cursorY;

    cursorX += dx * 0.15; // Delay / Lag factor
    cursorY += dy * 0.15;

    if (cursor) {
        cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
    }
    requestAnimationFrame(animateCursor);
};
animateCursor();

// Interactions
document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.style.transform += ' scale(2)');
    el.addEventListener('mouseleave', () => cursor.style.transform = cursor.style.transform.replace(' scale(2)', ''));
});

// ==========================================
// 2. INTRO ANIMATION (Tesla Style)
// ==========================================
const preloaderTL = gsap.timeline();

// Ensure body is visible and scrollable if preloader is skipped or finishes
const revealContent = () => {
    document.body.style.overflow = '';
    // Hide preloader if it exists
    const preloader = document.getElementById('preloader');
    if (preloader) gsap.to(preloader, { yPercent: -100, duration: 1, ease: "power4.inOut" });
};

preloaderTL
    .to({}, { duration: 0.5, onComplete: revealContent }) // Short delay to ensure DOM readiness
    .from('.hero-title-tesla', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
    })
    .from('.hero-subtitle-tesla', {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=0.8")
    .from('.btn-tesla', {
        y: 20,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.6")
    .from('#main-nav', {
        y: -30,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=1");

// ==========================================
// 3. CYBERPUNK ENHANCEMENTS (Glitch, Particles, Reveal)
// ==========================================

// Glitch Effect
const glitchTitle = document.getElementById('glitch-title');
const originalText = "SUMMIT AI";
const chars = "!<>-_\\/[]{}—=+*^?#________";

const triggerGlitch = () => {
    if (!glitchTitle) return;
    let iterations = 0;
    const interval = setInterval(() => {
        glitchTitle.innerText = originalText.split("")
            .map((char, index) => {
                if (index < iterations) return originalText[index];
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("");

        if (iterations >= originalText.length) clearInterval(interval);
        iterations += 1 / 3;
    }, 30);
};
setInterval(triggerGlitch, 5000);

// Canvas Particles
const initParticles = () => {
    const canvas = document.getElementById('hero-particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];
    const colors = ['#C45E1A', '#1B2E45'];

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    const handleParticles = () => {
        for (let i = 0; i < 50; i++) particlesArray.push(new Particle());
    };
    handleParticles();

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
};
initParticles();

// Scroll Reveal Observer
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');

            // Sweep transition effect
            const sweep = document.getElementById('transition-sweep');
            if (sweep) {
                gsap.fromTo(sweep, { left: '-100%' }, { left: '100%', duration: 1, ease: "power2.inOut" });
            }
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal, section').forEach(el => {
    if (!el.id || el.id !== 'hero-tesla') revealObserver.observe(el);
});

// Glass cards tilt effect
const cards = document.querySelectorAll('.glass-card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate rotation with max +/- 10 degrees
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            duration: 0.5,
            ease: "power2.out",
            transformPerspective: 1000
        });

        // Add glare effect dynamically (Optional, simple highlight)
        gsap.to(card, {
            boxShadow: `${-rotateY * 2}px ${rotateX * 2}px 20px rgba(0, 240, 255, 0.1)`,
            duration: 0.5
        })
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            boxShadow: "none",
            duration: 0.5,
            ease: "power2.out"
        });
    });
});


// ==========================================
// 4. THREE.JS BACKGROUND
// ==========================================
const initThreeJS = () => {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const scene = new THREE.Scene();
    // Cyberpunk fog
    scene.fog = new THREE.FogExp2(0x0D1B2A, 0.0015);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particles / Node Network
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;

    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);

    const colorOptions = [
        new THREE.Color('#C45E1A'), // Orange
        new THREE.Color('#00F0FF'), // Cyan
        new THREE.Color('#8B5CF6'), // Violet
        new THREE.Color('#ffffff')  // White
    ];

    for (let i = 0; i < particlesCount * 3; i += 3) {
        // Spread particles in a wide area (sphere roughly)
        const r = 150 * Math.cbrt(Math.random());
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);

        posArray[i] = r * Math.sin(phi) * Math.cos(theta);
        posArray[i + 1] = r * Math.sin(phi) * Math.sin(theta);
        posArray[i + 2] = r * Math.cos(phi);

        const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
        colorArray[i] = color.r;
        colorArray[i + 1] = color.g;
        colorArray[i + 2] = color.b;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    // Load a simple circle texture for particles if possible, else default square
    // Using additive blending for "glow"
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.4,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Connection Lines - connecting the first 100 particles to create a small core network
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x00F0FF,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending
    });

    const lineGeometry = new THREE.BufferGeometry();
    const lineIndices = [];
    const limit = particlesCount;

    for (let i = 0; i < 200; i++) {
        for (let j = i + 1; j < 200; j++) {
            const dx = posArray[i * 3] - posArray[j * 3];
            const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
            const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (dist < 25) {
                lineIndices.push(i, j);
            }
        }
    }
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    lineGeometry.setIndex(lineIndices);
    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);

    // Mouse interaction variables
    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener('mousemove', (e) => {
        // Normalized device coordinates
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // Animation Loop
    const clock = new THREE.Clock();

    const tick = () => {
        const elapsedTime = clock.getElapsedTime();

        // Rotate slowly
        particlesMesh.rotation.y = elapsedTime * 0.05;
        particlesMesh.rotation.x = elapsedTime * 0.02;
        lineMesh.rotation.y = elapsedTime * 0.05;
        lineMesh.rotation.x = elapsedTime * 0.02;

        // Smooth Mouse movement interaction
        const targetX = mouseX * 20;
        const targetY = mouseY * 20;
        const targetZ = camera.position.z;

        // Parallax effect
        camera.position.x += (targetX - camera.position.x) * 0.02;
        camera.position.y += (targetY - camera.position.y) * 0.02;
        camera.lookAt(scene.position);

        // Subtle pulsing effect on particles
        particlesMaterial.size = 0.4 + Math.sin(elapsedTime * 2) * 0.1;

        renderer.render(scene, camera);
        window.requestAnimationFrame(tick);
    }

    tick();

    // Resize handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};

initThreeJS();


// ==========================================
// 5. LANYARD EMULATION (Vanilla GSAP Physics)
// ==========================================
const lanyardCard = document.getElementById('lanyard-card');
const lanyardString = document.getElementById('lanyard-string');
const lanyardWrapper = document.getElementById('lanyard-wrapper');

if (lanyardWrapper && lanyardCard && lanyardString) {
    let isDown = false;
    let startX = 0;
    let startY = 0;

    // Smooth magnetic follow when hovering near it
    window.addEventListener('mousemove', (e) => {
        if (isDown) return;
        const rect = lanyardWrapper.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;

        // Only react slightly if we are reasonably close to it
        if (e.clientY > rect.bottom + 200) return;

        const dx = e.clientX - centerX;

        // Slight rotation based on mouse pos overall
        gsap.to(lanyardCard, {
            rotationZ: dx * 0.03,
            rotationY: dx * 0.05,
            rotationX: (e.clientY - rect.top) * -0.02,
            duration: 1.5,
            ease: "power2.out"
        });
        gsap.to(lanyardString, {
            rotationZ: dx * 0.02,
            duration: 1.5,
            ease: "power2.out"
        });
    });

    // Start Drag
    lanyardCard.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.clientX;
        startY = e.clientY;
        gsap.killTweensOf(lanyardCard);
        gsap.killTweensOf(lanyardString);
        lanyardCard.style.cursor = 'grabbing';
    });

    // Dragging physics
    window.addEventListener('mousemove', (e) => {
        if (!isDown) return;

        // Restrict massive pulls
        const dx = Math.min(Math.max(e.clientX - startX, -150), 150);
        const dy = Math.min(Math.max(e.clientY - startY, -50), 100);

        // Draggable string and card
        gsap.set(lanyardCard, {
            x: dx * 0.8,
            y: dy * 0.8,
            rotationZ: dx * 0.3, // Swing angle
            rotationY: dx * 0.25,
            rotationX: dy * -0.2
        });

        gsap.set(lanyardString, {
            rotationZ: dx * 0.15, // String swings half the amount
        });
    });

    // Release and Snap back (Elastic Physics)
    window.addEventListener('mouseup', () => {
        if (!isDown) return;
        isDown = false;
        lanyardCard.style.cursor = 'grab';

        // Elastic snap back
        gsap.to(lanyardCard, {
            x: 0,
            y: 0,
            rotationZ: 0,
            rotationY: 0,
            rotationX: 0,
            duration: 2.5,
            ease: "elastic.out(1, 0.3)"
        });

        gsap.to(lanyardString, {
            rotationZ: 0,
            duration: 2.5,
            ease: "elastic.out(1, 0.3)"
        });
    });
}
