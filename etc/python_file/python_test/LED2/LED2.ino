int data; //파이썬의 데이터를 저장하는 공간

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(12,OUTPUT);
  digitalWrite(12,LOW);
}

void loop() {
  // put your main code here, to run repeatedly:
  while (Serial.available()){
    data = Serial.read();
    }

    if (data == '1'){
      digitalWrite (12,HIGH);
      delay(10000);
      }
    else if (data == '2'){
      digitalWrite (10,HIGH);
       delay(10000);
      }  
    else if (data =='0'){
      digitalWrite (12,LOW);
      digitalWrite (10,LOW);
        }
}
