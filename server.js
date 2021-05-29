'use strict';

const express =require('express');
const weatherData=require('./data/weather.json');
const cors = require('cors');
const axios =require('axios');
require('dotenv').config();
const getmovie=require('./module/movies.js')
const getWeather=require('./module/weather.js')

const server=express();
server.use(cors());

const PORT=process.env.PORT;

// To check locally use // http://localhost:3014/weather?lat=47.60621&lon=-122.33207

// the / https://api.weatherbit.io/v2.0/forecast/daily?&lat=31.9515694&lon=35.9239625&key=befd6712f15a4e89bbe71c518a6a5b7f

server.get('/weather',getWeather)



// create movie resourse  /movies?cityName=amman
server.get('/movies',getmovie);


// for wrong url input 
server.get('*',(request,response)=>{
    response.send('Sorry, we don\'t support this city')
});

// Listen-server function 
server.listen(PORT,()=>{
    console.log('I am active')
});



