const whatsappNumber = "5562981674423";
const whatsappMessage = "Olá, Jarbas! Vi sua página e quero conversar sobre uma solução para minha empresa.";

function abrirWhatsApp() {
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
}

const header = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const whatsappButtons = document.querySelectorAll("[data-whatsapp]");
const internalLinks = document.querySelectorAll('a[href^="#"]');
const revealElements = document.querySelectorAll(".reveal");
const currentYear = document.getElementById("currentYear");

function updateHeaderState() {
    header.classList.toggle("scrolled", window.scrollY > 20);
}

function closeMobileMenu() {
    menuToggle.classList.remove("active");
    navMenu.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
}

function toggleMobileMenu() {
    const isOpen = navMenu.classList.toggle("active");
    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
}

function setupRevealAnimation() {
    if (!("IntersectionObserver" in window)) {
        revealElements.forEach((element) => element.classList.add("visible"));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach((element) => observer.observe(element));
}

whatsappButtons.forEach((button) => {
    button.addEventListener("click", abrirWhatsApp);
});

menuToggle.addEventListener("click", toggleMobileMenu);

internalLinks.forEach((link) => {
    link.addEventListener("click", () => {
        closeMobileMenu();
    });
});

window.addEventListener("scroll", updateHeaderState);
window.addEventListener("resize", () => {
    if (window.innerWidth > 980) {
        closeMobileMenu();
    }
});

currentYear.textContent = new Date().getFullYear();
updateHeaderState();
setupRevealAnimation();
