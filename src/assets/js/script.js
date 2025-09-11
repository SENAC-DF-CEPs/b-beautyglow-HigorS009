// JavaScript básico para funcionalidades simples

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll para navegação
    const links = document.querySelectorAll('nav a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    console.log('BeautyGlow - Site carregado com sucesso!');
});
