const mysql = require('mysql')
const { database } = require('./keys')
// Módulo que convierte promesas en callbacks - El módulo mysql no soporta promesas por lo que no soporta async/await
const promisify = require('util')

const pool = mysql.createPool(database)

pool.getConnection((error, connection)=>{

  if(error){

    error.code === 'PROTOCOL_CONNECTION_LOST' ? console.error('DATABASE CONNECTION WAS CLOSED') : null
    error.code === 'ER_CON_COUNT_ERROR' ? console.error('DATABASE HOW TO MANY CONNECTIONS') : null
    error.code === 'ECONNREFUSED' ? console.error('DATABASE CONNECTION WAS REFUSED') : null

  }

  connection ? connection.release() : null
  return

})

// Convierte las promesas promesas en callbacks
pool.query = promisify(pool.query)

module.exports = pool