const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')



weatherForm.addEventListener('submit' , (e)=> {
  e.preventDefault()
  messageOne.innerHTML = ''


  const location = search.value
  messageOne.innerHTML = 'Loading...'

fetch('/weather?address='+location).then((response) =>{
  response.json().then(({error = undefined , address , weather,temperature, feels_like, location} = {}) => {
     if(error){
        messageOne.innerHTML = error
        
       
     }else{
     
      messageOne.innerHTML = 'Your Search Was: ' + address + '</br>Weather: ' + weather + '<br>Temperature: ' + temperature + '<br>Feels Like:' + feels_like +'<br>Location: ' + location
     }
     
     
  })
})

})