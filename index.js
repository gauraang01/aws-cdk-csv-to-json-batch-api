require('dotenv').config()
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3030;

const connection = mysql.createConnection({
    host: process.env.ENDPOINT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.MYSQL_PORT
});

connection.connect((err)=>{
    if(err){
        console.error('Database Connection failed' + err.stack);
        return;
    }
    console.log('Connected to RDS mysql');
});

app.post('/api/table', (req,res) => {
    const sql = 'CREATE TABLE users (id int, name varchar(255), surname varchar(255), dob date, gender varchar(255))'
    connection.query(sql,(err, result)=>{
        if(err) throw err;
        console.log("Table created");
        res.send("Table created");
    })
})

app.get('/api/showtable', (req,res) => {
    const sql = 'select * from users'
    connection.query(sql,(err, result)=>{
        if(err) throw err;
        res.send(result);
    })
})

app.post('/api/cleartable', (req,res) => {
    const sql = 'TRUNCATE TABLE users'
    connection.query(sql,(err, result)=>{
        if(err) throw err;
        console.log("Table cleared");
        res.send("Table cleared");
    })
})

app.post('/api/data', (req, res) => {
    const sql = 'INSERT INTO users SET ?';
    const csvdata = req.body.csv_data;

    csvdata.forEach(data => {
        connection.query(sql, data, (error, results) => {
            if (error) throw error;
          });
    });
    res.send('Data received and saved to the database');
});

app.listen(PORT, () => {
    console.log('API server listening on port ' + PORT);
});
