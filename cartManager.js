// cartManager.js
class CartManager {
    constructor() {
        this.currentOrder = this.loadOrderFromStorage();
        this.dishes = [];
        this.init();
    }

    async init() {
        await this.waitForDishes();
        this.restoreSavedOrder();
        this.initializeEventListeners();
        this.updateOrderDisplay();
    }

    waitForDishes() {
        return new Promise((resolve) => {
            const checkDishes = () => {
                if (typeof getDishes === 'function' && getDishes().length > 0) {
                    this.dishes = getDishes();
                    console.log('Блюда загружены в CartManager:', this.dishes);
                    resolve();
                } else {
                    setTimeout(checkDishes, 100);
                }
            };
            checkDishes();
        });
    }

    loadOrderFromStorage() {
        const savedOrder = localStorage.getItem('currentOrder');
        const defaultOrder = {
            soup: null,
            main: null,
            drink: null,
            salad: null,
            dessert: null
        };

        if (!savedOrder) return defaultOrder;

        try {
            const orderData = JSON.parse(savedOrder);
            const loadedOrder = { ...defaultOrder };

            Object.keys(orderData).forEach(category => {
                loadedOrder[category] = orderData[category];
            });

            console.log('Заказ загружен из localStorage:', loadedOrder);
            return loadedOrder;
        } catch (error) {
            console.error('Ошибка при загрузке заказа:', error);
            return defaultOrder;
        }
    }

    restoreSavedOrder() {
        const restoredOrder = {
            soup: null,
            main: null,
            drink: null,
            salad: null,
            dessert: null
        };

        Object.keys(this.currentOrder).forEach(category => {
            const dishKeyword = this.currentOrder[category];
            if (dishKeyword) {
                // Ищем блюдо по keyword или по имени (для главных блюд)
                const dish = this.dishes.find(d =>
                    d.keyword === dishKeyword ||
                    d.name === dishKeyword ||
                    (category === 'main' && d.category === 'main')
                );

                if (dish) {
                    restoredOrder[category] = dish;
                    console.log(`Восстановлено блюдо: ${dish.name} (${category})`);
                } else {
                    console.warn(`Блюдо не найдено: ${dishKeyword} в категории ${category}`);
                }
            }
        });

        this.currentOrder = restoredOrder;
        console.log('Восстановленный заказ:', this.currentOrder);
    }

    // Сохранение заказа в localStorage
    saveOrderToStorage() {
        const orderData = {};

        Object.keys(this.currentOrder).forEach(category => {
            if (this.currentOrder[category]) {
                // Сохраняем keyword, если он есть, иначе сохраняем имя
                orderData[category] = this.currentOrder[category].keyword || this.currentOrder[category].name;
            } else {
                orderData[category] = null;
            }
        });

        localStorage.setItem('currentOrder', JSON.stringify(orderData));
        console.log('Заказ сохранен в localStorage:', orderData);
    }

    // Инициализация обработчиков событий
    initializeEventListeners() {
        // Обработчик для кнопок "Добавить"
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-btn')) {
                this.handleAddDish(e);
            }
        });

        // Обработчик для кнопок "Удалить" в панели заказа
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-btn')) {
                this.handleRemoveDish(e);
            }
        });
    }

    // Обработка добавления блюда
    handleAddDish(e) {
        const dishCard = e.target.closest('.dish-card');
        const dishKeyword = dishCard.getAttribute('data-dish');
        const category = dishCard.getAttribute('data-category');

        const dish = this.dishes.find(d => d.keyword === dishKeyword);
        if (dish) {
            this.addDishToOrder(dish, category);
        }
    }

    // Обработка удаления блюда
    handleRemoveDish(e) {
        const category = e.target.getAttribute('data-category');
        this.removeDishFromOrder(category);
    }

    // Добавление блюда в заказ
    addDishToOrder(dish, category) {
        this.currentOrder[category] = dish;
        this.saveOrderToStorage();
        this.highlightSelectedDish(dish.keyword, category);
        this.updateOrderDisplay();

        console.log('Блюдо добавлено:', dish.name);
        console.log('Текущий заказ:', this.currentOrder);
    }

    // Удаление блюда из заказа
    removeDishFromOrder(category) {
        const removedDish = this.currentOrder[category];
        this.currentOrder[category] = null;
        this.saveOrderToStorage();
        this.removeHighlightFromDish(removedDish?.keyword);
        this.updateOrderDisplay();

        console.log('Блюдо удалено из категории:', category);
        console.log('Текущий заказ:', this.currentOrder);
    }

    // Подсветка выбранного блюда
    highlightSelectedDish(dishKeyword, category) {
        // Убираем подсветку со всех блюд этой категории
        const allDishesInCategory = document.querySelectorAll(`.dish-card[data-category="${category}"]`);
        allDishesInCategory.forEach(card => {
            card.style.border = 'none';
        });

        // Подсвечиваем выбранное блюдо
        const selectedCard = document.querySelector(`[data-dish="${dishKeyword}"]`);
        if (selectedCard) {
            selectedCard.style.border = '2px solid tomato';
        }
    }

    // Удаление подсветки
    removeHighlightFromDish(dishKeyword) {
        if (!dishKeyword) return;
        const card = document.querySelector(`[data-dish="${dishKeyword}"]`);
        if (card) {
            card.style.border = 'none';
        }
    }

    // Обновление отображения заказа
    updateOrderDisplay() {
        this.updateOrderPanel();
        this.updateOrderForm();
    }

    // Обновление панели заказа
    updateOrderPanel() {
        const orderPanel = document.getElementById('order-panel');
        const orderItemsContainer = document.getElementById('order-panel-items');
        const totalAmountElement = document.getElementById('order-panel-total');
        const proceedButton = document.getElementById('proceed-to-order-btn');

        if (!orderPanel || !orderItemsContainer) return;

        let totalCost = 0;
        let hasSelectedDishes = false;

        // Очищаем контейнер
        orderItemsContainer.innerHTML = '';

        // Добавляем выбранные блюда
        Object.keys(this.currentOrder).forEach(category => {
            const dish = this.currentOrder[category];
            if (dish) {
                const itemElement = document.createElement('div');
                itemElement.className = 'order-item';
                itemElement.innerHTML = `
                    <span class="order-item-name">${this.getCategoryName(category)}</span>
                    <span class="order-item-price">${dish.price} руб.</span>
                `;
                orderItemsContainer.appendChild(itemElement);

                totalCost += dish.price;
                hasSelectedDishes = true;
            }
        });

        // Обновляем общую стоимость
        if (totalAmountElement) {
            totalAmountElement.textContent = totalCost;
        }

        // Показываем или скрываем панель
        if (orderPanel) {
            orderPanel.style.display = hasSelectedDishes ? 'block' : 'none';
        }

        // Проверяем валидность комбо
        if (proceedButton) {
            const isValidCombo = this.validateCurrentOrderForCombo();
            if (isValidCombo) {
                proceedButton.classList.remove('disabled');
            } else {
                proceedButton.classList.add('disabled');
            }
        }
    }

    // Обновление формы заказа (для страницы lunch.html)
    updateOrderForm() {
        // Эта функция обновляет скрытые поля формы на странице lunch.html
        Object.keys(this.currentOrder).forEach(category => {
            const inputElement = document.getElementById(`${category}-input`);
            const displayElement = document.getElementById(`${category}-display`);

            if (inputElement && displayElement) {
                const dish = this.currentOrder[category];
                if (dish) {
                    inputElement.value = dish.keyword;
                    if (!displayElement.querySelector('.selected-dish')) {
                        displayElement.innerHTML = `
                            <span class="selected-dish">${dish.name} - ${dish.price} руб.</span>
                            <button type="button" class="remove-btn" data-category="${category}">x</button>
                        `;

                        // Добавляем обработчик для новой кнопки удаления
                        const removeBtn = displayElement.querySelector('.remove-btn');
                        removeBtn.addEventListener('click', () => {
                            this.removeDishFromOrder(category);
                        });
                    }
                } else {
                    inputElement.value = '';
                    displayElement.innerHTML = '<span class="no-selection">' + this.getNoSelectionText(category) + '</span>';
                }
            }
        });
    }

    // Валидация заказа для отправки на сервер
    validateOrderForSubmission() {
        const selectedCategories = Object.keys(this.currentOrder).filter(category =>
            this.currentOrder[category] && category !== 'dessert'
        );

        // Обязательные условия:
        // 1. Должен быть выбран напиток
        if (!selectedCategories.includes('drink')) {
            return { isValid: false, message: 'Выберите напиток' };
        }

        // 2. Должен быть выбран хотя бы один основной компонент
        const hasMainComponent = selectedCategories.some(cat =>
            ['soup', 'main', 'salad'].includes(cat)
        );

        if (!hasMainComponent) {
            return { isValid: false, message: 'Выберите суп, главное блюдо или салат' };
        }

        // 3. Проверка конкретных комбинаций
        const validCombinations = [
            ['soup', 'main', 'salad', 'drink'],
            ['soup', 'main', 'drink'],
            ['soup', 'salad', 'drink'],
            ['main', 'salad', 'drink'],
            ['main', 'drink']
        ];

        const isValidCombo = validCombinations.some(combination => {
            return combination.every(dish => selectedCategories.includes(dish)) &&
                selectedCategories.every(dish => combination.includes(dish));
        });

        if (!isValidCombo) {
            return {
                isValid: false,
                message: 'Некорректная комбинация блюд'
            };
        }

        return { isValid: true, message: '' };
    }

    // Вспомогательные функции
    getCategoryName(category) {
        const categoryNames = {
            soup: 'Суп',
            main: 'Главное блюдо',
            drink: 'Напиток',
            salad: 'Салат',
            dessert: 'Десерт'
        };
        return categoryNames[category] || category;
    }

    getNoSelectionText(category) {
        const texts = {
            drink: 'Напиток не выбран',
            dessert: 'Десерт не выбран',
            salad: 'Салат не выбран'
        };
        return texts[category] || 'Блюдо не выбрано';
    }

    validateCurrentOrderForCombo() {
        const selectedCategories = Object.keys(this.currentOrder).filter(category =>
            this.currentOrder[category] && category !== 'dessert'
        );

        const validCombinations = [
            ['soup', 'main', 'salad', 'drink'],
            ['soup', 'main', 'drink'],
            ['soup', 'salad', 'drink'],
            ['main', 'salad', 'drink'],
            ['main', 'drink']
        ];

        return validCombinations.some(combination => {
            return combination.every(dish => selectedCategories.includes(dish)) &&
                selectedCategories.every(dish => combination.includes(dish));
        });
    }

    // Получение текущего заказа
    getCurrentOrder() {
        return this.currentOrder;
    }

    // Очистка заказа
    clearOrder() {
        Object.keys(this.currentOrder).forEach(category => {
            this.currentOrder[category] = null;
        });
        this.saveOrderToStorage();
        this.updateOrderDisplay();

        // Убираем подсветку со всех карточек
        document.querySelectorAll('.dish-card').forEach(card => {
            card.style.border = 'none';
        });

        console.log('Заказ очищен');
    }
}

// Глобальный экземпляр менеджера корзины
let cartManager;

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', function () {
    console.log('Инициализация CartManager...');
    cartManager = new CartManager();
});