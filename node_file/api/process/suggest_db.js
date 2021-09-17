var jkh_fun = require('../process/jkh_fun.js');
var response = {
    state: 1,
    query: null,
    msg: 'Succesful'
};

module.exports = {
    addsuggest: async (req, res, conn, data_sug) => {
        let sql = 'INSERT into homepage (name, email, message, title, timedata) values(?,?,?,?,?)';
        conn.query(sql, [data_sug.name, data_sug.email, data_sug.msg, data_sug.title, jkh_fun.date_time()], function (err) {
            try {
                if (err) {
                    console.error(`${jkh_fun.date_time()} : message do not save => ${err} `);
                }
                else {
                    console.log(`${jkh_fun.date_time()} : message save succedful `);
                    response.msg = 'Succesful';
                    return res.status(200).json(JSON.stringify(response));
                }
            }
            catch (e) {
                console.error(`${jkh_fun.date_time()} : message do not saving => ${err} `);
            }
        })

    },
    listsuggest: (req, res, conn) => {
        let sql = 'SELECT * FROM homepage ';
        conn.query(sql, (err, results) => {
            if (err) {
                console.log('에러 : ' + error);
            }
            else {
                try {
                    if (jkh_fun.isEmpty(results)) {
                        console.log(`${jkh_fun.date_time()} : undifined qna data`);
                        response.query = false;//이름없음
                        response.msg = 'failed';
                        return res.status(200).json(JSON.stringify(response));
                    }//조회 실패
                    else {
                        var rr = JSON.stringify(results);
                        response.query = rr;// db_data.db_name;
                        response.msg = 'Succesful';
                        console.log(`${jkh_fun.date_time()} : defined qna data => good!`);//결과 출력
                        return res.status(200).json(JSON.stringify(response));

                        //세션에다가 결과 저장해야됨
                    }
                }
                catch (e) {
                    console.log(e + '// db조회중 오류 발생');
                }
            }
        })
    }
}