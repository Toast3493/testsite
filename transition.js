// ===== АНИМАЦИЯ ПЕРЕХОДА МЕЖДУ СТРАНИЦАМИ =====
(function() {
    // Создаём оверлей для анимации
    const overlay = document.createElement('div');
    overlay.id = 'page-transition-overlay';
    
    // Создаём 12 диагональных полос
    const stripsCount = 12;
    for (let i = 0; i < stripsCount; i++) {
        const strip = document.createElement('div');
        strip.className = 'transition-strip';
        strip.style.setProperty('--strip-index', i);
        overlay.appendChild(strip);
    }
    
    document.body.appendChild(overlay);

    // Перехватываем клики по ссылкам
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[href]');
        if (!link) return;
        
        const href = link.getAttribute('href');
        
        // Пропускаем внешние ссылки, якоря и пустые ссылки
        if (!href || 
            href.startsWith('#') || 
            href.startsWith('http://') || 
            href.startsWith('https://') ||
            href.startsWith('mailto:') ||
            link.hasAttribute('target')) {
            return;
        }

        // Проверяем, что это локальная HTML-страница
        if (!href.endsWith('.html') && !href.endsWith('/')) {
            return;
        }

        e.preventDefault();
        
        // Запускаем анимацию перехода
        overlay.classList.add('closing');
        
        setTimeout(() => {
            window.location.href = href;
        }, 800);
    });

    // При загрузке страницы показываем обратную анимацию
    window.addEventListener('load', function() {
        overlay.classList.add('opening');
        
        setTimeout(() => {
            overlay.classList.remove('opening');
        }, 1000);
    });
})();
