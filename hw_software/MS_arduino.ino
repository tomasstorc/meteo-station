#include <dht.h>

#define DHTPIN 7
#define INTERVAL 10000

dht DHT;

unsigned long previousTime = 0;
unsigned long sampleTime = 0;
float sumTemp = 0.0;
float sumHum = 0.0;
float temp = 0.0;
float hum = 0.0;
int count = 0;

void setup() {
  
  Serial.begin(9600);

}

void loop() {
  unsigned long currentTime = millis();  

  if (currentTime - sampleTime >= 2000) {
    sampleTime = currentTime;

    int chk = DHT.read11(DHTPIN);

    temp = DHT.temperature;
    hum = DHT.humidity;

    if (!isnan(hum) && !isnan(temp)) {
      sumTemp = sumTemp + temp;
      sumHum = sumHum + hum;
      count = count + 1;
    } 
  }

  if ((currentTime - previousTime >= INTERVAL) && count != 0) {
    String call;
    previousTime = currentTime;
    float avgTemp = sumTemp / (float)count;
    float avgHum = sumHum / (float)count;

    call += "{";
    call += avgTemp;
    call += ";";
    call += avgHum;
    call += ";";
    call += count;
    call += "}";
    Serial.println(call);

    sumTemp = 0.0;
    sumHum = 0.0;
    count = 0; 
  }
}
