const {query, createTable, showTable, clearTable} = require('../../db');

async function createUserTable(){
    const schema = `
        id int,
        name varchar(255), 
        surname varchar(255), 
        dob date, 
        gender varchar(255)
        )
    `;
    await createTable('users', schema);
}

async function showUsersTable(){
    const table  = await showTable('users');
    return table;
}

async function clearUsersTable(){
    await clearTable('users');
}

async function addData(json){
    const sql = `INSERT INTO users SET ?`;
    json.forEach(async data => {
        await query(sql, data);
    });
}

module.exports = {
    createUserTable,
    addData,
    showUsersTable,
    clearUsersTable,
}