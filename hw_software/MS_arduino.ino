#include <dht.h>
#define dht_apin A0

dht DHT;

void setup() {
  
  Serial.begin(9600);
  // delay(500);
  // Serial.println("Meteostanice - data");
  // delay(1000);

}

void loop() {
  
  DHT.read11(dht_apin);

  Serial.print("humidity:");
  Serial.print(DHT.humidity);
  Serial.print(", ");
  Serial.print("temperature:");
  Serial.println(DHT.temperature);

  delay(5000);

}
