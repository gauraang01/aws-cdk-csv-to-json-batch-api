require('dotenv').config()
const express = require('express');
const app = express();

// Set up middleware and other application settings

const usersRouter = require('./api/routes/routes');
app.use('/api', usersRouter);


const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
    console.log('API server listening on port ' + PORT);
});
