const mysql = require('mysql');
//const dataset = require('./app.js');
var argv_ip  = process.argv[2]
var db_info = {
    // host: '127.0.0.1',
    // port: '3306',
    // user: 'ghtest',
    // password: 'ghtestpwd2@',
    // database: 'ghtest_db'
    host: '127.0.0.1',//argv_ip != '192.168.219.102' ?  '180.83.98.144':argv_ip.toString(), //'180.83.98.144' //'127.0.0.1'//'192.168.219.102'
    port: '3306',    
    user: process.env.NAME_DB,
    password: process.env.PASSWORD,
    database: 'project'
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
