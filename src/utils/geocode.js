const request = require("request")

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoicml0YXl1c2hldHR5IiwiYSI6ImNrcTR3YzV3bzExaHEybmxua3BqNXY0eDIifQ.cgPUUFZVqWcxAKhO8fxdRg&llimit=1'

    request({url, json: true}, (error,response)=>{
        if (error){
            callback('Unable to connect to location services!', undefined)
        } else if(response.body.features.length === 0){
            callback('Unable to find location. Try another search', undefined)
        } else{
            callback(undefined, {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1], 
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode