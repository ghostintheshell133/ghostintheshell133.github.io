function calculate() {
    var quantityField = document.getElementById('quantity');
    var productField = document.getElementById('product');
    var result = document.getElementById('result');

    var quantityText = quantityField.value.trim();
    var pattern = /^[0-9]+$/;

    if (!pattern.test(quantityText)) {
        result.className = 'error';
        result.textContent = 'Ошибка: в поле количества допустимы только цифры (целое число).';
        return;
    }

    var quantity = parseInt(quantityText, 10);
    var price = parseInt(productField.value, 10);

    result.className = '';
    result.textContent = 'Стоимость заказа: ' + (price * quantity) + ' ₽';
}

function init() {
    document.getElementById('calc-button').addEventListener('click', calculate);
}

document.addEventListener('DOMContentLoaded', init);
