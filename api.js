// api.js
const API_URL = 'https://edu.std-900.ist.mospolytech.ru/labs/api/dishes';

// Функция для загрузки блюд с API
async function loadDishes() {
    try {
        console.log('Загрузка блюд с API...');
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const dishes = await response.json();
        console.log('Блюда загружены с API:', dishes.length, 'шт.');

        return dishes;
    } catch (error) {
        console.error('Ошибка при загрузке блюд:', error);
        alert('Не удалось загрузить меню. Пожалуйста, обновите страницу.');
        return [];
    }
}