import { Statement } from "../language/generated/ast.js";
import { Scene } from "../web/simulator/scene.js";
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
  ControlStructure,
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
  TurnLeft,
  TurnRight,
  setSpeed,
  Var,
  Parameter,
} from "../language/visitor.js";

export class Interpreter implements AseRobotVisitor {
  vars: Map<string, any>[] = [];
  program: Program = new Program("Program");
  scene: Scene;

  constructor(scene: Scene) {
    this.scene = scene;
    this.scene.robot.speed = 1;
  }
  visitParam(node: Parameter) {}

  visitMultExpression(node: MultExpression): number {
    let returnValue = node.singlevalue[0].accept(this);

    for (let i = 1; i < node.singlevalue.length; i++) {
      if (node.op[i - 1] === "*") {
        let mult = node.singlevalue[i].accept(this);
        returnValue = returnValue * mult;
      } else if (node.op[i - 1] === "/") {
        returnValue = returnValue / node.singlevalue[i].accept(this);
      }
    }

    return returnValue;
  }
  visitAddExpression(node: AddExpression): number {
    let returnValue = node.multexpression[0].accept(this);
    for (let i = 1; i < node.multexpression.length; i++) {
      if (node.op[i - 1] === "+") {
        let add = node.multexpression[i].accept(this);
        returnValue = returnValue + add;
      } else if (node.op[i - 1] === "-") {
        returnValue = returnValue - node.multexpression[i].accept(this);
      }
    }
    return returnValue;
  }

  visitElse(node: Else) {
    node.statement.forEach((statement) => statement.accept(this));
  }
  visitElseif(node: Elseif) {
    if (node.condition.accept(this)) {
      node.statement.forEach((statement) => statement.accept(this));
    }
  }
  visitFunc(node: Func): any {
    for (let statement of node.statement) {
      const isReturn = this.isReturn(statement);
      const isControlStructure = this.isControleStructure(statement);
      const result = statement.accept(this);

      if (isReturn || (isControlStructure && result != null)) {
        return result;
      }
    }
  }

  visitFunCall(node: FunCall): any {
    for (let f of this.program.Func) {
      if (f.name == node.callName) {
        let map = new Map<string, any>();
        for (let i = 0; i < node.parameters.length; i++) {
          let value = node.parameters[i].accept(this);
          map.set(f.parameter[i].name, value);
        }
        this.vars.push(map);
        let returnValue = f.accept(this);
        this.vars.pop();
        return returnValue;
      }
    }
  }
  visitAssignVar(node: AssignVar) {
    let accept = node.expression.accept(this);
    this.vars[this.vars.length - 1].set(node.var_to_assign.name, accept);
  }

  visitdeclaVar(node: declaVar) {
    this.vars[this.vars.length - 1].set(
      node.declaName,
      node.expression.accept(this),
    );
  }
  visitReturn(node: Return): any {
    let accept = node.return.accept(this);
    return accept;
  }
  visitAnd(node: And): boolean {
    let returnValue = node.condition[0].accept(this);
    for (let i = 1; i < node.condition.length; i++) {
      returnValue = returnValue && node.condition[i].accept(this);
    }
    return returnValue;
  }
  visitOr(node: Or): boolean {
    let returnValue = node.condition[0].accept(this);
    for (let i = 1; i < node.condition.length; i++) {
      returnValue = returnValue || node.condition[i].accept(this);
    }
    return returnValue;
  }
  visitEqualBool(node: EqualBool): boolean {
    return (
      node.singlevaluebool[0].accept(this) ===
      node.singlevaluebool[1].accept(this)
    );
  }
  visitNotEqualBool(node: NotEqualBool): boolean {
    return (
      node.singlevaluebool[0].accept(this) !==
      node.singlevaluebool[1].accept(this)
    );
  }
  visitgetDistance(node: getDistance) {
    let intersection = this.scene.robot.getRay().intersect(this.scene.entities);
    const wideSide = Math.max(this.scene.size.x, this.scene.size.y);
    let factor = 1000 / wideSide;
    let dist =
      (Math.pow(intersection!.x - this.scene.robot.pos.x, 2) +
        Math.pow(intersection!.y - this.scene.robot.pos.y, 2)) *
      factor;
    console.log("getDistance :", dist);
    return Math.sqrt(dist);
  }
  visitgetTimestamp(node: getTimestamp) {
    let time = this.scene.timestamps[this.scene.timestamps.length - 1].time;
    console.log("time : ", time);
    return time;
  }
  visitsetSpeed(node: setSpeed) {
    let speed = node.speed.accept(this);
    if (node.unit.accept(this) === "cm") {
      speed = speed / 10;
    } else {
      speed = speed / 100;
    }
    if (speed > 1.5) {
      throw new Error("Speed must be less than 150 mm/s");
    } else {
      this.scene.robot.speed = speed;
    }
  }
  visitIf(node: If): any {
    if (node.condition.accept(this)) {
      node.statement.forEach((statement) => {
        let isReturn = this.isReturn(statement);
        if (isReturn) {
          let returnValue = statement.accept(this);
          this.vars.pop();
          return returnValue;
        } else {
          statement.accept(this);
        }
      });
    }
    return null;
  }
  visitLoop(node: Loop): any {
    while (node.condition.accept(this)) {
      node.statement.forEach((statement) => {
        let isReturn = this.isReturn(statement);
        if (isReturn) {
          let returnValue = statement.accept(this);
          this.vars.pop();
          return returnValue;
        } else {
          statement.accept(this);
        }
      });
    }
    return null;
  }
  visitTurnLeft(node: TurnLeft) {
    this.scene.robot.turn(-node.angle.accept(this));
  }

  visitTurnRight(node: TurnRight) {
    this.scene.robot.turn(node.angle.accept(this));
  }

  visitEqualInt(node: EqualInt): boolean {
    return (
      node.arithmeticexpression[0].accept(this) ===
      node.arithmeticexpression[1].accept(this)
    );
  }
  visitNotEqualInt(node: NotEqualInt): boolean {
    return (
      node.arithmeticexpression[0].accept(this) !==
      node.arithmeticexpression[1].accept(this)
    );
  }
  visitGreater(node: Greater): boolean {
    return (
      node.arithmeticexpression[0].accept(this) >
      node.arithmeticexpression[1].accept(this)
    );
  }
  visitLower(node: Lower): boolean {
    return (
      node.arithmeticexpression[0].accept(this) <
      node.arithmeticexpression[1].accept(this)
    );
  }
  visitConstBool(node: ConstBool): boolean {
    return node.BoolValue;
  }
  visitVar(node: Var): any {
    return this.vars[this.vars.length - 1].get(node.name);
  }
  visitConstInt(node: ConstInt): number {
    return node.integerValue;
  }
  visitBack(node: Back) {
    let dist = 0;
    if (node.unit1.accept(this) === "cm") {
      dist = -node.expression.accept(this) * 10;
    } else {
      dist = -node.expression.accept(this);
    }
    if (dist > 5000) {
      throw new Error("Distance to parkour must be less than 5000 mm");
    } else if (dist > 0) {
      this.scene.robot.move(dist);
    }
  }
  visitFront(node: Front) {
    let dist = 0;
    if (node.unit1.accept(this) === "cm") {
      dist = node.expression.accept(this) * 10;
    } else {
      dist = node.expression.accept(this);
    }
    if (dist > 3000) {
      throw new Error("Distance to parkour must be less than 3000 mm");
    } else if (dist > 0) {
      this.scene.robot.move(dist);
    }
  }
  visitLeftSide(node: LeftSide) {
    let dist = 0;
    if (node.unit1.accept(this) === "cm") {
      dist = -node.expression.accept(this) * 10;
    } else {
      dist = -node.expression.accept(this);
    }
    if (dist > 3000) {
      throw new Error("Distance to parkour must be less than 3000 mm");
    } else if (dist > 0) {
      this.scene.robot.side(dist);
    }
  }
  visitRightSide(node: RightSide) {
    let dist = 0;
    if (node.unit1.accept(this) === "cm") {
      dist = node.expression.accept(this) * 10;
    } else {
      dist = node.expression.accept(this);
    }
    if (dist > 3000) {
      throw new Error("Distance to parkour must be less than 3000 mm");
    } else if (dist > 0) {
      this.scene.robot.side(dist);
    }
  }

  visitCm(node: cm): string {
    return "cm";
  }

  visitMm(node: mm): string {
    return "mm";
  }

  visitProgram(node: Program) {
    this.program = node;
    node.Func.forEach((func) => {
      if (func.name == "entry") {
        this.vars.push(new Map<string, any>());
        func.accept(this);
        this.vars.pop();
      }
    });
  }

  isReturn(object: Statement): object is Return {
    return "return" in object;
  }

  isControleStructure(object: Statement): object is ControlStructure {
    return "condition" in object && "statement" in object;
  }
}
