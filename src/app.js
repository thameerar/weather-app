const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')




const app = express()

const port = process.env.PORT || 3000


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname , '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req,res) => {
    res.render('index' , {
        title: 'Weather',
        name: 'Thameera R'
    })
})

app.get('/about', (req, res) => {
    res.render('about' , {
        title: 'About Me',
        name: 'Thameera R'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        msg: 'This is the help page',
        name:'Thameera R'

    })
})


app.get('/weather', (req,res) => {
    let query = req.query.address
    if(!query){
        return res.send({
            error : 'You must provide an address'
        })
    }

    geocode( query , (error , {latitude,longitude,location} = {}) => {
        if (error){
           return res.send({error})
        }
      
        forecast(latitude, longitude, (error, {discription, temperature , feels_like} = {}) => {
      
          if(error){
            return res.send({error})
          }

          res.send({
              address : query,
              weather : discription,
              temperature,
              feels_like,
              location 
          })
      
        })
      
      })
})

app.get('/products' , (req, res) => {
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req,res) => {
    res.render('404' , {
        title: '404 Not Found',
        msg:'Help article not found',
        name: 'Thameera R'
    })
})

app.get('*', (req,res) => {
 res.render('404',{
     title: '404 Not Found',
     msg:'Page not found',
     name: 'Thameera R'
 })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})