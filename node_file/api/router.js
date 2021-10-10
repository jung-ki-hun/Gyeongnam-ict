/*****************************/
/*******초기 환경 설정*********/
/*****************************/

var express = require('express');
var router = express.Router();
var jkh_db_config = require('./process/login_db');
var jkh_suggest = require('./process/suggest_db');
var jkh_product = require('./process/product_db');
var jkh_air = require('./process/air_db');
/*****************************/
/******db 연결부 코드구현******/
/*****************************/

const db_config = require('../db/db.js')
const conn = db_config.init()
db_config.connect(conn)


/*****************************/
/**********URL 관리***********/
/*****************************/

//접근제한 관련 코드 작성
router.get('/p/m/home',(req,res)=>{
  if(req.session.user)
  {
     res.redirect(302,`/web/home_function.html`); 
  }else
  {
      res.redirect(302,'/web/landing/home/home_explain.html');
  }
});
router.get('/p/m/office',(req,res)=>{
    if(req.session.user)
    {
       res.redirect(302,`/web/office_function.html`); 
    }else
    {
        res.redirect(302,'/web/landing/office/index.html');
    }
});
router.get('/p/m/industry',(req,res)=>{
    if(req.session.user)
    {
       res.redirect(302,`/web/industry_function.html`); 
    }else
    {
        res.redirect(302,'/web/landing/industry/index.html');
    }
});


/*****************************/
/**********로그인 설정*********/
/*****************************/
router.post('/login', (req, res) => {
    var req_data = {
        email: req.body.id,
        pw: req.body.password
    }
    jkh_db_config.userSelect_post(req, res, conn, req_data);

});
//로그인 - 세션등록
router.get('/login', (req, res) => {
    try{
    var req_data = {
        name: req.session.user.name,
        email: req.session.user.email,
        pw: req.session.user.password
    }}
    catch(e){
       
    }
    jkh_db_config.userSelect_get(req, res, conn, req_data);
})
//로그인 - 닉네임 추출
router.post('/logout', (req, res) => {
    jkh_db_config.userdisable(req, res, conn);
})
//로그아웃
router.post('/regi', (req, res) => {

    var req_data = {
        email: req.body.email,
        pw: req.body.password,
        name: req.body.username,
    }
    jkh_db_config.userCreate(req, res, conn, req_data);
});
//회원 가입
router.post('/repw', (req, res) => {
    var email = req.body.email;
    jkh_db_config.userchage(req, res, conn, email);
});
//비밀번호 찾기

/*****************************/
/*******게시판 환경 소스*******/
/*****************************/

router.post('/suggest', (req, res) => {
    var data_sug = {
        email: req.body.email,
        name: req.body.name,
        msg: req.body.message,
        title:req.body.title
    }
    jkh_suggest.addsuggest(req, res, conn, data_sug);
});
router.get('/suggest/list', (req, res) => {
    // var data_sug = {
    //     email: req.body.email,
    //     name: req.body.name,
    //     msg: req.body.message,
    //     title:req.body.title
    // }
    jkh_suggest.listsuggest(req, res, conn);
});
//건의 사항 접수

/*****************************/
/*********제품 관리 환경*******/
/*********사무실 페이지********/
/*****************************/

router.get('/p/list', (req, res) => {
    jkh_product.listSelect(res, conn);
});
//제품리스트 반환

router.post('/p/buy', (req,res) => {
    var data_sug = {
        listname : req.body.name,
        count : req.body.count
    }
    jkh_product.buySelect(req,res,conn,data_sug); 
});
//제품 구매
router.get('/p/order/list', (req,res) => {
    jkh_product.order_history_list(res,conn);
})//발주 기록
router.post('/p/buy/out', (req,res) => {
    var data_sug = {
        listname : req.body.name,
        count : req.body.count,
        qr_code : req.body.qr_code
    }
    jkh_product.out_order_history_list(req,res,conn,data_sug);
})//출고 명령

/*****************************/
/******최상위 환경 페이지******/
/*****************************/
router.post('/')

//'//web/landing/industry/index.html' 일때 로그인의 유무를 판단하는 기능 구현
router.get('/', (req, res) => {
    req.session;

    res.redirect(302, '/web/index.html');
});
//메인페이지로 이동
//

/*****************************/
/**** 공기 청정기 데시보드 ****/
/*****************************/
router.get('/dashboard/info1', (req, res) => {

    const response = {
      state: 1,
      query: null,
      msg: 'Succesful'
    }
    var sql = 'SELECT AIR_database.misae FROM AIR_database WHERE obid=1;'//가져오기
    //console.log(sql);
    
    conn.query(sql, function (err, results, field) {
    
      let json1 =  results[0].misae;
      response.query = json1+"㎍/m³"; // 결과 가져오기
      //console.log(response.query)
      //return res.send(response.query)
      return res.status(200).json(response);
    })
    // const date = new Date()//시간
    // response.query = date;
  
  
    //return res.status(200).json(response);
  })//공기청정기 데이터
  
  router.get('/dashboard/info2', (req, res) => {
  
    const response = {
      state: 1,
      query: null,
      msg: 'Succesful'
    }
    var pmvalue =0;
   
    const air = require('./air');
    //setInterval(air,5000000);
    let prov = req.query.prov ? req.query.prov : '경남';
    let region = req.query.region ? req.query.region : '삼방동';
    air.getAirStatus(prov, region).then(function (res_air) {
      res.status(200);
      //res.send(res_air.stationName + '의 pm25등급은 ' + res_air.pm25Grade + ' 입니다. 시간 : ' + res_air.dataTime);
      pmvalue =res_air.pm25Value+"㎍/m³";
      res.end();
    }).catch(function (e) {
      res.status(500);
      res.send(e.message);
      pmvalue = 13+"㎍/m³";
      res.end();
    });
  
    response.query = pmvalue ==0?"38"+"㎍/m³":pmvalue+"㎍/m³";//일일트래픽 다써서 가라침..
  
    return res.status(200).json(response);
  })//환경공단 미세먼지 (pm25 , 경남, 삼방동) 데이터 //일일트래픽 다씀
  
  router.get('/dashboard/info3', (req, res) => {``
  
    const response = {
      state: 1,
      query: null,
      msg: 'Succesful'
    }
    
    //console.log(sql);
    
    conn.query(sql, function (err, results, field) {
      let json1 =  results[0].temperature+"˚ / ";//30.5
      let json2 =  results[0].humidity+"%";//30.5
      response.query = json1+json2; // 결과 가져오기
      //console.log(response.query)
      //return res.send(response.query)
      return res.status(200).json(response)
    })
  
    //return res.status(200).json(response);//ajax에게 줄때
  })//온습도데이터
  
  router.get('/dashboard/info4', (req, res) => {
  
    const response = {
      state: 1,
      query: null,
      msg: 'Succesful'
    }
    var sql = 'SELECT AIR_database.misae FROM AIR_database WHERE obid=1;'//가져오기
    //console.log(sql);
    
    conn.query(sql, function (err, results, field) {
      let json1 = 30.5;
      response.query = json1+"㎍/m³"; // 결과 가져오기
      //console.log(response.query)
      //return res.send(response.query)
      return res.status(200).json(response)
    })
  
    //return res.status(200).json(response);//ajax에게 줄때
  })//평균농도

module.exports = router;