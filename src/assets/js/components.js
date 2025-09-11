// Component loading system
async function loadComponent(componentName, targetId) {
    try {
        const response = await fetch(`components/${componentName}.html`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.innerHTML = html;
        }
    } catch (error) {
        console.error(`Error loading component ${componentName}:`, error);
    }
}

// Load all components
async function loadComponents() {
    const components = [
        { name: 'header', target: 'header-component' },
        { name: 'hero', target: 'hero-component' },
        { name: 'sobre', target: 'about-component' },
        { name: 'services', target: 'services-component' },
        { name: 'contato', target: 'contact-component' },
        { name: 'local', target: 'local-component' },
        { name: 'footer', target: 'footer-component' }
    ];

    // Load all components in parallel
    await Promise.all(
        components.map(component => 
            loadComponent(component.name, component.target)
        )
    );

    // Initialize interactive features after components are loaded
    initializeInteractivity();
}

function initializeInteractivity() {
    // Mobile menu toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-link, .btn[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (navMenu) {
                    navMenu.classList.remove('active');
                }
                if (mobileMenu) {
                    mobileMenu.classList.remove('active');
                }
            }
        });
    });

    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });

        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.name || !data.email || !data.message) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Simulate form submission
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            this.reset();
        });
    }

    console.log('BeautyGlow - Componentes carregados e interatividade inicializada!');
}
