// Функция для отправки данных формы на сервер
async function submitForm(event) {
    event.preventDefault(); // Отменяем стандартное поведение формы

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();

    // Проверка на пустые поля
    if (name === '' || email === '') {
        alert('Пожалуйста, заполните все поля.');
        return;
    }

    // Проверка на валидность email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Пожалуйста, введите корректный адрес электронной почты.');
        return;
    }

    // Создание объекта с данными для отправки
    const formData = {
        name: name,
        email: email
    };

    try {
        // Отправка POST-запроса на mock-json-server
        const response = await fetch('http://localhost:3000/services', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Сетевая ошибка: ' + response.status);
        }

        const data = await response.json();
        alert('Запрос успешно отправлен!');

        // Обновление таблицы с услугами
        fetchServices();

    } catch (error) {
        console.error('Ошибка при отправке данных:', error);
        alert('Произошла ошибка. Попробуйте позже.');
    }
}

// Функция для получения данных с сервера
async function fetchServices() {
    try {
        const response = await fetch('http://localhost:3000/services');

        if (!response.ok) {
            throw new Error('Ошибка сети: ' + response.status);
        }

        const services = await response.json();
        populateTable(services);
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        alert('Произошла ошибка при загрузке данных. Попробуйте позже.');
    }
}

// Функция для заполнения таблицы данными
function populateTable(services) {
    const tableBody = document.getElementById('servicesTable').getElementsByTagName('tbody')[0];

    // Очистка предыдущих данных
    tableBody.innerHTML = '';

    services.forEach(service => {
        const row = tableBody.insertRow();
        const cellName = row.insertCell(0);
        const cellEmail = row.insertCell(1);

        cellName.textContent = service.name;
        cellEmail.textContent = service.email;
    });
}

// Привязываем обработчик событий к форме
document.getElementById('serviceForm').addEventListener('submit', submitForm);

// Вызов функции при загрузке страницы
window.onload = fetchServices;
