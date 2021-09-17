//블루투스모듈 HC-06(슬래이브만가능)으로 진행함 
//블루투스모듈 HC-05(슬래이브 마스터둘다가능)는 조금 코드가 다르다  
//HC-06 시리얼창에서 "line ending 없음" 설정할것

int Tx = 12; //전송 보내는핀  
int Rx = 11; //수신 받는핀



void setup() {
  
  // put your setup code here, to run once:
  Serial.begin(9600);

  Serial.println("hello");
  Serial1.begin(9600);
  
  
}

void loop() {
  
  // put your main code here, to run repeatedly:
  if (Serial1.available()) {       
    Serial.write(Serial1.read());
  }
  if (Serial.available()) {         
    Serial1.write(Serial.read());
  }


}
