const request = require('postman-request')  
const weatherapi = (latitude, longitude, callback) => {
    const url = 'http://api.weatherapi.com/v1/forecast.json?key=5fba57fe989d4c0eaa3104724230901&q='+latitude+','+longitude

    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else{
            callback(undefined, response.body.location[0].name + ". It is currently " + /*response.body.current.temperature */response.body.current[0].temp_c+ " degress out."
            )
                
                
        }
    })
}

module.exports = weatherapi

