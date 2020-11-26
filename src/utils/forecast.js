const request = require('request');

const forecast = (latitude, logitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + logitude + '&units=metric&appid=8f4767b5842286b7397315b988805452';

    request({ url: url, json: true }, (error, response) => {
        //console.log(response.body.current)
        if (error) {
            //console.log('Unable to connect to weather service!');
            callback('Unable to connect to weather service!', undefined);
        } else if (response.body.message) {
            //console.log('Unable to find location');
            callback('Unable to find location', undefined);
        }else {
            var rainPercentage = 0;
            if (response.body.daily[0].rain) {
                rainPercentage = response.body.daily[0].rain;
            }
            //console.log(response.body.daily[0].weather[0].description + '. It is currently ' + response.body.current.temp + ' Celsius out.' + ' There is ' + rainPercentage + '% chance of Rain today');
            var message = response.body.daily[0].weather[0].description + '. It is currently ' + response.body.current.temp + ' Celsius out.' + ' There is ' + rainPercentage + '% chance of Rain today';
            callback(undefined, message);
        }
    });

}

module.exports = forecast;

// const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=60.99&lon=30.9&units=metric&appid=8f4767b5842286b7397315b988805452';

// request({ url: url, json: true }, (error, response) => {
//     //console.log(response.body.current)
//     if (error) {
//         console.log('Unable to connect to weather service!')
//     } else if (response.body.message) {
//         console.log('Unable to find location')
//     }else {
//         var rainPercentage = 0;
//         if (response.body.daily[0].rain) {
//             rainPercentage = response.body.daily[0].rain * 100;
//         }
//         console.log(response.body.daily[0].weather[0].description + '. It is currently ' + response.body.current.temp + ' Celsius out.' + ' There is ' + rainPercentage + '% chance of Rain today');
//     }
// });