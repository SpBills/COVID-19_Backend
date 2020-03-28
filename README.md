# COVID-19 Backend API 
This is a backend API that you can deploy yourself! All you have to do is create a MongoDB database, make an .env file, and start it up. Details are below. If you'd like to use the already developed API, use this link:
covidapi.lostsummit.net/api/v1
Specifications are at the bottom of this README.

### MongoDB Collection Layout
#### COLLECTION NAME: dailyinfections
    
    {
      date: Date,
      areas: [
        stats: {
            confirmed: Number
            deaths: Number
            recoveries: Number
        }
      ]
    }

### .env Layout
    CONNECTION_STRING - Mongoose Connection String.
    PORT - Port to host the web server on. Traditionally should be 80 for HTTP.

## API Specifications
### Return ALL data from all days.
    
    curl -X GET https://covidapi.lostsummit.net/api/v1/
    
    [
        {
            "_id": String,
            "date": Date,
            "areas": [
                {
                    "stats": {
                        "confirmed": Number,
                        "deaths": Number,
                        "recoveries": Number
                    },
                    "_id": String,
                    "name": String
                }
            ]
        }
    ]
    
### Return data by country name.

    curl -X GET https://covidapi.lostsummit.net/api/v1/:country
    
    [
        {
            "date": Date,
            "data": {
                "stats": {
                    "confirmed": Number,
                    "deaths": Number,
                    "recoveries": Number
                },
                "_id": String,
                "name": String
            }
        }
    ]
