require('dotenv').config()
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.ENDPOINT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.MYSQL_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


// Query function
async function query(sql, params) {
  try {
    // Get a connection from the pool
    const connection = await pool.getConnection();
    // Use the connection to run the query
    const [rows] = await connection.query(sql, params);
    // Release the connection back to the pool
    connection.release();
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}



  async function createTable(tableName, schema){
    const sql = `
        CREATE TABLE ${tableName} (
        ${schema}
        )
    `;
    await query(sql);
}

async function showTable(tableName){
    const sql = `select * from ${tableName}`
    const table =  await query(sql);
    return table;
}

async function clearTable(tableName){
    const sql = `TRUNCATE TABLE ${tableName}`;
    await query(sql);
}


module.exports = {
    query,
    createTable,
    showTable,
    clearTable,
  };