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

// UserName
userName.addEventListener('input', (e) => {
    isValid(nameRegExp.test(e.target.value), e.target);
});

// Email
userEmail.addEventListener('input', (e) => {
    isValid(emailRegExp.test(e.target.value), e.target);
});

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
 *  Payment Info Section -- Refactor this later
***/
const userPayment = document.getElementById('payment');
const userCC = document.getElementById('cc-num');
const userZip = document.getElementById('zip');
const userCVV = document.getElementById('user-cvv');
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
 *  Helpers
***/
// Regular Expressions

const nameRegExp = /^[a-zA-Z][a-zA-Z\-' ]*[a-zA-Z ]$/;
const emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const ccRegExp = /^((4\d{3})|(5[1-5]\d{2})|(6011))-?\d{4}-?\d{4}-?\d{4}|3[4,7]\d{13}$/;
const zipRegExp = /^\d{5}$/;
const cvvRegExp = /^([0-9]{3})$/;

// validator
function isValid(validator, element) {
    if(validator) {
        element.style.borderColor = 'lightgreen';
        return true;
    }else {
        element.style.borderColor = 'red';
        return false;
    }
}