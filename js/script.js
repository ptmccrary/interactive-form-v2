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
        if(colorOptions[i].textContent.includes('JS Puns') && userShirtDesign.value === 'js puns') {
            colorOptions[i].style.display = 'block';
            colorOptions[0].selected = true;
        }else if(colorOptions[i].textContent.includes('JS shirt') && userShirtDesign.value === 'heart js') {
            colorOptions[i].style.display = 'block';
            colorOptions[3].selected = true;
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

userPayment.children[0].hidden = true;
userPayment.children[1].selected = true;

creditCard.hidden = false;
paypal.hidden = true;
bitcoin.hidden = true;

userPayment.addEventListener('input', (e) => {
    if (userPayment.value === 'credit card') {
        creditCard.hidden = false;
        paypal.hidden = true;
        bitcoin.hidden = true;
    }else if(userPayment.value === 'paypal') {
        creditCard.hidden = true;
        paypal.hidden = false;
        bitcoin.hidden = true;
    }else if(userPayment.value === 'bitcoin') {
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
const zipRegExp = /^\d{5}$/;
const cvvRegExp = /^([0-9]{3})$/;

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

// change border color
function inputBorder(element, color) {
        element.style.borderColor = color;
}

// Creates error div for each input element
function createDiv(divID, liID, parentNode) {
    const errorDiv = document.createElement('div');
    const errorUl = document.createElement('ul');
    const errorLi = document.createElement('li');
    errorDiv.appendChild(errorUl);
    errorUl.appendChild(errorLi);
    errorDiv.id = divID;
    errorLi.id = liID;
    errorDiv.hidden = true;
    insertAfter(errorDiv, document.querySelector(parentNode));
}

// Error that will be displayed if condition is true
function error(bool, message, divID, liID) {
    const errorLi = document.getElementById(liID);
    const errorDiv = document.getElementById(divID);
    errorLi.textContent = message;
    errorLi.style.color = 'red';
    errorDiv.hidden = bool;
}

// Checks to see if condition has been met as user types
function realTimeValidator(input, regExp, divID, liID, parentNode, message) {
    createDiv(divID, liID, parentNode);
    input.addEventListener('input', () => {
        if(regExp.test(input.value) === true) {
            error(true, message, divID, liID);
            inputBorder(input, 'lightgreen');
        }else {
            error(false, message, divID, liID);
            inputBorder(input, 'red');
        }
    });
}

// Errors displayed if certain condition has been met when user hits submit
function submitValidator(input, regExp, divID, liID, parentNode, message) {
    const divExists = document.getElementById(divID);
    if(typeof(divExists) == 'undefined' || divExists == null) {
        createDiv(divID, liID, parentNode);
    }
    if(regExp.test(input.value) === false) {
        error(false, message, divID, liID);
        inputBorder(input, 'red');
    }
}

// Checks to see if the input has been filled out 
function isValid(regExp, input) {
    if(regExp.test(input.value) === true) {
        return true;
    }else {
        return false;
    }
}

// Validation for activity checkboxes
function activityIsValid() {
    let checkedBoxes = 0;
    for(i = 0; i < userActivities.length; i++) {
        if(userActivities[i].checked) {
            checkedBoxes++;
        }
    }

    const divExists = document.getElementById('activityErrorDiv');
    if(typeof(divExists) == 'undefined' || divExists == null) {
        createDiv('activityErrorDiv', 'activityErrorLi', '.activities legend');
    }
    if(checkedBoxes === 0) {
        error(false, 'Please select at least one activity', 'activityErrorDiv', 'activityErrorLi');
        return false;
    }else {
        error(true, 'Please select at least one activity', 'activityErrorDiv', 'activityErrorLi');
        return true;
    }
}

// Conditional validator
function conditionalValidator(input, regExp, divID, liID, parentNode, message1, message2) {
    if(input.value == '') {
        submitValidator(input, regExp, divID, liID, parentNode, message1);
    }else {
        submitValidator(input, regExp, divID, liID, parentNode, message2);
    }
}

// Real Time Validation
// UserName
realTimeValidator(userName, nameRegExp, 'nameErrorDiv', 'nameErrorLi', '#name', 'Please enter a name more than 1 character long');

// Email
realTimeValidator(userEmail, emailRegExp, 'emailErrorDiv', 'emailErrorLi', '#mail', 'Please enter a valid email address: example@domain.com');

// Credit card 
realTimeValidator(userCC, validCCRegExp, 'ccErrorDiv', 'ccErrorLi', '#cc-num', 'Please enter a credit card 13-16 digits long');

// Zip code
realTimeValidator(userZip, zipRegExp, 'zipErrorDiv', 'zipErrorLi', '#zip', 'Please enter a valid zip code');

// CVV
realTimeValidator(userCVV, cvvRegExp, 'cvvErrorDiv', 'cvvErrorLi', '#cvv', 'Please enter a valid CVV');

// Submit Validation
form.addEventListener('submit', (e) => {
    if(userPayment.value === 'credit card') {
        if
        (
            isValid(nameRegExp, userName) === false ||
            isValid(emailRegExp, userEmail) === false ||
            activityIsValid() === false ||
            isValid(validCCRegExp, userCC) === false ||
            isValid(zipRegExp, userZip) === false ||
            isValid(cvvRegExp, userCVV) === false
        ) {
            conditionalValidator(userName, nameRegExp, 'nameErrorDiv', 'nameErrorLi', '#name', 'Please enter a name', 'Name must be more than one character, containing no numbers or invalid characters');
            conditionalValidator(userEmail, emailRegExp, 'emailErrorDiv', 'emailErrorLi', '#mail', 'Please enter a valid email address', 'Email address must contain a single @ and a valid domain after the @');
            activityIsValid();
            conditionalValidator(userCC, validCCRegExp, 'ccErrorDiv', 'ccErrorLi', '#cc-num', 'Please enter a credit card', 'Please enter a credit card number 13-16 digits long');
            conditionalValidator(userZip, zipRegExp, 'zipErrorDiv', 'zipErrorLi', '#zip', 'Please enter a valid zip code', 'Zip code must be 5 digits long');
            conditionalValidator(userCVV, cvvRegExp, 'cvvErrorDiv', 'cvvErrorLi', '#cvv', 'Please enter a valid CVV', 'CVV must be 3 digits long');
            e.preventDefault();
        }
    }else if(userPayment.value === 'paypal' || userPayment.value === 'bitcoin') {
        if
        (
            isValid(nameRegExp, userName) === false ||
            isValid(emailRegExp, userEmail) === false ||
            activityIsValid() === false
        ) {
            conditionalValidator(userName, nameRegExp, 'nameErrorDiv', 'nameErrorLi', '#name', 'Please enter a name', 'Name must be more than one character, containing no numbers or invalid characters');
            conditionalValidator(userEmail, emailRegExp, 'emailErrorDiv', 'emailErrorLi', '#mail', 'Please enter a valid email address', 'Email address must contain a single @ and a valid domain after the @');
            activityIsValid();
            e.preventDefault();
        }
    }
    window.scrollTo(0, 0);
});