document.addEventListener('DOMContentLoaded', e => {

const settingsUrl = 'http://localhost:3000/settings/'
const addressesUrl = 'http://localhost:3000/locations/'
const locationsSettingsUrl = 'http://localhost:3000/locations?setting='
const shootsUrl = "http://localhost:3000/shoots/"


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
     renderAllAddress(e.target.dataset.id)
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
     locButton.textContent = "Add Location"
     locButton.dataset.addressId = address.id
     locButton.addEventListener("click", onLocationClick)
     addressImgCard.append(locButton)
     addressesContainer.append(addressImgCard)

     }
}

function onLocationClick(e){
     fetchSingleLocation(e.target.dataset.id)
     console.log(e.target.dataset.id)
     renderLocationChoices(e.target.dataset.id)
}

function fetchSingleLocation(id){
     fetch(addressesUrl + id)
     .then(resp => resp.json())
     .then(address => {
          console.log(address)
          renderLocationChoices(address)
     })
}
const locationFormInput = document.querySelector("#location-address")
const locationContainerForm = document.querySelector('#add-location')
function renderLocationChoices(address) {
//    const locUl = document.createElement('ul')
   const newInput = address.name
   locationFormInput.value = newInput
//    locationContainerForm.append(locUl) 
}

const checkBoxForm = document.querySelector('#sceneCheckForm')
checkBoxForm.addEventListener('submit', e => {
     e.preventDefault()
    console.log("clicked")
     let inputs = checkBoxForm.children
     console.log(inputs)
     let array = [] 
     for (let i = 0; i <inputs.length; i++){
          if(inputs[i].checked)
          array.push(inputs[i].value)
     }  
     renderChosenScenes(array) 
})

const sceneNameBox = document.querySelector("#scene-name")
const sceneContainerForm = document.querySelector('#add-scene')
function renderChosenScenes(scenes){
  for(let scene of scenes){
     const addUl = document.createElement('ul')
     let input = document.querySelector(".form-check-input").value
     const newInput = scene
    sceneNameBox.value = newInput


     // sceneNameBox.value.append(input) 
  }
}
  

const sceneForm = document.querySelector(".scene-form")

// function eventHandler(){
// document.addEventListener('click', e => {
//      if(e.target.textContent === "Add Location")
//      let locBtn = e.target.closest('btn')
//     let addressId = document.querySelector('.address-button').dataset.addressId
//      let locationBox = document.querySelector("#add-location")
//      sceneForm.dataset.addressId = addressId 
// } else if(e.target.matches(".setting-button")){
//      let settingId = document.querySelector(".setting-button").dataset.settingId
//      let settingBox = document.querySelector("#add-setting")

// } else if(e.target.matches("#scene-submit-button")){
//      e.preventDefault()
//      const sceneForm = document.querySelector(".scene-form")
//      let sceneName = sceneNameBox.value  
//      let settingName = settingBox.value 
//      let locationName = locationBox.value 

//      const sceneObj = {
//           sceneName = name 
//           settingId = setting_id 
//           addressId = location_id 

//      }

//      let options = {
//           method: "POST",
//           headers:  {
//                 "content-type": "application/json",
//                "accept": "application/json"
//         },
//         body: JSON.stringify(sceneObj)
          
//      }

//      fetch(sceneUrl/create + options)
//      .then(res => res.json())
//      .then(console.log)


// }
// }

// })



function submitHandler(){
     sceneForm.addEventListener('submit', e => {
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
             .then(movie => {
               // renderMovie(movie)
               sceneForm.reset()
             })
       
           })
         }


     })
}

















getSettings()
// getAllAddresses()
fetchAddressByType()
fetchSingleLocation()
})

