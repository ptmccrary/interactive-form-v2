// On page load focus on 'name' input field
document.getElementById('name').focus();

/*** 
 *  Job Role Section
 *  When other is checked, text box appears
***/
const otherJob = document.getElementById('other-title');
otherJob.hidden = true;
const jobSelect = document.getElementById('title');

jobSelect.addEventListener('input', (e) => {
    if(e.target.value === 'other') {
        otherJob.hidden = false;
    }else {
        otherJob.hidden = true;
    }
});

/***
 * T-Shirt Section
***/
function hideColorSelect() {
    const colorSelect = document.getElementById('color');
    colorSelect.hidden = true;
    const colorLabel = document.querySelector('#colors-js-puns label');
    colorLabel.textContent = 'Please select a T-shirt theme';
}

function showColorSelect() {
    const colorSelect = document.getElementById('color');
    colorSelect.hidden = false;
    const colorLabel = document.querySelector('#colors-js-puns label');
    colorLabel.textContent = 'Colors:'
}

const designSelect = document.getElementById('design');
const colorOptions = document.getElementById('color').children;


designSelect.addEventListener('input', (e) => {
    if(e.target.value === 'js puns'){
        showColorSelect();
        console.log('hi');
    }else if(e.target.value === 'heart js'){
        showColorSelect();
        console.log('yo');
    }else {
        hideColorSelect();
        console.log('sup');
    }
})