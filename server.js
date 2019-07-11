// Followed from https://www.codementor.io/olatundegaruba/nodejs-restful-apis-in-10-minutes-q0sgsfhbd

const Express = require('express');

let port = 6050;
const app = Express();
let routes = require('./app/routes/appRouter');

app.use('/api', routes);
app.listen(port || process.env.PORT, () => console.log(`Listening on port ${port}`));