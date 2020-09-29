document.addEventListener('DOMContentLoaded', e => {

const settingsUrl = 'http://localhost:3000/settings/'
const addressesUrl = 'http://localhost:3000/locations/'

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
     const settingImg = document.createElement('img')
     // settingImg.src = setting.image_url
     settingP.dataset.id = setting.id
     settingP.textContent = setting.name
     settingP.addEventListener('click', onSettingClick)
     settingsContainer.append(settingP)
     // append settingImg once we have image container
}

let address = []

function onSettingClick(e){
     getAllAddresses(e.target.dataset.id)
     renderAddress(e.target.address.category_id)
}

const getAllAddresses = () => {
     fetch(addressesUrl)
     .then(res => res.json())
     .then(data => {
          renderAllAddresses(data)
     })
}

// function fetchAddressByType(){
//      fetch(addressesUrl)
//      .then(res => res.json())
//      .then(data =)
// }


const renderAllAddresses = data => {
     for(let address of data) {
          renderAllAddress(address)
     }
}

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

