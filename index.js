document.addEventListener('DOMContentLoaded', e => {

//    function getCheckboxValues(scene){
//      const checkboxes = document.querySelectorAll(`input[name="${scene}"]:checked`);
//      let values = []
//      checkboxes.forEach((checkbox) => { 
//      values.push(checkbox.value);
//    }); 
//      return values 
//    }

const checkBoxForm = document.querySelector("#checkboxform")
const formCheck = document.querySelector('.form-check-label')
checkBoxForm.addEventListener('submit', e => {
     e.preventDefault()
//      checkBoxForm.querySelectorAll("input").forEach(function(input) {
//        if(input.value === "on") {
//         console.log(formCheck.value)

     let inputs = checkBoxForm.children
     let array = [] 
     for (let i = 0; i <inputs.length; i++){
          if(inputs[i].checked)
          array.push(inputs[i].value)
     }  
     console.log(array) 
})
//        }
//      })
//      })
//     })
  

    
// const renderChosenScenes = () => {
//   const sceneContainer = document.querySelector('#scene-container')
//   const addLi = document.createElement('li')
// // do a loop on each scene selected and display the scenes
// // create a delete button 
  
  
// }


})

