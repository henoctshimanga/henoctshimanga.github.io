const THEME_KEY = 'portfolio-theme';

function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (!hamburger || !navMenu) {
        return;
    }

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    hamburger.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            navMenu.classList.toggle('active');
        }
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

function setTheme(theme) {
    document.body.dataset.theme = theme;
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
        toggle.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
    }
    localStorage.setItem(THEME_KEY, theme);
}

function initThemeToggle() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const defaultTheme = savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(defaultTheme);

    const themeButton = document.getElementById('theme-toggle');
    if (themeButton) {
        themeButton.addEventListener('click', () => {
            const nextTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
            setTheme(nextTheme);
        });
    }
}

function initScrollEffects() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');

    function highlightNavLink() {
        const scrollPosition = window.scrollY + window.innerHeight / 5;
        let activeId = sections[0]?.id || '';

        sections.forEach(section => {
            if (section.offsetTop <= scrollPosition) {
                activeId = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + activeId);
        });
    }

    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink();

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

function initRevealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    reveals.forEach(el => observer.observe(el));
}

function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', event => {
        event.preventDefault();
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        if (name && email && message) {
            alert(`Thank you, ${name}! This is a static portfolio, so your message has not been sent. Please use the email address provided to contact me directly.`);
            contactForm.reset();
        } else {
            alert('Please complete all fields before sending your message.');
        }
    });
}

function init() {
    initMobileMenu();
    initThemeToggle();
    initScrollEffects();
    initRevealOnScroll();
    initContactForm();
}

document.addEventListener('DOMContentLoaded', init);
