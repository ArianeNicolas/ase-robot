#include <PinChangeInt.h>
#include <PinChangeIntConfig.h>
#include <EEPROM.h>
#define _NAMIKI_MOTOR
#include <fuzzy_table.h>
#include <PID_Beta6.h>
#include <MotorWheel.h>
#include <Omni4WD.h>

irqISR(irq1, isr1);
MotorWheel wheel1(3, 2, 4, 5, &irq1);

irqISR(irq2, isr2);
MotorWheel wheel2(11, 12, 14, 15, &irq2);

irqISR(irq3, isr3);
MotorWheel wheel3(9, 8, 16, 17, &irq3);

irqISR(irq4, isr4);
MotorWheel wheel4(10, 7, 18, 19, &irq4);

Omni4WD Omni(&wheel1, &wheel2, &wheel3, &wheel4);
int SPEED_ROBOT = Omni.getCarSpeedMMPS();

void setup(){
  TCCR1B = TCCR1B & 0xf8 | 0x01; // Pin9,Pin10 PWM 31250Hz
  TCCR2B = TCCR2B & 0xf8 | 0x01; // Pin3,Pin11 PWM 31250Hz

  Omni.PIDEnable(0.31, 0.01, 0, 10);
}

void forward_robot(int distance) {
  Omni.setCarAdvance(SPEED_ROBOT);
  Omni.delayMS(distance/SPEED_ROBOT);
  Omni.setCarStop();
}

void backward_robot(int distance) {
  Omni.setCarBackoff(SPEED_ROBOT);
  Omni.delayMS(distance/SPEED_ROBOT);
  Omni.setCarStop();
}

void leftside_robot(int distance) {
  Omni.setCarLeft(SPEED_ROBOT);
  Omni.delayMS(distance/SPEED_ROBOT);
  Omni.setCarStop();
}

void rightside_robot(int distance) {
  Omni.setCarRight(SPEED_ROBOT);
  Omni.delayMS(distance/SPEED_ROBOT);
  Omni.setCarStop();
}

void rotate_robot(int angle){
  Omni.setCarRotate(angle);
}

void set_speed_robot(int speed) {
  Omni.setCarSpeedMMPS(speed);
  SPEED_ROBOT = speed;
}

void get_time_robot() {
  return millis();
}

void loop(){
  entry();
}
void entry() {
set_speed_robot(100);
int count = 0;
while (count < 5) {
count = count + 1;
square();
};
}

void square() {
forward_robot(30 * 10);
rotate_robot(90);
forward_robot(90 * 10);
rotate_robot(90);
forward_robot(30 * 10);
rotate_robot(90);
forward_robot(90 * 10);
rotate_robot(90);
}

