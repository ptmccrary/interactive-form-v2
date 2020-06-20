const form = document.querySelector('form');
form.reset();

/*** 
 *  Basic Info Section
***/
const userName = document.getElementById('name');
const userEmail = document.getElementById('mail');
const userJobRole = document.getElementById('title');
const otherJob = document.getElementById('other-title');
otherJob.hidden = true;

// On page load focus on 'name' input field
userName.focus();

// if jobSelect = 'other' then show text input box
userJobRole.addEventListener('input', (e) => {
    if(e.target.value === 'other') {
        otherJob.hidden = false;
    }else {
        otherJob.hidden = true;
    }
});

/***
 * T-Shirt Section
***/
const userShirtDesign = document.getElementById('design');
const userShirtColor = document.getElementById('colors-js-puns');
userShirtColor.hidden = true;

// Shows and hides color options && updates the label text content
function hideShowColorSelect(showHide, textContent) {
    userShirtColor.hidden = showHide;
    const colorSelect = document.getElementById('color');
    colorSelect.hidden = showHide;
    const colorLabel = document.querySelector('#colors-js-puns label');
    colorLabel.textContent = textContent
}

// Only Displays color options that include the string value
function colorDisplay(string) {
    const colorOptions = document.getElementById('color').children;

    for(let i = 0; i < colorOptions.length; i++) {
        if(colorOptions[i].textContent.includes(string)) {
            colorOptions[i].style.display = 'block';
        }else {
            colorOptions[i].style.display = 'none';
        }
    }
}

// Based on design input, updates color options 
userShirtDesign.addEventListener('input', (e) => {
    if(e.target.value === 'js puns'){
        hideShowColorSelect(false, 'Colors:');
        colorDisplay('JS Puns');
    }else if(e.target.value === 'heart js'){
        hideShowColorSelect(false, 'Colors:');
        colorDisplay('JS shirt');
    }else {
        hideShowColorSelect(true, null);
    }
})

/***
 * Activites Section
***/
const activities = document.querySelector('.activities');
const userActivities = activities.querySelectorAll('input');

// Creates activities total cost below checkboxes
let totalCost = 0;
const activityTotal = document.createElement('DIV');
activityTotal.innerHTML = `<p id='total-cost'>Total: $0`;
activities.appendChild(activityTotal);

// Disable activities that conflict
activities.addEventListener('input', (e) => {
    const click = e.target;
    const dateTime = click.getAttribute('data-day-and-time');
    
    for(i = 0; i < userActivities.length; i++) {
        const listDateTime = userActivities[i].getAttribute('data-day-and-time');
        
        // If date&time of event clicked = another date&time &&
        // event clicked doesn't equal input of event clicked, disable
        if(dateTime === listDateTime && click !== userActivities[i]) {
            if(click.checked === true) {
                userActivities[i].parentNode.style.color = 'grey';
                userActivities[i].disabled = true;
            }else if(click.checked === false) {
                userActivities[i].parentNode.style.color = '';
                userActivities[i].disabled = false;
            }
        }
    }
    // Update total cost tag
    let activityCost = parseInt(click.getAttribute('data-cost'));
    if(click.checked === true) {
        totalCost += activityCost;
    }else {
        totalCost -= activityCost;
    }
    document.querySelector('#total-cost').innerText = `Total $${totalCost}`;
});

/***
 *  Payment Info Section
***/
const userPayment = document.getElementById('payment');
const userCC = document.getElementById('cc-num');
const userZip = document.getElementById('zip');
const userCVV = document.getElementById('cvv');
const creditCard = document.getElementById('credit-card');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');

creditCard.hidden = true;
paypal.hidden = true;
bitcoin.hidden = true;

userPayment.addEventListener('input', (e) => {
    if (e.target.value === 'credit card') {
        creditCard.hidden = false;
        paypal.hidden = true;
        bitcoin.hidden = true;
    }else if(e.target.value === 'paypal') {
        creditCard.hidden = true;
        paypal.hidden = false;
        bitcoin.hidden = true;
    }else if(e.target.value === 'bitcoin') {
        creditCard.hidden = true;
        paypal.hidden = true;
        bitcoin.hidden = false;
    }else {
        creditCard.hidden = true;
        paypal.hidden = true;
        bitcoin.hidden = true;;
    }
})

/***
 *  Validation
***/
// Regular Expressions

const nameRegExp = /^[a-zA-Z][a-zA-Z\-' ]*[a-zA-Z ]$/;
const emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const validCCRegExp = /^(\d{4}-){3}\d{4}$|^(\d{4} ){3}\d{4}$|^\d{13,16}$/;
const ccEnteredRegExp = /^\d$/;
const zipRegExp = /^\d{5}$/;
const cvvRegExp = /^([0-9]{3})$/;

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

// Creates div for the error messages
const errorDiv = document.createElement('div');
const errorList = document.createElement('ul');
form.prepend(errorDiv);
errorDiv.appendChild(errorList);
const errorUl = document.createElement('ul');
const errorLi = document.createElement('li');
errorUl.appendChild(errorLi);

// change border color
function inputBorder(element, color) {
        element.style.borderColor = color;
}

function errorContainer(id, parentNode, bool, message) {
    const parentElement = document.querySelector(parentNode);
    const errorMessage = message;
    errorLi.textContent = errorMessage;
    errorLi.id = id;
    errorLi.style.color = 'red';
    errorLi.style.marginLeft = '10px';
    errorLi.style.fontSize = '14px';
    errorLi.hidden = bool;
    insertAfter(errorLi, parentElement);
}

function realTimeValidator(input, regExp, id, parentNode, message) {
    input.addEventListener('input', () => {
        if(regExp.test(input.value) === true) {
            errorContainer(id, parentNode, true, message);
            inputBorder(input, 'lightgreen');
        }else {
            errorContainer(id, parentNode, false, message);
            inputBorder(input, 'red');
        }
    });
}

function validator(regExp, input) {
    if(regExp.test(input.value) === true) {
        return true;
    }else {
        return false;
    }
}

// Real Time Validation
// UserName
realTimeValidator(userName, nameRegExp, 'nameError', '#name', 'Please enter a name more than 1 character long.');

// Email
realTimeValidator(userEmail, emailRegExp, 'emailError', '#mail', 'Please enter a valid email address.');

// Credit card 
realTimeValidator(userCC, validCCRegExp, 'ccError', '#cc-num', 'Please enter a credit card number 13-16 digits long.');
realTimeValidator(userCC, ccEnteredRegExp, 'ccError2', '#cc-num', 'Please enter a credit card.');

// Zip code
realTimeValidator(userZip, zipRegExp, 'zipError', '#zip', 'Please enter a valid zip code.');

// CVV
realTimeValidator(userCVV, cvvRegExp, 'cvvError', '#cvv', 'Please enter a valid CVV.');

// Submit Validation
form.addEventListener('submit', () => {
    if(
        validator(nameRegExp, userName) === true &&
        validator(emailRegExp, userEmail) === true &&
        validator(validCCRegExp, userCC) === true &&
        validator(zipRegExp, userZip) === true &&
        validator(cvvRegExp, userCVV) === true) {
            window.alert('Everything submitted successfully!');
    }else {
        window.alert(`One or more fields aren't filled out correctly.`);
    }
});