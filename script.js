// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.querySelector('.header');

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');

    // Animate Burger
    const bars = document.querySelectorAll('.bar');
    if (navMenu.classList.contains('active')) {
        bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
    } else {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }
});

// Close Mobile Menu when Link Clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');

        // Reset Burger
        const bars = document.querySelectorAll('.bar');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    });
});

// Sticky Header Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';

        header.style.borderBottom = '1px solid rgba(0, 0, 0, 0.05)';
    } else {
        header.style.boxShadow = 'none';

        header.style.borderBottom = 'none';
    }
});

// ScrollSpy: Highlight Active Menu Item
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 150)) { // 150px offset for trigger
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Scroll Animations (Intersection Observer)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 // Trigger when 10% visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-animate');
            // Optional: Stop observing once animated
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const animateElements = document.querySelectorAll('.animate-on-scroll');
animateElements.forEach(el => observer.observe(el));





/* --- Contact Form Email Logic --- */
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'Sending...';

        // parameters: service_id, template_id, template_params
        // We use .sendForm because it automatically grabs all inputs by 'name'
        emailjs.sendForm('service_3zia7ub', 'template_ly50xwj', this)
            .then(function () {
                btn.textContent = 'Sent Successfully!';
                btn.classList.add('btn-success');
                showToast('Your message has been sent successfully!', 'success');
                contactForm.reset();
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.classList.remove('btn-success');
                }, 3000);
            }, function (error) {
                btn.textContent = 'Failed to Send';
                showToast('Failed to send message. Please try again later.', 'error');
                console.error('Submission Error:', error);
                setTimeout(() => {
                    btn.textContent = originalText;
                }, 3000);
            });
    });
}


// Dynamic Year
function setCurrentYear() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    } else {
        console.error('Element #current-year not found');
    }
}


/* --- Toast Notification Helper --- */
function showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    // Icons based on type
    const icon = type === 'success' ? '<i class="fa-solid fa-check-circle toast-icon"></i>' : '<i class="fa-solid fa-circle-exclamation toast-icon"></i>';

    toast.innerHTML = `${icon}<span class="toast-message">${message}</span>`;

    container.appendChild(toast);

    // Trigger reflow for animation
    void toast.offsetWidth;
    toast.classList.add('show');

    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 400); // Wait for transition
    }, 4000);
}

document.addEventListener('DOMContentLoaded', setCurrentYear);
