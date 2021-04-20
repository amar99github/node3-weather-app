const request = require("request");


const forecast = (address, callback)=>{

    const url = 'http://api.weatherstack.com/current?access_key=fad619d8e8b82182ebd37a8fc7d3e174&query='+address;

    request({url:url, json:true}, (error, response)=>{
        if(error){
            callback('enabled', undefined)

        }else{
            const data = response.body.current;
            
            callback(undefined, 
                "it is currently " + data.temperature + " degrees out. " + "and it is " + data.weather_descriptions
                

            )

        }
    })

    


}



module.exports = forecast
















