//const db_info = require("../api/v1/function/jkh_config.js")//설정관련 데이터c
const db_info = {
    pgdb: {
        host: process.env.DB_IP || "127.0.0.1",
        port: process.env.DB_PORT || "5432",
        user: process.env.DB_ID || "postgres",
        password: process.env.DB_PW || "rlgns123",
        database: process.env.DB_NAME || "projectb"
    }
}
const SQL = require("sql-template-strings");
const { Pool, Q } = require('pg');
const pool = new Pool(db_info.pgdb);
module.exports = {
    getConnection: function () {
        return db_info.gpdb;
    },
    pool, //= pool_set.init(),
    Q(string, ...rest) {
        return SQL(string.slice(0), ...rest.map(((x) => (typeof x === 'object' && x !== null ? JSON.stringify(x) : x))));
    }///쿼리 만드는 거

}