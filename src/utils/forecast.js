const request = require("request")

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=261657ee0249283e2089a9df6e1b2897&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=f'
    console.log(url)
    request({url, json: true}, (error, response) =>{
            if (error){
                callback("Unable to connect to weather service", undefined)
            }else if (response.body.error){
                callback("Unable to find location", undefined)
            }
            else{
                callback(undefined, response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " but it feels like " + response.body.current.feelslike)
            }
        })
}

module.exports = forecast