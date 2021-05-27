const axios=require('axios')
let inMemory={}

function getmovie(req,res) {

    let cityName =req.query.cityName;
    let key=process.env.MOVIE_API_KEY;
    let moviesAPIURL= `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${cityName}`  

    if (inMemory[cityName] !==undefined){
        res.send(inMemory[cityName])
        console.log('get data from memory')
    }else{

        try{
            axios.get(moviesAPIURL).then(result=>{
        
            const movieArray=result.data.results.map(item=>{
                return new movie(item);
            })
            inMemory[cityName]=movieArray
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
    

}

module.exports=getmovie;