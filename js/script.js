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
function hideShowColorSelect(showHide, textContent) {
    const colorSelect = document.getElementById('color');
    colorSelect.hidden = showHide;
    const colorLabel = document.querySelector('#colors-js-puns label');
    colorLabel.textContent = textContent
}

const designSelect = document.getElementById('design');

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

designSelect.addEventListener('input', (e) => {
    if(e.target.value === 'js puns'){
        hideShowColorSelect(false, 'Colors:');
        colorDisplay('JS Puns');
    }else if(e.target.value === 'heart js'){
        hideShowColorSelect(false, 'Colors:');
        colorDisplay('JS shirt');
    }else {
        hideShowColorSelect(true, 'Please select a T-shirt theme');
    }
})