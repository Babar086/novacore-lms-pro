/* ==================================================
   NovaCore LMS Pro
   script.js
   Part 1
================================================== */

"use strict";

/* ==========================
   DOM Elements
========================== */

const loader = document.getElementById("loader");

const scrollProgress = document.getElementById("scrollProgress");

const menuToggle = document.getElementById("menuToggle");

const mobileMenu = document.getElementById("mobileMenu");

/* ==========================
   Loader
========================== */

window.addEventListener("load", () => {

    if (!loader) return;

    setTimeout(() => {

        loader.style.opacity = "0";

        loader.style.visibility = "hidden";

        loader.style.pointerEvents = "none";

    }, 600);

});

/* ==========================
   Scroll Progress Bar
========================== */

function updateScrollProgress() {

    if (!scrollProgress) return;

    const scrollTop =
        document.documentElement.scrollTop ||
        document.body.scrollTop;

    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress =
        scrollHeight > 0
            ? (scrollTop / scrollHeight) * 100
            : 0;

    scrollProgress.style.width = `${progress}%`;

}

window.addEventListener("scroll", updateScrollProgress);

/* ==========================
   Mobile Menu Toggle
========================== */

if (menuToggle && mobileMenu) {

    menuToggle.addEventListener("click", () => {

        mobileMenu.classList.toggle("active");

    });

}

/* ==========================
   Close Menu On Link Click
========================== */

const mobileLinks =
    document.querySelectorAll("#mobileMenu a");

mobileLinks.forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("active");

    });

});

/* ==========================
   ESC Key Closes Menu
========================== */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        mobileMenu.classList.remove("active");

    }

});

/* ==========================
   Initialize
========================== */

updateScrollProgress();
/* ==================================================
   NovaCore LMS Pro
   script.js
   Part 2
================================================== */

/* ==========================
   Active Navigation Links
========================== */

const sections = document.querySelectorAll("section[id]");

const navLinks = document.querySelectorAll(
    ".navbar a, #mobileMenu a"
);

function updateActiveNav() {

    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {

        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute("id");

        if (
            scrollPosition >= top &&
            scrollPosition < top + height
        ) {

            navLinks.forEach(link => {

                link.classList.remove("active");

                if (
                    link.getAttribute("href") === `#${id}`
                ) {

                    link.classList.add("active");

                }

            });

        }

    });

}

window.addEventListener("scroll", updateActiveNav);

/* ==========================
   Reveal On Scroll
========================== */

const revealElements = document.querySelectorAll(
    ".course-card, .feature-card, .teacher-card, .stat-box, .about-content, .about-image, .contact-info, .contact-form"
);

function revealOnScroll() {

    const trigger = window.innerHeight * 0.85;

    revealElements.forEach(element => {

        const top = element.getBoundingClientRect().top;

        if (top < trigger) {

            element.classList.add("show");

        }

    });

}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/* ==========================
   Statistics Counter
========================== */

const counters = document.querySelectorAll(".stat-box h2");

let counterStarted = false;

function startCounters() {

    if (counterStarted) return;

    const statsSection = document.querySelector(".stats");

    if (!statsSection) return;

    const top = statsSection.getBoundingClientRect().top;

    if (top > window.innerHeight - 120) return;

    counterStarted = true;

    counters.forEach(counter => {

        const text = counter.textContent;

        const target = parseInt(text.replace(/\D/g, ""), 10);

        const suffix = text.replace(/[0-9]/g, "");

        let current = 0;

        const increment = Math.max(1, Math.ceil(target / 80));

        const timer = setInterval(() => {

            current += increment;

            if (current >= target) {

                current = target;

                clearInterval(timer);

            }

            counter.textContent = current + suffix;

        }, 20);

    });

}

window.addEventListener("scroll", startCounters);
window.addEventListener("load", startCounters);

/* ==========================
   Prevent Empty Links
========================== */

document.querySelectorAll('a[href="#"]').forEach(link => {

    link.addEventListener("click", event => {

        event.preventDefault();

    });

});

/* ==========================
   Initialize
========================== */

updateActiveNav();
revealOnScroll();
startCounters();
/* ==================================================
   NovaCore LMS Pro
   script.js
   Part 3
================================================== */

/* ==========================
   Contact Form Placeholder
========================== */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        alert(
            "Thank you! Your message has been received. Backend integration will be added in the next phase."
        );

        contactForm.reset();

    });

}

/* ==========================
   Header Shadow On Scroll
========================== */

const header = document.querySelector(".header");

function updateHeader() {

    if (!header) return;

    if (window.scrollY > 40) {

        header.style.boxShadow =
            "0 12px 30px rgba(15,23,42,.12)";

    } else {

        header.style.boxShadow =
            "0 12px 30px rgba(15,23,42,.08)";

    }

}

window.addEventListener("scroll", updateHeader);

/* ==========================
   Current Year (Future Ready)
========================== */

const yearElement = document.getElementById("currentYear");

if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

}

/* ==========================
   Disable Buttons
   (Frontend Placeholder)
========================== */

document
    .querySelectorAll(".login-btn, .register-btn")
    .forEach(button => {

        button.addEventListener("click", () => {

            alert(
                "This feature will be connected with the backend in the next phase."
            );

        });

    });

/* ==========================
   Initialize
========================== */

updateHeader();
