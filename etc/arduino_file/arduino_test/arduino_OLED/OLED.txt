#define delays 300

int _R_PIN = 3;
int _G_PIN = 6;
int _B_PIN = 9;

void setup()
{
  // put your setup code here, to run once:
  pinMode(_R_PIN, OUTPUT);
  pinMode(_G_PIN, OUTPUT);
  pinMode(_B_PIN, OUTPUT);
}
void _R()
{
  analogWrite(_R_PIN, 255);
  analogWrite(_G_PIN, 0);
  analogWrite(_B_PIN, 0);
}
void _G()
{
  analogWrite(_R_PIN, 0);
  analogWrite(_G_PIN, 255);
  analogWrite(_B_PIN, 0);
}
void _B()
{
  analogWrite(_R_PIN, 0);
  analogWrite(_G_PIN, 0);
  analogWrite(_B_PIN, 255);
}
void loop()
{
  // put your main code here, to run repeatedly:
  _R();
  delay(delays);
  _G();
  delay(delays);
  _B();
  delay(delays);
}
