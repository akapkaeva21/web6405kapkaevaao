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
        // Отправка POST-запроса
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

        // Вывод полученных данных на экран
        document.getElementById('dataDisplay').innerHTML = JSON.stringify(data);

    } catch (error) {
        console.error('Ошибка при отправке данных:', error);
        alert('Произошла ошибка. Попробуйте позже.');
    }
}

// Привязываем обработчик событий к форме
document.getElementById('serviceForm').addEventListener('submit', submitForm);
