const movies = require('./db.json')
let globalId= 11
module.exports = {
    getMovies: (req,res) =>{ res.status(200).send(movies)},
    deleteMovie: (req,res) =>{ 
        let {id} = req.params
        let movieIndex = movies.findIndex(el => el.id === +id)
        console.log(movieIndex);
        movies.splice(movieIndex,1)
        res.status(200).send(movies)
    },
    updateMovie: (req,res) =>{ 
        let {id} = req.params;
        let {type} = req.body;
        let movieIndex = movies.findIndex(el => el.id === +id)
        let movie = movies[movieIndex]
        if (movie.rating >= 5 &&  type === 'plus') {
            res.status(400).send('connot go over 5')
        } else if (movie.rating === 0 && type === 'minus'){
            res.status(400).send('connot go over 5')
        } else if (type == 'plus'){
            movie.rating++;
            res.status(200).send(movies)
        } else if (type == 'minus'){
            movie.rating--;
            res.status(200).send(movies)
        }else {
            res.status(400)
        }
    },
    createMovie: (req,res) =>{
        let {title,rating,imageURL}= req.body
        let newMovie= {
            id: globalId,
            title,
            rating,
            imageURL
        }
        movies.push(newMovie)
        globalId++
        res.status(200).send(movies)

    }
}