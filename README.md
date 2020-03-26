# COVID-19 Backend
This API is already deployed, however the IP is not publicly accessible yet.

If you want to use this for a different country, just create a new MongoDB collection with the name "dailyinfections"
# Mongoose Database Layout
  {
    date: Date,
    confirmed: Number,
    deaths: Number,
    recoveries: Number
  }

# .env Layout
  CONNECTION_STRING - Mongoose Connection String.
  PORT - Port to host the web server on.
