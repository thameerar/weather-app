const request = require('request')

const forecast = (latitude , longitude , callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=96ea506f804272f24671fa6ad31498be&query='+latitude+','+longitude+'&units=m'

    request({url , json:true} , (error , {body} = {}) => {
        if(error){
            callback('Unable to connect to the weather services!' , undefined)
        }else if(body.error){
            callback('Failed to find the location' , undefined)
        }else{
            callback(undefined,{
                discription : body.current.weather_descriptions[0],

                temperature : body.current.temperature,

                feels_like : body.current.feelslike
            })
        }
     })

    
}

module.exports = forecast