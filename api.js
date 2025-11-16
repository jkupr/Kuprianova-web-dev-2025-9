// api.js
const API_URL = 'http://localhost:3001/dishes';

async function loadDishes() {
    try {
        console.log('Загрузка блюд с JSON Server...');
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const dishes = await response.json();
        console.log('Блюда загружены с JSON Server:', dishes.length, 'шт.');

        const nonMainDishes = dishes.filter(dish => dish.category !== 'main');
        console.log('Не главные блюда с API:', nonMainDishes.length, 'шт.');

        return nonMainDishes;
    } catch (error) {
        console.error('Ошибка при загрузке блюд:', error);
        alert('Не удалось загрузить меню. Пожалуйста, обновите страницу.');
        return [];
    }
}

async function submitOrder(orderData) {
    try {
        console.log('Отправка заказа на сервер:', orderData);
        
        const response = await fetch('http://localhost:3001/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Заказ успешно отправлен:', result);
        return result;

    } catch (error) {
        console.error('Ошибка при отправке заказа:', error);
        throw error;
    }
}