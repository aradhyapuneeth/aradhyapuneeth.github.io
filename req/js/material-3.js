// Sonar-Inspired Portfolio JavaScript
// Complete implementation for Puneeth Aradhya Portfolio

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Sonar Portfolio initializing...');
    
    // Initialize all components
    initializeLoader();
    initializeSmoothScrolling();
    initializeAnimations();
    initializeChatWidget();
    initializeScrollEffects();
});

// ===== LOADER FUNCTIONALITY =====
function initializeLoader() {
    console.log('🔄 Initializing Sonar loader...');
    
    const loader = document.querySelector('.sonar-loader-wrapper');
    const progressBar = document.querySelector('.progress-fill');
    const progressPercentage = document.querySelector('.progress-percentage');
    const stages = document.querySelectorAll('.stage');
    
    console.log('Found elements:', { 
        loader: !!loader, 
        progressBar: !!progressBar, 
        progressPercentage: !!progressPercentage, 
        stagesCount: stages.length 
    });
    
    if (!loader || !progressBar || !progressPercentage) {
        console.error('❌ Loader elements not found');
        hideLoader();
        return;
    }
    
    // Prevent page scroll while loading
    document.body.style.overflow = 'hidden';
    
    let progress = 0;
    let currentStage = 0;
    const duration = 3000; // 3 seconds
    const updateInterval = 50; // Update every 50ms
    const increment = 100 / (duration / updateInterval);
    
    console.log('▶️ Starting progress animation...');
    
    const progressInterval = setInterval(() => {
        progress += increment;
        const roundedProgress = Math.min(Math.round(progress), 100);
        
        // Update progress bar and percentage
        progressBar.style.width = `${roundedProgress}%`;
        progressPercentage.textContent = `${roundedProgress}%`;
        
        // Log progress occasionally
        if (roundedProgress % 25 === 0 && roundedProgress > 0) {
            console.log(`⏳ Progress: ${roundedProgress}%`);
        }
        
        // Update stages
        const newStageIndex = Math.floor((progress / 100) * stages.length);
        if (newStageIndex !== currentStage && newStageIndex < stages.length) {
            // Remove active from previous stage
            if (stages[currentStage]) {
                stages[currentStage].classList.remove('active');
                stages[currentStage].classList.add('complete');
            }
            // Add active to current stage
            if (stages[newStageIndex]) {
                stages[newStageIndex].classList.add('active');
            }
            currentStage = newStageIndex;
            console.log(`🔄 Stage changed to: ${newStageIndex + 1}`);
        }
        
        // Complete loading
        if (progress >= 100) {
            console.log('✅ Loading complete!');
            clearInterval(progressInterval);
            
            // Mark all stages as complete
            stages.forEach(stage => {
                stage.classList.add('complete');
                stage.classList.remove('active');
            });
            
            // Hide loader after a brief pause
            setTimeout(() => {
                hideLoader();            }, 800);
        }
    }, updateInterval);
}

function hideLoader() {
    console.log('🎭 Hiding loader...');
    
    const loader = document.querySelector('.sonar-loader-wrapper');
    if (loader) {
        loader.style.transition = 'all 0.6s ease';
        loader.style.opacity = '0';
        loader.style.transform = 'scale(1.05)';
        loader.style.filter = 'blur(5px)';
        
        setTimeout(() => {
            loader.style.display = 'none';
            document.body.style.overflow = 'auto';
            console.log('🎉 Website ready!');
            
            // Initialize remaining components after loader is hidden
            initializeNavigation();
            initializeChatWidget();
            initializeScrollAnimations();
            initializeAnimations();
            initializeSmoothScrolling();
        }, 600);
    }
}

// ===== NAVIGATION FUNCTIONALITY =====
function initializeNavigation() {
    console.log('🧭 Initializing navigation...');
    
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) {
                navMenu.classList.remove('active');
            }
            if (navToggle) {
                navToggle.classList.remove('active');
            }
        });
    });
    
    // Update active link on scroll
    window.addEventListener('scroll', throttle(updateActiveNavLink, 100));
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        
        if (scrollPos >= top && scrollPos <= top + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===== CHAT WIDGET FUNCTIONALITY =====
function initializeChatWidget() {
    console.log('💬 Initializing chat widget...');
    
    const chatToggle = document.getElementById('chatToggle');
    const chatWidget = document.getElementById('chatWidget');
    const chatClose = document.getElementById('chatClose');
    const chatSend = document.getElementById('chatSend');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    
    if (!chatToggle || !chatWidget) {
        console.log('⚠️ Chat elements not found');
        return;
    }
    
    // Toggle chat widget
    chatToggle.addEventListener('click', () => {
        chatWidget.classList.toggle('active');
        if (chatWidget.classList.contains('active')) {
            // Add welcome message if messages are empty
            if (chatMessages && chatMessages.children.length === 0) {
                addChatMessage("Hi! I'm here to help you learn about Puneeth's DevOps expertise. Ask me anything!", 'bot');
            }
        }
    });
    
    // Close chat
    if (chatClose) {
        chatClose.addEventListener('click', () => {
            chatWidget.classList.remove('active');
        });
    }
    
    // Send message
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addChatMessage(message, 'user');
            chatInput.value = '';
            
            // Simulate bot response
            setTimeout(() => {
                const response = generateBotResponse(message);
                addChatMessage(response, 'bot');
            }, 1000);
        }
    }
    
    if (chatSend) {
        chatSend.addEventListener('click', sendMessage);
    }
    
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
}

function addChatMessage(message, sender) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;
    
    messageDiv.innerHTML = `
        <div class="message-content">
            ${message}
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateBotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    if (message.includes('devops') || message.includes('experience')) {
        return "Puneeth has 8+ years of DevOps experience at Accenture, specializing in CI/CD pipelines, cloud architecture, and automation. He's reduced deployment time by 70% and manual work by 85%!";
    }
    
    if (message.includes('cloud') || message.includes('aws') || message.includes('azure')) {
        return "Puneeth is expert in cloud platforms, particularly AWS and Azure. He's successfully migrated legacy applications to cloud with zero downtime and implemented scalable infrastructure solutions.";
    }
    
    if (message.includes('automation') || message.includes('script')) {
        return "Automation is Puneeth's specialty! He's developed numerous automation scripts using Python, Linux, and Infrastructure as Code tools, eliminating 85% of manual work.";
    }
    
    if (message.includes('award') || message.includes('recognition')) {
        return "Puneeth has received multiple awards including the Accenture Celebrates Excellence Individual award and the pinNAcle Collaborator award for his outstanding contributions to automation and teamwork.";
    }
    
    if (message.includes('contact') || message.includes('hire') || message.includes('work')) {
        return "You can reach Puneeth through the contact section below, via LinkedIn, or email. He's based in Bengaluru, India and available for exciting DevOps projects!";
    }
    
    if (message.includes('skills') || message.includes('technology')) {
        return "Puneeth's core technologies include Docker, Jenkins, AWS, Azure, Python, Linux, Splunk, Terraform, and various CI/CD tools. He's expert in Infrastructure as Code and security monitoring.";
    }
    
    return "That's a great question! Puneeth has extensive experience in DevOps, cloud architecture, automation, and CI/CD. Feel free to explore his portfolio sections above to learn more, or ask me something specific!";
}

// ===== SCROLL ANIMATIONS =====
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.skill-card, .feature-card, .experience-card, .award-card, .contact-card, .achievement-card');
    animateElements.forEach(el => observer.observe(el));
}

function initializeAnimations() {
    // Counter animation for stats
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = stat.textContent;
        const isPercentage = target.includes('%');
        const isPlus = target.includes('+');
        const numValue = parseInt(target.replace(/[^\d]/g, ''));
        
        animateCounter(stat, numValue, isPercentage, isPlus);
    });
}

function animateCounter(element, target, isPercentage = false, isPlus = false) {
    let current = 0;
    const increment = target / 50; // 50 steps
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        let displayValue = Math.floor(current);
        if (isPercentage) displayValue += '%';
        if (isPlus) displayValue += '+';
        
        element.textContent = displayValue;
    }, 50);
}

// ===== SMOOTH SCROLLING =====
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed nav
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== UTILITY FUNCTIONS =====
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== PERFORMANCE & ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Optimize images
function optimizeImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
}

// Initialize optimizations
setTimeout(optimizeImages, 1000);

// ===== RESPONSIVE HANDLERS =====
window.addEventListener('resize', debounce(() => {
    // Close mobile menu on resize
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.getElementById('navToggle');
    
    if (window.innerWidth > 768) {
        if (navMenu) navMenu.classList.remove('active');
        if (navToggle) navToggle.classList.remove('active');
    }
}, 250));

// ===== ACCESSIBILITY =====
document.addEventListener('keydown', function(e) {
    // Close chat with Escape key
    if (e.key === 'Escape') {
        const chatWidget = document.getElementById('chatWidget');
        if (chatWidget && chatWidget.classList.contains('active')) {
            chatWidget.classList.remove('active');
        }
        
        // Close mobile menu
        const navMenu = document.getElementById('navMenu');
        const navToggle = document.getElementById('navToggle');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
        }
    }
});

// ===== PRELOADER ENHANCEMENTS =====
function preloadCriticalResources() {
    const criticalImages = [
        'ap.png'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Preload resources
preloadCriticalResources();

console.log('✅ Sonar Portfolio fully initialized!');

// ===== NAVIGATION FUNCTIONALITY =====
function initializeNavigation() {
    console.log('🧭 Initializing navigation...');
    
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) {
                navMenu.classList.remove('active');
            }
            if (navToggle) {
                navToggle.classList.remove('active');
            }
        });
    });
    
    // Update active link on scroll
    window.addEventListener('scroll', throttle(updateActiveNavLink, 100));
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        
        if (scrollPos >= top && scrollPos <= top + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===== CHAT WIDGET FUNCTIONALITY =====
function initializeChatWidget() {
    console.log('💬 Initializing chat widget...');
    
    const chatToggle = document.getElementById('chatToggle');
    const chatWidget = document.getElementById('chatWidget');
    const chatClose = document.getElementById('chatClose');
    const chatSend = document.getElementById('chatSend');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    
    if (!chatToggle || !chatWidget) {
        console.log('⚠️ Chat elements not found');
        return;
    }
    
    // Toggle chat widget
    chatToggle.addEventListener('click', () => {
        chatWidget.classList.toggle('active');
        if (chatWidget.classList.contains('active')) {
            // Add welcome message if messages are empty
            if (chatMessages && chatMessages.children.length === 0) {
                addChatMessage("Hi! I'm here to help you learn about Puneeth's DevOps expertise. Ask me anything!", 'bot');
            }
        }
    });
    
    // Close chat
    if (chatClose) {
        chatClose.addEventListener('click', () => {
            chatWidget.classList.remove('active');
        });
    }
    
    // Send message
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addChatMessage(message, 'user');
            chatInput.value = '';
            
            // Simulate bot response
            setTimeout(() => {
                const response = generateBotResponse(message);
                addChatMessage(response, 'bot');
            }, 1000);
        }
    }
    
    if (chatSend) {
        chatSend.addEventListener('click', sendMessage);
    }
    
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
}

function addChatMessage(message, sender) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;
    
    messageDiv.innerHTML = `
        <div class="message-content">
            ${message}
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateBotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    if (message.includes('devops') || message.includes('experience')) {
        return "Puneeth has 8+ years of DevOps experience at Accenture, specializing in CI/CD pipelines, cloud architecture, and automation. He's reduced deployment time by 70% and manual work by 85%!";
    }
    
    if (message.includes('cloud') || message.includes('aws') || message.includes('azure')) {
        return "Puneeth is expert in cloud platforms, particularly AWS and Azure. He's successfully migrated legacy applications to cloud with zero downtime and implemented scalable infrastructure solutions.";
    }
    
    if (message.includes('automation') || message.includes('script')) {
        return "Automation is Puneeth's specialty! He's developed numerous automation scripts using Python, Linux, and Infrastructure as Code tools, eliminating 85% of manual work.";
    }
    
    if (message.includes('award') || message.includes('recognition')) {
        return "Puneeth has received multiple awards including the Accenture Celebrates Excellence Individual award and the pinNAcle Collaborator award for his outstanding contributions to automation and teamwork.";
    }
    
    if (message.includes('contact') || message.includes('hire') || message.includes('work')) {
        return "You can reach Puneeth through the contact section below, via LinkedIn, or email. He's based in Bengaluru, India and available for exciting DevOps projects!";
    }
    
    if (message.includes('skills') || message.includes('technology')) {
        return "Puneeth's core technologies include Docker, Jenkins, AWS, Azure, Python, Linux, Splunk, Terraform, and various CI/CD tools. He's expert in Infrastructure as Code and security monitoring.";
    }
    
    return "That's a great question! Puneeth has extensive experience in DevOps, cloud architecture, automation, and CI/CD. Feel free to explore his portfolio sections above to learn more, or ask me something specific!";
}

// ===== SCROLL ANIMATIONS =====
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.skill-card, .feature-card, .experience-card, .award-card, .contact-card, .achievement-card');
    animateElements.forEach(el => observer.observe(el));
}

function initializeAnimations() {
    // Counter animation for stats
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = stat.textContent;
        const isPercentage = target.includes('%');
        const isPlus = target.includes('+');
        const numValue = parseInt(target.replace(/[^\d]/g, ''));
        
        animateCounter(stat, numValue, isPercentage, isPlus);
    });
}

function animateCounter(element, target, isPercentage = false, isPlus = false) {
    let current = 0;
    const increment = target / 50; // 50 steps
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        let displayValue = Math.floor(current);
        if (isPercentage) displayValue += '%';
        if (isPlus) displayValue += '+';
        
        element.textContent = displayValue;
    }, 50);
}

// ===== SMOOTH SCROLLING =====
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed nav
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== UTILITY FUNCTIONS =====
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== PERFORMANCE & ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Optimize images
function optimizeImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
}

// Initialize optimizations
setTimeout(optimizeImages, 1000);

// =                                                                                                        ==== RESPONSIVE HANDLERS =====
window.addEventListener('resize', debounce(() => {
    // Close mobile menu on resize
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.getElementById('navToggle');
    
    if (window.innerWidth > 768) {
        if (navMenu) navMenu.classList.remove('active');
        if (navToggle) navToggle.classList.remove('active');
    }
}, 250));

// ===== ACCESSIBILITY =====
document.addEventListener('keydown', function(e) {
    // Close chat with Escape key
    if (e.key === 'Escape') {
        const chatWidget = document.getElementById('chatWidget');
        if (chatWidget && chatWidget.classList.contains('active')) {
            chatWidget.classList.remove('active');
        }
        
        // Close mobile menu
        const navMenu = document.getElementById('navMenu');
        const navToggle = document.getElementById('navToggle');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
        }
    }
});

// ===== PRELOADER ENHANCEMENTS =====
function preloadCriticalResources() {
    const criticalImages = [
        'ap.png'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Preload resources
preloadCriticalResources();

console.log('✅ Sonar Portfolio fully initialized!');
    
    console.log('▶️ Starting progress animation...');
    
const progressInterval = setInterval(() => {
    progress += increment;
    const roundedProgress = Math.min(Math.round(progress), 100);
    
    // Update progress bar and percentage
    progressBar.style.width = `${roundedProgress}%`;
    progressPercentage.textContent = `${roundedProgress}%`;
    
    // Log progress occasionally
    if (roundedProgress % 25 === 0 && roundedProgress > 0) {
        console.log(`⏳ Progress: ${roundedProgress}%`);
    }
    
    // Update stages
    const newStageIndex = Math.floor((progress / 100) * stages.length);
    if (newStageIndex !== currentStage && newStageIndex < stages.length) {
        // Remove active from previous stage
        if (stages[currentStage]) {
            stages[currentStage].classList.remove('active');
            stages[currentStage].classList.add('complete');
        }
        // Add active to current stage
        if (stages[newStageIndex]) {
            stages[newStageIndex].classList.add('active');
        }
        currentStage = newStageIndex;
        console.log(`🔄 Stage changed to: ${newStageIndex + 1}`);
    }
    
    // Complete loading
    if (progress >= 100) {
        console.log('✅ Loading complete!');
        clearInterval(progressInterval);
        
        // Mark all stages as complete
        stages.forEach(stage => {
            stage.classList.add('complete');
            stage.classList.remove('active');
        });
        
        // Hide loader after a brief pause
        setTimeout(() => {
            hideLoader(loader);
        }, 800);
    }
}, updateInterval);

// Helper function to hide loader
function hideLoader(loader) {
    console.log('🎭 Hiding loader...');
    
    loader.style.transition = 'all 0.6s ease';
    loader.style.opacity = '0';
    loader.style.transform = 'scale(1.05)';
    loader.style.filter = 'blur(5px)';
    
    setTimeout(() => {
        loader.style.display = 'none';
        document.body.style.overflow = 'auto';
        console.log('🎉 Website ready!');
        
        // Initialize remaining components after loader is hidden
        initializeNavigation();
        initializeChatWidget();
        initializeScrollAnimations();
        initializeAnimations();
        initializeSmoothScrolling();
    }, 600);
}

// Navigation initialization
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!navbar) return;
    
    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
    
    // Navbar scroll effects
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.backdropFilter = 'none';
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Animation initialization
function initializeAnimations() {
    // Animate hero elements
    const heroElements = document.querySelectorAll('.hero-main-content > *, .profile-card-modern');
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Skill card hover effects
    const skillCards = document.querySelectorAll('.skill-card-modern');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.cta-button-primary, .skills-cta-button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Scroll effects
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe skill cards
    const skillCards = document.querySelectorAll('.skill-card-modern');
    skillCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        scrollObserver.observe(card);
    });
}

// Advanced AI Chatbot functionality
function initializeChatbot() {
    const chatBtn = document.getElementById('chatBtn');
    const chatPopup = document.getElementById('chatPopup');
    const closeChat = document.getElementById('closeChat');
    const sendMessage = document.getElementById('sendMessage');
    const userMessageInput = document.getElementById('userMessage');
    const chatMessages = document.getElementById('chatMessages');

    if (!chatBtn || !chatPopup) return;

    // Toggle chat popup
    chatBtn.addEventListener('click', function() {
        const isActive = chatPopup.classList.contains('active');
        chatPopup.classList.toggle('active');
        chatBtn.classList.toggle('active');
        
        // Add pulse animation when opening
        if (!isActive) {
            chatBtn.style.animation = 'none';
            setTimeout(() => {
                chatBtn.style.animation = '';
            }, 100);
        }
    });

    // Close chat popup
    if (closeChat) {
        closeChat.addEventListener('click', function() {
            chatPopup.classList.remove('active');
            chatBtn.classList.remove('active');
        });
    }

    // Handle suggestion chips
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('suggestion-chip')) {
            const text = e.target.getAttribute('data-text');
            if (text) {
                userMessageInput.value = text;
                sendUserMessage();
            }
        }
    });

    // Send message when clicking send button
    if (sendMessage) {
        sendMessage.addEventListener('click', sendUserMessage);
    }

    // Send message when pressing Enter
    if (userMessageInput) {
        userMessageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendUserMessage();
            }
        });
    }

    function sendUserMessage() {
        const message = userMessageInput.value.trim();
        if (message === '') return;

        // Add user message to chat
        addMessage(message, 'user');
        userMessageInput.value = '';

        // Show typing indicator
        showTypingIndicator();

        // Send message to backend
        fetch('http://127.0.0.1:5000/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message }),
        })
        .then(response => response.json())
        .then(data => {
            // Remove typing indicator
            hideTypingIndicator();

            // Display bot response
            if (data.reply && data.reply.length > 0) {
                if (Array.isArray(data.reply)) {
                    data.reply.forEach((reply, index) => {
                        setTimeout(() => {
                            addMessage(reply, 'bot');
                        }, index * 300);
                    });
                } else {
                    addMessage(data.reply, 'bot');
                }
            } else {
                addMessage('Sorry, I could not process your request.', 'bot');
            }
        })
        .catch(error => {
            // Remove typing indicator
            hideTypingIndicator();
            
            console.error('Error:', error);
            addMessage('Sorry, there was an error processing your request. Please make sure the chatbot server is running.', 'bot');
        });
    }

    function addMessage(content, sender) {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender}-message`;
        
        if (sender === 'user') {
            messageElement.innerHTML = `
                <div class="message-content">${content}</div>
            `;
        } else {
            messageElement.innerHTML = `
                <div class="bot-avatar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
                        <circle cx="9" cy="9" r="1"/>
                        <circle cx="15" cy="9" r="1"/>
                        <path d="M8 13a8 8 0 008 0"/>
                    </svg>
                </div>
                <div class="message-content">${typeof content === 'string' && content.includes('<') ? content : content}</div>
            `;
        }
        
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Add animation
        messageElement.style.opacity = '0';
        messageElement.style.transform = 'translateY(10px)';
        setTimeout(() => {
            messageElement.style.opacity = '1';
            messageElement.style.transform = 'translateY(0)';
        }, 50);
    }

    function showTypingIndicator() {
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'typing-indicator-message';
        typingIndicator.id = 'typing-indicator';
        typingIndicator.innerHTML = `
            <div class="bot-avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
                    <circle cx="9" cy="9" r="1"/>
                    <circle cx="15" cy="9" r="1"/>
                    <path d="M8 13a8 8 0 008 0"/>
                </svg>
            </div>
            <div class="typing-dots">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        chatMessages.appendChild(typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
}

// Interaction effects
function initializeInteractions() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // Add scroll progress bar
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--md-sys-color-primary), #764ba2);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

console.log('🔧 Material 3 JavaScript loaded successfully!');

// Sonar-Inspired Professional Loader
function initializeLoader() {
    console.log('Initializing loader...');
    const loader = document.querySelector('.sonar-loader-wrapper');
    const progressBar = document.querySelector('.progress-fill');
    const progressPercentage = document.querySelector('.progress-percentage');
    const stages = document.querySelectorAll('.stage');
    
    console.log('Found elements:', { 
        loader: !!loader, 
        progressBar: !!progressBar, 
        progressPercentage: !!progressPercentage, 
        stagesCount: stages.length 
    });
    
    if (!loader || !progressBar || !progressPercentage) {
        console.log('Missing loader elements, hiding loader');
        if (loader) {
            loader.style.display = 'none';
        }
        return;
    }
    
    let progress = 0;
    let currentStage = 0;
    const duration = 4000; // 4 seconds for smooth experience
    const increment = 100 / (duration / 50); // Update every 50ms
    
    console.log('Starting progress animation...');
    
    const progressInterval = setInterval(() => {
        progress += increment;
        
        // Update progress bar
        progressBar.style.width = `${Math.min(progress, 100)}%`;
        progressPercentage.textContent = `${Math.round(progress)}%`;
        
        if (Math.round(progress) % 20 === 0) { // Log every 20%
            console.log(`Progress: ${Math.round(progress)}%`);
        }
        
        // Update stages
        const newStageIndex = Math.floor((progress / 100) * stages.length);
        if (newStageIndex !== currentStage && newStageIndex < stages.length) {
            // Remove active from previous stage
            if (stages[currentStage]) {
                stages[currentStage].classList.remove('active');
            }
            // Add active to current stage
            if (stages[newStageIndex]) {
                stages[newStageIndex].classList.add('active');
            }
            currentStage = newStageIndex;
            console.log(`Stage changed to: ${newStageIndex}`);
        }
        
        // Complete loading
        if (progress >= 100) {
            console.log('Loading complete, hiding loader');
            clearInterval(progressInterval);
            
            // Mark all stages as complete
            stages.forEach(stage => {
                stage.classList.add('complete');
                stage.classList.remove('active');
            });
            
            setTimeout(() => {
                loader.style.transition = 'all 0.6s ease';
                loader.style.opacity = '0';
                loader.style.transform = 'scale(1.05)';
                loader.style.filter = 'blur(5px)';
                
                setTimeout(() => {
                    loader.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    
                    // Initialize page animations after loader
                    initializePageAnimations();
                }, 600);
            }, 500);
        }
    }, 50);

// Fallback loader mechanism in case of issues
setTimeout(() => {
    const loader = document.querySelector('.sonar-loader-wrapper');
    if (loader && loader.style.display !== 'none') {
        console.log('Fallback: Force hiding loader after 6 seconds');
        loader.style.transition = 'all 0.6s ease';
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            document.body.style.overflow = 'auto';
            initializePageAnimations();
        }, 600);
    }
}, 3000);

// Also ensure body scroll is initially hidden
document.body.style.overflow = 'hidden';
}

// Initialize page animations after loader completes
function initializePageAnimations() {
    // Animate hero section elements
    const heroElements = document.querySelectorAll('.hero-main-content > *, .profile-card-modern');
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.8s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Animate skill cards
    const skillCards = document.querySelectorAll('.skill-card-modern');    skillCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.8s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 1000 + (index * 150));
    });
}

// Enhanced Navigation System
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!navbar) return;
    
    // Smooth scroll behavior for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
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
    
    // Navbar scroll effects
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.backdropFilter = 'none';
            navbar.style.boxShadow = 'none';
        }
        
        // Hide/show navbar on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Trigger entrance animations for main content
function triggerEntranceAnimations() {
    const hero = document.querySelector('.hero');
    const navbar = document.querySelector('.navbar');
    
    if (hero) {
        hero.style.animation = 'fadeInUp 1s ease-out forwards';
    }
    
    if (navbar) {
        navbar.style.animation = 'slideDown 0.8s ease-out forwards';
    }
}

// Modern scroll effects and skill card animations
function initializeScrollEffects() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Special animation for skill cards
                if (entry.target.classList.contains('skill-card-modern')) {
                    entry.target.style.animationPlayState = 'running';
                }
            }
        });
    }, observerOptions);
    
    // Observe skill cards and other animated elements
    const animatedElements = document.querySelectorAll('.skill-card-modern, .tech-item-preview');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        scrollObserver.observe(el);
    });
    
    // Parallax effect for hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-modern');
        if (heroSection) {
            heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Modern interactive animations
function initializeAnimations() {
    // Skill card hover effects
    const skillCards = document.querySelectorAll('.skill-card-modern');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Tech stack preview interactions
    const techItems = document.querySelectorAll('.tech-item-preview');
    techItems.forEach(item => {
        item.addEventListener('click', () => {
            // Add subtle click animation
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
                item.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // CTA button interactions
    const ctaButtons = document.querySelectorAll('.cta-button-primary, .skills-cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Modern typed text effect for hero section
function initializeTypedText() {
    const typedElement = document.querySelector('.typed-text');
    if (!typedElement) return;
    
    const phrases = [
        'DevOps Engineer',
        'Cloud Architect', 
        'Automation Expert',
        'Security Specialist'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typedElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

// Enhanced interactive features
function initializeInteractions() {
    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.cta-button-primary, .skills-cta-button, .btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple animation
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize scroll progress indicator
function initializeScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--md-sys-color-primary), #764ba2);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        background-color: rgba(255, 255, 255, 0.3);
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--md-sys-color-primary), var(--md-sys-color-secondary));
        z-index: 1000;
        transition: width 0.1s ease;
    }
    
    .message {
        transition: all 0.3s ease;
    }
    
    .typing-indicator {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 15px;
        background: rgba(255, 255, 255, 0.07);
        border-radius: 18px;
        align-self: flex-start;
        border-bottom-left-radius: 0;
        max-width: 100px;
        position: relative;
        margin-bottom: 15px;
    }
    
    .typing-indicator::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: -10px;
        width: 20px;
        height: 20px;
        background: rgba(255, 255, 255, 0.07);
        clip-path: polygon(100% 0, 100% 100%, 0 100%);
    }
    
    .typing-dot {
        width: 10px;
        height: 10px;
        background: var(--md-sys-color-on-surface-variant);
        border-radius: 50%;
        animation: typing-animation 1.5s infinite ease-in-out;
    }
    
    .typing-dot:nth-child(1) {
        animation-delay: 0s;
    }
    
    .typing-dot:nth-child(2) {
        animation-delay: 0.5s;
    }
    
    .typing-dot:nth-child(3) {
        animation-delay: 1s;
    }
    
    @keyframes typing-animation {
        0%, 100% {
            transform: translateY(0);
            opacity: 0.5;
        }
        50% {
            transform: translateY(-5px);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Add scroll progress bar to page
document.addEventListener('DOMContentLoaded', function() {
    const progressBar = document.createElement('div');
    progressBar.classList.add('scroll-progress');
    document.body.appendChild(progressBar);
});
