// DOM Elements
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const themeToggle = document.getElementById('themeToggle');
const backToTop = document.getElementById('backToTop');
const messageForm = document.getElementById('messageForm');
const profileImage = document.getElementById('profileImage');
const typingText = document.getElementById('typing-text');
const currentYear = document.getElementById('currentYear');
const progressBar = document.createElement('div');
const loadingAnimation = document.createElement('div');

// Create loading animation
loadingAnimation.className = 'loading-animation';
loadingAnimation.innerHTML = '<div class="loader"></div>';
document.body.appendChild(loadingAnimation);

// Create progress bar
progressBar.className = 'progress-bar';
document.body.appendChild(progressBar);

// Typing Effect Variables
const typingWords = ['Software Developer', 'Ethical Hacker', 'Web Developer', 'IT Student', 'Cybersecurity Enthusiast', 'C++ Programmer', 'Problem Solver'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Dark/Light Mode Toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Save preference to localStorage
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    
    // Add animation effect
    themeToggle.style.transform = 'rotate(180deg) scale(1.2)';
    setTimeout(() => {
        themeToggle.style.transform = 'rotate(0) scale(1)';
    }, 300);
    
    // Show notification
    showNotification(`Switched to ${isDarkMode ? 'Dark' : 'Light'} Mode`, 'success');
});

// Check for saved theme preference
const savedDarkMode = localStorage.getItem('darkMode');
if (savedDarkMode === 'true') {
    document.body.classList.add('dark-mode');
}

// Active navigation link highlighting
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').substring(1) === current) {
            item.classList.add('active');
        }
    });
    
    // Back to top button visibility
    if (window.pageYOffset > 300) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
    
    // Update progress bar
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + "%";
});

// Back to top functionality
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form submission
messageForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Show success message with student flair
    showNotification(`🎓 Thanks ${name}! Message sent from a King David Academy student! I'll reply soon!`, 'success');
    
    // Add a fun "student is typing" effect
    const submitBtn = this.querySelector('.btn');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    // Simulate sending delay (in real use, this would be actual form submission)
    setTimeout(() => {
        submitBtn.textContent = 'Message Sent! ✓';
        submitBtn.style.backgroundColor = 'var(--secondary-color)';
        
        // Reset after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.backgroundColor = '';
            this.reset();
        }, 3000);
    }, 1500);
});

// Typing Effect Function
function typeEffect() {
    const currentWord = typingWords[wordIndex];
    
    if (isDeleting) {
        // Deleting characters
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        // Typing characters
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    // Check if word is complete
    if (!isDeleting && charIndex === currentWord.length) {
        // Pause at the end of the word
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        // Move to next word
        isDeleting = false;
        wordIndex = (wordIndex + 1) % typingWords.length;
        typingSpeed = 500;
    }
    
    setTimeout(typeEffect, typingSpeed);
}

// Start typing effect
setTimeout(typeEffect, 1000);

// Image loading error handling
if (profileImage) {
    profileImage.addEventListener('error', function() {
        this.style.display = 'none';
        const fallback = this.nextElementSibling;
        if (fallback && fallback.classList.contains('image-fallback')) {
            fallback.style.opacity = '1';
        }
    });
    
    // Check if image loaded successfully
    if (profileImage.complete && profileImage.naturalHeight === 0) {
        profileImage.style.display = 'none';
        const fallback = profileImage.nextElementSibling;
        if (fallback && fallback.classList.contains('image-fallback')) {
            fallback.style.opacity = '1';
        }
    } else {
        // Add zoom effect on image load
        profileImage.style.opacity = '0';
        profileImage.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            profileImage.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            profileImage.style.opacity = '1';
            profileImage.style.transform = 'scale(1)';
        }, 300);
    }
}

// Set current year in footer
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// Notification function with student style
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Add student emoji for fun
    const emoji = type === 'success' ? '🎓' : '⚠️';
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 1.5rem;">${emoji}</span>
            <span>${message}</span>
        </div>
    `;
    
    // Style the notification
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 20px';
    notification.style.backgroundColor = type === 'success' ? 'var(--secondary-color)' : '#c64600';
    notification.style.color = 'white';
    notification.style.borderRadius = '10px';
    notification.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
    notification.style.zIndex = '10000';
    notification.style.transform = 'translateX(150%)';
    notification.style.transition = 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    notification.style.maxWidth = '350px';
    notification.style.fontWeight = '500';
    notification.style.borderLeft = '5px solid var(--primary-color)';
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(150%)';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 500);
    }, 5000);
}

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add hover effect to skill items
document.querySelectorAll('.skill-item').forEach(skill => {
    // Add skill level animation
    const skillLevel = document.createElement('div');
    skillLevel.className = 'skill-level';
    const skillLevelBar = document.createElement('div');
    skillLevelBar.className = 'skill-level-bar';
    skillLevel.appendChild(skillLevelBar);
    skill.appendChild(skillLevel);
    
    // Random skill level between 70-95% for demonstration
    const skillPercent = Math.floor(Math.random() * 25) + 70;
    
    skill.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(10px) scale(1.03)';
        skillLevelBar.style.width = `${skillPercent}%`;
    });
    
    skill.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0) scale(1)';
        skillLevelBar.style.width = '0';
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// Initialize with current year
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// Add student learning effect to page elements
document.addEventListener('DOMContentLoaded', () => {
    // Add code comments to some sections (student learning style)
    const aboutSection = document.querySelector('.about-text');
    if (aboutSection) {
        const codeComment = document.createElement('p');
        codeComment.className = 'code-comment';
        codeComment.textContent = '// This portfolio is a work in progress - learning as I build!';
        aboutSection.appendChild(codeComment);
    }
    
    // Add student badge to hero title
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        const studentBadge = document.createElement('span');
        studentBadge.className = 'student-badge';
        studentBadge.textContent = 'Student Developer';
        heroTitle.appendChild(studentBadge);
    }
    
    // Hide loading animation after page loads
    setTimeout(() => {
        loadingAnimation.classList.add('hidden');
        setTimeout(() => {
            if (loadingAnimation.parentNode) {
                document.body.removeChild(loadingAnimation);
            }
        }, 500);
    }, 1500);
    
    // Add fun hover effects to all interactive elements
    const interactiveElements = document.querySelectorAll('.btn, .skill-item, .project-card, .education-item, .contact-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.cursor = 'pointer';
        });
    });
    
    // Add a subtle pulse animation to the theme toggle
    setInterval(() => {
        if (!document.body.classList.contains('dark-mode')) {
            themeToggle.style.boxShadow = '0 0 15px rgba(26, 95, 180, 0.5)';
            setTimeout(() => {
                themeToggle.style.boxShadow = 'var(--shadow)';
            }, 1000);
        }
    }, 5000);
});

// Add a fun Easter egg - console message
console.log('%c👋 Hello! Welcome to NSHUTI Emmanuel\'s Portfolio!', 'color: #1a5fb4; font-size: 16px; font-weight: bold;');
console.log('%c💻 This portfolio was built with HTML, CSS & JavaScript by a King David Academy student!', 'color: #26a269; font-size: 14px;');
console.log('%c🎯 Looking for a passionate IT student? Contact me at +250 783805137', 'color: #c64600; font-size: 14px;');

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Toggle dark mode with Ctrl+D
    if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        themeToggle.click();
        showNotification('Dark mode toggled with keyboard shortcut!', 'success');
    }
    
    // Scroll to top with Ctrl+ArrowUp
    if (e.ctrlKey && e.key === 'ArrowUp') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // Scroll to down with Ctrl+Arrowdown
    if (e.ctrlKey && e.key === 'Arrowdown') {
        e.preventDefault();
        window.scrollTo({ down: 100, behavior: 'smooth' });
    }
});