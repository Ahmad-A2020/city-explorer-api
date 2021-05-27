const axios =require('axios');

module.exports=getWeather;

let inMemory={}

function getWeather(request,response) {
    
    
    let lat=request.query.lat;
    let lon=request.query.lon;

    // let cityName=request.query.cityName;
    let key=process.env.WEATHER_API_KEY;
    let weatherForcastAPI_URL=`https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&key=${key}`;
    try{
        axios.get(weatherForcastAPI_URL).then(result=>{
            console.log(result)
            let weatherArray=result.data.data.map(item=>{                
                return new weatherForcast(item);
            })
            response.send(weatherArray) 
        })
    }catch{
        res.status(500).send('error in getting the movie list');
    }

    class weatherForcast{
        constructor(element){
            this.description=`Low of:${element.low_temp}, high of:${element.max_temp}, with ${element.weather.description}`;
            this.date=element.valid_date;
        }        
    }  
    
}