require('dotenv').config()
var path = require('path');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();


//// Set up middleware and other application settings

// Enable JSON body parsing
app.use(express.json());

// Enable URL-encoded body parsing
app.use(bodyParser.urlencoded({ extended: true }));

// Set up middleware for serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Set up EJS as the template engine
app.set('view engine', 'ejs');

// Set up path to the views folder
app.set('views', path.join(__dirname, 'views'));

// Set up routes
const usersRouter = require('./api/routes/routes');
app.use('/api', usersRouter);


const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
    console.log('API server listening on port ' + PORT);
});
