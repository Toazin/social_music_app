var app = require('express')();
var apiRouter = require('./api/api.js');
var errorHandlerMiddleware = require('./middlewares/errorHandlerMiddleware.js');
var initialMiddlewares = require('./middlewares/initialMiddlewares.js');

//Set Global Middlewares
initialMiddlewares(app);

//main Api
app.use('/api', apiRouter);

//Error handler
app.use(errorHandlerMiddleware());


module.exports = app;
