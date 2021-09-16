#include <U8glib.h>   //oled 용
#include "DHT.h"      // DHT.h 라이브러리를 포함한다//온습도센서
#define DHTPIN 2      // DHT핀을 2번으로 정의한다(DA TA핀)
#define DHTTYPE DHT11 // DHT타입을 DHT11로 정의한다
#define rxPin 0
#define txPin 1
#define DEBUG true
#include <SoftwareSerial.h>
#include <ArduinoJson.h> //json포맷으로 변환 해주는 라이브러리

//*************************
//********server***********
//*************************
SoftwareSerial esp01(txPin, rxPin); // SoftwareSerial NAME(TX, RX);
String sendData(String command, const int timeout, boolean debug);
//const char wifi_name[] ="V50 kihun";
//const char wifi_pw[] ="12345678";
int server_connect = 0; //define 0 = disconnet

//*************************
//*********dht*************
//*************************

DHT dht(DHTPIN, DHTTYPE); // DHT설정 - dht (디지털2, dht11)

int Humidity;    //습도 데이터
int Temperature; //온도 데이터

void set_home_data()
{
  Humidity = dht.readHumidity();       // 변수  Humidity에 습도 값을 저장
  Temperature = dht.readTemperature(); // 변수 Temperature에 온도 값을 저장
} //센서로부터 데이터 불러옴 함수//데이터 저장 함수

//*************************
//*******oled_set**********
//*************************
U8GLIB_SSD1306_128X64 u8g(U8G_I2C_OPT_NONE); // I2C / TWI
//DHT_Unified dht(DHTPIN, DHTTYPE);
uint32_t dht22DelayMS = 0;

//*************************
//*********machine*********
//*************************

const int pin_fan = 5;   //선풍기 핀
const int pin_gasgi = 6; //가습기 핀

void work_machine(int power)
{
  if (power == 1) //작동 범위 온도 및 습도
  {
    digitalWrite(pin_fan, HIGH);
    digitalWrite(pin_gasgi, HIGH);
  }
  else //작동범위가 아니면 꺼짐
  {
    digitalWrite(pin_fan, LOW);
    digitalWrite(pin_gasgi, LOW);
  }

} //선풍기 가습기 직접적인 제어 함수

//*************************
//*****server_setting******
//*************************

/*
 * 동훈이가 해야될부분 
 * void send_server(double temper, double humidity)
 * void setting_server()
 * void post_data(){

*/
void send_server(double temper, double humidity)
{
  if (esp01.available())
  {
  }
  // work_machine();
} //서버로 데이터(온습도) 전송//웹 페이지에서 실시간(?)으로 데이터 표시 용// 보내는용
void setting_server()
{
  sendData("AT+RST\r\n", 2000, DEBUG);                              // reset module
  sendData("AT+CIOBAUD?\r\n", 2000, DEBUG);                         // check baudrate (redundant)
  sendData("AT+CWMODE=3\r\n", 1000, DEBUG);                         // configure as access point (working mode: AP+STA)
  sendData("AT+CWLAP\r\n", 3000, DEBUG);                            // list available access points
  sendData("AT+CWJAP=\"V50 kihun\",\"12345678\"\r\n", 5000, DEBUG); // join the access point
  sendData("AT+CIFSR\r\n", 1000, DEBUG);                            // get ip address
  sendData("AT+CIPMUX=1\r\n", 1000, DEBUG);                         // configure for multiple connections
  sendData("AT+CIPSERVER=1,80\r\n", 1000, DEBUG);                   // turn on server on port 80
  if (sendData("AT+CWJAP?", 1000, DEBUG) != "")                     //와이파이 연결유무 확인하는건데 이부분 수정 부탁
  {
    server_connect = 1;
  }
  else
  {
    server_connect = 0;
  } //화면에 서버연결 확인문구 전송
}

//서버 초기 셋팅
/* 아두이노-ESP8266 간 통신 함수*/
String sendData(String command, const int timeout, boolean debug)
{
  String response = "";
  esp01.print(command); //command를 ESP8266에 보냄
  long int time = millis();

  while ((time + timeout) > millis())
  {
    while (esp01.available())
    {
      /*esp가 가진 데이터를 시리얼 모니터에 출력하기 위함*/
      char c = esp01.read(); //다음 문자를 읽어옴
      response += c;
    }
  }
  if (debug)
  {
    Serial.print(response);
  }

  return response;
}
/*
bool get_server_data(){
  bool mode,on_off;
  
   //work_machine(mode,on_off);
  return data;
}//서버에서 모드 데이터 가져오기//웹페이지에서 받아온 파라메타이용해서 기기 제어 시키는 함수//받는용
*/
//*************************
//******POST Data Set******
//*************************
/*
void post_data(){
String jsondata = "";
StaticJsonBuffer<200> jsonBuffer;
JsonObject& root = jsonBuffer.createObject();
root["tempvalue"] = Temperature;
root["humivalue"] = Humidity;

root.printTo(jsondata);
Serial.println(jsondata);
}
*/

//*************************
//*********display*********
//*************************
void display()
{
  u8g.setFont(u8g_font_unifont);
  u8g.setPrintPos(0, 12); //위치
  u8g.print("T : ");
  u8g.print(Temperature);
  u8g.setPrintPos(0, 27); //위치
  u8g.print("H : ");
  u8g.print(Humidity);
  u8g.setPrintPos(0, 42); //위치
  if (server_connect == 1)
  {
    u8g.print("Connect");
  }
  else
  {
    //u8g.print("VSCode-TEST");
    u8g.print("DisConnect");
  }
  delay(10);
} //모니터 출력 함수

void Serial_show()
{
  Serial.print("Humidity: ");    // 문자열 Humidity: 를 출력한다.
  Serial.print(Humidity);        // 변수 h(습도)를 출력한다.
  Serial.print("%\t");           // %를 출력한다
  Serial.print("Temperature: "); // 이하생략
  Serial.print(Temperature);
  Serial.println(" C");
} //시리얼모니터 출력 //점검용 ->추후 삭제 예정

//*************************
//*********main************
//*************************
void setup()
{
  Serial.begin(9600); //통신속도 설정
  esp01.begin(9600);  //wifi 모듈 통신속도 설정
  pinMode(pin_fan, OUTPUT);
  pinMode(pin_gasgi, OUTPUT);
  //sendData("AT+CWLAP\r\n",3000,DEBUG); //주변 와이파이 리스트 출력
  setting_server(); //서버 설정하는 함수

} //초기화

void loop()
{
  delay(2000);
  set_home_data();
  u8g.firstPage(); //화면 초기화
  do
  {
    display();
  } while (u8g.nextPage());
  //화면
  Serial_show(); //테스트용 파일
} //실행