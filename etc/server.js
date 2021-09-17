global.__appRoot = __dirname;
const express = require('express')
const passport = require('passport')
const cors = require('cors')

const { NODE_APP_INSTANCE, NODE_ENV } = process.env;


// 서버 초기화

const app = express()

app.disable('x-powered-by') // x-powered-by 헤더 비활성화

app.use(cors()) // CORS 해제

app.options('*', cors()) // CORS Pre-Flight 활성화

app.use(express.urlencoded({ extended: true, limit: '100mb' })) // nginx도 설정 필요

app.use(express.json({ limit: '100mb' }))

app.use(passport.initialize())

// app.use(compression()); // 응답압축

const db_config = require(__dirname + '/db.js')
const conn = db_config.init()
db_config.connect(conn)

app.get('/', (req, res) => {

  const var1 = '값'

  res.send(`API 진입점 ${var1}`)

})



//json안에 ON/OFF, 미세먼지농도, 온도, 습도



app.get('/dashboard/info1', (req, res) => {

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
    return res.status(200).json(response)
  })
  // const date = new Date()//시간
  // response.query = date;


  //return res.status(200).json(response);
})//공기청정기 데이터

app.get('/dashboard/info2', (req, res) => {

  const response = {
    state: 1,
    query: null,
    msg: 'Succesful'
  }
  var pmvalue =0;
 
  const air = require('../project_j/node_file/api/air');
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

app.get('/dashboard/info3', (req, res) => {``

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

app.get('/dashboard/info4', (req, res) => {

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


app.get('/ui/data',(req,res) => {
  const response ={ 
    state : 1,
    query : null,
    msg : 'Succesful'
  }
  req.json();
  response.query = date;


  return res.status(200).json(response);
})



 //UPDATE  AIR_database SET observation_time=TIMESTAMP '2020-12-18 19:10:25', misae=20, temperature=22.5, humidity=10, is_turned_on=0 WHERE obid = 1
app.get('/user/list', async (req, res) => {

  const response = {
    state: 1,
    query: null,
    msg: 'Succesful'
  }
  var sql = 'SELECT * FROM users;'
  //console.log(sql);
  
  conn.query(sql, function (err, results, field) {
    response.query = results
    console.log(response.query)
    return res.send(response)
  })


})


// 서버 시작

const server = app.listen(9595, '0.0.0.0', () => {

  console.log(
    `>>> API SERVER ${Number.isNaN(Number(NODE_APP_INSTANCE)) ? 'local' : NODE_APP_INSTANCE} STARTED ON http://0.0.0:9595 AS ${NODE_ENV || 'NO_NODE_ENV'}`,
  )
})


// 서버 종료
process.on('SIGINT', () => {
  server.close(() => {


  })
})

