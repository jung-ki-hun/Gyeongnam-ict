/*****************************/
/****로그인 선언부 코드구현*****/
/*****************************/

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
    userSelect_post: (req, res, conn, req_data) => {

        //console.log('이메일 : ' + email);//확인용용
        let sql = 'SELECT * FROM user_database WHERE user_email = ? AND user_password = ?';  //가져오기
        var session = req.session;

        conn.query(sql, [req_data.email, req_data.pw], function (err, results) {
            if (err) {
                console.log(`${jkh_fun.date_time()} : error => ${err}`);
            }
            else {
                try {
                    if (jkh_fun.isEmpty(results)) {
                        console.log(`${jkh_fun.date_time()} : No request data`);
                        response.query = false;//이름없음
                        response.msg = 'failed';
                        response.state = 0;
                        return res.status(200).json(JSON.stringify(response));
                    }//조회 실패
                    else {
                        console.log(`${jkh_fun.date_time()} : select is data => ${results[0].user_name}`);
                        //db_data.db_name = results[0].user_name;
                        response.query = results[0].user_name;// db_data.db_name;
                        response.msg = 'Succesful';
                        session.user = {
                            name: response.query,//results[0].user_name;//results[0];
                            password: req_data.pw,
                            email: req_data.email
                        }
                        response.state = 1;
                        console.log(response);//결과 출력
                        return res.status(200).json(JSON.stringify(response));

                        //세션에다가 결과 저장해야됨
                    }
                }
                catch (e) {
                    console.log(e + '// db조회중 오류 발생');
                }
            }
        });

    },//세션등록
    userSelect_get: (req, res, conn, req_data) => {

        //console.log('이메일 : ' + email);//확인용용
        let sql = 'SELECT * FROM user_database WHERE user_email = ? AND user_password = ?';  //가져오기
        let ssesion = req.session;
        if (ssesion.user !== undefined) { //원래 name이였노
            conn.query(sql, [req_data.email, req_data.pw], function (err, results) {
                if (err) {
                    console.log(`${jkh_fun.date_time()} : error => ${err}`);
                }
                else {
                    try {
                        if (jkh_fun.isEmpty(results)) {
                            console.log(`${jkh_fun.date_time()} : No request data`);
                            response.query = false;//이름없음
                            response.msg = 'failed';
                            response.state = 0;
                            return res.status(200).json(JSON.stringify(response));
                        }//조회 실패
                        else {
                            console.log(`${jkh_fun.date_time()} : select is data => ${results[0].user_name}`);
                            db_data.db_name = results[0].user_name;
                            if (req_data.name == results[0].user_name) {
                                console.log(`${jkh_fun.date_time()} :${req_data.name}  ==  ${db_data.db_name}: session same data`);
                                response.query = db_data.db_name;
                            }
                            else {
                                console.log(`${jkh_fun.date_time()} :${req_data.name}  !=  ${db_data.db_name}: session different data`);
                            }
                            response.msg = 'Succesful';
                            response.state = 1;
                            console.log(`${jkh_fun.date_time()} : response is data => ${response.query}`);//결과 출력
                            //console.log(req.session);//결과 출력
                            return res.status(200).json(JSON.stringify(response));
                        }
                    }
                    catch (e) {
                        console.log(`${jkh_fun.date_time()} : ${e}  // db조회중 오류 발생`);
                    }
                }
            });
        } else {
            console.log(`${jkh_fun.date_time()} : session is not defind`);
        }


    },//이름 보내줌
    userCreate: async (req, res, conn, req_data) => {

        if (jkh_fun.isEmpty(req_data.name) || jkh_fun.isEmpty(req_data.pw) || jkh_fun.isEmpty(req_data.email)) {
            console.log(`${jkh_fun.date_time()} : error req_data have not `);
            response.msg = 'failed';
            return res.status(200).json(JSON.stringify(response));
        }//중복 항목 존재시..
        else {
            let sql = 'INSERT into user_database values(?,?,?)';
            await conn.query(sql, [req_data.email, req_data.name, req_data.pw], function (err, rows) {
                if (err) {
                    console.log(`${jkh_fun.date_time()} : error => ${err}`);
                    response.msg = 'failed';
                    return res.status(200).json(JSON.stringify(response));
                }//실패~!
                else {
                    console.log(`${jkh_fun.date_time()} : select is data => ${rows}`);
                    response.msg = 'Succesful';
                    return res.status(200).json(JSON.stringify(response));
                }//성공~!
            })
        }//가입 성공시

    }, //회원 가입
    userchage: (req, res, conn, email) => {
        if (jkh_fun.isEmpty(email)) {
            console.log(`${jkh_fun.date_time()} : email is not defind => ${err}`);
            response.msg = 'please enter to email';
            return res.status(200).json(JSON.stringify(response));
        }
        else {
            let sql = 'UPDATE user_database set user_password = 1234 WHERE user_email = ?';
            conn.query(sql, [email], function (err) {
                if (err) {
                    console.error(err);
                    console.log(`${jkh_fun.date_time()} : name is not defined`);
                    response.query = false;//이름없음
                    response.msg = 'failed';
                    return res.status(200).json(JSON.stringify(response));

                }//디비 조회중 에러발생
                else {
                    try {//조회 실패
                            console.log(`${jkh_fun.date_time()} : userchage is succeful `);
                            response.msg = 'Succesful';
                            console.log(response);
                            return res.status(200).json(JSON.stringify(response));
                    }
                    catch (e) {
                        console.log(e);
                    }
                }//정상적으로 디비 조회
            })
        }
    },//비밀번호 찾기
    userdisable: (req, res) => {
        try {
            var session = req.session;
            console.log(session.user.name);
            if (session.user) {
                req.session.destroy(
                    function (err) {
                        if (err) {
                            console.log('세션 삭제시 에러');
                            return;
                        }
                        console.log('세션 삭제 성공');
                        //파일 지정시 제일 앞에 / 를 붙여야 root 즉 public 안에서부터 찾게 된다
                        res.redirect('/');
                    }
                );

            }
        }
        catch (err) {
            console.log(`${jkh_fun.date_time()} : ${err}`)
            //예외발생시에도 에러 호출 뒤에 홈페이지로 이동하게 함.(DotReNJu)
            res.redirect('/');
        }
    },//로그아웃

}
