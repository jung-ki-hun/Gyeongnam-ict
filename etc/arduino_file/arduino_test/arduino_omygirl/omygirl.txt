void setup() {
  // put your setup code here, to run once:
  
  int i=0;

  for(i=0;i<4;i++){
  tone(11, 494, 250);
  delay(250);
  tone(11, 659, 250);
  delay(250);
  }
  delay(250);
  
  for(i=0;i<3;i++){
  tone(11, 659, 210);
  delay(250);
  delay(250);
}

for(i=784;i<=831;i++)
{
  tone(11, i, 150);
  delay(3);
}
delay(250/8*7);
  delay(250/3);
  /*
  tone(11, 784, 150);
  delay(250/8);
  tone(11, 831, 200);
  delay(250/8*7);
  delay(250/2);
*/

  tone(11, 554, 100/2);
  delay(250/8*7);
  tone(11, 554, 100/8*9);
  delay(250/2);
  tone(11, 554, 100/2);
  delay(250/8*9);
  
  tone(11, 554, 100/8*9);
  delay(250);
  tone(11, 523, 100/8*9);
  delay(250);
  tone(11, 494, 100/8*9);
  delay(250);
  delay(250);


  tone(11, 932, 100);
  delay(100);
  tone(11, 988, 100);
  delay(250/2*3);

for(i=0;i<3;i++){
  tone(11, 659, 210);
  delay(250);
  delay(250);
}
  tone(11, 740, 150);
  delay(250);

    for(i=0;i<4;i++){
  tone(11, 494, 250);
  delay(250);
  tone(11, 659, 250);
  delay(250);
  }

}

void loop() {
  // put your main code here, to run repeatedly:
  
}
