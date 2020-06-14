// On page load focus on 'name' input field
document.getElementById('name').focus();

/*** 
 *  Job Role Section
 *  When other is checked, text box appears
***/
const otherJob = document.getElementById('other-title');
otherJob.style.display = 'none';
const jobSelect = document.getElementById('title');

jobSelect.addEventListener('click', () => {
    if(jobSelect.value === 'other') {
        otherJob.style.display = 'block';
    }else {
        otherJob.style.display = 'none'
    }
});

