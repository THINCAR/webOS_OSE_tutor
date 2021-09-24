// HTTP server
//#include <DNSServer.h>
#include <ESP8266WiFi.h>
#include <WiFiClient.h> 
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>
#include <EEPROM.h>

// HTTP client
#include <ESP8266WiFiMulti.h>
#include <ESP8266HTTPClient.h>

ESP8266WiFiMulti WiFiMulti;

const char *softAP_ssid = "i2r_ap_";
const char *softAP_password = "00000000";
String sAP_ssid;
char cAP_ssid[20];
int setAP=1;// 1 이면 ap 설정중 으로 메인 페이지에 주소 표시

const char *myHostname = "http://i2r.local";

char ssid[32] = "";
char password[32] = "";

// DNS server
//const byte DNS_PORT = 53;
//DNSServer dnsServer;

// Web server
ESP8266WebServer server(80);

IPAddress apIP(192, 168, 3, 1);
IPAddress netMsk(255, 255, 255, 0);

boolean connect;

unsigned long lastConnectTry = 0;

unsigned int status = WL_IDLE_STATUS;

void setup() {
  delay(1000);
  Serial.begin(9600);
  Serial.println();
  Serial.print("Configuring access point...");
  String ss;
  sAP_ssid=String(softAP_ssid)+String(ESP.getChipId(),HEX);
  sAP_ssid.toCharArray(cAP_ssid,sAP_ssid.length());
  softAP_ssid=&cAP_ssid[0];
  Serial.println(softAP_ssid);
  WiFi.softAPConfig(apIP, apIP, netMsk);
  WiFi.softAP(softAP_ssid, softAP_password);
  delay(500); // Without delay I've seen the IP address blank
  Serial.print("AP IP address: ");
  Serial.println(WiFi.softAPIP());
  WiFiMulti.addAP("mil304", "0632702463");

  pinMode(16,OUTPUT);
  pinMode(14,OUTPUT);
  pinMode(12,OUTPUT);
  pinMode(13,OUTPUT);
  pinMode(15,OUTPUT);
  pinMode(3,OUTPUT);
  pinMode(5,OUTPUT);
  pinMode(4,OUTPUT);
  pinMode(0,OUTPUT);
  pinMode(2,OUTPUT);

//  dnsServer.setErrorReplyCode(DNSReplyCode::NoError);
//  dnsServer.start(DNS_PORT, "*", apIP);

  server.on("/", handleRoot);
  server.on("/wifi", handleWifi);
  server.on("/wifisave", handleWifiSave);
  server.on("/generate_204", handleRoot);  //Android captive portal. Maybe not needed. Might be handled by notFound handler.
  server.on("/fwlink", handleRoot);  //Microsoft captive portal. Maybe not needed. Might be handled by notFound handler.
  server.on("/waterone",waterone);
  server.on("/watertwo",watertwo);
  server.on("/waterthree",waterthree);
  server.on("/waterfour",waterfour);
  server.on("/waterfive",waterfive);
  server.on("/watera",watera);
  server.on("/waterb",waterb);
  server.on("/waterc",waterc);
  server.on("/waterd",waterd);
  server.on("/watere",watere);
  server.on("/turnoff",turnoff);
  server.onNotFound ( handleNotFound );
  server.begin(); // Web server start
  Serial.println("HTTP server started");
  loadCredentials(); // Load WLAN credentials from network
  connect = strlen(ssid) > 0; // Request WLAN connect if there is a SSID
}

void connectWifi() {
  Serial.println("Connecting as wifi client...");
  WiFi.disconnect();
  WiFi.begin ( ssid, password );
  int connRes = WiFi.waitForConnectResult();
  Serial.print ( "connRes: " );
  Serial.println ( connRes );
}

void loop() {
  if (connect) {
    Serial.println ( "Connect requested" );
    connect = false;
    connectWifi();
    lastConnectTry = millis();
  }
  {
    unsigned int s = WiFi.status();
    if (s == 0 && millis() > (lastConnectTry + 60000) ) {
      /* If WLAN disconnected and idle try to connect */
      /* Don't set retry time too low as retry interfere the softAP operation */
      connect = true;
    }
    if (status != s) { // WLAN status change
      Serial.print ( "Status: " );
      Serial.println ( s );
      status = s;
      if (s == WL_CONNECTED) {
        /* Just connected to WLAN */
        Serial.println ( "" );
        Serial.print ( "Connected to " );
        Serial.println ( ssid );
        Serial.print ( "IP address: " );
        Serial.println ( WiFi.localIP() );

        // Setup MDNS responder
        if (!MDNS.begin(myHostname)) {
          Serial.println("Error setting up MDNS responder!");
        } else {
          Serial.println("mDNS responder started");
          // Add service to MDNS-SD
          MDNS.addService("http", "tcp", 80);
        }
      } else if (s == WL_NO_SSID_AVAIL) {
        WiFi.disconnect();
      }
    }
  }
  // Do work:
  //DNS
//  dnsServer.processNextRequest();
  //HTTP
  server.handleClient();
}

void loadCredentials() {
  EEPROM.begin(512);
  EEPROM.get(0, ssid);
  EEPROM.get(0+sizeof(ssid), password);
  char ok[2+1];
  EEPROM.get(0+sizeof(ssid)+sizeof(password), ok);
  EEPROM.end();
  if (String(ok) != String("OK")) {
    ssid[0] = 0;
    password[0] = 0;
  }
  Serial.println("Recovered credentials:");
  Serial.println(ssid);
  Serial.println(strlen(password)>0?"********":"<no password>");
}

/** Store WLAN credentials to EEPROM */
void saveCredentials() {
  EEPROM.begin(512);
  EEPROM.put(0, ssid);
  EEPROM.put(0+sizeof(ssid), password);
  char ok[2+1] = "OK";
  EEPROM.put(0+sizeof(ssid)+sizeof(password), ok);
  EEPROM.commit();
  EEPROM.end();
}

void handleRoot() {
  Serial.println("Server Html");
  Serial.println ( WiFi.localIP() );
  String s; 
  String s1= String(ssid);
  s="<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\", http-equiv=\"Content-Type\" content=\"text/html;charset=utf-8\"/>";
  s=s+"ioT기능을 구현 할 수 있는 서버입니다..<br>";
  if(setAP==1) {
    s=s+"아래 공유기 이름과 주소가 연결되었으면 주소를 선택한 후에 설정에서 사용 하시는 기능을 선택하세요. <br>";
    s=s+"Connected IP : "+String(ssid)+"  "+"<p><a href='http://"+WiFi.localIP().toString()+"'/>"+WiFi.localIP().toString()+"</a></p>";
  }
  s=s+"<p><a href='/wifi'>공유기를 바꾸려면 누르세요.</a></p>";
  setAP=0;
  server.send(200, "text/html", s); // Empty content inhibits Content-length header so we have to close the socket ourselves.
}

void handleWifi() {
  String s; 
  String s1= String(ssid);
  s="<meta name=\"viewport\" content=\"width=device-width, user-scalable=no\", meta http-equiv=\"Content-Type\" content=\"text/html;charset=utf-8\"/>";
  s=s+"<h1>Wifi 사양</h1>";
  if (server.client().localIP() == apIP) {
    Serial.println(String(softAP_ssid));
    s=s+String("<p>연결된 AP: ") + sAP_ssid + "</p>";
  } else {
    s=s+"<p>연결된 와이파이 " + String(ssid) + "</p>";
  }
  s=s+"<table><tr><th align='left'>SoftAP 사양</th></tr>";
  s=s+"<tr><td>SSID " + String(softAP_ssid) + "</td></tr>";
  s=s+"<tr><td>IP   " + toStringIp(WiFi.softAPIP()) + "</td></tr>"+"</table>";
  s=s+"<br /><table><tr><th align='left'>WLAN 사양</th></tr>";
  s=s+"<tr><td>SSID " + String(ssid) + "</td></tr>";
  s=s+"<tr><td>IP   " + toStringIp(WiFi.localIP()) + "</td></tr>"+"</table>";
  
  s=s+"<br /><table><tr><th align='left'>검색된 와이파이 </th></tr>";
  Serial.println("scan start");
  int n = WiFi.scanNetworks();
  Serial.println("scan done");
  if (n > 0) {
    for (int i = 0; i < n; i++) {
      s=s+"\r\n<tr><td>SSID " + WiFi.SSID(i) + String((WiFi.encryptionType(i) == ENC_TYPE_NONE)?" ":" *") + " (" + WiFi.RSSI(i) + ")</td></tr>";
    }
  } else {
    s=s+"<tr><td>No WLAN found</td></tr>";
  }
  s=s+"</table>";
  s=s+"<p><a href='/wifi'>와이파이가 없으면 다시 검색하세요.</a></p>";
  
  s=s+"<form method='POST' action='wifisave'><h4>연결하려는 와이파이 입력</h4>"
    +"<input type='text' placeholder='와이파이 이름' name='n'/>"
    +"<br /><input type='password' placeholder='비밀번호' name='p'/>"
    +"<br /><input type='submit' value='      저    장      '/></form>"
    +"<p><a href='/'>메인 홈페이지로 가기</a>.</p>";
  server.send(200, "text/html", s);
  setAP=1;
}

/** Handle the WLAN save form and redirect to WLAN config page again */
void handleWifiSave() {
  Serial.println("wifi save");
  server.arg("n").toCharArray(ssid, sizeof(ssid) - 1);
  server.arg("p").toCharArray(password, sizeof(password) - 1);
  server.sendHeader("Location", "wifi", true);
  server.sendHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  server.sendHeader("Pragma", "no-cache");
  server.sendHeader("Expires", "-1");
  server.send ( 302, "text/plain", "");  // Empty content inhibits Content-length header so we have to close the socket ourselves.
  server.client().stop(); // Stop is needed because we sent no content length
  saveCredentials();
  connect = strlen(ssid) > 0; // Request WLAN connect with new credentials if there is a SSID
}

/** Redirect to captive portal if we got a request for another domain. Return true in that case so the page handler do not try to handle the request again. */
boolean captivePortal() {
  if (!isIp(server.hostHeader()) && server.hostHeader() != (String(myHostname)+".local")) {
    Serial.print("Request redirected to captive portal");
    server.sendHeader("Location", String("http://") + toStringIp(server.client().localIP()), true);
    server.send ( 302, "text/plain", ""); // Empty content inhibits Content-length header so we have to close the socket ourselves.
    server.client().stop(); // Stop is needed because we sent no content length
    return true;
  }
  return false;
}

void handleNotFound() {
  if (captivePortal()) { // If caprive portal redirect instead of displaying the error page.
    return;
  }
  String message = "File Not Found\n\n";
  message += "URI: ";
  message += server.uri();
  message += "\nMethod: ";
  message += ( server.method() == HTTP_GET ) ? "GET" : "POST";
  message += "\nArguments: ";
  message += server.args();
  message += "\n";

  for ( uint8_t i = 0; i < server.args(); i++ ) {
    message += " " + server.argName ( i ) + ": " + server.arg ( i ) + "\n";
  }
  server.sendHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  server.sendHeader("Pragma", "no-cache");
  server.sendHeader("Expires", "-1");
  server.send ( 404, "text/plain", message );
}

boolean isIp(String str) {
  for (size_t i = 0; i < str.length(); i++) {
    int c = str.charAt(i);
    if (c != '.' && (c < '0' || c > '9')) {
      return false;
    }
  }
  return true;
}

/** IP to String? */
String toStringIp(IPAddress ip) {
  String res = "";
  for (int i = 0; i < 3; i++) {
    res += String((ip >> (8 * i)) & 0xFF) + ".";
  }
  res += String(((ip >> 8 * 3)) & 0xFF);
  return res;
}

void waterone() {
  digitalWrite(16,HIGH);
  digitalWrite(14,LOW);
  digitalWrite(12,LOW);
  digitalWrite(13,LOW);
  digitalWrite(15,LOW);
  httpcall();
  server.send ( 302, "text/plain", "");  // Empty content inhibits Content-length header so we have to close the socket ourselves.
}

void watertwo() {
  digitalWrite(16,HIGH);
  digitalWrite(14,HIGH);
  digitalWrite(12,LOW);
  digitalWrite(13,LOW);
  digitalWrite(15,LOW);
  httpcall();
  server.send ( 302, "text/plain", "");  // Empty content inhibits Content-length header so we have to close the socket ourselves.
}

void waterthree(){
  digitalWrite(16,HIGH);
  digitalWrite(14,HIGH);
  digitalWrite(13,HIGH);
  digitalWrite(12,LOW);
  digitalWrite(15,LOW);
  server.send ( 302, "text/plain", "");
}

void waterfour(){
  digitalWrite(16,HIGH);
  digitalWrite(14,HIGH);
  digitalWrite(12,HIGH);
  digitalWrite(13,HIGH);
  digitalWrite(15,LOW);
  server.send ( 302, "text/plain", "");
}

void waterfive(){
  digitalWrite(16,HIGH);
  digitalWrite(14,HIGH);
  digitalWrite(12,HIGH);
  digitalWrite(13,HIGH);
  digitalWrite(15,HIGH);
  server.send ( 302, "text/plain", "");
}

void watera(){
  digitalWrite(2,HIGH);
  digitalWrite(5,LOW);
  digitalWrite(4,LOW);
  digitalWrite(0,LOW);
  digitalWrite(3,LOW);
  server.send ( 302, "text/plain", "");
}

void waterb(){
  digitalWrite(2,HIGH);
  digitalWrite(4,HIGH);
  digitalWrite(3,LOW);
  digitalWrite(0,LOW);
  digitalWrite(5,LOW);
  server.send ( 302, "text/plain", "");
}

void waterc(){
  digitalWrite(2,HIGH);
  digitalWrite(4,HIGH);
  digitalWrite(0,HIGH);
  digitalWrite(3,LOW);
  digitalWrite(5,LOW);
  server.send ( 302, "text/plain", "");
}

void waterd(){
  digitalWrite(3,HIGH);
  digitalWrite(2,HIGH);
  digitalWrite(4,HIGH);
  digitalWrite(0,HIGH);
  digitalWrite(5,LOW);
  server.send ( 302, "text/plain", "");
}

void watere(){
  digitalWrite(3,HIGH);
  digitalWrite(5,HIGH);
  digitalWrite(4,HIGH);
  digitalWrite(0,HIGH);
  digitalWrite(2,HIGH);
  server.send ( 302, "text/plain", "");
}
void turnoff(){
  digitalWrite(14,LOW);
  digitalWrite(12,LOW);
  digitalWrite(13,LOW);
  digitalWrite(16,LOW);
  digitalWrite(15,LOW);
  digitalWrite(3,LOW);
  digitalWrite(5,LOW);
  digitalWrite(4,LOW);
  digitalWrite(0,LOW);
  digitalWrite(2,LOW);
  server.send ( 302, "text/plain", "");
}



void httpcall(){
  if((WiFiMulti.run() == WL_CONNECTED)) {
        HTTPClient http;
        http.begin("http://192.168.0.69:5555/hi");
        int httpCode = http.GET();
        http.end();
      }
}
