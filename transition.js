// ===== ПЛАВНЫЙ ПЕРЕХОД МЕЖДУ СТРАНИЦАМИ =====
(function() {
    // Создаём оверлей для анимации перехода
    const overlay = document.createElement('div');
    overlay.id = 'page-transition-overlay';
    overlay.innerHTML = `
        <div class="transition-circle"></div>
        <div class="transition-text">Загрузка...</div>
    `;
    document.body.appendChild(overlay);

    // Перехватываем все клики по ссылкам
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
        startTransition(href);
    });

    function startTransition(targetUrl) {
        // Добавляем класс для активации анимации
        overlay.classList.add('active');
        
        // Ждём завершения анимации появления круга
        setTimeout(() => {
            // Переходим на новую страницу
            window.location.href = targetUrl;
        }, 600);
    }

    // При загрузке страницы показываем обратную анимацию
    window.addEventListener('load', function() {
        overlay.classList.add('exit');
        
        setTimeout(() => {
            overlay.classList.remove('active', 'exit');
        }, 800);
    });
})();
