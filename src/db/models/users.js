const {query, createTable, showTable, clearTable, deleteTable} = require('../../db');

async function createUsersTable(){
    const schema = `
        id int,
        name varchar(255), 
        surname varchar(255), 
        dob DATE, 
        gender varchar(255)
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
    const sql = "INSERT INTO users (`id`, `name`, `surname`, dob, `gender`) VALUES (?, ?, ?, STR_TO_DATE(?, '%d/%m/%Y'), ?)";
    for (const data of json) {
        let {id, name, surname, dob, gender} = data;
        const params = [id, name, surname, dob, gender];
        await query(sql, params);
      }
}

async function deleteUsersTable(){
    await deleteTable('users');
}
module.exports = {
    createUsersTable,
    addData,
    showUsersTable,
    clearUsersTable,
    deleteUsersTable,
}