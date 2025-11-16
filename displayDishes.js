// displayDishes.js
document.addEventListener('DOMContentLoaded', function () {
    initializeDishes().then(() => {
        console.log('Все блюда загружены и отображены');
        // Скрываем индикатор загрузки
        const loadingIndicator = document.getElementById('loading-indicator');
        if (loadingIndicator) {
            loadingIndicator.style.display = 'none';
        }
    }).catch(error => {
        console.error('Ошибка при загрузке блюд:', error);
        const loadingIndicator = document.getElementById('loading-indicator');
        if (loadingIndicator) {
            loadingIndicator.innerHTML = '<p style="color: red;">Ошибка загрузки меню. Пожалуйста, обновите страницу.</p>';
        }
    });
});