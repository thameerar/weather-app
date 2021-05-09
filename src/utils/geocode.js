const request = require('request')

const geocode = (address , callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoidGhhbWVlcmFyIiwiYSI6ImNrbjlhejFpNTBjNHoyeG1ya2gwa28weWwifQ.v4yp88-YV9k_zTIU_HwDKA&limit=1'
 
    request({url, json:true}, (error , {body} = {}) => {
       if(error){
         callback('Unable to connect to the location services!', undefined)
       }else if(body.features.length === 0){
         callback('Cannot find the location. Try again!' , undefined)
       }else{
         callback(undefined , {
           latitude : body.features[0].center[1],
           longitude : body.features[0].center[0],
           location : body.features[0].place_name
         })
       }
    })
 }

 module.exports = geocode