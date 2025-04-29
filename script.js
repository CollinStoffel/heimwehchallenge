document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 80);
        });
        
        document.addEventListener('mousedown', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.6)';
        });
        
        document.addEventListener('mouseup', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        });
        
        // Cursor hover effect on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, input, textarea, .step, .prize, .lyrics-text, .video-item');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.opacity = '0.5';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.opacity = '1';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }
    
    // Header Scroll Effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const menu = document.querySelector('.menu');
    
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenuButton.classList.toggle('active');
            menu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close mobile menu when clicking a menu link
        document.querySelectorAll('.menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuButton.classList.remove('active');
                menu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }
    
    // Countdown Timer
    const countdownDate = new Date('May 16, 2025 23:59:59').getTime(); // Set specific deadline
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').innerText = days.toString().padStart(2, '0');
        document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
        document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
        
        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('days').innerText = '00';
            document.getElementById('hours').innerText = '00';
            document.getElementById('minutes').innerText = '00';
            document.getElementById('seconds').innerText = '00';
        }
    }
    
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
    
    // Reveal on Scroll
    const revealElements = document.querySelectorAll('.reveal-element');
    
    function revealOnScroll() {
        for (let i = 0; i < revealElements.length; i++) {
            const elementTop = revealElements[i].getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                setTimeout(() => {
                    revealElements[i].classList.add('active');
                }, (revealElements[i].dataset.delay || 0) * 1000);
            }
        }
    }
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Check on load
    
    // Audio Play Button
    const playButton = document.getElementById('playButton');
    const songAudio = document.getElementById('songAudio');
    
    if (playButton && songAudio) {
        // Preload audio
        songAudio.load();
        
        playButton.addEventListener('click', () => {
            if (songAudio.paused) {
                // Play the TikTok sound directly
                window.open('https://vm.tiktok.com/ZNd23p1tF/', '_blank');
                
                // Update button visually
                playButton.innerHTML = '<i class="fas fa-play"></i> SOUND ANHÖREN';
            } else {
                songAudio.pause();
                playButton.innerHTML = '<i class="fas fa-play"></i> SOUND ANHÖREN';
            }
        });
        
        songAudio.addEventListener('ended', () => {
            playButton.innerHTML = '<i class="fas fa-play"></i> SOUND ANHÖREN';
        });
    }
    
    // Stats Counter Animation & Remaining Days Update
    const statsSection = document.querySelector('.stats-counter');
    const remainingDaysStat = document.getElementById('remaining-days-stat');
    
    function updateRemainingDays() {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        const daysRemaining = Math.max(0, Math.floor(distance / (1000 * 60 * 60 * 24))); // Ensure non-negative
        if (remainingDaysStat) {
            remainingDaysStat.setAttribute('data-count', daysRemaining);
        }
    }
    
    function animateStatNumbers() {
        // Ensure remaining days data-count is set before animating
        updateRemainingDays(); 
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const startTime = Date.now();
            const startValue = 0;
            
            const step = () => {
                const currentTime = Date.now();
                const progress = Math.min((currentTime - startTime) / duration, 1);
                const easedProgress = easeOutQuart(progress);
                const currentValue = Math.floor(startValue + (target - startValue) * easedProgress);
                
                stat.textContent = currentValue;
                
                if (progress < 1) {
                    requestAnimationFrame(step);
                }
            };
            
            requestAnimationFrame(step);
        });
    }
    
    function easeOutQuart(x) {
        return 1 - Math.pow(1 - x, 4);
    }
    
    // Check if stats are in view
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStatNumbers();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add any additional global functions or event listeners here
}); 