document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('.nav-links a, .cta-buttons a, .resume-btn').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const headerOffset = document.querySelector('.header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - headerOffset - 20; // -20px for extra padding

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }

            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                document.querySelector('.menu-toggle i').classList.remove('fa-times');
                document.querySelector('.menu-toggle i').classList.add('fa-bars');
            }
        });
    });

    // --- 2. Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.querySelector('i').classList.toggle('fa-bars');
        menuToggle.querySelector('i').classList.toggle('fa-times');
    });

    // --- 3. Animate elements on scroll (Intersection Observer) ---
    const animateOnScrollElements = document.querySelectorAll(
        '.about-grid, .skill-card, .project-card, .contact-form, .social-links'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animate-in class
                entry.target.classList.add('animate-in');

                // If it's a skill-card or project-card, apply a delay
                if (entry.target.classList.contains('skill-card') || entry.target.classList.contains('project-card')) {
                    const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`; // Staggered animation
                }

                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Start slightly before reaching the bottom
    });

    animateOnScrollElements.forEach(element => {
        observer.observe(element);
    });

    // --- 4. Dynamic 'role' text typing effect ---
    const roleTexts = ["Web Developer", "Frontend Engineer", "UI/UX Enthusiast", "Problem Solver"];
    let roleIndex = 0;
    let charIndex = 0;
    const roleTextElement = document.querySelector('.role-text');

    function typeEffect() {
        if (!roleTextElement) return;

        if (charIndex < roleTexts[roleIndex].length) {
            roleTextElement.textContent += roleTexts[roleIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeEffect, 100); // Typing speed
        } else {
            setTimeout(eraseEffect, 1500); // Pause before erasing
        }
    }

    function eraseEffect() {
        if (!roleTextElement) return;

        if (charIndex > 0) {
            roleTextElement.textContent = roleTexts[roleIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(eraseEffect, 50); // Erasing speed
        } else {
            roleIndex = (roleIndex + 1) % roleTexts.length;
            setTimeout(typeEffect, 500); // Pause before typing next role
        }
    }

    if (roleTextElement) {
        typeEffect();
    }

    // --- 5. Active link highlighting on scroll ---
    const sections = document.querySelectorAll('section[id]'); // Get all sections with an ID
    const navLinksList = document.querySelectorAll('.nav-links li a');

    function highlightNavLink() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - document.querySelector('.header').offsetHeight - 30; // Account for header height and some offset
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinksList.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink(); // Call on load to set initial active link

    // --- 6. Particles.js Initialization ---
    // Make sure you've included: <script src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"></script> in your HTML <head> or before </body>
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#00bcd4" // Primary color for particles
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#00bcd4", // Primary color for lines
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 6,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab" // Particles will react to mouse hover
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push" // Clicks will push particles away
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    } else {
        console.warn("Particles.js not found. Make sure the script is loaded.");
    }
});
