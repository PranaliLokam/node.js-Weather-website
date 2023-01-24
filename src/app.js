// const path = require('path')            //No need to install it, since it is core node module, it is built in. nodejs.org
// const express = require('express')
// const hbs = require('hbs')

// const app = express()        //Generate call & store the express application

// //Define paths for Express config
// const publicDirectoryPath = path.join(__dirname, '../public')
// const viewsPath = path.join(__dirname, '../templates/views')
// const partialsPath = path.join(__dirname, '../templates/partials')

// //Setup handlebars engine and views location
// app.set('view engine', 'hbs')         //Setting name, value
// app.set('views', viewsPath)
// hbs.registerPartials(partialsPath)

// //Setup static directory to serve
// app.use(express.static(publicDirectoryPath))               //app.use =>Its a way to customize the server. express.static =>Static takes the path to the folder we wanna serve up

// app.get('', (req, res) => {
//     res.render('index', {
//         title: 'Weather App',
//         name: 'Pranali Lokam'
//     })
// })

// app.get('/about', (req, res) => {
//     res.render('about', {
//         title: 'About Me',
//         name: 'Pranali Lokam'
//     })
// })

// app.get('/help', (req, res) => {
//     res.render('help', {
//         msg: 'This is some helpful text',
//         title: 'Help',
//         name: 'Pranali Lokam'
//     })
// })

// app.get('/weather', (req, res) => {
//     res.send([{             //Object    =>      It will provide JSON response
//         forecast: 'It is Sunny',
//         Location: 'Pune'
//     }])
// })

// // app.get('/help/*', (req, res) => {
// //     app.render('404', {
// //         title: '404',
// //         name: 'Pranali Lokam',
// //         errorMessage: 'Help article not found.'
// //     })
// // })

// // app.get('*', (req, res) => {            // '*' is a wildcard character. This means matched anything that hasn't been matching so far.
// //     app.render('404', {
// //         title: '404',
// //         name: 'Pranali Lokam',
// //         errorMessage: 'Page not found.'
// //     })
// // })

// app.listen(3000, () => {      //starts up the server & has it listen on a specific port. 3000 - common development port. If HTTP port website port = 80
//     console.log('server is up on port 3000');               //() => Callback function
// })        

// // app.get('/help', (req, res) => {
// //     res.send([{
// //         name: 'Pranali'             //JSON
// //     },
// //     {
// //         name: 'Lokam'
// //     }
// // ])
// // })          //This is a route handler

// // app.get('/about', (req, res) => {               //response send to the web browser & terminal
// //     res.send('<h1>This is all about myself!!!</h1>')
// // })

const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./util/geocode')
const forecast = require('./util/forecast')


const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Pranali Lokam'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Pranali Lokam'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Pranali Lokam'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {        //{latitude, longitude, location} = "{}" <= Emplty object default value
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData, 
                location,
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

    console.log(req.query.search);                //req=Object, query=property
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Pranali Lokam',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Pranali Lokam',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})