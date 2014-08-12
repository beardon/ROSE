// Forward declarations.
int isRestroomFree(String command);
bool isDoorClosed();
bool isLightOn();

// Input pins.
int lightPin = D4;
int doorPin =  D0;

void setup() {
    // Initialize the pins.
    pinMode(lightPin, INPUT_PULLDOWN);
    pinMode(doorPin,  INPUT_PULLDOWN);
    
    // Register the function. This can be called externally.
    Spark.function("checkRestrm", isRestroomFree);
}

void loop() {
    // empty
}

// The bathroom is open if and only if
// the door is open AND the light is off.
int isRestroomFree(String command) {
    return !(isDoorClosed() || isLightOn());
}

bool isDoorClosed() {
    return false; //digitalRead(doorPin);
}

bool isLightOn() {
    return digitalRead(lightPin);
}
