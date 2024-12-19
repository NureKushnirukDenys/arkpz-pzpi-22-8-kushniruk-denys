#include <WiFi.h>
#include <PubSubClient.h>
#include <LiquidCrystal_I2C.h>

// WiFi налаштування
 char* ssid = "Wokwi-GUEST";
 char* password = "";

// MQTT налаштування
 char* mqtt_server = "broker.emqx.io";
 int mqtt_port = 1883;
 char* mqtt_user = "";
 char* mqtt_password = "";
 char* mqtt_topic = "light/status";

WiFiClient espClient;
PubSubClient client(espClient);

LiquidCrystal_I2C lcd(0x27, 16, 2);

#define TRIG_PIN 18
#define ECHO_PIN 17
#define LED_PIN 4

float duration_us, distance_cm;
boolean light_status = false;
const char* iotDeviceId = "iot67890"; // Додано ID IoT пристрою

// Для математичних обчислень
const int NUM_SAMPLES = 10;
float distances[NUM_SAMPLES];
int current_sample = 0;
float average_distance = 0;
float min_distance = 10000.0;
float max_distance = 0;

void setup_wifi() {
  delay(10);
  lcd.setCursor(0, 0);
  lcd.print("Connecting to WiFi");
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  lcd.clear();
  lcd.print("WiFi Connected");
  delay(100);
  lcd.clear();
}

void reconnect() {
  while (!client.connected()) {
    lcd.setCursor(0, 0);
    lcd.print("Connecting MQTT");
    if (client.connect("ESP32Client", mqtt_user, mqtt_password)) {
      lcd.clear();
      lcd.print("MQTT Connected");
      delay(1000);
      lcd.clear();
    } else {
      delay(500);
    }
  }
}

void setup() {
  lcd.init();
  lcd.backlight();
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(9600);

  setup_wifi();
  client.setServer(mqtt_server, mqtt_port);

  // Ініціалізуємо масив відстаней
  for (int i = 0; i < NUM_SAMPLES; i++) {
    distances[i] = 0;
  }
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  // Генеруємо імпульс для ультразвукового датчика
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  // Вимірюємо час імпульсу
  duration_us = pulseIn(ECHO_PIN, HIGH);

  // Розраховуємо відстань
  distance_cm = 0.017 * duration_us;

  // Зберігаємо дані для обчислень
  distances[current_sample] = distance_cm;
  current_sample = (current_sample + 1) % NUM_SAMPLES;

  // Обчислення середнього, мінімального та максимального значення
  float sum = 0;
  min_distance = 10000.0;
  max_distance = 0;
  for (int i = 0; i < NUM_SAMPLES; i++) {
    sum += distances[i];
    if (distances[i] < min_distance) {
      min_distance = distances[i];
    }
    if (distances[i] > max_distance) {
      max_distance = distances[i];
    }
  }
  average_distance = sum / NUM_SAMPLES;

  // Оновлюємо LCD
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Avg: ");
  lcd.print(average_distance, 1);
  lcd.print(" cm");
  lcd.setCursor(0, 1);
  lcd.print("Min: ");
  lcd.print(min_distance, 1);
  lcd.print(" Max: ");
  lcd.print(max_distance, 1);

  // Контроль LED і формування повідомлення
  boolean new_light_status = average_distance < 200;
  if (new_light_status != light_status || millis() % 500 == 0) {
    light_status = new_light_status;
    digitalWrite(LED_PIN, light_status ? HIGH : LOW);

    // Формуємо JSON-повідомлення
    String message = "{\"status\":" + String(light_status ? "true" : "false") + 
                     ",\"distance\":" + String(average_distance, 2) + 
                     ",\"min\":" + String(min_distance, 2) +
                     ",\"max\":" + String(max_distance, 2) +
                     ",\"iotDeviceId\":\"" + iotDeviceId + "\"}"; // Додано поле iotDeviceId
    client.publish(mqtt_topic, message.c_str(), false);

    // Вивід у Serial Monitor
    Serial.println("MQTT Message: " + message);
  }

  delay(500); // Зменшення затримки для пришвидшення циклу
}
