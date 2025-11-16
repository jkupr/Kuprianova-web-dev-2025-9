// clearOldOrders.js - простой скрипт для очистки старых заказов
function clearOldOrders() {
    if (confirm('Очистить все заказы кроме последних 5?')) {
        fetch('http://localhost:3001/orders')
            .then(response => response.json())
            .then(orders => {
                // Оставляем только последние 5 заказов
                const ordersToKeep = orders.slice(-5);
                const ordersToDelete = orders.slice(0, -5);

                // Удаляем старые заказы
                const deletePromises = ordersToDelete.map(order =>
                    fetch(`http://localhost:3001/orders/${order.id}`, { method: 'DELETE' })
                );

                return Promise.all(deletePromises);
            })
            .then(() => {
                alert('Старые заказы очищены!');
                location.reload();
            })
            .catch(error => {
                alert('Ошибка при очистке заказов: ' + error.message);
            });
    }
}

// Добавляем кнопку очистки на страницу заказов
document.addEventListener('DOMContentLoaded', function () {
    const ordersContainer = document.getElementById('orders-container');
    if (ordersContainer) {
        const clearButton = document.createElement('button');
        clearButton.textContent = 'Очистить старые заказы';
        clearButton.style.cssText = `
            background: #f44336;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            margin: 20px 0;
        `;
        clearButton.onclick = clearOldOrders;

        ordersContainer.parentNode.insertBefore(clearButton, ordersContainer);
    }
});