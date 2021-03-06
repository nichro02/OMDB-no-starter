const express = require('express')
const router = express.Router()
const fs = require('fs')
const axios = require('axios')

router.get('/', (req, res) => {
    //Retrieves form
    res.render('home.ejs')
})

router.post('/', (req, res) => {
    //make the API call
    console.log('Here is req body',req.body)
    let movieTitle = req.body.title
    let movieId = req.body.imdbID
    //using title search (t) only returns a single title, a general search (s) returns multiple titles.
    axios.get(`http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${movieTitle}`)
    .then(response => {
        let movieResults = response.data.Search
        console.log(movieResults)
        res.render('results.ejs',{movieResults: movieResults})
    })
    .catch(err => {
        console.log(err)
    })
})

router.get('/:movie_id', (req, res) => {
    let movieIndex = req.params.movie_id
    axios.get(`http://www.omdbapi.com/?apikey=${process.env.API_KEY}&i=${movieIndex}`)
    .then(response => {
        let movieData = response.data
        console.log(movieData)
        res.render('show.ejs', {omdbID: movieIndex, movieData: movieData})
    })   
})

//TO-DO: favorites route

module.exports = router