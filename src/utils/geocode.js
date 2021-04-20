const request = require('request')

const geocode = (address, callback)=>{
    const url3 = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiYW1hcmZpcmkiLCJhIjoiY2tuaHFncXU5MTM3cjJvbndzdDJjMW9tMiJ9.8wMqy-M7DjKazuzQkJxd8A" ;
    request({url:url3, json:true}, (error, response)=>{
        if(error){
            callback('enabled', undefined)
        }else if(response.body.features.length === 0){
            callback("didn't find location", undefined)
        }else{
            callback(undefined, {
                location: response.body.query[0]
            })
        }
    })

}

module.exports = geocode