// displayDishes.js
document.addEventListener('DOMContentLoaded', function () {
    // Сортируем блюда в алфавитном порядке по названию
    const sortedDishes = [...dishes].sort((a, b) => a.name.localeCompare(b.name));

    // Группируем блюда по категориям
    const dishesByCategory = {
        soup: sortedDishes.filter(dish => dish.category === 'soup'),
        main: sortedDishes.filter(dish => dish.category === 'main'),
        drink: sortedDishes.filter(dish => dish.category === 'drink')
    };

    // Отображаем блюда для каждой категории
    displayCategoryDishes('soup', dishesByCategory.soup);
    displayCategoryDishes('main', dishesByCategory.main);
    displayCategoryDishes('drink', dishesByCategory.drink);
});

function displayCategoryDishes(category, dishes) {
    const categorySections = {
        soup: document.querySelector('.dishes-section:nth-child(2) .dishes-grid'),
        main: document.querySelector('.dishes-section:nth-child(3) .dishes-grid'),
        drink: document.querySelector('.dishes-section:nth-child(4) .dishes-grid')
    };

    const container = categorySections[category];
    if (!container) return;

    // Очищаем контейнер
    container.innerHTML = '';

    // Создаем карточки для каждого блюда
    dishes.forEach(dish => {
        const dishCard = createDishCard(dish);
        container.appendChild(dishCard);
    });
}

function createDishCard(dish) {
    const card = document.createElement('div');
    card.className = 'dish-card';
    card.setAttribute('data-dish', dish.keyword);

    card.innerHTML = `
        <img src="${dish.image}" alt="${dish.name}" onerror="this.src='images/placeholder.jpg'">
        <p class="price">${dish.price} руб.</p>
        <p class="name">${dish.name}</p>
        <p class="weight">${dish.count}</p>
        <button class="add-btn">Добавить</button>
    `;

    return card;
}