const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3c32016de93428bdc477a686f6bb956f&units=m&query=' + latitude + ',' + longitude

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Not able to connect to API', undefined)
        } else if (body.error) {
            callback('Provide valid input to fetch response', undefined)
        } else {
            callback(undefined, 'It is currently ' + body.current.temperature + ' degree but it feels like ' +
                body.current.feelslike + ' degree out and the humidity is ' + body.current.humidity)
        }
    })
}

module.exports= forecast