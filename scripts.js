// scripts.js - interactions, animations, theme toggle, tilt effect, GSAP
document.addEventListener('DOMContentLoaded', () => {
    // ===== Elements =====
    const themeToggle = document.getElementById('themeToggle');
    const root = document.documentElement;
    const header = document.querySelector('header');
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuClose = document.getElementById('menuClose');
    const gotoProjects = document.getElementById('gotoProjects');

    // ===== Load Theme =====
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    // ===== Animate Navbar on Page Load =====
    setTimeout(() => header.classList.add('show'), 100);

    // ===== Theme Toggle =====
    themeToggle.addEventListener('click', () => {
        const current = root.getAttribute('data-theme');
        const newTheme = current === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);

        // Navbar animation effect on theme change
        header.classList.remove('show');
        setTimeout(() => header.classList.add('show'), 50);
    });

    function setTheme(theme) {
        root.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        // Update icon (Feather icons)
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.setAttribute('data-feather', theme === 'dark' ? 'sun' : 'moon');
            feather.replace();
        } else {
            // fallback to emoji if no icon
            themeToggle.textContent = theme === 'dark' ? '🌙' : '☀️';
        }
    }

    // ===== Mobile Menu Controls =====
    if (menuBtn) menuBtn.addEventListener('click', () => mobileMenu.style.transform = 'translateX(0)');
    if (menuClose) menuClose.addEventListener('click', () => mobileMenu.style.transform = 'translateX(100%)');

    // ===== Smooth Scroll to Projects =====
    if (gotoProjects) {
        gotoProjects.addEventListener('click', () => {
            document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // ===== GSAP Animations =====
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

        // Looping animations
        gsap.to("#heroOrb", {
            y: -20,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
        gsap.to(".project-card", {
            y: -10,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: 0.3
        });
    }

    // ===== 3D Tilt Effect =====
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

    // ===== Optional Contact Form =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async(e) => {
            // Example placeholder: prevent default and show alert
            // e.preventDefault();
            // alert("Form submitted!");
        });
    }
});
