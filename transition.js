// ===== АНИМАЦИЯ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ =====
(function() {
    // Создаём оверлей для анимации
    const overlay = document.createElement('div');
    overlay.id = 'page-transition-overlay';
    overlay.innerHTML = `
        <div class="transition-circle"></div>
    `;
    document.body.appendChild(overlay);

    // При загрузке страницы показываем анимацию появления
    window.addEventListener('load', function() {
        overlay.classList.add('active');
        
        setTimeout(() => {
            overlay.classList.add('exit');
        }, 100);
        
        setTimeout(() => {
            overlay.classList.remove('active', 'exit');
        }, 900);
    });
})();
