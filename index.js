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
     // settingBtn.innerHTML = `
     // <button class="btn ${setting.name}">${setting.name}</button><br>
     // `
     // const settingImg = document.createElement('img')
     // settingImg.src = setting.image_url
     settingP.textContent = setting.name
     settingP.classList.add("setting-button")
     settingP.dataset.id = setting.id
     settingP.addEventListener('click', onSettingClick)
     settingsContainer.append(settingP)
     // append settingImg once we have image container
}



function onSettingClick(e){
     fetchAddressByType(e.target.dataset.id)
     // renderAllAddress(e.target.dataset.id)
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
          console.log(data)
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
     <div class="row">
        <div class="col-md-4"> 
            <div class="thumbnail">
                <img src="${address.image_url}" alt="Location" style="width:100%">
                    <div class="caption">
                        <b><p>${address.name}</p></b>
                    </div>
            </div>
        </div>
        <div>
            <p>Borough: ${address.borough}</p>
            <p>Address: ${address.address}</p>
            <p>Contact Name: ${address.contact_name}</p>
            <p>Phone: ${address.contact_phone}</p>
        </div>
    </div>
    `
     const locButton = document.createElement('button')
     locButton.classList.add("address-button")
     locButton.textContent = `${address.address}`
     locButton.dataset.addressId = address.id
     addressImgCard.append(locButton)
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
const locationFormInput = document.querySelector("#location-address")
const locationContainerForm = document.querySelector('#add-location')
function renderLocationChoices(address) {
//    const locUl = document.createElement('ul')
   const newInput = address.name
   locationFormInput.value = newInput
//    locationContainerForm.append(locUl) 
}

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

const sceneNameBox = document.querySelector("#scene-name")
const sceneContainerForm = document.querySelector('#add-scene')
function renderChosenScenes(scene){
     // const addUl = document.createElement('ul')
     const newInput = scene
    sceneNameBox.value = newInput
    
     // sceneNameBox.value.append(input) 
  }

  
const confirmedBox = document.querySelector("#confirmed-scenes")
const shootForm = document.querySelector(".shoot-form")

function clickHandler(){
document.addEventListener('click', e => {
     if(e.target.matches(".setting-button")) {
     let settingId = e.target.dataset.id 
     let settingBox = shootForm.setting
     settingBox.value = e.target.textContent
     shootForm.dataset.settingId = settingId 

} else if(e.target.matches(".address-button")){
     let addressId = e.target.dataset.addressId 
     let locationBox = shootForm.address
     locationBox.value = e.target.textContent 
     shootForm.dataset.addressId = addressId 

    
     // } else if(e.target.textContent === "Select Scene"){
     //      e.preventDefault()
     //         checkBoxForm.children = e.target
     //         console.log(e.target)
               

     //           console.log(inputs)
     //           let array = [] 
     //           for (let i = 0; i <inputs.length; i++){
     //                if(inputs[i].checked)
     //                array.push(inputs[i].value)
     //           }  
     //           renderChosenScenes(array) 
     //           debugger
     // }  
}
     })
}



function submitHandler(){
     shootForm.addEventListener('submit', e => {
          e.preventDefault()
          console.log("click")
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
               fetchNewScene(shoots)
             
               shootForm.remove()
          
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
     .then(data => {
          renderScene(data)
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

function buildShootFromForm(form){
     
     let title = shootTitleFormBox.value 
     let date = shootDateFormBox.value
     
     let sceneName = sceneNameBox.value 
     let setting_id = document.querySelector(".shoot-form").dataset.settingId
     let location_id = document.querySelector('.address-button').dataset.addressId
     
     const scenesObj = {
          name: sceneName,  
          setting_id: setting_id,
          location_id: location_id
     }
     
     const shootObj = {
          title: title, 
          date: date, 
          scenes: [scenesObj]

          }


          return shootObj


     }

const addFormButton = document.querySelector('#add-scenes-button')

addFormButton.addEventListener("click", e => {
     createMoreScenesForm(e.target)

})


function createMoreScenesForm(){
     let newFormFieldsInput = document.createElement("form")
     newFormFieldsInput.innerHTML = `
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

