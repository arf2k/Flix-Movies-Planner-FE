document.addEventListener('DOMContentLoaded', e => {

const settingsUrl = 'http://localhost:3000/settings/'
const addressesUrl = 'http://localhost:3000/locations/'
const locationsSettingsUrl = 'http://localhost:3000/locations?setting='
const shootsUrl = "http://localhost:3000/shoots/"
const scenesUrl = "http://localhost:3000/scenes/"

const getSettings = () => {
     fetch(settingsUrl)
     .then(res => res.json())
     .then(data => {
          renderSettings(data)
})
}

const renderSettings = data => {
     for(let setting of data) {
          renderSetting(setting) 
     }
}


const renderSetting = setting => {
     const settingsContainer = document.querySelector("#settings-container")
     const settingP = document.createElement('p')

     settingP.textContent = setting.name
     settingP.classList.add("setting-button")
     settingP.dataset.id = setting.id
     settingP.addEventListener('click', onSettingClick)
     settingsContainer.append(settingP)
     // append settingImg once we have image container
}



function onSettingClick(e){
     fetchAddressByType(e.target.dataset.id)
     renderAllAddress(e.target.dataset.id)
     let lastRow = document.querySelector("#last-row")
     let settingBox = lastRow.previousSibling.querySelector("[id^='setting']") 
     settingBox.parentElement.dataset.settingId = e.target.dataset.id
     settingBox.value = e.target.textContent
     addressesContainer.innerHTML = ""
}


// const getAllAddresses = () => {
//      fetch(addressesUrl)
//      .then(res => res.json())
//      .then(data => {
//           renderAllAddresses(data)
//      })
// }

function fetchAddressByType(id){
     fetch(locationsSettingsUrl + id)
     .then(res => res.json())
     .then(data => {
          renderAllAddress(data)
     })
}


// const renderAllAddresses = data => {
//      for(let address of data) {
//           renderAllAddress(address)
//      }
// }
const addressesContainer = document.querySelector("#addresses-container")

function renderAllAddress(addresses) {
     for(let address of addresses) {
          let addressImgCard = document.createElement('div')
          addressImgCard.innerHTML =`
          <div class="row-thumbnail">
             <div class="col-md-4"> 
                 <div class="thumbnail">
                     <img src="${address.image_url}" alt="Location" style="width:348%">
                         <div class="caption">
                             <b><p>${address.name}</p></b>
                         </div>
                 </div>
             </div>
          <div>
               <p font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue">Information:</p>
                 <ul>
                    <li>Borough: ${address.borough}</li>
                    <li>Address: ${address.address}</li>
                    <li>Contact Name: ${address.contact_name}</li>
                    <li>Phone: ${address.contact_phone}</li>
                    </ul>
                <button type="button" class="btn btn-primary" data-address-id=${address.id} id='add-address-button'> ${address.name}</button>
             </div>
         </div>
         `
          
        
          addressesContainer.append(addressImgCard)

     }
}






// function fetchSingleLocation(id){
//      fetch(addressesUrl + id)
//      .then(resp => resp.json())
//      .then(address => {
//           console.log(address)
//           renderLocationChoices(address)
//      })
// }

const checkBoxForm = document.querySelector('#form-pick')
// checkBoxForm.addEventListener('submit', e => {
//      e.preventDefault()
//      let inputs = checkBoxForm.children
//      console.log(inputs)
//      let array = [] 
//      for (let i = 0; i <inputs.length; i++){
//           if(inputs[i].checked)
//           array.push(inputs[i].value)
//      }  
//      renderChosenScenes(array) 
// })



  
const confirmedBox = document.querySelector("#confirmed-scenes")
const shootForm = document.querySelector(".shoot-form")

function clickHandler(){
document.addEventListener('click', e => {
     if(e.target.matches("#add-address-button")){
     let lastRow = document.querySelector("#last-row")
     let addressButton = lastRow.previousSibling.querySelector("[id^='location']") 
     addressButton.parentElement.dataset.addressId = e.target.dataset.addressId
     addressButton.value = e.target.textContent
     }
     })
}





    
//      } else if(e.target.textContent === "Select Scene"){
//           e.preventDefault()
//              checkBoxForm.children = e.target
//              console.log(e.target)
               

//                // console.log(inputs)
//                // let array = [] 
//                // for (let i = 0; i <inputs.length; i++){
//                //      if(inputs[i].checked)
//                //      array.push(inputs[i].value)
//                // }  
//                // renderChosenScenes(array) 
//                // debugger
       
// })
     
// }



function submitHandler(){
     shootForm.addEventListener('submit', e => {
          e.preventDefault()
          const form = e.target

          const shootObj = buildShootFromForm(form)
        
          const options = {
               method: "POST",
               headers: {
                 "content-type": "application/json",
                 "accept": "application/json"
               },
               body: JSON.stringify(shootObj)
             }

             fetch(shootsUrl, options)
             .then(response => response.json())
             .then(shoots => {
               console.log(shoots)
               renderNewShoot(shoots)
          })
     })
}

const confirmedScenesBox = document.querySelector("#confirmed-scenes")
function renderNewShoot(shoots){
     let newAddressDiv = document.createElement('div')
     newAddressDiv.innerHTML = `
     <h3> ${shoots.data.attributes.title}</h3>
     <p>Shoot Date: ${shoots.data.attributes.date}</p>
     `
     let sceneId = shoots.data.relationships.scenes.data[0].id
     fetchNewScene(sceneId)
     confirmedScenesBox.append(newAddressDiv)
     }

function fetchNewScene(sceneId){
     fetch(scenesUrl + sceneId)
     .then(resp => resp.json())
     .then(scene => {
          renderScene(scene)
          
     })
}
     

function renderScene(scene){
     let newSceneDiv = document.createElement('div')
     newSceneDiv.innerHTML = `
     <h3> ${scene.data.attributes.name} </h3>
     <p> ${scene.data.attributes.location.address}</p>
     `

     confirmedScenesBox.append(newSceneDiv)
}


const locationBox = document.querySelector("#add-location")
const settingBox = document.querySelector("#add-setting")
const shootTitleFormBox = document.querySelector("#title-of-scene")
const shootDateFormBox = document.querySelector("#date-of-scene")
let lastRow = document.querySelector("#last-row")

function buildShootFromForm(form){
     
     let title = shootTitleFormBox.value 
     let date = shootDateFormBox.value

    
     
    
     let i = document.querySelectorAll("[id^='scene-name']").length
     while(i > 0){
          let sceneName = document.querySelector(`[id="scene-name-${i}"]`).value
          let setting_id = document.querySelector(`[id="setting-name-${i}"]`).parentElement.dataset.settingId
          let location_id = document.querySelector(`[id='location-address-${i}']`).parentElement.dataset.addressId
          
      new Scene(  
          sceneName,
          location_id,
          setting_id 
     )
     i--
}

     const scenesObj = {scenes: Scene.prepShoot}
     debugger
     const shootObj = {
          title: title, 
          date: date, 
          scenesObj
          // scenes: [{ 
          //      name: sceneName,
          //      setting_id: setting_id,
          //      location_id: location_id
          // }]
     }
     debugger
          return shootObj


     }

const addFormButton = document.querySelector('#add-scenes-button')
let row_index = 0;
addFormButton.addEventListener("click", e => {
     row_index++;
     let form = document.querySelector('.shoot-form');
     let lastDiv = form.querySelector('#last-row');
     let divNewScene = document.createElement('div');
     divNewScene.classList.add('form-row');
     divNewScene.id = `form-row-${row_index}`
     divNewScene.innerHTML = `
          <div class="col-4" id='add-scene'>
          <input type="scene" class="form-control" name="name-${row_index}" id="scene-name-${row_index}" placeholder="Scene Name">
     </div>
     <div class="col-4" id='add-setting'>
          <input type="setting" class="form-control" name="setting-${row_index}" id="setting-name-${row_index}" placeholder="Setting Name">
     </div>
     <div class="col-4" id='add-location'>
          <input type="location" class="form-control" name="address-${row_index}" id="location-address-${row_index}" placeholder="Location Address">
     </div>
     `
     //form.appendChild(divNewScene);
     form.insertBefore(divNewScene, lastDiv)
     //createMoreScenesForm(e.target)

})


function createMoreScenesForm(){
     let newFormFieldsInput = document.createElement("form")
     newFormFieldsInput.innerHTML = `
     <form>
     <div class="col-4" id='add-scene'>
     <input type="scene" class="form-control" id="scene-name" placeholder="Setting Name">
   </div> 
     <div class="form-row">
     <div class="col-4" id='add-scene'>
          <input type="scene" class="form-control" id="scene-name" placeholder="Scene Name">
        </div>
        <div class="col-4" id='add-setting'>
          <input type="setting" class="form-control" name="setting" id="setting-name" placeholder="Setting Name">
        </div>
        <div class="col-4" id='add-location'>
          <input type="location" class="form-control" name="address" id="location-address" placeholder="Location Address">
        </div>
        </div>
        </div>
        <button type="submit" class="btn btn-primary">Submit New Scene</button> 
        </form>
        `
        shootContainer.append(newFormFieldsInput)
}





const shootContainer = document.querySelector("#shoot-container")

submitHandler()
getSettings()
// getAllAddresses()
fetchAddressByType()
// fetchSingleLocation()
clickHandler()
})

