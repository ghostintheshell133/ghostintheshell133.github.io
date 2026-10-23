var basePrices = {
    keyboard: 2300,
    mouse: 800,
    mic: 700
};

var warrantyPrice = 250;

function getProduct() {
    return document.querySelector('input[name="product"]:checked').value;
}

function updateVisibility(product) {
    document.getElementById('option-group').hidden = product !== 'mouse';
    document.getElementById('property-group').hidden = product !== 'mic';
}

function calculate() {
    var product = getProduct();
    var quantityField = document.getElementById('quantity');
    var quantityText = quantityField.value.trim();
    var result = document.getElementById('result');
    var pattern = /^[0-9]+$/;

    var price = basePrices[product];

    updateVisibility(product);

    if (!pattern.test(quantityText)) {
        result.className = 'error';
        result.textContent = 'Ошибка: в поле количества допустимы только цифры (целое число).';
        return;
    }

    if (product === 'mouse') {
        price += parseInt(document.getElementById('option').value, 10);
    }

    if (product === 'mic' && document.getElementById('property').checked) {
        price += warrantyPrice;
    }

    result.className = '';
    result.textContent = 'Стоимость заказа: ' + (price * parseInt(quantityText, 10)) + ' ₽';
}

function init() {
    var form = document.getElementById('calc-form');
    form.addEventListener('input', calculate);
    form.addEventListener('change', calculate);
    form.addEventListener('submit', function (event) {
        event.preventDefault();
    });
    calculate();
}

document.addEventListener('DOMContentLoaded', init);
