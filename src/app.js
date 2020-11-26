const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//console.log(__dirname);
//console.log(__filename);

const app = express();

//we are accessing port number which is given by heroku
//it will fail for local env so we are using 3000
const port = process.env.PORT || 3000;

//Define paths for express config

//We use public directory for assets purpose like css,js,images etc so we metion the path of the folder
//so that express can use that folder
const publicDirectoryPath = path.join(__dirname,'../public');

//By default when we use hbs, express can look hbs files in views directory
//but we rename the views directory to templates
//so we can customize that, so that express can look into templates directory for hbs files
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory for serve
app.use(express.static(publicDirectoryPath));


//rendering index.hbs
app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Damu'
    });
})


//rendering about.hbs
app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Damu'
    });
});


//rendering help.hbs
app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        name: 'Damu'
    });
})

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address should be provided'
        })
    }

    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({
                error: error
            });
        }
        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error) {
                console.log(4.1)
                return res.send({
                    error: error
                })
            }

            res.send({
                forecast: forecastData,
                location: data.location,
                address: req.query.address
            })

        })
    })
    
});

//Matching a particular pattern
app.get('/help/*', (req,res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Damu',
        errorMessage: 'Help Article Not Found'
    })
})

//Setup Error 404 - Page not found
app.get('*', (req,res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Damu',
        errorMessage: 'Page Not Found'
    })
})


//making express to start at port 3000
//we commented because we deployed in heroku so it will give the port number and it was dynamic in nature
app.listen(port, () => {
    console.log('Server is up on port 3000');
});