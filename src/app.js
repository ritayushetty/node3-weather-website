const geoCode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

// Define paths for Express config
const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const veiwsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', veiwsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ritayu Shetty'
    })
})

app.get('/about', (req,res) => {
    res.render('about',
    {
        title: 'About me',
        name: 'Ritayu Shetty'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        name: 'Ritayu',
        title: "Help page",
        message: "This is the help page"
    })
})

app.get('/weather', (req,res) => {

    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geoCode(req.query.address, (error, {latitude, longitude, location} = {})=>{
    
        if (error){
            return res.send({
                error: error
            })
        }
    
        
    
        forecast(latitude,longitude, (error, forecastData) => {
    
            if(error){
                return res.send({
                    error: error
                })
            }
    
            console.log(location)
            console.log(forecastData)

            res.send({
                forecast: forecastData,
                location: location,
            })
        })
    })

    
})

app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        title: '404 page not found',
        message: "Help article not found"
    })
})

app.get('*', (req,res) => {
    res.render('404',{
        title: "404 page not found",
        message: "Page not found"
    })
})

app.listen(3000, () =>{
    console.log("Server is up on port 3000")
})