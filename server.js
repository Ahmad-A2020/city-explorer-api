'use strict';

const express =require('express');
const weatherData=require('./data/weather.json');
const cors = require('cors');
const axios =require('axios');
require('dotenv').config();

const server=express();
server.use(cors());

const PORT=process.env.PORT;

// // http://localhost:3014/weather?latR=47.60621&lonR=-122.33207
// // http://localhost:3011/weather?cityName='amman'
/// https://api.weatherbit.io/v2.0/forecast/daily?&lat=31.9515694&lon=35.9239625&key=befd6712f15a4e89bbe71c518a6a5b7f

server.get('/weather',getWeather)

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

// create movie resourse  /movies?cityName=amman
server.get('/movies',getmovie);
function getmovie(req,res) {

    let cityName =req.query.cityName;
    let key=process.env.MOVIE_API_KEY;
    let moviesAPIURL= `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${cityName}`  

    try{
        axios.get(moviesAPIURL).then(result=>{
     
         const movieArray=result.data.results.map(item=>{
             return new movie(item);
         })
         res.send(movieArray);  
        })
    }catch{
        res.status(500).send('error in getting the movie list');
    }    
}
class movie{
    constructor(movieItem) {
        this.title=movieItem.original_title;
        this.overview=movieItem.overview;
        this.average_votes=movieItem.vote_average;
        this.total_votes=movieItem.vote_count;
        this.movieLanguage=movieItem.original_language;
        this.image_url=`https://image.tmdb.org/t/p/w500${movieItem.poster_path}`;
        this.popularity=movieItem.popularity;
        this.release_on=movieItem.release_date;    

        
    }
}

server.get('*',(request,response)=>{
    response.send('Sorry, we don\'t support this city')
});


server.listen(PORT,()=>{
    console.log('I am active')
});



