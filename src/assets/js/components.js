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

    // WhatsApp contact form enhancement
    initWhatsAppContactForm();

    console.log('BeautyGlow - Componentes carregados e interatividade inicializada!');
}

// --- WhatsApp contact form logic ---
const WHATSAPP_NUMBER = '556134567801'; // Ajuste aqui se necessário

function initWhatsAppContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    // Prevent double bind
    if (form.dataset.whatsappEnhanced === 'true') return;
    form.dataset.whatsappEnhanced = 'true';

    // Ensure preview container exists
    let preview = form.querySelector('#whatsapp-preview');
    if (!preview) {
        preview = document.createElement('div');
        preview.id = 'whatsapp-preview';
        preview.style.display = 'none';
        preview.style.marginTop = '14px';
        preview.style.padding = '14px';
        preview.style.border = '1px solid #d3e5e5';
        preview.style.background = '#f3fbfb';
        preview.style.borderRadius = '10px';
        preview.style.fontSize = '.95rem';
        preview.style.lineHeight = '1.35';
        form.appendChild(preview);
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = form.querySelector('#name')?.value.trim() || '';
        const email = form.querySelector('#email')?.value.trim() || '';
        const phone = form.querySelector('#phone')?.value.trim() || '';
        const serviceSelect = form.querySelector('#service');
        const service = serviceSelect ? serviceSelect.options[serviceSelect.selectedIndex].text : '';
        const message = form.querySelector('#message')?.value.trim() || '';

        if (!name || !email || !message) {
            showInlineValidation(preview, 'Preencha os campos obrigatórios (Nome, E-mail, Mensagem).');
            return;
        }

        const text = `Olá, meu nome é ${name}.\nE-mail: ${email}\nTelefone: ${phone || 'Não informado'}\nServiço: ${service}\nMensagem: ${message}`;

        renderWhatsAppPreview(preview, text);

        const encoded = encodeURIComponent(text);
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
    });
}

function renderWhatsAppPreview(previewEl, text) {
    previewEl.style.display = 'block';
    previewEl.innerHTML = `
        <strong style="display:block;margin-bottom:6px;color:#227b75;">Pré-visualização da mensagem:</strong>
        <pre style="margin:0;white-space:pre-wrap;font-family:inherit;">${text}</pre>
        <div style="margin-top:10px;font-size:.8rem;color:#227b75;background:#e6f7f6;padding:6px 8px;border-radius:6px;">
            WhatsApp aberto em nova aba. Se não abriu,
            <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}" target="_blank" rel="noopener" style="color:#0d6d68;text-decoration:underline;">clique aqui</a>.
        </div>
    `;
}

function showInlineValidation(previewEl, msg) {
    previewEl.style.display = 'block';
    previewEl.innerHTML = `
        <div style="color:#b84747;font-weight:600;margin-bottom:6px;">Atenção:</div>
        <div style="color:#7a2e2e;">${msg}</div>
    `;
}
