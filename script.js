// Navbar functionality
const navbar = document.getElementById('navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        navLinks.classList.remove('active');
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Initialize Swiper for the home section
const homeSwiper = new Swiper('#home .swiper', {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    autoplay: {
        delay: 5000,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

// Initialize Swiper for the gallery section
const gallerySwiper = new Swiper('.gallerySwiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    autoplay: {
        delay: 5000,
    },
});

// GSAP animations
gsap.registerPlugin(ScrollTrigger);

gsap.from('#home h1', {
    duration: 1,
    y: -100,
    opacity: 0,
    ease: 'power3.out'
});

gsap.from('#home p', {
    duration: 1,
    y: 100,
    opacity: 0,
    ease: 'power3.out',
    delay: 0.5
});

gsap.from('#home .cta-button', {
    duration: 1,
    opacity: 0,
    ease: 'power3.out',
    delay: 1
});

// Animate sections on scroll
const animateSections = (elements, animationProperties) => {
    elements.forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            },
            ...animationProperties
        });
    });
};

animateSections(['.about-content', '.room-card', '.facility-item'], {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2
});

// OpenStreetMap integration
const map = L.map('map').setView([25.0800, 55.1361], 14);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([25.0800, 55.1361]).addTo(map)
    .bindPopup('New Horizon DXB Hostel')
    .openPopup();

// Form submission (you'd typically send this to a server)
const form = document.getElementById('contact-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message. We will get back to you soon!');
    form.reset();
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    } else {
        navbar.style.backgroundColor = 'var(--white)';
    }
});

// Back to top button functionality
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

backToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Booking button and dropdown functionality
const bookingButton = document.querySelector('.booking-button');
const bookingDropdown = document.querySelector('.booking-dropdown');
const bookingOptions = document.querySelectorAll('.booking-option');

bookingButton.addEventListener('click', () => {
  bookingDropdown.classList.toggle('active');
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!bookingButton.contains(e.target) && !bookingDropdown.contains(e.target)) {
    bookingDropdown.classList.remove('active');
  }
});

// Handle booking option clicks
bookingOptions.forEach(option => {
  option.addEventListener('click', (e) => {
    e.preventDefault();
    const platform = e.target.dataset.platform;
    let bookingUrl;

    switch (platform) {
      case 'hostelbooking':
        bookingUrl = 'https://www.hostelworld.com/'; // Replace with your actual HostelBooking.com link
        break;
      case 'booking':
        bookingUrl = 'https://www.booking.com/'; // Replace with your actual Booking.com link
        break;
      case 'agoda':
        bookingUrl = 'https://www.agoda.com/'; // Replace with your actual Agoda link
        break;
      case 'makemytrip':
        bookingUrl = 'https://www.makemytrip.com/'; // Replace with your actual MakeMyTrip link
        break;
      default:
        bookingUrl = '#';
    }

    window.open(bookingUrl, '_blank');
    bookingDropdown.classList.remove('active');
  });
});
