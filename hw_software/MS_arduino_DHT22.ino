#include <DHT.h>

#define DHTPIN 2
#define DHTTYPE DHT22   

DHT dht(DHTPIN, DHTTYPE); 

float hum;
float temp;  
                                
void setup()
{
  Serial.begin(9600);                       
  dht.begin();                                
}

void loop()
{
  hum = dht.readHumidity();  
  temp = dht.readTemperature();             

  Serial.print("Vlhkost: ");                
  Serial.print(hum);
  Serial.print(" %, Teplota: ");
  Serial.print(temp);
  Serial.println(" Celsius");

  delay(5000);                              
}