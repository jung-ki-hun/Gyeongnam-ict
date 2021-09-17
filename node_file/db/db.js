const mysql = require('mysql');
//const dataset = require('./app.js');
require('dotenv').config();
var db_info = {
    host: '127.0.0.1',
    port: '3306',    
    user: process.env.NAME_DB||'root',
    password: process.env.PASS_DB||'rlgns123',
    database: 'projectb'
}

module.exports = {
    init: function () {
        return mysql.createConnection(db_info);
    },
    connect: function (conn) {
        conn.connect(function (err) {
            if (err) console.error('mysql connection error : ' + err);
            else console.log('mysql is connected successfully!');
        });
    },
    clsose: function (conn) {
        conn.disconnect(function (err) {
            if (err) {
                console.error('mysql connection error : ' + err);
            }
            else {
                console.log('mysql connection disconnectting');
            }
        });
    },
    getConnection: function(){
        return db_info;
    }
}
