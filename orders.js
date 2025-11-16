// orders.js
class OrdersManager {
    constructor() {
        this.orders = [];
        this.dishes = [];
        this.init();
    }

    async init() {
        await this.loadDishes();
        await this.loadOrders();
        this.renderOrders();
    }

    async loadDishes() {
        try {
            const response = await fetch('http://localhost:3001/dishes');
            if (response.ok) {
                const serverDishes = await response.json();
                if (serverDishes && serverDishes.length > 0) {
                    this.dishes = serverDishes;
                    console.log('Блюда загружены с сервера:', this.dishes.length);
                } else {
                    this.dishes = this.getLocalDishes();
                    console.log('Сервер вернул пустой список, используем локальные блюда');
                }
            } else {
                this.dishes = this.getLocalDishes();
                console.log('Ошибка сервера, используем локальные блюда');
            }
        } catch (error) {
            console.error('Ошибка при загрузке блюд:', error);
            this.dishes = this.getLocalDishes();
        }

        console.log('Все доступные блюда:', this.dishes);
    }

    getLocalDishes() {
        return [
            // Супы (ID 1-6)
            { "id": 1, "name": "Том Ям с креветками", "price": 365, "category": "soup" },
            { "id": 2, "name": "Норвежский суп", "price": 270, "category": "soup" },
            { "id": 3, "name": "Грибной крем-суп", "price": 240, "category": "soup" },
            { "id": 4, "name": "Борщ с говядиной", "price": 280, "category": "soup" },
            { "id": 5, "name": "Куриный суп с лапшой", "price": 220, "category": "soup" },
            { "id": 6, "name": "Овощной суп", "price": 190, "category": "soup" },

            // Главные блюда (ID 101-106)
            { "id": 101, "name": "Жареная картошка с грибами", "price": 150, "category": "main" },
            { "id": 102, "name": "Котлеты из курицы с картофельным пюре", "price": 225, "category": "main" },
            { "id": 103, "name": "Лазанья", "price": 385, "category": "main" },
            { "id": 104, "name": "Лосось на гриле", "price": 420, "category": "main" },
            { "id": 105, "name": "Овощное рагу", "price": 180, "category": "main" },
            { "id": 106, "name": "Жареная рыба с овощами", "price": 320, "category": "main" },

            // Напитки (ID 201-206)
            { "id": 201, "name": "Coca-cola", "price": 110, "category": "drink" },
            { "id": 202, "name": "Апельсиновый сок", "price": 120, "category": "drink" },
            { "id": 203, "name": "Ягодный морс", "price": 90, "category": "drink" },
            { "id": 204, "name": "Кофе американо", "price": 130, "category": "drink" },
            { "id": 205, "name": "Чай черный", "price": 80, "category": "drink" },
            { "id": 206, "name": "Капучино", "price": 160, "category": "drink" },

            // Салаты (ID 301-306)
            { "id": 301, "name": "Цезарь с курицей", "price": 280, "category": "salad" },
            { "id": 302, "name": "Греческий салат", "price": 240, "category": "salad" },
            { "id": 303, "name": "Коктейль из креветок", "price": 350, "category": "salad" },
            { "id": 304, "name": "Овощной салат", "price": 190, "category": "salad" },
            { "id": 305, "name": "Капрезе", "price": 270, "category": "salad" },
            { "id": 306, "name": "Салат Оливье", "price": 220, "category": "salad" },

            // Десерты (ID 401-406)
            { "id": 401, "name": "Тирамису", "price": 210, "category": "dessert" },
            { "id": 402, "name": "Чизкейк", "price": 230, "category": "dessert" },
            { "id": 403, "name": "Шоколадный торт", "price": 190, "category": "dessert" },
            { "id": 404, "name": "Мороженое", "price": 150, "category": "dessert" },
            { "id": 405, "name": "Наполеон", "price": 180, "category": "dessert" },
            { "id": 406, "name": "Фруктовая тарелка", "price": 320, "category": "dessert" }
        ];
    }

    async loadOrders() {
        try {
            const response = await fetch('http://localhost:3001/orders');
            if (!response.ok) throw new Error('Ошибка загрузки заказов');

            this.orders = await response.json();

            // Сортируем по дате (новые сначала)
            this.orders.sort((a, b) => new Date(b.order_date) - new Date(a.order_date));

            console.log('Загружено заказов:', this.orders.length);

            // Отладочная информация
            this.orders.forEach(order => {
                console.log(`Заказ ${order.id}:`, {
                    soup: this.getDishInfo(order.soup_id),
                    main: this.getDishInfo(order.main_course_id),
                    salad: this.getDishInfo(order.salad_id),
                    drink: this.getDishInfo(order.drink_id),
                    dessert: this.getDishInfo(order.dessert_id)
                });
            });

        } catch (error) {
            console.error('Ошибка при загрузке заказов:', error);
            this.showNotification('Ошибка при загрузке заказов', 'error');
        }
    }

    getDishInfo(dishId) {
        if (!dishId) return null;
        const dish = this.dishes.find(d => d.id === dishId);
        return dish ? { name: dish.name, price: dish.price } : { name: `Блюдо #${dishId}`, price: 0 };
    }

    getDishName(dishId) {
        if (!dishId) return '';
        const dish = this.dishes.find(d => d.id === dishId);
        return dish ? dish.name : `Блюдо #${dishId}`;
    }

    getDishPrice(dishId) {
        if (!dishId) return 0;
        const dish = this.dishes.find(d => d.id === dishId);
        return dish ? dish.price : 0;
    }

    getOrderComposition(order) {
        const dishes = [];

        if (order.soup_id) dishes.push(this.getDishName(order.soup_id));
        if (order.main_course_id) dishes.push(this.getDishName(order.main_course_id));
        if (order.salad_id) dishes.push(this.getDishName(order.salad_id));
        if (order.drink_id) dishes.push(this.getDishName(order.drink_id));
        if (order.dessert_id) dishes.push(this.getDishName(order.dessert_id));

        return dishes.join(', ');
    }

    calculateOrderTotal(order) {
        let total = 0;

        total += this.getDishPrice(order.soup_id);
        total += this.getDishPrice(order.main_course_id);
        total += this.getDishPrice(order.salad_id);
        total += this.getDishPrice(order.drink_id);
        total += this.getDishPrice(order.dessert_id);

        console.log(`Расчет стоимости заказа ${order.id}:`, total);

        return total;
    }

    formatOrderDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU') + ' ' + date.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    getDeliveryTime(order) {
        if (order.delivery_type === 'specific' && order.delivery_time) {
            return order.delivery_time;
        }

        return 'Как можно скорее (с 07:00 до 23:00)';
    }

    renderOrders() {
        const loadingIndicator = document.getElementById('loading-indicator');
        const ordersContainer = document.getElementById('orders-container');
        const emptyOrders = document.getElementById('empty-orders');
        const ordersList = document.getElementById('orders-list');

        loadingIndicator.style.display = 'none';

        if (this.orders.length === 0) {
            emptyOrders.style.display = 'block';
            return;
        }

        ordersContainer.style.display = 'block';
        ordersList.innerHTML = '';

        this.orders.forEach((order, index) => {
            const orderRow = this.createOrderRow(order, index + 1);
            ordersList.appendChild(orderRow);
        });
    }

    createOrderRow(order, number) {
        const row = document.createElement('tr');
        row.className = 'order-row';

        const totalCost = this.calculateOrderTotal(order);
        const composition = this.getOrderComposition(order);
        const deliveryTime = this.getDeliveryTime(order);
        const orderDate = this.formatOrderDate(order.order_date);

        row.innerHTML = `
            <td>${number}</td>
            <td>${orderDate}</td>
            <td>${composition}</td>
            <td>${totalCost}Р</td>
            <td>${deliveryTime}</td>
            <td class="actions-cell">
                <button class="action-btn view-btn" data-order-id="${order.id}" title="Подробнее">
                    <i class="bi bi-eye"></i>
                </button>
                <button class="action-btn edit-btn" data-order-id="${order.id}" title="Редактировать">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="action-btn delete-btn" data-order-id="${order.id}" title="Удалить">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;

        this.addEventListenersToRow(row, order);
        return row;
    }

    addEventListenersToRow(row, order) {
        const viewBtn = row.querySelector('.view-btn');
        const editBtn = row.querySelector('.edit-btn');
        const deleteBtn = row.querySelector('.delete-btn');

        viewBtn.addEventListener('click', () => this.showOrderDetails(order));
        editBtn.addEventListener('click', () => this.showEditOrderForm(order));
        deleteBtn.addEventListener('click', () => this.showDeleteConfirmation(order));
    }

    showOrderDetails(order) {
        const totalCost = this.calculateOrderTotal(order);
        const orderDate = this.formatOrderDate(order.order_date);
        const deliveryTime = this.getDeliveryTime(order);

        const modalContent = `
            <div class="modal-header">
                <h2>Просмотр заказа #${order.id}</h2>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="order-details">
                    <div class="detail-section">
                        <h3>Информация о доставке</h3>
                        <p><strong>Дата заказа:</strong> ${orderDate}</p>
                        <p><strong>Имя получателя:</strong> ${order.full_name}</p>
                        <p><strong>Адрес доставки:</strong> ${order.delivery_address}</p>
                        <p><strong>Время доставки:</strong> ${deliveryTime}</p>
                        <p><strong>Телефон:</strong> ${order.phone}</p>
                        <p><strong>Email:</strong> ${order.email}</p>
                    </div>
                    
                    <div class="detail-section">
                        <h3>Состав заказа</h3>
                        <div class="order-composition">
                            ${this.getOrderCompositionHTML(order)}
                        </div>
                    </div>
                    
                    <div class="detail-section">
                        <h3>Стоимость</h3>
                        <div class="order-cost-breakdown">
                            ${this.getOrderCostBreakdownHTML(order)}
                        </div>
                        <div class="total-cost-detail">
                            <strong>Итого: ${totalCost}Р</strong>
                        </div>
                    </div>
                    
                    <div class="detail-section">
                        <h3>Комментарий</h3>
                        <p>${order.comment || 'Нет комментария'}</p>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="modal-btn ok-btn">Ок</button>
            </div>
        `;

        this.showModal(modalContent);
        this.setupModalHandlers();
    }

    getOrderCompositionHTML(order) {
        let html = '';
        if (order.soup_id) {
            const dishName = this.getDishName(order.soup_id);
            const dishPrice = this.getDishPrice(order.soup_id);
            html += `<p>• Суп: ${dishName} - ${dishPrice}Р</p>`;
        }
        if (order.main_course_id) {
            const dishName = this.getDishName(order.main_course_id);
            const dishPrice = this.getDishPrice(order.main_course_id);
            html += `<p>• Основное блюдо: ${dishName} - ${dishPrice}Р</p>`;
        }
        if (order.salad_id) {
            const dishName = this.getDishName(order.salad_id);
            const dishPrice = this.getDishPrice(order.salad_id);
            html += `<p>• Салат: ${dishName} - ${dishPrice}Р</p>`;
        }
        if (order.drink_id) {
            const dishName = this.getDishName(order.drink_id);
            const dishPrice = this.getDishPrice(order.drink_id);
            html += `<p>• Напиток: ${dishName} - ${dishPrice}Р</p>`;
        }
        if (order.dessert_id) {
            const dishName = this.getDishName(order.dessert_id);
            const dishPrice = this.getDishPrice(order.dessert_id);
            html += `<p>• Десерт: ${dishName} - ${dishPrice}Р</p>`;
        }
        return html || '<p>Состав заказа не указан</p>';
    }

    getOrderCostBreakdownHTML(order) {
        let html = '';
        let total = 0;

        if (order.soup_id) {
            const price = this.getDishPrice(order.soup_id);
            html += `<p>Суп: ${price}Р</p>`;
            total += price;
        }
        if (order.main_course_id) {
            const price = this.getDishPrice(order.main_course_id);
            html += `<p>Основное блюдо: ${price}Р</p>`;
            total += price;
        }
        if (order.salad_id) {
            const price = this.getDishPrice(order.salad_id);
            html += `<p>Салат: ${price}Р</p>`;
            total += price;
        }
        if (order.drink_id) {
            const price = this.getDishPrice(order.drink_id);
            html += `<p>Напиток: ${price}Р</p>`;
            total += price;
        }
        if (order.dessert_id) {
            const price = this.getDishPrice(order.dessert_id);
            html += `<p>Десерт: ${price}Р</p>`;
            total += price;
        }

        return html;
    }

    showEditOrderForm(order) {
        const modalContent = `
            <div class="modal-header">
                <h2>Редактирование заказа #${order.id}</h2>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <form class="edit-order-form" id="edit-order-form">
                    <div class="form-section">
                        <h3>Данные для оформления</h3>
                        <div class="form-row">
                            <label for="edit-full_name">Имя получателя</label>
                            <input type="text" id="edit-full_name" name="full_name" value="${order.full_name}" required>
                        </div>
                        <div class="form-row">
                            <label for="edit-email">Email</label>
                            <input type="email" id="edit-email" name="email" value="${order.email}" required>
                        </div>
                        <div class="form-row">
                            <label for="edit-phone">Телефон</label>
                            <input type="tel" id="edit-phone" name="phone" value="${order.phone}" required>
                        </div>
                        <div class="form-row">
                            <label for="edit-delivery_address">Адрес доставки</label>
                            <input type="text" id="edit-delivery_address" name="delivery_address" value="${order.delivery_address}" required>
                        </div>
                        <div class="form-row">
                            <label>Тип доставки:</label>
                            <div class="radio-group">
                                <div class="radio-option">
                                    <input type="radio" id="edit-delivery_type-now" name="delivery_type" value="now" ${order.delivery_type === 'now' ? 'checked' : ''}>
                                    <label for="edit-delivery_type-now">Как можно скорее</label>
                                </div>
                                <div class="radio-option">
                                    <input type="radio" id="edit-delivery_type-specific" name="delivery_type" value="specific" ${order.delivery_type === 'specific' ? 'checked' : ''}>
                                    <label for="edit-delivery_type-specific">Ко времени</label>
                                </div>
                            </div>
                        </div>
                        <div class="form-row" id="edit-delivery-time-container" style="${order.delivery_type === 'specific' ? '' : 'display: none;'}">
                            <label for="edit-delivery_time">Время доставки</label>
                            <input type="time" id="edit-delivery_time" name="delivery_time" value="${order.delivery_time || ''}">
                        </div>
                    </div>
                    
                    <div class="form-section">
                        <h3>Комментарий</h3>
                        <div class="form-row">
                            <textarea id="edit-comment" name="comment" rows="3" placeholder="Ваши пожелания...">${order.comment || ''}</textarea>
                        </div>
                        <div class="form-row checkbox-row">
                            <input type="checkbox" id="edit-subscribe" name="subscribe" ${order.subscribe ? 'checked' : ''}>
                            <label for="edit-subscribe">Получать информацию о скидках и акциях</label>
                        </div>
                    </div>
                    
                    <div class="form-section">
                        <h3>Состав заказа (не редактируется)</h3>
                        <div class="order-composition-readonly">
                            ${this.getOrderCompositionHTML(order)}
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="modal-btn cancel-btn">Отмена</button>
                <button type="submit" form="edit-order-form" class="modal-btn save-btn">Сохранить</button>
            </div>
        `;

        this.showModal(modalContent);
        this.setupEditFormHandlers(order.id);
        this.setupModalHandlers();
    }

    setupEditFormHandlers(orderId) {
        const form = document.getElementById('edit-order-form');
        const deliveryTypeRadios = form.querySelectorAll('input[name="delivery_type"]');
        const deliveryTimeContainer = document.getElementById('edit-delivery-time-container');

        deliveryTypeRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                deliveryTimeContainer.style.display = e.target.value === 'specific' ? 'block' : 'none';
            });
        });

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.updateOrder(orderId, new FormData(form));
        });
    }

    async updateOrder(orderId, formData) {
        try {
            const orderData = {
                full_name: formData.get('full_name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                delivery_address: formData.get('delivery_address'),
                delivery_type: formData.get('delivery_type'),
                comment: formData.get('comment'),
                subscribe: formData.get('subscribe') ? 1 : 0
            };

            if (orderData.delivery_type === 'specific') {
                orderData.delivery_time = formData.get('delivery_time');
            } else {
                orderData.delivery_time = null;
            }

            const response = await fetch(`http://localhost:3001/orders/${orderId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData)
            });

            if (!response.ok) throw new Error('Ошибка при обновлении заказа');

            this.hideModal();
            await this.loadOrders();
            this.renderOrders();
            this.showNotification('Заказ успешно изменён', 'success');

        } catch (error) {
            console.error('Ошибка при обновлении заказа:', error);
            this.showNotification('Ошибка при изменении заказа', 'error');
        }
    }

    showDeleteConfirmation(order) {
        const modalContent = `
            <div class="modal-header">
                <h2>Удаление заказа #${order.id}</h2>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <p>Вы уверены, что хотите удалить заказ от ${this.formatOrderDate(order.order_date)}?</p>
                <p><strong>Состав:</strong> ${this.getOrderComposition(order)}</p>
                <p><strong>Стоимость:</strong> ${this.calculateOrderTotal(order)}Р</p>
            </div>
            <div class="modal-footer">
                <button class="modal-btn cancel-btn">Отмена</button>
                <button class="modal-btn confirm-delete-btn">Да</button>
            </div>
        `;

        this.showModal(modalContent);

        const confirmBtn = document.querySelector('.confirm-delete-btn');
        confirmBtn.addEventListener('click', () => this.deleteOrder(order.id));

        this.setupModalHandlers();
    }

    async deleteOrder(orderId) {
        try {
            const response = await fetch(`http://localhost:3001/orders/${orderId}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Ошибка при удалении заказа');

            this.hideModal();
            await this.loadOrders();
            this.renderOrders();
            this.showNotification('Заказ успешно удалён', 'success');

        } catch (error) {
            console.error('Ошибка при удалении заказа:', error);
            this.showNotification('Ошибка при удалении заказа', 'error');
        }
    }

    showModal(content) {
        const overlay = document.getElementById('modal-overlay');
        const modalContent = document.querySelector('.modal-content');

        modalContent.innerHTML = content;
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    hideModal() {
        const overlay = document.getElementById('modal-overlay');
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    }

    setupModalHandlers() {
        const overlay = document.getElementById('modal-overlay');
        const closeBtn = document.querySelector('.close-modal');
        const cancelBtn = document.querySelector('.cancel-btn');
        const okBtn = document.querySelector('.ok-btn');

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.hideModal();
            }
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hideModal());
        }

        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => this.hideModal());
        }

        if (okBtn) {
            okBtn.addEventListener('click', () => this.hideModal());
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            border-radius: 5px;
            z-index: 1000;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    new OrdersManager();
});