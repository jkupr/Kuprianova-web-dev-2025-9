// api.js - добавляем эти функции

// Функции для работы с пользователями
function getCurrentUser() {
    // В реальном приложении здесь была бы аутентификация
    // Для демо используем фиксированного пользователя
    return {
        id: 1,
        email: 'current@user.com',
        name: 'Текущий Пользователь'
    };
}

function getUserOrders() {
    const user = getCurrentUser();
    // В реальном приложении здесь был бы запрос к серверу с фильтрацией по пользователю
    return loadOrders().then(orders => {
        // Фильтруем заказы по email пользователя (временное решение)
        return orders.filter(order => order.email === user.email);
    });
}

// Обновляем существующие функции
async function submitOrder(orderData) {
    try {
        console.log('Отправка заказа на сервер:', orderData);

        const user = getCurrentUser();
        const orderWithUser = {
            ...orderData,
            user_id: user.id, // Добавляем ID пользователя
            user_email: user.email // Добавляем email пользователя
        };

        const response = await fetch('http://localhost:3001/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderWithUser)
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