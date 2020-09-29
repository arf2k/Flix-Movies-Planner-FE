document.addEventListener('DOMContentLoaded', e => {

const settingsUrl = 'http://localhost:3000/settings/'
const addressesUrl = 'http://localhost:3000/locations/'
const settingsAddressUrl = 'http://localhost:3000/settings?options='
const locationsSettingsURL = 'http://localhost:3000/locations?settings='

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
     const settingBtn = document.createElement('btn')
     settingBtn.innerHTML = `
     <button class="btn ${setting.name}">${setting.name}</button><br>
     `
     // const settingImg = document.createElement('img')
     // settingImg.src = setting.image_url
     settingBtn.dataset.id = setting.id
     settingBtn.addEventListener('click', onSettingClick)
     settingsContainer.append(settingBtn)
     // append settingImg once we have image container
}

/* <button class="btn park">Parks</button><br>
<button class="btn bars">Bars</button><br>
<button class="btn restaurants">Restaurants</button><br>
<button class="btn theaters">Theaters</button><br>
<button class="btn hospitals">Hospitals</button> */


function onSettingClick(e){
     fetchAddressByType(e.target.dataset.id)
     // removeContainer()
     renderAllAddress(e.target.dataset.id)

}

// const getAllAddresses = () => {
//      fetch(addressesUrl)
//      .then(res => res.json())
//      .then(data => {
//           renderAllAddresses(data)
//      })
// }

function fetchAddressByType(id){
     fetch(settingsAddressUrl + id)
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

const renderAllAddress = address => {
     const addressesContainer = document.querySelector("#addresses-container")
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
     addressesContainer.append(addressImgCard)
           
    //  console.log(address.category_id)
}




const checkBoxForm = document.querySelector("#checkboxform")
const formCheck = document.querySelector('.form-check-label')
checkBoxForm.addEventListener('submit', e => {
     e.preventDefault()
     let inputs = checkBoxForm.children
     let array = [] 
     for (let i = 0; i <inputs.length; i++){
          if(inputs[i].checked)
          array.push(inputs[i].value)
     }  
     renderChosenScenes(array) 
})


    
function renderChosenScenes(scenes){
  const sceneContainer = document.querySelector('#scene-container')
  console.log(scenes)
  for(let scene of scenes){
     const addLi = document.createElement('li')
     addLi.textContent = scene 
     sceneContainer.append(addLi) 
  }
}
  


getSettings()
getAllAddresses()
fetchAddressByType()

})

