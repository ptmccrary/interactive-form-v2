/*** 
 *  Basic Info Section
***/
const form = document.querySelector('form');
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
    if(userActivities === 0) {
        errorContainer('activityError', 'activities', false, 0, 9, 'Please select one or more activities.' );
    }else {
        errorContainer('activityError', 'activities', true, 0, 9, 'Please select one or more activities.' )

    }
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
const ccRegExp = /^(\d{4}-){3}\d{4}$|^(\d{4} ){3}\d{4}$|^\d{13,16}$/;
const zipRegExp = /^\d{5}$/;
const cvvRegExp = /^([0-9]{3})$/;


// Adds a class to the 'basic info' fieldset
document.getElementsByTagName('fieldset')[0].className = 'basic-info';

// Creates div for the error messages
const errorDiv = document.createElement('div');
const errorList = document.createElement('ul');
form.prepend(errorDiv);
errorDiv.appendChild(errorList);
const errorUl = document.createElement('ul');
const errorLi = document.createElement('li');
errorUl.appendChild(errorLi);

// 
function inputBorder(element, color) {
        element.style.borderColor = color;
}

function errorContainer(id, parentNode, bool, parentPlace, childPlace, message) {
    errorLi.innerText = message;
    errorLi.id = id;
    errorLi.style.color = 'red';
    errorLi.style.marginLeft = '10px';
    errorLi.style.fontSize = '14px';
    errorLi.hidden = bool;
    const parentElement = document.getElementsByClassName(parentNode)[parentPlace];
    parentElement.insertBefore(errorLi, parentElement.children[childPlace]);
}

function validator(input, regExp, id, parentNode, parentPlace, childPlace, message) {
    input.addEventListener('input', (e) => {
        if(regExp.test(e.target.value) === true) {
            errorContainer(id, parentNode, true, parentPlace, childPlace, message);
            inputBorder(input, 'lightgreen');
        }else {
            errorContainer(id, parentNode, false, parentPlace, childPlace, message);
            inputBorder(input, 'red');
        }
    });
}

// UserName Validation
validator(userName, nameRegExp, 'nameError', 'basic-info', 0, 3, 'Please enter a name more than 1 character long.');

// Email Validation
validator(userEmail, emailRegExp, 'emailError', 'basic-info', 0, 6, 'Please enter a valid email address.');

// Credit card validation
validator(userCC, ccRegExp, 'ccError', 'col-6', 0, 2, 'Please enter a credit card number 13-16 digits long.');

// Zip code validation
validator(userZip, zipRegExp, 'zipError', 'col-3', 0, 2, 'Please enter a valid zip code.');

// CVV validation
validator(userCVV, cvvRegExp, 'cvvError', 'col-3', 1, 2, 'Please enter a valid CVV.');
