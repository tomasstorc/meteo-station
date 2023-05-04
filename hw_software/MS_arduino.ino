#include <dht.h>

#define DHTPIN 7
#define INTERVAL 5000

dht DHT;

unsigned long previousTime = 0;
unsigned long sampleTime = 0;
float temp = 0.0;
float hum = 0.0;


void setup() {
  
  Serial.begin(9600);

}

void loop() {
  unsigned long currentTime = millis();  

  if (currentTime - sampleTime >= INTERVAL) {
    sampleTime = currentTime;

    int chk = DHT.read11(DHTPIN);

    temp = DHT.temperature;
    hum = DHT.humidity;

    if (!isnan(hum) && !isnan(temp)) {
      call += "{";
      call += temp;
      call += ";";
      call += hum;
      call += ";";
      Serial.println(call);
      } 
    }
  }
}
