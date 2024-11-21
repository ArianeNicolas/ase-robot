import {
  AddExpression,
  And,
  AseRobotVisitor,
  AssignVar,
  Back,
  ConstBool,
  cm,
  mm,
  ConstInt,
  declaVar,
  Else,
  Elseif,
  EqualBool,
  EqualInt,
  Front,
  Func,
  FunCall,
  getDistance,
  getTimestamp,
  Greater,
  If,
  LeftSide,
  Loop,
  Lower,
  MultExpression,
  NotEqualBool,
  NotEqualInt,
  Or,
  Program,
  Return,
  RightSide,
  Rotation,
  setSpeed,
  Var,
  Parameter,
} from "../language/visitor.js";

export class Compiler implements AseRobotVisitor {
  program: string = `#include <PinChangeInt.h>
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
`;

  visitMultExpression(node: MultExpression): String {
    let returnValue = node.singlevalue[0].accept(this);
    for (let i = 1; i < node.singlevalue.length; i++) {
      if (node.op[i - 1] === "*") {
        returnValue = returnValue + " * ";
      } else if (node.op[i - 1] === "/") {
        returnValue = returnValue + " / ";
      }
      if (node.singlevalue[i].$type.toString() == "AddExpression") {
        returnValue += "(" + node.singlevalue[i].accept(this) + ")";
      } else returnValue += node.singlevalue[i].accept(this);
    }
    return returnValue;
  }
  visitAddExpression(node: AddExpression): String {
    let returnValue = node.multexpression[0].accept(this);
    for (let i = 1; i < node.multexpression.length; i++) {
      if (node.op[i - 1] === "+") {
        let add = node.multexpression[i].accept(this);
        returnValue = returnValue + " + " + add;
      } else if (node.op[i - 1] === "-") {
        returnValue = returnValue + " - " + node.multexpression[i].accept(this);
      }
    }
    return returnValue;
  }

  visitElse(node: Else): String {
    let returnString = "else {\n";
    node.statement.forEach(
      (statement) => (returnString += statement.accept(this) + ";\n"),
    );
    returnString += "}";
    return returnString;
  }

  visitElseif(node: Elseif): String {
    let returnString = "else if(" + node.condition.accept(this) + "){\n";
    node.statement.forEach(
      (statement) => (returnString += statement.accept(this) + ";\n"),
    );
    returnString += "}";
    return returnString;
  }

  visitFunc(node: Func): String {
    let returnString = "";
    if (node.type.$type.toString() == "Void") {
      returnString += "void ";
    } else if (node.type.$type.toString() == "Nbr") {
      returnString += "int ";
    } else {
      returnString += "bool ";
    }
    returnString += node.name + "(";

    if (node.parameter.length > 0) {
      returnString += node.parameter[0].accept(this);
      for (let i = 1; i < node.parameter.length; i++) {
        returnString += ", " + node.parameter[i].accept(this);
      }
    }

    returnString += ") {\n";

    node.statement.forEach((statement) => {
      returnString += statement.accept(this) + ";\n";
    });
    returnString += "}\n\n";
    return returnString;
  }

  visitParam(node: Parameter): String {
    let returnString = "";
    if (node.type.$type.toString() == "Void") {
      returnString += "void ";
    } else if (node.type.$type.toString() == "Nbr") {
      returnString += "int ";
    } else {
      returnString += "bool ";
    }
    returnString += node.name;
    return returnString;
  }
  visitFunCall(node: FunCall): String {
    let returnString = node.callName + "(";
    if (node.parameters.length > 0) {
      returnString += node.parameters[0].accept(this);
      for (let i = 1; i < node.parameters.length; i++) {
        returnString += ", " + node.parameters[0].accept(this);
      }
    }
    returnString += ")";
    return returnString;
  }

  visitAssignVar(node: AssignVar): String {
    return node.var_to_assign.name + " = " + node.expression.accept(this);
  }

  visitdeclaVar(node: declaVar): String {
    let returnString = "";
    if (node.type.$type.toString() == "Void") {
      returnString += "void ";
    } else if (node.type.$type.toString() == "Nbr") {
      returnString += "int ";
    } else {
      returnString += "bool ";
    }
    returnString += node.declaName + " = " + node.expression.accept(this);
    return returnString;
  }

  visitReturn(node: Return): String {
    return "return " + node.return.accept(this);
  }

  visitAnd(node: And): String {
    let returnValue = node.condition[0].accept(this);
    for (let i = 1; i < node.condition.length; i++) {
      returnValue = returnValue + " && ";
      if (node.condition[i].$type.toString() == "Or") {
        returnValue += "(" + node.condition[i].accept(this) + ")";
      } else {
        returnValue += node.condition[i].accept(this);
      }
    }
    return returnValue;
  }
  visitOr(node: Or): String {
    let returnValue = node.condition[0].accept(this);
    for (let i = 1; i < node.condition.length; i++) {
      returnValue = returnValue + " || " + node.condition[i].accept(this);
    }
    return returnValue;
  }
  visitEqualBool(node: EqualBool): String {
    return (
      node.singlevaluebool[0].accept(this) +
      " == " +
      node.singlevaluebool[1].accept(this)
    );
  }
  visitNotEqualBool(node: NotEqualBool): String {
    return (
      node.singlevaluebool[0].accept(this) +
      " != " +
      node.singlevaluebool[1].accept(this)
    );
  }
  visitgetDistance(node: getDistance): String {
    throw new Error("Method not implemented");
  }
  visitgetTimestamp(node: getTimestamp): String {
    return "get_time_robot()";
  }
  visitsetSpeed(node: setSpeed): String {
    let newSpeed = node.speed.accept(this);
    if (node.unit.$type.toString() == "cm") {
      newSpeed = newSpeed += " * 10";
    }
    return "set_speed_robot(" + newSpeed + ")";
  }
  visitIf(node: If): any {
    let returnString = "if (" + node.condition.accept(this) + ") {\n";
    node.statement.forEach(
      (statement) => (returnString += statement.accept(this) + ";\n"),
    );
    returnString += "}";
    return returnString;
  }

  visitLoop(node: Loop): String {
    let returnString = "while (" + node.condition.accept(this) + ") {\n";
    node.statement.forEach(
      (statement) => (returnString += statement.accept(this) + ";\n"),
    );
    returnString += "}";
    return returnString;
  }

  visitRotation(node: Rotation): String {
    return "rotate_robot(" + node.angle.accept(this) + ")";
  }
  visitEqualInt(node: EqualInt): String {
    return (
      node.arithmeticexpression[0].accept(this) +
      " == " +
      node.arithmeticexpression[1].accept(this)
    );
  }
  visitNotEqualInt(node: NotEqualInt): String {
    return (
      node.arithmeticexpression[0].accept(this) +
      " != " +
      node.arithmeticexpression[1].accept(this)
    );
  }

  visitGreater(node: Greater): String {
    return (
      node.arithmeticexpression[0].accept(this) +
      " > " +
      node.arithmeticexpression[1].accept(this)
    );
  }
  visitLower(node: Lower): String {
    return (
      node.arithmeticexpression[0].accept(this) +
      " < " +
      node.arithmeticexpression[1].accept(this)
    );
  }
  visitConstBool(node: ConstBool): String {
    return node.BoolValue.toString();
  }

  visitVar(node: Var): String {
    return node.name;
  }

  visitConstInt(node: ConstInt): String {
    return node.integerValue.toString();
  }

  visitBack(node: Back) {
    let dist = node.expression.accept(this);
    if (node.unit1.$type.toString() == "cm") {
      dist = dist += " * 10";
    }
    return "backward_robot(" + dist + ")";
  }
  visitFront(node: Front) {
    let dist = node.expression.accept(this);
    if (node.unit1.$type.toString() == "cm") {
      dist = dist += " * 10";
    }
    return "forward_robot(" + dist + ")";
  }
  visitLeftSide(node: LeftSide) {
    let dist = node.expression.accept(this);
    if (node.unit1.$type.toString() == "cm") {
      dist = dist += " * 10";
    }
    return "leftside_robot(" + dist + ")";
  }
  visitRightSide(node: RightSide) {
    let dist = node.expression.accept(this);
    if (node.unit1.$type.toString() == "cm") {
      dist = dist += " * 10";
    }
    return "rightside_robot(" + dist + ")";
  }

  visitCm(node: cm): void {}

  visitMm(node: mm): void {}

  visitProgram(node: Program): String {
    let returnString = this.program;
    node.Func.forEach((func) => {
      returnString += func.accept(this);
    });
    return returnString;
  }
}
