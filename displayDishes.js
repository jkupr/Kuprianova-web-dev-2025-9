// displayDishes.js
document.addEventListener('DOMContentLoaded', function () {
    // Сортируем блюда в алфавитном порядке по названию
    const sortedDishes = [...dishes].sort((a, b) => a.name.localeCompare(b.name));

    // Группируем блюда по категориям
    const dishesByCategory = {
        soup: sortedDishes.filter(dish => dish.category === 'soup'),
        main: sortedDishes.filter(dish => dish.category === 'main'),
        drink: sortedDishes.filter(dish => dish.category === 'drink'),
        salad: sortedDishes.filter(dish => dish.category === 'salad'),
        dessert: sortedDishes.filter(dish => dish.category === 'dessert')
    };

    // Отображаем блюда для каждой категории
    displayCategoryDishes('soup', dishesByCategory.soup);
    displayCategoryDishes('main', dishesByCategory.main);
    displayCategoryDishes('drink', dishesByCategory.drink);
    displayCategoryDishes('salad', dishesByCategory.salad);
    displayCategoryDishes('dessert', dishesByCategory.dessert);

    // Инициализируем фильтры
    initializeFilters();
});

function displayCategoryDishes(category, dishes) {
    const categorySections = {
        soup: document.querySelector('.dishes-section:nth-child(2) .dishes-grid'),
        main: document.querySelector('.dishes-section:nth-child(3) .dishes-grid'),
        drink: document.querySelector('.dishes-section:nth-child(4) .dishes-grid'),
        salad: document.querySelector('.dishes-section:nth-child(5) .dishes-grid'),
        dessert: document.querySelector('.dishes-section:nth-child(6) .dishes-grid')
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
    card.setAttribute('data-kind', dish.kind);

    card.innerHTML = `
        <img src="${dish.image}" alt="${dish.name}" onerror="this.src='images/placeholder.jpg'">
        <p class="price">${dish.price} руб.</p>
        <p class="name">${dish.name}</p>
        <p class="weight">${dish.count}</p>
        <button class="add-btn">Добавить</button>
    `;

    return card;
}

function initializeFilters() {
    // Конфигурация фильтров для каждой категории
    const filtersConfig = {
        soup: [
            { text: 'рыбный', kind: 'fish' },
            { text: 'мясной', kind: 'meat' },
            { text: 'вегетарианский', kind: 'veg' }
        ],
        main: [
            { text: 'рыбное', kind: 'fish' },
            { text: 'мясное', kind: 'meat' },
            { text: 'вегетарианское', kind: 'veg' }
        ],
        drink: [
            { text: 'холодный', kind: 'cold' },
            { text: 'горячий', kind: 'hot' }
        ],
        salad: [
            { text: 'рыбный', kind: 'fish' },
            { text: 'мясной', kind: 'meat' },
            { text: 'вегетарианский', kind: 'veg' }
        ],
        dessert: [
            { text: 'маленькая порция', kind: 'small' },
            { text: 'средняя порция', kind: 'medium' },
            { text: 'большая порция', kind: 'large' }
        ]
    };

    // Создаем фильтры для каждой категории
    Object.keys(filtersConfig).forEach(category => {
        const section = findCategorySection(category);
        if (section) {
            createFiltersForCategory(section, category, filtersConfig[category]);
        }
    });
}

function findCategorySection(category) {
    const categoryTitles = {
        soup: 'Выберите суп',
        main: 'Выберите главное блюдо',
        drink: 'Выберите напиток',
        salad: 'Выберите салат или стартер',
        dessert: 'Выберите десерт'
    };

    const sections = document.querySelectorAll('.dishes-section');
    for (let section of sections) {
        const h2 = section.querySelector('h2');
        if (h2 && h2.textContent === categoryTitles[category]) {
            return section;
        }
    }
    return null;
}

function createFiltersForCategory(section, category, filters) {
    const filtersContainer = document.createElement('div');
    filtersContainer.className = 'filters-container';

    // Добавляем кнопки фильтров
    filters.forEach(filter => {
        const button = document.createElement('button');
        button.className = 'filter-btn';
        button.setAttribute('data-kind', filter.kind);
        button.setAttribute('data-category', category);
        button.textContent = filter.text;

        button.addEventListener('click', function () {
            toggleFilter(this);
        });

        filtersContainer.appendChild(button);
    });

    // Вставляем фильтры после заголовка и перед grid контейнером
    const gridContainer = section.querySelector('.dishes-grid');
    section.insertBefore(filtersContainer, gridContainer);
}

function toggleFilter(button) {
    const kind = button.getAttribute('data-kind');
    const category = button.getAttribute('data-category');

    if (button.classList.contains('active')) {
        // Убираем активный класс и показываем все блюда
        button.classList.remove('active');
        showAllDishes(category);
    } else {
        // Убираем активный класс со всех кнопок этой категории
        const allButtons = document.querySelectorAll(`.filter-btn[data-category="${category}"]`);
        allButtons.forEach(btn => btn.classList.remove('active'));

        // Добавляем активный класс на текущую кнопку
        button.classList.add('active');

        // Фильтруем блюда
        filterDishes(category, kind);
    }
}

function filterDishes(category, kind) {
    const section = findCategorySection(category);
    if (!section) return;

    const grid = section.querySelector('.dishes-grid');
    const allDishes = grid.querySelectorAll('.dish-card');

    allDishes.forEach(dish => {
        if (dish.getAttribute('data-kind') === kind) {
            dish.style.display = 'flex';
        } else {
            dish.style.display = 'none';
        }
    });
}

function showAllDishes(category) {
    const section = findCategorySection(category);
    if (!section) return;

    const grid = section.querySelector('.dishes-grid');
    const allDishes = grid.querySelectorAll('.dish-card');
    allDishes.forEach(dish => {
        dish.style.display = 'flex';
    });
}