document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Skills tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.category-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            
            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Show corresponding content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === category) {
                    content.classList.add('active');
                    // Animate skill bars when tab becomes active
                    animateSkillBars(content);
                }
            });
        });
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            const name = this.querySelector('#name').value.trim();
            const email = this.querySelector('#email').value.trim();
            const subject = this.querySelector('#subject').value.trim();
            const message = this.querySelector('#message').value.trim();
            
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
    
    // Load specific projects from GitHub API
    const loadProjects = async () => {
        const targetRepos = ['fakeusersapp', 'collectionsapp','spacewebapp','announcementswebapp'];
        
        try {
            const projectsGrid = document.getElementById('projects-grid');
            projectsGrid.innerHTML = '';
            
            // Fetch each specific repository
            for (const repoName of targetRepos) {
                try {
                    const response = await fetch(`https://api.github.com/repos/annzz1/${repoName}`);
                    if (response.ok) {
                        const repo = await response.json();
                        createProjectCard(repo, projectsGrid);
                    }
                } catch (error) {
                    console.error(`Error loading ${repoName}:`, error);
                }
            }
            
            // If no projects loaded, show fallback
            if (projectsGrid.children.length === 0) {
                projectsGrid.innerHTML = `
                    <div class="error-message">
                        <p>Projects are currently being updated. Please visit my <a href="https://github.com/annzz1" target="_blank">GitHub profile</a> to see my latest work.</p>
                    </div>
                `;
            }
            
        } catch (error) {
            console.error('Error loading projects:', error);
            document.getElementById('projects-grid').innerHTML = `
                <div class="error-message">
                    <p>Unable to load projects at this time. Please visit my <a href="https://github.com/annzz1" target="_blank">GitHub profile</a>.</p>
                </div>
            `;
        }
    };
    
    // Create project card
    const createProjectCard = (repo, container) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <div class="project-image">
                <div style="
                    background: linear-gradient(45deg, ${getRandomGradient()});
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--almond-light);
                    font-size: 1.5rem;
                    font-weight: 600;
                ">
                    ${formatRepoName(repo.name)}
                </div>
                <div class="project-overlay">
                    <div class="project-tech">
                        <span>${repo.language || 'C#'}</span>
                        ${repo.topics && repo.topics.length > 0 ? repo.topics.slice(0, 2).map(topic => `<span>${topic}</span>`).join('') : '<span>GitHub</span>'}
                    </div>
                </div>
            </div>
            <div class="project-content">
                <h3 class="project-title">${formatRepoName(repo.name)}</h3>
                <p class="project-description">${repo.description || 'A personal development project showcasing .NET development skills'}</p>
                <a href="${repo.html_url}" target="_blank" class="project-link">View Repository →</a>
            </div>
        `;
        container.appendChild(projectCard);
        
        // Add entrance animation
        setTimeout(() => {
            projectCard.style.opacity = '1';
            projectCard.style.transform = 'translateY(0)';
        }, 100);
    };
    
    // Helper functions for projects
    const formatRepoName = (name) => {
        return name
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/-/g, ' ')
            .replace(/(^\w|\s\w)/g, m => m.toUpperCase());
    };
    
    const getRandomGradient = () => {
        const gradients = [
            'var(--green-velvet), var(--plum-wine)',
            'var(--plum-wine), var(--golden-sandlewood)',
            'var(--golden-sandlewood), var(--green-velvet)',
            'var(--plum-wine), var(--carbon-powder)'
        ];
        return gradients[Math.floor(Math.random() * gradients.length)];
    };
    
    // Animate skill bars
    const animateSkillBars = (container = document) => {
        const skillBars = container.querySelectorAll('.skill-bar');
        
        skillBars.forEach((bar, index) => {
            const rect = bar.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
            
            if (isVisible && !bar.classList.contains('animated')) {
                const level = bar.querySelector('.skill-level');
                const width = bar.getAttribute('data-level');
                
                if (width) {
                    setTimeout(() => {
                        level.style.width = width + '%';
                        bar.classList.add('animated');
                    }, index * 100);
                }
            }
        });
    };
    
    // Initialize scroll reveal
    const initScrollReveal = () => {
        const elements = document.querySelectorAll('.section-header, .about-content, .skills-container, .contact-content');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
        
        // Animate skill bars on scroll
        animateSkillBars();
    };
    
    // Set up initial animations
    document.querySelectorAll('.section-header, .about-content, .skills-container, .contact-content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    // Project cards initial setup
    document.querySelectorAll('.project-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Navbar scroll effect and active link updates
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('.nav-container');
        const currentScrollY = window.scrollY;
        
        // Navbar styling
        if (currentScrollY > 50) {
            nav.style.padding = '10px 0';
            nav.style.background = 'rgba(16, 18, 17, 0.98)';
        } else {
            nav.style.padding = '20px 0';
            nav.style.background = 'rgba(16, 18, 17, 0.95)';
        }
        
        // Update active nav link
        const sections = document.querySelectorAll('section');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (currentScrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
        
        // Scroll animations
        initScrollReveal();
        
        lastScrollY = currentScrollY;
    });
    
    // Scroll-to-top button functionality
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Initialize everything
    loadProjects();
    initScrollReveal();
    
    // Animate skill bars for initially visible content
    setTimeout(() => {
        animateSkillBars();
    }, 500);
});