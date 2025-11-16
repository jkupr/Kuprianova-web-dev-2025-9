// dishes.js
let dishes = [];

const allDishes = [
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

async function initializeDishes() {
    try {
        console.log('Загрузка локальных блюд...');
        
        dishes = [...allDishes];
        
        console.log('Загружено блюд:', dishes.length);
        console.log('По категориям:', {
            soup: dishes.filter(d => d.category === 'soup').length,
            main: dishes.filter(d => d.category === 'main').length,
            drink: dishes.filter(d => d.category === 'drink').length,
            salad: dishes.filter(d => d.category === 'salad').length,
            dessert: dishes.filter(d => d.category === 'dessert').length
        });

        const sortedDishes = [...dishes].sort((a, b) => a.name.localeCompare(b.name));

        const dishesByCategory = {
            soup: sortedDishes.filter(dish => dish.category === 'soup'),
            main: sortedDishes.filter(dish => dish.category === 'main'),
            drink: sortedDishes.filter(dish => dish.category === 'drink'),
            salad: sortedDishes.filter(dish => dish.category === 'salad'),
            dessert: sortedDishes.filter(dish => dish.category === 'dessert')
        };

        displayCategoryDishes('soup', dishesByCategory.soup);
        displayCategoryDishes('main', dishesByCategory.main);
        displayCategoryDishes('drink', dishesByCategory.drink);
        displayCategoryDishes('salad', dishesByCategory.salad);
        displayCategoryDishes('dessert', dishesByCategory.dessert);

        initializeFilters();

        console.log('Инициализация локальных блюд завершена успешно');

    } catch (error) {
        console.error('Ошибка при загрузке блюд:', error);
        alert('Ошибка при загрузке меню. Пожалуйста, обновите страницу.');
    }
}

function getDishes() {
    return dishes || [];
}

function displayCategoryDishes(category, dishes) {
    const sections = document.querySelectorAll('.dishes-section');
    
    const sectionIndex = {
        soup: 0,
        main: 1,
        drink: 2,
        salad: 3,
        dessert: 4
    };

    const section = sections[sectionIndex[category]];
    if (!section) {
        console.error(`Секция для категории ${category} не найдена!`);
        return;
    }

    const container = section.querySelector('.dishes-grid');
    if (!container) {
        console.error(`Контейнер для категории ${category} не найден!`);
        return;
    }

    container.innerHTML = '';

    if (dishes.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #666;">
                <p>Блюда не найдены</p>
            </div>
        `;
        return;
    }

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
        <img src="${dish.image}" alt="${dish.name}" 
             onerror="this.src='images/placeholder.jpg'; this.alt='Изображение не найдено'">
        <p class="price">${dish.price} руб.</p>
        <p class="name">${dish.name}</p>
        <p class="weight">${dish.count}</p>
        <button class="add-btn">Добавить</button>
    `;

    return card;
}

function initializeFilters() {
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

    Object.keys(filtersConfig).forEach(category => {
        const section = findCategorySection(category);
        if (section) {
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
    const existingFilters = section.querySelector('.filters-container');
    if (existingFilters) {
        existingFilters.remove();
    }

    const filtersContainer = document.createElement('div');
    filtersContainer.className = 'filters-container';

    filters.forEach(filter => {
        const button = document.createElement('button');
        button.className = 'filter-btn';
        button.setAttribute('data-kind', filter.kind);
        button.setAttribute('data-category', category);
        button.textContent = filter.text;

        button.addEventListener('click', function() {
            toggleFilter(this);
        });

        filtersContainer.appendChild(button);
    });

    const gridContainer = section.querySelector('.dishes-grid');
    section.insertBefore(filtersContainer, gridContainer);
}

function toggleFilter(button) {
    const kind = button.getAttribute('data-kind');
    const category = button.getAttribute('data-category');

    if (button.classList.contains('active')) {
        button.classList.remove('active');
        showAllDishes(category);
    } else {
        const allButtons = document.querySelectorAll(`.filter-btn[data-category="${category}"]`);
        allButtons.forEach(btn => btn.classList.remove('active'));

        button.classList.add('active');
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

function getDishByKeyword(keyword) {
    return dishes.find(dish => dish.keyword === keyword);
}

function getDishesByCategory(category) {
    return dishes.filter(dish => dish.category === category);
}

window.getDishes = getDishes;
window.getDishByKeyword = getDishByKeyword;
window.getDishesByCategory = getDishesByCategory;