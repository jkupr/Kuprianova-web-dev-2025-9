// comboManager.js - только отображение комбо, без логики выбора
document.addEventListener('DOMContentLoaded', function () {
    initializeComboHoverEffects();
});

function initializeComboHoverEffects() {
    // Добавляем эффекты hover для карточек комбо
    const comboCards = document.querySelectorAll('.lunch-option');

    comboCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.borderColor = '#ddd';
            this.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.borderColor = '#f1eee9';
            this.style.transform = 'translateY(0)';
        });
    });

    // Эффекты hover для изображений в комбо
    const comboImages = document.querySelectorAll('.combo-icon img');

    comboImages.forEach(img => {
        img.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.1)';
        });

        img.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
        });
    });
}