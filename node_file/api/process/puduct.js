var jkh_fun = require('./jkh_fun.js');

var db_data = {
    db_pw: null,
    db_name: null,
    db_email: null
};
var response = {
    state: 1,
    query: null,
    msg: 'Succesful'
};//사용자 이름 전송용 

module.exports = {
    selectProduct: (res, data_sug) => {
        var check_data = 1;// this.userCheck();
        if (check_data != 1) {

        }//중복 항목 존재시..
        else {
            let sql = 'INSERT into user_database values(?,?,?)';
            conn.query(sql, [data_sug.email, data_sug.name, data_sug.msg], function (err, rows) {
                if (err) {
                    console.error(err);
                }//실패~!
                else {
                    console.log(rows);
                    response.msg = 'Succesful';
                    return res.status(200).json(JSON.stringify(response));
                }//성공~!
            })
        }//가입 성공시

    },

    //userCheck: async () => { return 1; }
}