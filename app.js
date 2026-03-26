// Prevent scrolling while loading
document.body.style.overflow = 'hidden';

// ==========================================
// 2. INTRO ANIMATION (Tesla Style)
// ==========================================
const preloaderTL = gsap.timeline();

const revealContent = () => {
    document.body.style.overflow = '';
};

preloaderTL
    .to({}, { duration: 0.1, onComplete: revealContent })
    .fromTo('#hero h1', {
        y: 20,
        autoAlpha: 0
    }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.3,
        ease: "power2.out"
    })
    .fromTo('#hero p', {
        y: 10,
        autoAlpha: 0
    }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.3,
        ease: "power2.out"
    }, "-=0.15")
    .fromTo('#hero a', {
        y: 10,
        autoAlpha: 0
    }, {
        y: 0,
        autoAlpha: 1,
        stagger: 0.05,
        duration: 0.3,
        ease: "power2.out"
    }, "-=0.2")
    .fromTo('#main-nav', {
        y: -10,
        autoAlpha: 0
    }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.3,
        ease: "power2.out"
    }, "-=0.2");

// ==========================================
// 3. ENHANCEMENTS
// ==========================================


// Scroll Reveal Observer moved to index.html

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
            duration: 0.3,
            ease: "power2.out",
            transformPerspective: 1000
        });

        // Add glare effect dynamically (Optional, simple highlight)
        gsap.to(card, {
            boxShadow: `${-rotateY * 2}px ${rotateX * 2}px 20px rgba(255, 255, 255, 0.05)`,
            duration: 0.3
        })
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            boxShadow: "none",
            duration: 0.3,
            ease: "power2.out"
        });
    });
});






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

// ==========================================
// 6. CONTACT FORM HANDLING
// ==========================================
const contactForm = document.getElementById('contactForm');
const contactStatus = document.getElementById('contactStatus');
const contactSubmit = document.getElementById('contactSubmit');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // UI state: enviando
        contactSubmit.disabled = true;
        contactSubmit.innerText = 'Enviando...';
        contactStatus.className = 'hidden text-sm font-medium text-center p-4 rounded';

        const payload = {
            name: document.getElementById('contactName').value,
            email: document.getElementById('contactEmail').value,
            message: document.getElementById('contactMessage').value
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok) {
                // Éxito
                contactStatus.innerText = '¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.';
                contactStatus.classList.add('bg-green-500/20', 'text-green-400');
                contactStatus.classList.remove('hidden');
                contactForm.reset();

                // Ocultar el mensaje de éxito después de 3 segundos
                setTimeout(() => {
                    contactStatus.classList.add('hidden');
                    contactStatus.classList.remove('bg-green-500/20', 'text-green-400');
                }, 3000);
            } else {
                // Error de validación o del servidor
                throw new Error(data.message || 'Error al enviar el mensaje');
            }
        } catch (error) {
            // Error general
            console.error('Contact Form Error:', error);
            contactStatus.innerText = error.message || 'Ocurrió un error inesperado al enviar. Inténtalo de nuevo.';
            contactStatus.classList.add('bg-red-500/20', 'text-red-400');
            contactStatus.classList.remove('hidden');

            // Ocultar mensaje de error tras 5 segundos
            setTimeout(() => {
                contactStatus.classList.add('hidden');
                contactStatus.classList.remove('bg-red-500/20', 'text-red-400');
            }, 5000);
        } finally {
            // Restaurar estado del botón
            contactSubmit.disabled = false;
            contactSubmit.innerText = 'Enviar Solicitud';
        }
    });
}
