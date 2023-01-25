const request = require('postman-request')
const geocode = (address, callback) => {
    //const url = 'http://api.positionstack.com/v1/forward?access_key=8ade33df97efb80c4da582222f8d365a&query='+address

    const url = 'http://api.weatherstack.com/current?access_key=1d1fce4495ec79c861e812aeaec7effd&query='+address
    request({ url, json: true}, (error, { body }) => {             //(error, response) function will run after request(url) gets completed
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined,{ latitude: body.location.lat,
                longitude: body.location.lon,
                location: body.location.name
            //     {
            //     //const result = response.body.data[0]

            //     Address: response.body.data[0].name,
            //     Latitude: response.body.data[0].latitude,
            //     Longitude: response.body.data[0].longitude
             }
            )
        }
    })            
}
module.exports = geocode


