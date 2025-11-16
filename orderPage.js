// orderPage.js
document.addEventListener('DOMContentLoaded', function () {
    initializeOrderPage();
});

const ALL_DISHES = [
    {
        "id": 1,
        "keyword": "tom-yam",
        "name": "Том Ям с креветками",
        "price": 365,
        "category": "soup",
        "count": "350 мл",
        "image": "images/soup1.jpg",
        "kind": "fish"
    },
    {
        "id": 2,
        "keyword": "norwegian",
        "name": "Норвежский суп",
        "price": 270,
        "category": "soup",
        "count": "350 мл",
        "image": "images/soup2.jpg",
        "kind": "fish"
    },
    {
        "id": 3,
        "keyword": "mushroom",
        "name": "Грибной крем-суп",
        "price": 240,
        "category": "soup",
        "count": "350 мл",
        "image": "images/soup3.jpg",
        "kind": "veg"
    },
    {
        "id": 4,
        "keyword": "borscht",
        "name": "Борщ с говядиной",
        "price": 280,
        "category": "soup",
        "count": "350 мл",
        "image": "images/soup4.jpg",
        "kind": "meat"
    },
    {
        "id": 5,
        "keyword": "chicken-noodle",
        "name": "Куриный суп с лапшой",
        "price": 220,
        "category": "soup",
        "count": "350 мл",
        "image": "images/soup5.jpg",
        "kind": "meat"
    },
    {
        "id": 6,
        "keyword": "vegetable",
        "name": "Овощной суп",
        "price": 190,
        "category": "soup",
        "count": "350 мл",
        "image": "images/soup6.jpg",
        "kind": "veg"
    },
    {
        "id": 101,
        "keyword": "potato",
        "name": "Жареная картошка с грибами",
        "price": 150,
        "category": "main",
        "count": "350 г",
        "image": "images/dish1.jpg",
        "kind": "veg"
    },
    {
        "id": 102,
        "keyword": "chicken",
        "name": "Котлеты из курицы с картофельным пюре",
        "price": 225,
        "category": "main",
        "count": "400 г",
        "image": "images/dish2.jpg",
        "kind": "meat"
    },
    {
        "id": 103,
        "keyword": "lasagna",
        "name": "Лазанья",
        "price": 385,
        "category": "main",
        "count": "350 г",
        "image": "images/dish3.jpg",
        "kind": "meat"
    },
    {
        "id": 104,
        "keyword": "salmon",
        "name": "Лосось на гриле",
        "price": 420,
        "category": "main",
        "count": "300 г",
        "image": "images/dish4.jpg",
        "kind": "fish"
    },
    {
        "id": 105,
        "keyword": "vegetable-stew",
        "name": "Овощное рагу",
        "price": 180,
        "category": "main",
        "count": "350 г",
        "image": "images/dish5.jpg",
        "kind": "veg"
    },
    {
        "id": 106,
        "keyword": "fried-fish",
        "name": "Жареная рыба с овощами",
        "price": 320,
        "category": "main",
        "count": "350 г",
        "image": "images/dish6.jpg",
        "kind": "fish"
    },
    {
        "id": 201,
        "keyword": "cola",
        "name": "Coca-cola",
        "price": 110,
        "category": "drink",
        "count": "300 мл",
        "image": "images/drink1.jpg",
        "kind": "cold"
    },
    {
        "id": 202,
        "keyword": "orange-juice",
        "name": "Апельсиновый сок",
        "price": 120,
        "category": "drink",
        "count": "300 мл",
        "image": "images/drink2.jpg",
        "kind": "cold"
    },
    {
        "id": 203,
        "keyword": "berry-juice",
        "name": "Ягодный морс",
        "price": 90,
        "category": "drink",
        "count": "300 мл",
        "image": "images/drink3.jpg",
        "kind": "cold"
    },
    {
        "id": 204,
        "keyword": "coffee",
        "name": "Кофе американо",
        "price": 130,
        "category": "drink",
        "count": "200 мл",
        "image": "images/drink4.jpg",
        "kind": "hot"
    },
    {
        "id": 205,
        "keyword": "tea",
        "name": "Чай черный",
        "price": 80,
        "category": "drink",
        "count": "250 мл",
        "image": "images/drink5.jpg",
        "kind": "hot"
    },
    {
        "id": 206,
        "keyword": "cappuccino",
        "name": "Капучино",
        "price": 160,
        "category": "drink",
        "count": "200 мл",
        "image": "images/drink6.jpg",
        "kind": "hot"
    },
    {
        "id": 301,
        "keyword": "caesar",
        "name": "Цезарь с курицей",
        "price": 280,
        "category": "salad",
        "count": "250 г",
        "image": "images/salad1.jpg",
        "kind": "meat"
    },
    {
        "id": 302,
        "keyword": "greek-salad",
        "name": "Греческий салат",
        "price": 240,
        "category": "salad",
        "count": "300 г",
        "image": "images/salad2.jpg",
        "kind": "veg"
    },
    {
        "id": 303,
        "keyword": "shrimp-cocktail",
        "name": "Коктейль из креветок",
        "price": 350,
        "category": "salad",
        "count": "200 г",
        "image": "images/salad3.jpg",
        "kind": "fish"
    },
    {
        "id": 304,
        "keyword": "vegetable-salad",
        "name": "Овощной салат",
        "price": 190,
        "category": "salad",
        "count": "300 г",
        "image": "images/salad4.jpg",
        "kind": "veg"
    },
    {
        "id": 305,
        "keyword": "caprese",
        "name": "Капрезе",
        "price": 270,
        "category": "salad",
        "count": "250 г",
        "image": "images/salad5.jpg",
        "kind": "veg"
    },
    {
        "id": 306,
        "keyword": "olivier",
        "name": "Салат Оливье",
        "price": 220,
        "category": "salad",
        "count": "250 г",
        "image": "images/salad6.jpg",
        "kind": "veg"
    },
    {
        "id": 401,
        "keyword": "tiramisu",
        "name": "Тирамису",
        "price": 210,
        "category": "dessert",
        "count": "150 г",
        "image": "images/dessert1.jpg",
        "kind": "medium"
    },
    {
        "id": 402,
        "keyword": "cheesecake",
        "name": "Чизкейк",
        "price": 230,
        "category": "dessert",
        "count": "120 г",
        "image": "images/dessert2.jpg",
        "kind": "small"
    },
    {
        "id": 403,
        "keyword": "chocolate-cake",
        "name": "Шоколадный торт",
        "price": 190,
        "category": "dessert",
        "count": "100 г",
        "image": "images/dessert3.jpg",
        "kind": "small"
    },
    {
        "id": 404,
        "keyword": "ice-cream",
        "name": "Мороженое",
        "price": 150,
        "category": "dessert",
        "count": "100 г",
        "image": "images/dessert4.jpg",
        "kind": "small"
    },
    {
        "id": 405,
        "keyword": "napoleon",
        "name": "Наполеон",
        "price": 180,
        "category": "dessert",
        "count": "150 г",
        "image": "images/dessert5.jpg",
        "kind": "medium"
    },
    {
        "id": 406,
        "keyword": "fruit-platter",
        "name": "Фруктовая тарелка",
        "price": 320,
        "category": "dessert",
        "count": "400 г",
        "image": "images/dessert6.jpg",
        "kind": "large"
    }
];

function initializeOrderPage() {
    console.log('Инициализация страницы оформления заказа');
    loadOrderComposition();
    initializeOrderForm();
    initializeClearOrderButton();
}

function getAllDishes() {
    return ALL_DISHES;
}

function loadOrderComposition() {
    const orderComposition = document.getElementById('order-composition');
    const orderItemsList = document.getElementById('order-items-list');
    const totalAmountElement = document.getElementById('order-total-amount');

    console.log('НАЧАЛО ЗАГРУЗКИ ЗАКАЗА');
    
    const dishes = getAllDishes();
    const savedOrder = localStorage.getItem('currentOrder');
    let orderData = {};

    console.log('Сохраненный заказ из localStorage:', savedOrder);

    if (savedOrder) {
        try {
            orderData = JSON.parse(savedOrder);
            console.log('Загружен заказ из localStorage:', orderData);
        } catch (error) {
            console.error('Ошибка при загрузке заказа:', error);
        }
    } else {
        console.log('В localStorage нет сохраненного заказа');
    }

    const selectedDishes = {};
    let hasSelectedDishes = false;
    let totalCost = 0;

    const categories = ['soup', 'main', 'drink', 'salad', 'dessert'];
    
    categories.forEach(category => {
        if (orderData[category]) {
            const dishKeyword = orderData[category];
            console.log(`Поиск блюда: ${dishKeyword} в категории ${category}`);
            
            const dish = dishes.find(d => d.keyword === dishKeyword);
            
            if (dish) {
                selectedDishes[category] = dish;
                hasSelectedDishes = true;
                totalCost += dish.price;
                console.log(`Найдено блюдо: ${dish.name} в категории ${category}`);
            } else {
                console.warn(`Блюдо не найдено: ${dishKeyword} в категории ${category}`);
            }
        } else {
            console.log(`В категории ${category} нет выбранного блюда`);
        }
    });

    console.log('Итоговый заказ:', selectedDishes);
    console.log('Есть выбранные блюда:', hasSelectedDishes);
    console.log('Общая стоимость:', totalCost);

    totalAmountElement.textContent = totalCost;

    if (!hasSelectedDishes) {
        console.log('Нет выбранных блюд для отображения');
        orderComposition.innerHTML = `
            <div class="empty-order-message">
                <p>Ничего не выбрано. Чтобы добавить блюда в заказ, перейдите на страницу 
                <a href="lunch.html" class="order-link">Собрать ланч</a>.</p>
            </div>
        `;
        orderItemsList.innerHTML = '<p class="no-selection-text">Нет выбранных блюд</p>';
        return;
    }

    displayOrderComposition(orderComposition, selectedDishes);
    displayOrderItems(orderItemsList, selectedDishes);
    console.log('ЗАВЕРШЕНИЕ ЗАГРУЗКИ ЗАКАЗА');
}

function displayOrderComposition(container, selectedDishes) {
    container.innerHTML = '';

    const categories = {
        soup: 'Супы',
        main: 'Главные блюда',
        drink: 'Напитки',
        salad: 'Салаты и стартеры',
        dessert: 'Десерты'
    };

    Object.keys(categories).forEach(category => {
        const dish = selectedDishes[category];
        if (dish) {
            const dishCard = createOrderDishCard(dish, category);
            container.appendChild(dishCard);
        }
    });
}

function createOrderDishCard(dish, category) {
    const card = document.createElement('div');
    card.className = 'dish-card order-dish-card';
    card.setAttribute('data-dish', dish.keyword);
    card.setAttribute('data-category', category);

    card.innerHTML = `
        <img src="${dish.image}" alt="${dish.name}" onerror="this.src='images/placeholder.jpg'">
        <p class="price">${dish.price} руб.</p>
        <p class="name">${dish.name}</p>
        <p class="weight">${dish.count}</p>
        <button class="remove-btn-order" data-category="${category}">Удалить</button>
    `;

    const removeBtn = card.querySelector('.remove-btn-order');
    removeBtn.addEventListener('click', function () {
        removeDishFromOrder(dish.keyword, category);
    });

    return card;
}

function displayOrderItems(container, selectedDishes) {
    container.innerHTML = '';

    const orderItems = {
        soup: { label: 'Суп', selected: false },
        main: { label: 'Главное блюдо', selected: false },
        drink: { label: 'Напиток', selected: false },
        salad: { label: 'Салат или стартер', selected: false },
        dessert: { label: 'Десерт', selected: false }
    };

    Object.keys(selectedDishes).forEach(category => {
        if (selectedDishes[category]) {
            orderItems[category].selected = true;
            orderItems[category].dish = selectedDishes[category];
        }
    });

    Object.keys(orderItems).forEach(category => {
        const item = orderItems[category];
        const itemElement = document.createElement('div');
        itemElement.className = 'order-item-row';

        if (item.selected && item.dish) {
            itemElement.innerHTML = `
                <span class="item-name">${item.label}: ${item.dish.name}</span>
                <span class="item-price">${item.dish.price} руб.</span>
            `;
        } else {
            const notSelectedText = category === 'main' ? 'Не выбрано' : 'Не выбран';
            itemElement.innerHTML = `
                <span class="item-name not-selected">${item.label}: ${notSelectedText}</span>
                <span class="item-price">-</span>
            `;
        }

        container.appendChild(itemElement);
    });
}

function removeDishFromOrder(dishKeyword, category) {
    const savedOrder = localStorage.getItem('currentOrder');
    if (!savedOrder) return;

    try {
        const orderData = JSON.parse(savedOrder);

        if (orderData[category] === dishKeyword) {
            orderData[category] = null;
            localStorage.setItem('currentOrder', JSON.stringify(orderData));
            loadOrderComposition();
            console.log(`Удалено блюдо из категории ${category}`);
        }
    } catch (error) {
        console.error('Ошибка при удалении блюда:', error);
    }
}

async function prepareDishesForSubmission() {
    const savedOrder = localStorage.getItem('currentOrder');
    if (!savedOrder) {
        console.log('Нет сохраненного заказа в localStorage');
        return {};
    }

    const orderData = JSON.parse(savedOrder);
    const dishesData = {};
    
    console.log('Подготовка блюд для отправки. Заказ:', orderData);

    const categories = ['soup', 'main', 'salad', 'drink', 'dessert'];
    let hasDishes = false;

    categories.forEach(category => {
        if (orderData[category]) {
            const dishKeyword = orderData[category];
            console.log(`Поиск блюда: ${dishKeyword} в категории ${category}`);
            
            const dish = ALL_DISHES.find(d => d.keyword === dishKeyword);
            
            if (dish) {
                console.log(`Найдено блюдо: ${dish.name} (ID: ${dish.id})`);
                
                switch(category) {
                    case 'soup':
                        dishesData.soup_id = dish.id;
                        break;
                    case 'main':
                        dishesData.main_course_id = dish.id;
                        break;
                    case 'salad':
                        dishesData.salad_id = dish.id;
                        break;
                    case 'drink':
                        dishesData.drink_id = dish.id;
                        break;
                    case 'dessert':
                        dishesData.dessert_id = dish.id;
                        break;
                }
                hasDishes = true;
            } else {
                console.warn(`Блюдо не найдено: ${dishKeyword}`);
            }
        }
    });

    console.log('Подготовленные данные для отправки:', dishesData);
    
    if (!hasDishes) {
        console.log('В заказе нет действительных блюд');
        return {};
    }

    return dishesData;
}

function validateOrderCombo() {
    const savedOrder = localStorage.getItem('currentOrder');
    if (!savedOrder) {
        return { isValid: false, message: 'Заказ пуст' };
    }

    try {
        const orderData = JSON.parse(savedOrder);
        console.log('Проверка комбо. Заказ:', orderData);

        const selectedCategories = Object.keys(orderData).filter(category =>
            orderData[category] && category !== 'dessert'
        );

        console.log('Выбранные категории (без десерта):', selectedCategories);

        const hasDrink = selectedCategories.includes('drink');
        const hasMainComponent = selectedCategories.some(cat =>
            ['soup', 'main', 'salad'].includes(cat)
        );

        console.log('Есть напиток:', hasDrink);
        console.log('Есть основной компонент:', hasMainComponent);

        if (!hasDrink) {
            return { isValid: false, message: 'Выберите напиток' };
        }

        if (!hasMainComponent) {
            return { isValid: false, message: 'Выберите суп, главное блюдо или салат' };
        }

        const validCombinations = [
            ['soup', 'main', 'salad', 'drink'],
            ['soup', 'main', 'drink'],
            ['soup', 'salad', 'drink'],
            ['main', 'salad', 'drink'],
            ['main', 'drink']
        ];

        const isValidCombo = validCombinations.some(combination => {
            const matches = combination.every(dish => selectedCategories.includes(dish)) &&
                selectedCategories.every(dish => combination.includes(dish));
            console.log(`Проверка комбо ${combination}: ${matches}`);
            return matches;
        });

        console.log('Комбо валидно:', isValidCombo);

        if (!isValidCombo) {
            return { 
                isValid: false, 
                message: 'Некорректная комбинация блюд. Выберите одну из допустимых комбинаций.' 
            };
        }

        return { isValid: true, message: '' };

    } catch (error) {
        console.error('Ошибка при проверке заказа:', error);
        return { isValid: false, message: 'Ошибка при проверке заказа' };
    }
}

async function submitOrderToServer() {
    const formData = getOrderFormData();
    const dishesData = await prepareDishesForSubmission();

    console.log('Данные формы:', formData);
    console.log('Данные блюд:', dishesData);

    const hasDishes = Object.keys(dishesData).length > 0;
    if (!hasDishes) {
        return {
            success: false,
            message: 'В заказе нет блюд. Пожалуйста, выберите блюда для заказа.'
        };
    }

    const requestData = { 
        ...formData, 
        ...dishesData,
        order_date: new Date().toISOString()
    };

    console.log('Данные для отправки на сервер:', requestData);

    try {
        const result = await submitOrder(requestData);
        console.log('Заказ успешно отправлен:', result);
        
        return { 
            success: true, 
            data: result,
            message: 'Заказ успешно оформлен!'
        };

    } catch (error) {
        console.error('Ошибка при отправке заказа:', error);
        return {
            success: false,
            message: error.message || 'Произошла ошибка при отправке заказа'
        };
    }
}

function validateOrderForm() {
    const name = document.getElementById('order-name').value.trim();
    const email = document.getElementById('order-email').value.trim();
    const phone = document.getElementById('order-phone').value.trim();
    const address = document.getElementById('order-address').value.trim();

    if (!name) {
        return { isValid: false, message: 'Пожалуйста, укажите ваше имя' };
    }

    if (!email) {
        return { isValid: false, message: 'Пожалуйста, укажите ваш email' };
    }

    if (!phone) {
        return { isValid: false, message: 'Пожалуйста, укажите ваш номер телефона' };
    }

    if (!address) {
        return { isValid: false, message: 'Пожалуйста, укажите адрес доставки' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { isValid: false, message: 'Пожалуйста, укажите корректный email адрес' };
    }

    return { isValid: true, message: '' };
}

function getOrderFormData() {
    const name = document.getElementById('order-name').value.trim();
    const email = document.getElementById('order-email').value.trim();
    const phone = document.getElementById('order-phone').value.trim();
    const address = document.getElementById('order-address').value.trim();
    const comments = document.getElementById('order-comments').value.trim();

    const newsletter = document.getElementById('order-newsletter').checked;

    return {
        full_name: name,
        email: email,
        phone: phone,
        delivery_address: address,
        delivery_type: 'now',
        comment: comments,
        subscribe: newsletter ? 1 : 0
    };
}

function initializeOrderForm() {
    const orderForm = document.getElementById('order-form');

    if (orderForm) {
        orderForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            console.log('НАЧАЛО ОФОРМЛЕНИЯ ЗАКАЗА');

            const savedOrder = localStorage.getItem('currentOrder');
            console.log('Сохраненный заказ в localStorage:', savedOrder);

            if (!savedOrder) {
                showOrderNotification('Заказ пуст. Пожалуйста, выберите блюда для заказа.');
                return;
            }

            const formValidation = validateOrderForm();
            if (!formValidation.isValid) {
                console.log('Форма невалидна:', formValidation.message);
                showOrderNotification(formValidation.message);
                return;
            }

            const comboValidation = validateOrderCombo();
            if (!comboValidation.isValid) {
                console.log('Комбо невалидно:', comboValidation.message);
                showOrderNotification(comboValidation.message);
                return;
            }

            const submitBtn = orderForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Отправка...';
            submitBtn.disabled = true;

            try {
                const result = await submitOrderToServer();
                console.log('Результат отправки:', result);

                if (result.success) {
                    showOrderNotification(result.message || 'Заказ успешно оформлен!', 'success');
                    localStorage.removeItem('currentOrder');
                    console.log('Заказ очищен из localStorage');
                    
                    orderForm.reset();
                    
                    setTimeout(() => {
                        loadOrderComposition();
                    }, 2000);
                } else {
                    throw new Error(result.message);
                }
            } catch (error) {
                console.error('Ошибка при оформлении заказа:', error);
                showOrderNotification(`Ошибка: ${error.message}`);
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                console.log('ЗАВЕРШЕНИЕ ОФОРМЛЕНИЯ ЗАКАЗА');
            }
        });
    }
}

function initializeClearOrderButton() {
    const clearOrderBtn = document.getElementById('clear-order-btn');

    if (clearOrderBtn) {
        clearOrderBtn.addEventListener('click', function () {
            if (confirm('Вы уверены, что хотите очистить весь заказ?')) {
                localStorage.removeItem('currentOrder');
                loadOrderComposition();
                showOrderNotification('Заказ успешно очищен', 'success');
            }
        });
    }
}

function showOrderNotification(message, type = 'error') {
    const existingNotification = document.querySelector('.order-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = 'order-notification';

    const backgroundColor = type === 'success' ? '#4CAF50' : '#f44336';

    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-text">${message}</div>
            <button class="notification-ok-btn" style="background-color: ${backgroundColor}">OK</button>
        </div>
    `;

    document.body.appendChild(notification);

    const okButton = notification.querySelector('.notification-ok-btn');
    okButton.addEventListener('click', function () {
        notification.remove();
    });

    if (type === 'success') {
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.remove();
            }
        }, 5000);
    }
}