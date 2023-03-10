const request = require('postman-request')  
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=1d1fce4495ec79c861e812aeaec7effd&query='+latitude+','+longitude+ '&units=m'

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else{
            callback(undefined, body.location.name+', '+body.location.region+'. '+ body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + "°c temperature outside and humidity is " + body.current.humidity+"%.")
                
        }
    })
}

module.exports = forecast