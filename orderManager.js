// orderManager.js
document.addEventListener('DOMContentLoaded', function () {
    initializeOrderManager();
});

function initializeOrderManager() {
    // Объект для хранения текущего заказа
    const currentOrder = {
        soup: null,
        main: null,
        drink: null,
        salad: null,
        dessert: null
    };

    // Элементы DOM для отображения заказа
    const orderDisplay = {
        soup: createOrderDisplayElement('soup', 'Суп'),
        main: createOrderDisplayElement('main', 'Главное блюдо'),
        drink: createOrderDisplayElement('drink', 'Напиток'),
        salad: createOrderDisplayElement('salad', 'Салат или стартер'),
        dessert: createOrderDisplayElement('dessert', 'Десерт')
    };

    const totalCostElement = createTotalCostElement();

    // Контейнер для заказа
    const orderContainer = document.querySelector('.order-part:first-child');
    if (!orderContainer) return;

    // Очищаем существующие элементы заказа и добавляем наши
    const existingOrderElements = orderContainer.querySelectorAll('.form-row');
    existingOrderElements.forEach(el => el.remove());

    // Находим разделитель hr
    const hrElement = orderContainer.querySelector('hr');

    // Добавляем элементы отображения заказа перед разделителем
    if (hrElement) {
        orderContainer.insertBefore(orderDisplay.soup, hrElement);
        orderContainer.insertBefore(orderDisplay.main, hrElement);
        orderContainer.insertBefore(orderDisplay.drink, hrElement);
        orderContainer.insertBefore(orderDisplay.salad, hrElement);
        orderContainer.insertBefore(orderDisplay.dessert, hrElement);
    } else {
        // Если нет разделителя, добавляем в конец
        orderContainer.appendChild(orderDisplay.soup);
        orderContainer.appendChild(orderDisplay.main);
        orderContainer.appendChild(orderDisplay.drink);
        orderContainer.appendChild(orderDisplay.salad);
        orderContainer.appendChild(orderDisplay.dessert);
    }

    // Добавляем блок стоимости после всех элементов
    orderContainer.appendChild(totalCostElement);

    // Обработчики событий для кнопок "Добавить"
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('add-btn')) {
            const dishCard = e.target.closest('.dish-card');
            const dishKeyword = dishCard.getAttribute('data-dish');
            const dish = dishes.find(d => d.keyword === dishKeyword);

            if (dish) {
                addDishToOrder(dish, currentOrder, orderDisplay, totalCostElement);
                highlightSelectedDish(dishKeyword);
            }
        }
    });

    // Инициализируем скрытые поля для отправки формы
    initializeHiddenFormFields();
}

function createOrderDisplayElement(category, label) {
    const container = document.createElement('div');
    container.className = 'form-row order-item';
    container.setAttribute('data-category', category);

    container.innerHTML = `
        <label>${label}</label>
        <div class="order-display" id="${category}-display">
            <span class="no-selection">${getNoSelectionText(category)}</span>
        </div>
        <input type="hidden" name="${category}" id="${category}-input" value="">
    `;

    return container;
}

function getNoSelectionText(category) {
    const texts = {
        drink: 'Напиток не выбран',
        dessert: 'Десерт не выбран',
        salad: 'Салат не выбран'
    };
    return texts[category] || 'Блюдо не выбрано';
}

function createTotalCostElement() {
    const container = document.createElement('div');
    container.className = 'form-row total-cost';
    container.style.display = 'none';

    container.innerHTML = `
        <label>Стоимость заказа</label>
        <div class="total-amount">
            <span id="total-amount">0</span> руб.
        </div>
    `;

    return container;
}

function addDishToOrder(dish, currentOrder, orderDisplay, totalCostElement) {
    const category = dish.category;
    currentOrder[category] = dish;

    // Обновляем отображение
    const displayElement = document.getElementById(`${category}-display`);
    const inputElement = document.getElementById(`${category}-input`);

    displayElement.innerHTML = `
        <span class="selected-dish">${dish.name} - ${dish.price} руб.</span>
        <button type="button" class="remove-btn" data-category="${category}">x</button>
    `;

    inputElement.value = dish.keyword;

    // Добавляем обработчик для кнопки удаления
    const removeBtn = displayElement.querySelector('.remove-btn');
    removeBtn.addEventListener('click', function () {
        removeDishFromOrder(category, currentOrder, orderDisplay, totalCostElement);
        removeHighlightFromDish(currentOrder[category] ? currentOrder[category].keyword : null);
    });

    // Показываем категорию
    displayElement.closest('.form-row').style.display = 'block';

    // Обновляем общую стоимость
    updateTotalCost(currentOrder, totalCostElement);

    // Показываем блок стоимости заказа
    const hasSelection = Object.values(currentOrder).some(dish => dish !== null);
    totalCostElement.style.display = hasSelection ? 'block' : 'none';
}

function removeDishFromOrder(category, currentOrder, orderDisplay, totalCostElement) {
    const dishToRemove = currentOrder[category];
    currentOrder[category] = null;

    // Обновляем отображение
    const displayElement = document.getElementById(`${category}-display`);
    const inputElement = document.getElementById(`${category}-input`);

    displayElement.innerHTML = '<span class="no-selection">' + getNoSelectionText(category) + '</span>';
    inputElement.value = '';

    // Обновляем общую стоимость
    updateTotalCost(currentOrder, totalCostElement);

    // Проверяем, нужно ли скрыть блок стоимости заказа
    const hasSelection = Object.values(currentOrder).some(dish => dish !== null);
    totalCostElement.style.display = hasSelection ? 'block' : 'none';
}

function updateTotalCost(currentOrder, totalCostElement) {
    const total = Object.values(currentOrder).reduce((sum, dish) => {
        return sum + (dish ? dish.price : 0);
    }, 0);

    document.getElementById('total-amount').textContent = total;
}

function highlightSelectedDish(dishKeyword) {
    // Убираем выделение со всех карточек
    document.querySelectorAll('.dish-card').forEach(card => {
        card.style.border = 'none';
    });

    // Выделяем выбранную карточку
    const selectedCard = document.querySelector('[data-dish="' + dishKeyword + '"]');
    if (selectedCard) {
        selectedCard.style.border = '2px solid tomato';
    }
}

function removeHighlightFromDish(dishKeyword) {
    if (!dishKeyword) return;
    const card = document.querySelector('[data-dish="' + dishKeyword + '"]');
    if (card) {
        card.style.border = 'none';
    }
}

function initializeHiddenFormFields() {
    // Эта функция гарантирует, что при отправке формы будут отправлены keyword выбранных блюд
    const orderForm = document.querySelector('.order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', function (e) {
            // Поля уже созданы в createOrderDisplayElement, они автоматически включатся в форму
        });
    }
}