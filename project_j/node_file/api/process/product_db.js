var jkh_fun = require('./jkh_fun.js');
var response = {
    state: 1,
    query: null,
    msg: 'Succesful'
};//사용자 이름 전송용 
var data_price;

var price = (conn, data_sug) => {
    var rr;
    let sql = 'SELECT * FROM qrcode_database WHERE name = ? ';  //가져오기
    conn.query(sql, [data_sug.listname], function (err, results, fields) {
        if (err) {
            console.error(`${jkh_fun.date_time()} : price is not fined => ${err}`);
        }
        else {
            try {
                if (jkh_fun.isEmpty(results)) {
                    console.log(`${jkh_fun.date_time()} : undifined price data`);
                    rr = null;
                    return rr;
                }//조회 실패
                else {
                    data_price = results[0].price;
                    console.log(`${jkh_fun.date_time()} : price data => ${data_price}`);
                    
                    return ;
                }
            }
            catch (e) {
                console.log(`${jkh_fun.date_time()} : database Searching => ${e}`);
            }
        }
    });
}//가격 들고오는 함수
var add_stock = (conn, data_sug) => {
    let sql = 'UPDATE qrcode_database SET stock = stock + ? WHERE name = ?';
    conn.query(sql, [data_sug.count, data_sug.listname], function (err) {
        if (err) {
            console.error(`${jkh_fun.date_time()} : stock is not updata => ${err}`);
            return;
        }//실패~!
        else {
            console.log(`${jkh_fun.date_time()} : chage stock data`);
            response.msg = 'Succesful';
            return;
        }//성공~!
    })

}//제고 채워줌
var order_history = (res, conn, price, data_sug) => {
    var data = {
        price: price,//* data_sug.count,
        username: data_sug.listname,
        date: jkh_fun.date_time()
    }
    let sql = 'INSERT into orderhistory(price, UserName, Mdate) values(?,?,?)';
    conn.query(sql, [data.price, data.username, data.date], function (err) {
        if (err) {
            console.error(`${jkh_fun.date_time()} : add not order history => ${err}`);
        }//실패~!
        else {
            console.log(`${jkh_fun.date_time()} : add order history data`);
            response.msg = 'Succesful';
            return res.status(200).json(JSON.stringify(response));
        }//성공~!
    })
}//주문 기록 추가
var add_product = (res, conn, data_sug) => {
    let sql = 'UPDATE qrcode_database SET product = product + ? WHERE name = ?';
    conn.query(sql, [data_sug.count, data_sug.listname], function (err) {
        if (err) {
            console.error(`${jkh_fun.date_time()} : stock is not updata => ${err}`);
            console.log(`${jkh_fun.date_time()} : undifined data`);
            response.query = false;
            response.msg = 'failed';
            return res.status(200).json(JSON.stringify(response));
        }//실패~!
        else {
            response.query = true;
            response.msg = 'Succesful';
            console.log(`${jkh_fun.date_time()} : chage product data => good!`);
            return res.status(200).json(JSON.stringify(response));
        }//성공~!
    })

}//제고 채워줌
var out_order_add_list = (res, conn, data_sug) => {
    let sql = 'INSERT into outproduct ( qr_code, count)  values(?,?);';
    conn.query(sql, [data_sug.qr_code, data_sug.count], async function (err) {
        if (err) {
            console.error(`${jkh_fun.date_time()} : product list is not fined => ${err}`);
            console.log(`${jkh_fun.date_time()} : undifined data`);
            response.query = false;
            response.msg = 'failed';
            return;
        }
        else {
            try {
                response.query = true;
                response.msg = 'Succesful';
                console.log(`${jkh_fun.date_time()} : order defined data => good!`);
                return;

            }
            catch (e) {
                console.log(`${jkh_fun.date_time()} : outorder database Searching error => ${e}`);
            }
        }
    });

}

module.exports = {
    listSelect: (res, conn) => {
        let sql = 'SELECT * FROM qrcode_database';  //가져오기
        conn.query(sql, async function (err, results, fields) {
            if (err) {
                console.error(`${jkh_fun.date_time()} : product list is not fined => ${err}`);
            }
            else {
                try {
                    if (jkh_fun.isEmpty(results)) {
                        console.log(`${jkh_fun.date_time()} : undifined data`);
                        response.query = false;//이름없음
                        response.msg = 'failed';
                        return res.status(200).json(JSON.stringify(response));
                    }//조회 실패
                    else {
                        var rr = JSON.stringify(results);
                        response.query = rr;
                        response.msg = 'Succesful';
                        console.log(`${jkh_fun.date_time()} : defined data => good!`);
                        return res.status(200).json(JSON.stringify(response));
                    }
                }
                catch (e) {
                    console.log(`${jkh_fun.date_time()} : database Searching => ${e}`);
                }
            }
        });

    },
    buySelect: async (req, res, conn, data_sug) => {
        var data_price1 = await price(conn, data_sug); // 가격 들고옴
        console.log(data_price);
        var data_stock = await add_stock(conn, data_sug); //제고 업데이트
        var order_history1 = await order_history(res, conn, data_price * data_sug.count, data_sug);

    },
    order_history_list: (res, conn) => {
        let sql = 'SELECT * FROM orderhistory';  //가져오기
        conn.query(sql, async function (err, results, fields) {
            if (err) {
                console.error(`${jkh_fun.date_time()} : product list is not fined => ${err}`);
            }
            else {
                try {
                    if (jkh_fun.isEmpty(results)) {
                        console.log(`${jkh_fun.date_time()} : undifined data`);
                        response.query = false;//이름없음
                        response.msg = 'failed';
                        return res.status(200).json(JSON.stringify(response));
                    }//조회 실패
                    else {
                        var rr = JSON.stringify(results);
                        response.query = rr;
                        response.msg = 'Succesful';
                        console.log(`${jkh_fun.date_time()} : order defined data => good!${rr}`);
                        return res.status(200).json(JSON.stringify(response));
                    }
                }
                catch (e) {
                    console.log(`${jkh_fun.date_time()} : database Searching => ${e}`);
                }
            }
        });
    },
    out_order_history_list: async (req, res, conn, data_sug) => {
        var add_list = await out_order_add_list(res, conn, data_sug);
        var add_product_f = await add_product(res, conn, data_sug);


    }
}