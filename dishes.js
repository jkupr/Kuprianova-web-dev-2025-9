// dishes.js
const dishes = [
    // Супы (6 блюд)
    {
        keyword: 'tom-yam',
        name: 'Том Ям с креветками',
        price: 365,
        category: 'soup',
        count: '350 мл',
        image: 'images/soup1.jpg',
        kind: 'fish'
    },
    {
        keyword: 'norwegian',
        name: 'Норвежский суп',
        price: 270,
        category: 'soup',
        count: '350 мл',
        image: 'images/soup2.jpg',
        kind: 'fish'
    },
    {
        keyword: 'mushroom',
        name: 'Грибной крем-суп',
        price: 240,
        category: 'soup',
        count: '350 мл',
        image: 'images/soup3.jpg',
        kind: 'veg'
    },
    {
        keyword: 'borscht',
        name: 'Борщ с говядиной',
        price: 280,
        category: 'soup',
        count: '350 мл',
        image: 'images/soup4.jpg',
        kind: 'meat'
    },
    {
        keyword: 'chicken-noodle',
        name: 'Куриный суп с лапшой',
        price: 220,
        category: 'soup',
        count: '350 мл',
        image: 'images/soup5.jpg',
        kind: 'meat'
    },
    {
        keyword: 'vegetable',
        name: 'Овощной суп',
        price: 190,
        category: 'soup',
        count: '350 мл',
        image: 'images/soup6.jpg',
        kind: 'veg'
    },

    // Главные блюда (6 блюд)
    {
        keyword: 'potato',
        name: 'Жареная картошка с грибами',
        price: 150,
        category: 'main',
        count: '350 г',
        image: 'images/dish1.jpg',
        kind: 'veg'
    },
    {
        keyword: 'chicken',
        name: 'Котлеты из курицы с картофельным пюре',
        price: 225,
        category: 'main',
        count: '400 г',
        image: 'images/dish2.jpg',
        kind: 'meat'
    },
    {
        keyword: 'lasagna',
        name: 'Лазанья',
        price: 385,
        category: 'main',
        count: '350 г',
        image: 'images/dish3.jpg',
        kind: 'meat'
    },
    {
        keyword: 'salmon',
        name: 'Лосось на гриле',
        price: 420,
        category: 'main',
        count: '300 г',
        image: 'images/dish4.jpg',
        kind: 'fish'
    },
    {
        keyword: 'vegetable-stew',
        name: 'Овощное рагу',
        price: 180,
        category: 'main',
        count: '350 г',
        image: 'images/dish5.jpg',
        kind: 'veg'
    },
    {
        keyword: 'fried-fish',
        name: 'Жареная рыба с овощами',
        price: 320,
        category: 'main',
        count: '350 г',
        image: 'images/dish6.jpg',
        kind: 'fish'
    },

    // Напитки (6 блюд)
    {
        keyword: 'cola',
        name: 'Coca-cola',
        price: 110,
        category: 'drink',
        count: '300 мл',
        image: 'images/drink1.jpg',
        kind: 'cold'
    },
    {
        keyword: 'orange-juice',
        name: 'Апельсиновый сок',
        price: 120,
        category: 'drink',
        count: '300 мл',
        image: 'images/drink2.jpg',
        kind: 'cold'
    },
    {
        keyword: 'berry-juice',
        name: 'Ягодный морс',
        price: 90,
        category: 'drink',
        count: '300 мл',
        image: 'images/drink3.jpg',
        kind: 'cold'
    },
    {
        keyword: 'coffee',
        name: 'Кофе американо',
        price: 130,
        category: 'drink',
        count: '200 мл',
        image: 'images/drink4.jpg',
        kind: 'hot'
    },
    {
        keyword: 'tea',
        name: 'Чай черный',
        price: 80,
        category: 'drink',
        count: '250 мл',
        image: 'images/drink5.jpg',
        kind: 'hot'
    },
    {
        keyword: 'cappuccino',
        name: 'Капучино',
        price: 160,
        category: 'drink',
        count: '200 мл',
        image: 'images/drink6.jpg',
        kind: 'hot'
    },

    // Салаты и стартеры (6 блюд)
    {
        keyword: 'caesar',
        name: 'Цезарь с курицей',
        price: 280,
        category: 'salad',
        count: '250 г',
        image: 'images/salad1.jpg',
        kind: 'meat'
    },
    {
        keyword: 'greek-salad',
        name: 'Греческий салат',
        price: 240,
        category: 'salad',
        count: '300 г',
        image: 'images/salad2.jpg',
        kind: 'veg'
    },
    {
        keyword: 'shrimp-cocktail',
        name: 'Коктейль из креветок',
        price: 350,
        category: 'salad',
        count: '200 г',
        image: 'images/salad3.jpg',
        kind: 'fish'
    },
    {
        keyword: 'vegetable-salad',
        name: 'Овощной салат',
        price: 190,
        category: 'salad',
        count: '300 г',
        image: 'images/salad4.jpg',
        kind: 'veg'
    },
    {
        keyword: 'caprese',
        name: 'Капрезе',
        price: 270,
        category: 'salad',
        count: '250 г',
        image: 'images/salad5.jpg',
        kind: 'veg'
    },
    {
        keyword: 'olivier',
        name: 'Салат Оливье',
        price: 220,
        category: 'salad',
        count: '250 г',
        image: 'images/salad6.jpg',
        kind: 'veg'
    },

    // Десерты (6 блюд)
    {
        keyword: 'tiramisu',
        name: 'Тирамису',
        price: 210,
        category: 'dessert',
        count: '150 г',
        image: 'images/dessert1.jpg',
        kind: 'medium'
    },
    {
        keyword: 'cheesecake',
        name: 'Чизкейк',
        price: 230,
        category: 'dessert',
        count: '120 г',
        image: 'images/dessert2.jpg',
        kind: 'small'
    },
    {
        keyword: 'chocolate-cake',
        name: 'Шоколадный торт',
        price: 190,
        category: 'dessert',
        count: '100 г',
        image: 'images/dessert3.jpg',
        kind: 'small'
    },
    {
        keyword: 'ice-cream',
        name: 'Мороженое',
        price: 150,
        category: 'dessert',
        count: '100 г',
        image: 'images/dessert4.jpg',
        kind: 'small'
    },
    {
        keyword: 'napoleon',
        name: 'Наполеон',
        price: 180,
        category: 'dessert',
        count: '150 г',
        image: 'images/dessert5.jpg',
        kind: 'medium'
    },
    {
        keyword: 'fruit-platter',
        name: 'Фруктовая тарелка',
        price: 320,
        category: 'dessert',
        count: '400 г',
        image: 'images/dessert6.jpg',
        kind: 'large'
    }
];