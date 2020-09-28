document.addEventListener('DOMContentLoaded', e => {

   function getCheckboxValues(scene){
     const checkboxes = document.querySelectorAll(`input[name="${scene}"]:checked`);
     let values = []
     checkboxes.forEach((checkbox){ 
     values.push(checkbox.value);
   }); 
   }

const checkBoxForm = document.querySelector()
checkBoxForm.addEventListener('submit', e => {
     getCheckboxValues()
     return getCheckboxValues
})












})