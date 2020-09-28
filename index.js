document.addEventListener('DOMContentLoaded', e => {

settingsUrl = 'http://localhost:3000/settings/'
addressesUrl = 'http://localhost:300/locations/'

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

function onSettingClick(e){
     
     getAddresses(e.target.dataset.id)
}

const getAddresses = () => {
     fetch(addressesUrl)
     .then(res => res.json())
     .then(data => {
          renderAddresses(data)
     })
}

const renderAddresses = data => {
     for(let address of data) {
          renderAddress(address)
     }
}

const renderAddress = address => {
     
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
getAddresses()


})

