// scripts.js - interactions, animations, theme toggle, tilt effect, GSAP

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const themeToggle = document.getElementById('themeToggle');
    const body = document.documentElement; // to set data-theme
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuClose = document.getElementById('menuClose');
    const gotoProjects = document.getElementById('gotoProjects');

    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'dark';
        setTheme(current === 'dark' ? 'light' : 'dark');
    });

    function setTheme(t) {
        document.documentElement.setAttribute('data-theme', t);
        localStorage.setItem('theme', t);
        themeToggle.textContent = t === 'dark' ? '🌙' : '☀️';
    }

    // Mobile menu controls
    menuBtn && menuBtn.addEventListener('click', openMenu);
    menuClose && menuClose.addEventListener('click', closeMenu);
    window.closeMenu = closeMenu;

    function openMenu() { mobileMenu.style.transform = 'translateX(0)'; }

    function closeMenu() { mobileMenu.style.transform = 'translateX(100%)'; }

    // Smooth scroll to projects
    gotoProjects && gotoProjects.addEventListener('click', () => {
        document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
    });

    // GSAP animations
    if (window.gsap) {
        // Entry animations
        gsap.from("h1", { opacity: 0, y: 30, duration: 0.9 });
        gsap.from(".project-card", {
            scrollTrigger: { trigger: ".projects-grid", start: "top 80%" },
            opacity: 0,
            y: 40,
            stagger: 0.15,
            duration: 0.9
        });
        gsap.from("#heroOrb", { opacity: 0, scale: 0.8, duration: 1 });

        // 🔄 Looping animations
        // Hero orb floating pulse
        gsap.to("#heroOrb", {
            y: -20,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        // Project cards subtle bobbing
        gsap.to(".project-card", {
            y: -10,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: 0.3
        });
    }

    // 3D hover (tilt) effect for elements with data-tilt
    document.querySelectorAll('[data-tilt]').forEach(card => {
        const mediaImage = card.querySelector('img');
        const bounds = () => card.getBoundingClientRect();

        card.addEventListener('mousemove', (e) => {
            const b = bounds();
            const px = (e.clientX - b.left) / b.width;
            const py = (e.clientY - b.top) / b.height;
            const rotateX = (py - 0.5) * -8;
            const rotateY = (px - 0.5) * 12;

            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;

            if (mediaImage) {
                mediaImage.style.transform = `scale(1.06) translate(${(px-0.5)*10}px, ${(py-0.5)*6}px)`;
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            if (mediaImage) mediaImage.style.transform = '';
        });
    });

    // Optional: Contact form fallback to API
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async(e) => {
            // If you want to POST to your backend API instead of Formspree:
            // e.preventDefault();
            // const data = new FormData(contactForm);
            // const payload = Object.fromEntries(data.entries());
            // await fetch('/api/contact', { 
            //   method:'POST', 
            //   headers:{'Content-Type':'application/json'}, 
            //   body: JSON.stringify(payload) 
            // });
            // show toast...
        });
    }
});