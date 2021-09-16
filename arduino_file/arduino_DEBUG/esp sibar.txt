//이 소스코드는 아무거나 다 쑤셔넣어본겁니다.
//vsCode에서 아두이노 사용법
//참고:https://blog.naver.com/anima11x/221840268623
//참고:https://ttuk-ttak.tistory.com/31
//참고:https://xenostudy.tistory.com/533

//00. 그냥 13번핀 확인하기
//참고: 나의뇌
//*
#define g_LED 13
void setup()
{
    pinMode(g_LED, OUTPUT);
}

void loop()
{
    digitalWrite(g_LED,HIGH);
    delay(300);
    digitalWrite(g_LED,LOW);
    delay(300);
}
//*/

//01. 와이파이모듈 AT명령어 입력해보기
//참고:https://blog.naver.com/PostView.nhn?blogId=eduino&logNo=221152914869
/*
#include <SoftwareSerial.h>
#define BT_RXD 2
#define BT_TXD 3
SoftwareSerial ESP_wifi(BT_RXD, BT_TXD);
void setup()
{
    Serial.begin(9600);
    ESP_wifi.begin(9600);
    ESP_wifi.setTimeout(5000);
    delay(1000);
}
void loop()
{
    if (Serial.available())
    {
        ESP_wifi.write(Serial.read());
    }
    if (ESP_wifi.available())
    {
        Serial.write(ESP_wifi.read());
    }
}
//*/

//02. 와이파이모듈로 WiFi공유기 연결해서 값 왔다갔다해보기
//참고: https://juzero-space.tistory.com/26
/*
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <HttpClient.h>

const char *ssid = "122b";                         //wift 아이디
const char *password = "122b122b";                     // wifi 비번
const char *serverName = "http://203.241.228.134:4000"; // 웹서버주소
int value;
int sensor_number = 12; // 임이의 숫자를 넣어주었다.
int analog = 25;        // esp에 연결된 핀 번호

IPAddress hostIp(00, 000, 00, 00); //웹서버의 ip 주소
int SERVER_PORT = 5000;            // 웹서버 포트 번호
WiFiClient client;

void setup()
{
    Serial.begin(115200);
    WiFi.begin(ssid, password); // 와이파이 접속
    while (WiFi.status() != WL_CONNECTED)
    { //Check for the connection
        delay(1000);
        Serial.println("Connecting to WiFi..");
    }
    Serial.println("Connected to the WiFi network");
}
void loop()
{
    if (WiFi.status() == WL_CONNECTED)
    { //Check WiFi connection status
        value = analogRead(analog); // esp32에서 읽은 co2 값을 value에 저장한다.
        HTTPClient http;
        http.begin("http://203.241.228.134:4000");                             //Specify destination for HTTP request
        http.addHeader("Content-Type", "application/x-www-form-urlencoded"); //Specify content-type header,  Json형식의 타입이다.
        String httpRequestData = "sensor_number=" + String(sensor_number) + "&value=" + String(value); // 가장 중요한 Json 데이터를 입력하는 부분이다  = 의 왼쪽이 key값 오른쪽이 value 값이고 &를 기준으로 쌍이 나뉘어진다.
        Serial.println(httpRequestData);                                                               //시리얼 모니터에 Json 형식의 데이터를 찍어준다.
        int httpResponseCode = http.POST(httpRequestData);                                             //Send the actual POST request
        if (httpResponseCode > 0)
        { // 잘 전송되었으면
            String response = http.getString(); //Get the response to the request
            Serial.println(httpResponseCode); //Print return code
            Serial.println(response);         //Print request answer
        }
        else
        {
            Serial.print("Error on sending POST: ");
            Serial.println(httpResponseCode);
        }
        http.end(); //Free resources
    }
    else
    {
        Serial.println("Error in WiFi connection");
    }
    delay(30000000); //Send a request every 10 seconds
}
//*/

//03. ESP8266 서버로 데이터 전송
//참고:http://www.hardcopyworld.com/gnuboard5/bbs/board.php?bo_table=qna&wr_id=2991

//  This sketch sends data via HTTP GET requests to data.sparkfun.com service.
//
//  You need to get streamId and privateKey at data.sparkfun.com and paste them
//  below. Or just customize this script to talk to other HTTP servers.

/*
#include <ESP8266WiFi.h>

const char *ssid = "122b";
const char *password = "122b122b";

const char *host = "http://203.241.228.134:4000";

void setup()
{
    Serial.begin(115200);
    delay(10);
    // We start by connecting to a WiFi network
    Serial.println();
    Serial.println();
    Serial.print("Connecting to ");
    Serial.println(ssid);

    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }

    Serial.println("");
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
}

int value = 0;

void loop()
{
    delay(5000);
    ++value;

    Serial.print("connecting to ");
    Serial.println(host);

    // Use WiFiClient class to create TCP connections
    WiFiClient client;
    const int httpPort = 80;
    if (!client.connect(host, httpPort))
    {
        Serial.println("connection failed");
        return;
    }

    // We now create a URI for the request
    String url = "/";
    //  url += streamId;
    //  url += "?private_key=";
    //  url += privateKey;
    //  url += "&value=";
    //  url += value;

    Serial.print("Requesting URL: ");
    Serial.println(url);

    // This will send the request to the server
    client.print(String("GET ") + url + " HTTP/1.1\r\n" +
                 "Host: " + host + "\r\n" +
                 "Connection: close\r\n\r\n");
    int timeout = millis() + 5000;
    while (client.available() == 0)
    {
        if (timeout - millis() < 0)
        {
            Serial.println(">>> Client Timeout !");
            client.stop();
            return;
        }
    }

    // Read all the lines of the reply from server and print them to Serial
    while (client.available())
    {
        String line = client.readStringUntil('\r');
        Serial.print(line);
    }

    Serial.println();
    Serial.println("closing connection");
}
//*/

//04. Calling API using ESP8266
//참고 : https://electrosome.com/calling-api-esp8266/
/*
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

const char* ssid = "SERVER NAME";
const char* password = "SERVER PASSWORD";

void setup() 
{
  Serial.begin(115200);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) 
  {
    delay(1000);
    Serial.println("Connecting...");
  }
}

void loop() 
{
  if (WiFi.status() == WL_CONNECTED) 
  {
    HTTPClient http; //Object of class HTTPClient
    http.begin("http://jsonplaceholder.typicode.com/users/1");
    int httpCode = http.GET();

    if (httpCode > 0) 
    {
      const size_t bufferSize = JSON_OBJECT_SIZE(2) + JSON_OBJECT_SIZE(3) + JSON_OBJECT_SIZE(5) + JSON_OBJECT_SIZE(8) + 370;
      DynamicJsonBuffer jsonBuffer(bufferSize);
      JsonObject& root = jsonBuffer.parseObject(http.getString());
 
      int id = root["id"]; 
      const char* name = root["name"]; 
      const char* username = root["username"]; 
      const char* email = root["email"]; 

      Serial.print("Name:");
      Serial.println(name);
      Serial.print("Username:");
      Serial.println(username);
      Serial.print("Email:");
      Serial.println(email);
    }
    http.end(); //Close connection
  }
  delay(60000);
}
//*/

//05. ESP8266  튜토리얼 예제
//참고: https://create.arduino.cc/projecthub/Niv_the_anonymous/esp8266-beginner-tutorial-project-6414c8
/*
#define BLYNK_PRINT Serial


#include <ESP8266WiFi.h>
// You should get Auth Token in the Blynk App.
// Go to the Project Settings (nut icon).
char auth[] = "your auth token code from blynk app";

// Your WiFi credentials.
// Set password to "" for open networks.
char ssid[] = "your wifi name";
char pass[] = "your wifi password";

void setup()
{
  // Debug console
  Serial.begin(9600);

  Blynk.begin(auth, ssid, pass);
  // You can also specify server:
  //Blynk.begin(auth, ssid, pass, "blynk-cloud.com", 80);
  //Blynk.begin(auth, ssid, pass, IPAddress(192,168,1,100), 8080);
}

void loop()
{
  Blynk.run();
  // You can inject your own code or combine it with other sketches.
  // Check other examples on how to communicate with Blynk. Remember
  // to avoid delay() function!
}
//*/

//06. 깃허브 POST HTTP request
//참고: https://github.com/bportaluri/WiFiEsp/issues/50

/*
 WiFiEsp example: WebClient
 This sketch connects to google website using an ESP8266 module to
 perform a simple web search.
 For more details see: http://yaab-arduino.blogspot.com/p/wifiesp-example-client.html
*/
/*
#include "WiFiEsp.h"

// Emulate Serial1 on pins 6/7 if not present
#ifndef HAVE_HWSERIAL1
#include "SoftwareSerial.h"
SoftwareSerial Serial1(2, 3); // RX, TX
#endif

char ssid[] = "122b";            // your network SSID (name)
char pass[] = "122b122b";        // your network password
int status = WL_IDLE_STATUS;     // the Wifi radio's status

char server[] = "arduino.cc";

// Initialize the Ethernet client object
WiFiEspClient client;

void setup()
{
  // initialize serial for debugging
  Serial.begin(115200);
  // initialize serial for ESP module
  Serial1.begin(9600);
  // initialize ESP module
  WiFi.init(&Serial1);

  // check for the presence of the shield
  if (WiFi.status() == WL_NO_SHIELD) {
    Serial.println("WiFi shield not present");
    // don't continue
    while (true);
  }

  // attempt to connect to WiFi network
  while ( status != WL_CONNECTED) {
    Serial.print("Attempting to connect to WPA SSID: ");
    Serial.println(ssid);
    // Connect to WPA/WPA2 network
    status = WiFi.begin(ssid, pass);
  }

  // you're connected now, so print out the data
  Serial.println("You're connected to the network");

  printWifiStatus();

  Serial.println();
  Serial.println("Starting connection to server...");
  // if you get a connection, report back via serial
  if (client.connect(server, 80)) {
    Serial.println("Connected to server");
    // Make a HTTP request
    String content = "Hey, just testing a post request.";
    client.println("POST YOUR_RESOURCE_URI HTTP/1.1");
    client.println("Host: SERVER:PORT");
    client.println("Accept: #/#");
    client.println("Content-Length: " + content.length());
    client.println("Content-Type: application/x-www-form-urlencoded");
    client.println();
    client.println(content);
  }
}

void loop()
{
  // if there are incoming bytes available
  // from the server, read them and print them
  while (client.available()) {
    char c = client.read();
    Serial.write(c);
  }

  // if the server's disconnected, stop the client
  if (!client.connected()) {
    Serial.println();
    Serial.println("Disconnecting from server...");
    client.stop();

    // do nothing forevermore
    while (true);
  }
}


void printWifiStatus()
{
  // print the SSID of the network you're attached to
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());

  // print your WiFi shield's IP address
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);

  // print the received signal strength
  long rssi = WiFi.RSSI();
  Serial.print("Signal strength (RSSI):");
  Serial.print(rssi);
  Serial.println(" dBm");
}
//*/