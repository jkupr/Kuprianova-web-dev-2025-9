// dishes.js
let dishes = [];

// Fallback данные для главных блюд (если их нет в API)
const fallbackMainDishes = [
    {
        keyword: 'main_1',
        name: 'Жареная картошка с грибами',
        price: 150,
        category: 'main',
        count: '250 г',
        image: 'images/dish1.jpg',
        kind: 'veg'
    },
    {
        keyword: 'main_2',
        name: 'Куриный стейк с овощами',
        price: 200,
        category: 'main',
        count: '300 г',
        image: 'images/dish6.jpg',
        kind: 'meat'
    },
    {
        keyword: 'main_3',
        name: 'Жареный лосось с рисом',
        price: 250,
        category: 'main',
        count: '280 г',
        image: 'images/dish4.jpg',
        kind: 'fish'
    },
    {
        keyword: 'main_4',
        name: 'Лазанья',
        price: 180,
        category: 'main',
        count: '320 г',
        image: 'images/dish3.jpg',
        kind: 'meat'
    },
    {
        keyword: 'main_5',
        name: 'Овощное рагу',
        price: 140,
        category: 'main',
        count: '270 г',
        image: 'images/dish5.jpg',
        kind: 'veg'
    },
    {
        keyword: 'main_6',
        name: 'Пюре с котлетами',
        price: 280,
        category: 'main',
        count: '350 г',
        image: 'images/dish2.jpg',
        kind: 'meat'
    }
];

// Функция для преобразования данных из API в наш формат
function transformDishesFromAPI(apiDishes) {
    return apiDishes.map(dish => {
        // Преобразуем данные API в наш формат
        return {
            keyword: dish.keyword,
            name: dish.name,
            price: dish.price,
            category: dish.category,
            count: dish.count,
            image: dish.image,
            kind: dish.kind
        };
    });
}

// Функция для инициализации загрузки блюд
async function initializeDishes() {
    const apiDishes = await loadDishes();
    dishes = transformDishesFromAPI(apiDishes);

    console.log('Преобразованные блюда с API:', dishes);

    // Проверяем, есть ли главные блюда в данных API
    const hasMainDishesInAPI = dishes.some(dish => dish.category === 'main');
    console.log('Есть ли главные блюда в API:', hasMainDishesInAPI);

    // Если главных блюд нет в API, добавляем наши fallback данные
    if (!hasMainDishesInAPI) {
        console.log('Добавляем fallback главные блюда');
        dishes = [...dishes, ...fallbackMainDishes];
    }

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

    console.log('Блюда по категориям после добавления fallback:', {
        soup: dishesByCategory.soup.length,
        main: dishesByCategory.main.length,
        drink: dishesByCategory.drink.length,
        salad: dishesByCategory.salad.length,
        dessert: dishesByCategory.dessert.length
    });

    // Отображаем блюда для каждой категории
    displayCategoryDishes('soup', dishesByCategory.soup);
    displayCategoryDishes('main', dishesByCategory.main);
    displayCategoryDishes('drink', dishesByCategory.drink);
    displayCategoryDishes('salad', dishesByCategory.salad);
    displayCategoryDishes('dessert', dishesByCategory.dessert);

    // Инициализируем фильтры
    initializeFilters();
}

// Функция для получения блюд (для использования в других модулях)
function getDishes() {
    return dishes;
}

// Остальные функции остаются без изменений...
function displayCategoryDishes(category, dishes) {
    const sections = document.querySelectorAll('.dishes-section');

    const sectionIndex = {
        soup: 0,
        main: 1,
        drink: 2,
        salad: 3,
        dessert: 4
    };

    const container = sections[sectionIndex[category]]?.querySelector('.dishes-grid');
    if (!container) {
        console.error(`Контейнер для категории ${category} не найден!`);
        return;
    }

    // Очищаем контейнер
    container.innerHTML = '';

    // Если блюд нет, показываем сообщение
    if (dishes.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666;">Блюда не найдены</p>';
        return;
    }

    // Создаем карточки для каждого блюда
    dishes.forEach(dish => {
        const dishCard = createDishCard(dish);
        container.appendChild(dishCard);
    });

    console.log(`Отображено ${dishes.length} блюд в категории ${category}`);
}

function createDishCard(dish) {
    const card = document.createElement('div');
    card.className = 'dish-card';
    card.setAttribute('data-dish', dish.keyword);
    card.setAttribute('data-kind', dish.kind);
    card.setAttribute('data-category', dish.category);

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
            // Проверяем, есть ли блюда в этой категории
            const categoryDishes = document.querySelectorAll(`.dish-card[data-category="${category}"]`);
            if (categoryDishes.length > 0) {
                createFiltersForCategory(section, category, filtersConfig[category]);
            }
        }
    });
}

function findCategorySection(category) {
    const sections = document.querySelectorAll('.dishes-section');

    const sectionIndex = {
        soup: 0,
        main: 1,
        drink: 2,
        salad: 3,
        dessert: 4
    };

    return sections[sectionIndex[category]] || null;
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