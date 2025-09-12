// =======================
// Loader de Componentes
// =======================
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

    await Promise.all(
        components.map(component =>
            loadComponent(component.name, component.target)
        )
    );

    initializeInteractivity();
}

// =======================
// Inicialização Geral
// =======================
function initializeInteractivity() {
    // --- Menu Mobile ---
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }

    // --- Scroll Suave ---
    const navLinks = document.querySelectorAll('.nav-link, .btn[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                if (navMenu) navMenu.classList.remove('active');
                if (mobileMenu) mobileMenu.classList.remove('active');
            }
        });
    });

    // --- Botão voltar ao topo ---
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', function () {
            backToTopBtn.style.display =
                window.pageYOffset > 300 ? 'block' : 'none';
        });

        backToTopBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Inicializar Carrossel ---
    initCarousel();

    // --- WhatsApp Form ---
    initWhatsAppContactForm();

    console.log('BeautyGlow - Componentes carregados e interatividade inicializada!');
}

// =======================
// Carrossel
// =======================
function initCarousel() {
    const track = document.querySelector('.carousel-track');
    if (!track) return; // só ativa se o carrossel existir

    const slides = Array.from(track.children);
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const dots = document.querySelectorAll('.carousel-indicators .dot');

    let currentIndex = 0;

    function updateCarousel(index) {
        track.style.transform = `translateX(-${index * 100}%)`;
        slides.forEach((s, i) => s.classList.toggle('active', i === index));
        dots.forEach((d, i) => d.classList.toggle('active', i === index));
        currentIndex = index;
    }

    nextBtn?.addEventListener('click', () => {
        let index = (currentIndex + 1) % slides.length;
        updateCarousel(index);
    });

    prevBtn?.addEventListener('click', () => {
        let index = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel(index);
    });

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => updateCarousel(i));
    });

    // Auto-play
    setInterval(() => {
        let index = (currentIndex + 1) % slides.length;
        updateCarousel(index);
    }, 1000);

    updateCarousel(0);
}

// =======================
// WhatsApp Form
// =======================
const WHATSAPP_NUMBER = '556134567801';

function initWhatsAppContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    if (form.dataset.whatsappEnhanced === 'true') return;
    form.dataset.whatsappEnhanced = 'true';

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

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = form.querySelector('#name')?.value.trim() || '';
        const email = form.querySelector('#email')?.value.trim() || '';
        const phone = form.querySelector('#phone')?.value.trim() || '';
        const serviceSelect = form.querySelector('#service');
        const service = serviceSelect
            ? serviceSelect.options[serviceSelect.selectedIndex].text
            : '';
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



document.addEventListener('DOMContentLoaded', loadComponents);
