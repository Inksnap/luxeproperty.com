document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.12)';
            }
        });
    }
    
    // Favorite Buttons
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('liked');
            
            if (this.classList.contains('liked')) {
                this.textContent = '♥';
            } else {
                this.textContent = '♡';
            }
        });
    });
    
    // Animated Counter for Stats
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        };
        
        updateCounter();
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Contact Form
const contactForm = document.querySelector('#contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<span class="loading"></span> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            alert('Thank you for your message! We will contact you shortly.');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

const searchButton = document.querySelector('.search-container .btn-primary');
if (searchButton) {
    searchButton.addEventListener('click', function() {
        const location = document.querySelector('.search-container input').value;
        const propertyType = document.querySelector('.search-container select').value;
        const priceRange = document.querySelectorAll('.search-container input')[2].value;
        
        console.log('[v0] Search - Location:', location, 'Type:', propertyType, 'Price:', priceRange);
        
        alert('Searching for properties with these criteria...');
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.property-card, .agent-card, .benefit-card, .blog-card, .testimonial-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Property Gallery Image Switcher
const galleryThumbs = document.querySelectorAll('.property-gallery-thumbs img');
const galleryMain = document.querySelector('.property-gallery-main img');

if (galleryThumbs.length > 0 && galleryMain) {
    galleryThumbs.forEach(thumb => {
        thumb.addEventListener('click', function() {
            galleryMain.src = this.src;
            galleryThumbs.forEach(t => t.style.opacity = '0.7');
            this.style.opacity = '1';
        });
    });
}

// Mortgage Calculator
const calculateMortgage = document.getElementById('calculateMortgage');
if (calculateMortgage) {
    calculateMortgage.addEventListener('click', function() {
        const loanAmount = parseFloat(document.getElementById('loanAmount').value) || 0;
        const interestRate = parseFloat(document.getElementById('interestRate').value) || 0;
        const loanTerm = parseFloat(document.getElementById('loanTerm').value) || 0;
        
        if (loanAmount > 0 && interestRate > 0 && loanTerm > 0) {
            const monthlyRate = (interestRate / 100) / 12;
            const numberOfPayments = loanTerm * 12;
            const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                                  (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
            
            const resultDiv = document.getElementById('mortgageResult');
            const monthlyPaymentEl = document.getElementById('monthlyPayment');
            
            if (resultDiv && monthlyPaymentEl) {
                monthlyPaymentEl.textContent = '$' + monthlyPayment.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
                resultDiv.style.display = 'block';
            }
        }
    });
}

// Property Comparison
let comparedProperties = [];

const compareCheckboxes = document.querySelectorAll('.compare-property');
const compareBar = document.getElementById('compareBar');
const compareCount = document.getElementById('compareCount');
const clearCompare = document.getElementById('clearCompare');
const compareNow = document.getElementById('compareNow');

if (compareCheckboxes.length > 0) {
    compareCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const propertyId = this.getAttribute('data-id');
            
            if (this.checked) {
                if (comparedProperties.length < 3) {
                    comparedProperties.push(propertyId);
                } else {
                    this.checked = false;
                    alert('You can compare up to 3 properties at a time.');
                    return;
                }
            } else {
                comparedProperties = comparedProperties.filter(id => id !== propertyId);
            }
            
            updateCompareBar();
        });
    });
}

function updateCompareBar() {
    if (compareBar && compareCount) {
        if (comparedProperties.length > 0) {
            compareBar.style.display = 'block';
            compareCount.textContent = comparedProperties.length;
            document.body.classList.add('compare-bar-active');
        } else {
            compareBar.style.display = 'none';
            document.body.classList.remove('compare-bar-active');
        }
    }
}

if (clearCompare) {
    clearCompare.addEventListener('click', function() {
        comparedProperties = [];
        compareCheckboxes.forEach(cb => cb.checked = false);
        updateCompareBar();
    });
}

if (compareNow) {
    compareNow.addEventListener('click', function() {
        if (comparedProperties.length > 0) {
            alert('Comparison feature would show properties: ' + comparedProperties.join(', '));
            // In a real implementation, this would navigate to a comparison page
        }
    });
}

// Newsletter Form
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        alert('Thank you for subscribing! We\'ll send updates to ' + email);
        this.reset();
    });
}

// Compare Button on Property Detail
const compareBtn = document.getElementById('compareBtn');
if (compareBtn) {
    compareBtn.addEventListener('click', function() {
        alert('Property added to comparison list!');
        this.textContent = 'Added to Compare';
        this.disabled = true;
    });
}
