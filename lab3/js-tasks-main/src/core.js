/**
 * Проверяет, является ли число целым, используя побитовые операторы
 * @param {*} n
 * @returns {boolean}
 */
function isInteger(n) {
    return (n | 0) === n;
}

/**
 * Возвращает массив четных чисел от 2 до 20 включительно
 * @returns {number[]}
 */
function even() {
    const evens = [];
    for (let i = 2; i <= 20; i += 2) {
        evens.push(i);
    }
    return evens;
}

/**
 * Считает сумму чисел до заданного используя цикл
 * @param {*} n
 * @returns {number}
 */
function sumTo(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

/**
 * Считает сумму чисел до заданного используя рекурсию
 * @param {*} n
 * @returns {number}
 */
function recSumTo(n) {
    if (n === 1) return 1;
    return n + recSumTo(n - 1);
}

/**
 * Считает факториал заданного числа
 * @param {*} n
 * @returns {number}
 */
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

/**
 * Определяет, является ли число двойкой, возведенной в степень
 * @param {*} n
 * @returns {boolean}
 */
function isBinary(n) {
    return n > 0 && (n & (n - 1)) === 0;
}

/**
 * Находит N-е число Фибоначчи
 * @param {*} n
 * @returns {number}
 */
function fibonacci(n) {
    if (n <= 0) return 0;
    if (n === 1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

/**
 * Возвращает функцию, выполняющую заданную операцию с начальным значением
 * @param initialValue
 * @param operatorFn - (storedValue, newValue) => {operation}
 * @returns {function}
 */
function getOperationFn(initialValue, operatorFn = () => initialValue) {
    let currentValue = initialValue;
    return function(newValue) {
        currentValue = operatorFn(currentValue, newValue);
        return currentValue;
    };
}

/**
 * Создает генератор арифметической последовательности
 * @param {number} start - число с которого начинается последовательность
 * @param {number} step - число шаг последовательности
 * @returns {function}
 */
function sequence(start = 0, step = 1) {
    let current = start;
    return function() {
        const value = current;
        current += step;
        return value;
    };
}

/**
 * Сравнивает два значения на равенство с учетом вложенных объектов
 * @param {object} firstObject - первый объект
 * @param {object} secondObject - второй объект
 * @returns {boolean}
 */
function deepEqual(firstObject, secondObject) {
    if (firstObject === secondObject) return true;

    if (typeof firstObject !== 'object' || firstObject === null ||
        typeof secondObject !== 'object' || secondObject === null) {
        return false;
    }

    const keysA = Object.keys(firstObject);
    const keysB = Object.keys(secondObject);

    if (keysA.length !== keysB.length) return false;

    for (let key of keysA) {
        if (!keysB.includes(key) || !deepEqual(firstObject[key], secondObject[key])) {
            return false;
        }
    }

    return true;
}

module.exports = {
    isInteger,
    even,
    sumTo,
    recSumTo,
    factorial,
    isBinary,
    fibonacci,
    getOperationFn,
    sequence,
    deepEqual,
};