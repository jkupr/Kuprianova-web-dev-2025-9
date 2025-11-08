// lunchValidation.js
document.addEventListener('DOMContentLoaded', function () {
    initializeLunchValidation();
});

function initializeLunchValidation() {
    // Определяем допустимые комбинации ланча
    const validCombinations = [
        ['soup', 'main', 'salad', 'drink'],      // Суп + Главное блюдо + Салат + Напиток
        ['soup', 'main', 'drink'],               // Суп + Главное блюдо + Напиток
        ['soup', 'salad', 'drink'],              // Суп + Салат + Напиток
        ['main', 'salad', 'drink'],              // Главное блюдо + Салат + Напиток
        ['main', 'drink']                        // Главное блюдо + Напиток
    ];

    // Получаем форму заказа
    const orderForm = document.querySelector('.order-form');

    if (orderForm) {
        orderForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Получаем выбранные блюда
            const selectedDishes = getSelectedDishesForValidation();

            // Проверяем, соответствует ли заказ одному из допустимых комбинаций
            const validationResult = validateLunchCombination(selectedDishes, validCombinations);

            if (validationResult.isValid) {
                // Если заказ валиден, отправляем форму
                this.submit();
            } else {
                // Если заказ невалиден, показываем уведомление
                showNotification(validationResult.messageType);
            }
        });
    }
}

function getSelectedDishesForValidation() {
    const selectedCategories = [];

    // Проверяем каждую категорию блюд
    const categories = ['soup', 'main', 'drink', 'salad', 'dessert'];

    categories.forEach(category => {
        const inputElement = document.getElementById(`${category}-input`);
        if (inputElement && inputElement.value) {
            selectedCategories.push(category);
        }
    });

    return selectedCategories;
}

function validateLunchCombination(selectedDishes, validCombinations) {
    // Получаем все выбранные блюда (включая десерт)
    const hasSoup = selectedDishes.includes('soup');
    const hasMain = selectedDishes.includes('main');
    const hasSalad = selectedDishes.includes('salad');
    const hasDrink = selectedDishes.includes('drink');
    const hasDessert = selectedDishes.includes('dessert');

    // 1. "Ничего не выбрано. Выберите блюда для заказа" - не добавлено ни одно блюдо
    if (selectedDishes.length === 0) {
        return {
            isValid: false,
            messageType: 'nothing-selected'
        };
    }

    // Игнорируем десерт при проверке основных комбинаций
    const selectedWithoutDessert = selectedDishes.filter(dish => dish !== 'dessert');

    // Проверяем, соответствует ли выбранная комбинация одной из допустимых
    const isValidCombination = validCombinations.some(combination => {
        return combination.every(dish => selectedWithoutDessert.includes(dish)) &&
            selectedWithoutDessert.every(dish => combination.includes(dish));
    });

    if (isValidCombination) {
        return {
            isValid: true,
            messageType: null
        };
    }

    // Определяем тип уведомления по приоритету:

    // 5. "Выберите главное блюдо" - выбран напиток/десерт, но не выбрано главное блюдо
    if ((hasDrink || hasDessert) && !hasMain) {
        return {
            isValid: false,
            messageType: 'drink-dessert-without-main'
        };
    }

    // 3. "Выберите главное блюдо/салат/стартер" - выбран суп, но не выбраны главное блюдо/салат/стартер
    if (hasSoup && !hasMain && !hasSalad) {
        return {
            isValid: false,
            messageType: 'soup-without-main'
        };
    }

    // 4. "Выберите суп или главное блюдо" - выбран салат/стартер, но не выбран суп/главное блюдо
    if (hasSalad && !hasSoup && !hasMain) {
        return {
            isValid: false,
            messageType: 'salad-without-soup-main'
        };
    }

    // 2. "Выберите напиток" - выбраны все необходимые блюда, кроме напитка
    // Проверяем все комбинации без напитка
    if ((hasSoup && hasMain && hasSalad && !hasDrink) || // Комбо 1 без напитка
        (hasSoup && hasMain && !hasDrink) ||             // Комбо 2 без напитка  
        (hasSoup && hasSalad && !hasDrink) ||            // Комбо 3 без напитка
        (hasMain && hasSalad && !hasDrink) ||            // Комбо 4 без напитка
        (hasMain && !hasDrink)) {                        // Комbo 5 без напитка
        return {
            isValid: false,
            messageType: 'missing-drink'
        };
    }

    // Если ни одно условие не подошло - показываем общее уведомление
    return {
        isValid: false,
        messageType: 'nothing-selected'
    };
}

function showNotification(messageType) {
    // Удаляем предыдущее уведомление, если оно есть
    const existingNotification = document.querySelector('.notification-overlay');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Создаем overlay для уведомления
    const overlay = document.createElement('div');
    overlay.className = 'notification-overlay';

    // Определяем текст уведомления в зависимости от типа
    let notificationText = '';

    switch (messageType) {
        case 'nothing-selected':
            notificationText = 'Ничего не выбрано. Выберите блюда для заказа';
            break;
        case 'missing-drink':
            notificationText = 'Выберите напиток';
            break;
        case 'soup-without-main':
            notificationText = 'Выберите главное блюдо/салат/стартер';
            break;
        case 'salad-without-soup-main':
            notificationText = 'Выберите суп или главное блюдо';
            break;
        case 'drink-dessert-without-main':
            notificationText = 'Выберите главное блюдо';
            break;
        default:
            notificationText = 'Ничего не выбрано. Выберите блюда для заказа';
    }

    // Создаем уведомление
    overlay.innerHTML = `
        <div class="notification">
            <div class="notification-text">${notificationText}</div>
            <button class="notification-btn">Окей</button>
        </div>
    `;

    // Добавляем уведомление на страницу
    document.body.appendChild(overlay);

    // Добавляем обработчик для кнопки "Окей"
    const okButton = overlay.querySelector('.notification-btn');
    okButton.addEventListener('click', function () {
        overlay.remove();
    });

    // Добавляем обработчики для hover эффекта на кнопке
    okButton.addEventListener('mouseenter', function () {
        this.style.backgroundColor = 'tomato';
        this.style.color = 'white';
    });

    okButton.addEventListener('mouseleave', function () {
        this.style.backgroundColor = '#f1eee9';
        this.style.color = '#333';
    });
}