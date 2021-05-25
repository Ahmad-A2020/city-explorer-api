'use strict';

const express =require('express');
const weatherData=require('./data/weather.json');
const cors = require('cors');
require('dotenv').config();

const server=express();
server.use(cors());

const PORT=process.env.PORT;

// // http://localhost:3005/weather?latR=47.60621&lonR=-122.33207
// // http://localhost:3011/weather?cityName='amman'


server.get('/weather',(request,response)=>{

    // let late=request.query.latR;
    // let long=request.query.lonR;
    let cityName=request.query.cityName;
    let findCityWeather=weatherData.find(item=>{
        if (item.city_name==cityName){
            return item.data;
        }
    })
    // let filteredData=findCityWeather.map(item=>{
    //     return(
    //         {        
    //         date:item.valid_date,
    //         hightemp:item.max_temp,
    //         lowtemp:item.low_temp,
    //         wind_dir:item.wind_dir,
    //         }
    //     )
    // })
    
    console.log(findCityWeather);
    response.send(findCityWeather);
    console.log(findCityWeather);

})

server.get('*',(request,response)=>{
    response.send('Sorry, we don\'t support this city')
});


server.listen(PORT,()=>{
    console.log('I am active')
});



