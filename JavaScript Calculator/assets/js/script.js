var num1 = document.getElementById('num1');
var num2 = document.getElementById('num2');
var result = document.getElementById('result');

document.getElementById('add').addEventListener('click', function() {
    result.value = parseFloat(num1.value) + parseFloat(num2.value);
});

document.getElementById('subtract').addEventListener('click', function() {
    result.value = parseFloat(num1.value) - parseFloat(num2.value);
}); 

document.getElementById('multiply').addEventListener('click', function() {
    result.value = parseFloat(num1.value) * parseFloat(num2.value);
});

document.getElementById('divide').addEventListener('click', function() {
    if (parseFloat(num2.value) !== 0) {
        result.value = parseFloat(num1.value) / parseFloat(num2.value);
    } else {
        result.value = 'Error: Division by zero';
    }
});

document.getElementById('clear').addEventListener('click', function() {
    num1.value = '';
    num2.value = '';
    result.value = '';
});

