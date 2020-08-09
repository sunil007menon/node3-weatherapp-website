const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handle engine and view locations
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Sunil Menon',
        name: 'Sunil S Menon'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        content: 'about',
        title: 'About Page',
        name: 'Sunil S Menon'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpdata: 'help',
        title: 'Help page',
        name: 'Sunil S Menon'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error: 'You must provide a address!'
        })
    }
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastdata,
                location: location,
                address: req.query.address
            })
        })
    })
})
    app.get('/products', (req, res) => {
        if (!req.query.search) {
            return res.send({
                error: 'You must provide a search term'
            })
        }
        console.log(req.query.search)
        res.send({
            products: []
        })
    }
    )

    app.get('/help/*', (req, res) => {
        res.render('errorPage', {
            error: 'Help article not found',
            title: 'Error Page',
            name: 'Unknown'
        })
    })

    app.get('*', (req, res) => {
        res.render('errorPage', {
            error: 'Page not found',
            title: 'Error Page',
            name: 'Unknown'
        })
    })

    app.listen(port, () => {
        console.log('Server is up and running on' + port)
    })