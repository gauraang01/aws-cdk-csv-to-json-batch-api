const {addData, showUsersTable, clearUsersTable} = require('../../db/models/users');
const {users, addUser} = require('../../credentials');

const checkCredentials = require('../middleware/basic-auth');

const express = require('express');

const router = express.Router();
router.use(express.json());

router.get('/', (req, res) => {
    res.status(200).send("You have reached the home page");
})

router.post('/register', (req, res) => {
    const { username, password } = req.body;
    if(!username || !password){
        res.send("Invalid input")
    }else{
        addUser(username, password);
        res.send('Successfully registered');
    }
})

router.get('/show', async (req,res) => {
    try{
        const table = await showUsersTable();
        console.log("Table returned successfully");
        res.send(table);
    }catch(error){
        res.status(500).send({ error: 'An error occurred while fetching users' });
    }
})

router.post('/clear', checkCredentials, async (req, res) => {
    try{
        await clearUsersTable();
        console.log("Table cleared successfully");
        res.send("Table cleared successfuly");
    }catch(error){
        res.status(500).send({ error: 'An error occurred while fetching users' });
    }
})


router.post('/data', checkCredentials, async (req,res) => {
    const json = req.body;
    try{
        await addData(json);
        console.log("Data added to the table successfully");
        res.send("Data added to the table successfully");
    }catch(error){
        console.log(error);
        res.status(500).send({ error: 'An error occurred while adding data' });
    }
})

module.exports = router;