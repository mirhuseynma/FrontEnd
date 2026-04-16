const form = document.querySelector('.form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('submitpassword');
const inputs = [nameInput, emailInput, passwordInput, confirmPasswordInput];


form.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    let isValid = true;
    const duplicateState = existEmailAndUsername(email, name);

    if (!validation(nameInput, 'Please enter a username')) isValid = false;
    if (!validation(emailInput, 'Please enter an email')) isValid = false;
    if (!validation(passwordInput, 'Please enter a password')) isValid = false;
    if (!validation(confirmPasswordInput, 'Please confirm your password')) isValid = false; 
    if (duplicateState.nameExists || duplicateState.emailExists) isValid = false;


    if(isValid){
        saveData();
        alert('Form submitted successfully!');
        form.reset();
    }
    else {
        alert('Please fix the errors in the form before submitting.');
    }
});

function showError(input, message) {
    const errorElement = input.parentElement.querySelector('.error');
    errorElement.textContent = message;
    input.style.borderColor = 'red';
}

function clearError(input) {
    const errorElement = input.parentElement.querySelector('.error');
    errorElement.textContent = '';
    input.style.borderColor = '';
}

function validation(input, message) {
    const value = input.value.trim();
    const errorElement = input.parentElement.querySelector('.error');

    if (value === '') {
        showError(input, message);
        return false;
    } else {
        clearError(input);
        return true;
    }
}

inputs.forEach(input => {
    input.addEventListener('input', function() {
        if(validation(input, '')) {
            clearError(input);
        }
    });
});

function saveData() {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const userData = {
        name: name,
        email: email,
        password: password
    };

    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
}

const debouncedExistEmailAndUsername = debounce(existEmailAndUsername, 500);


nameInput.addEventListener('input', function() {
    debouncedExistEmailAndUsername(emailInput.value.trim(), nameInput.value.trim());
});

emailInput.addEventListener('input', function() {
    debouncedExistEmailAndUsername(emailInput.value.trim(), nameInput.value.trim());
});

nameInput.addEventListener('input', function() {
    const value = nameInput.value.trim();
    if (value.length < 3) {
        showError(nameInput, 'Username must be at least 3 characters');
    } else {
        clearError(nameInput);
    }   
});


function existEmailAndUsername(email, name) {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const nameExists = users.some(user => user.name === name);
    const emailExists = users.some(user => user.email === email);

    if (nameExists) showError(nameInput, 'Username already exists');
    else if (nameInput.value.trim() !== '' && nameInput.value.trim().length >= 3) clearError(nameInput);

    if (emailExists) showError(emailInput, 'Email already exists');
    else if (emailInput.value.trim() !== '') clearError(emailInput);

    return { nameExists, emailExists };
}


function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}


