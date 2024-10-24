import type { ValidationChecks } from "langium";
import type { AseRobotAstType } from "./generated/ast.js";
import * as InterfaceAST from "./generated/ast.js";
import * as ClassAST from "./visitor.js";
import { AseRobotVisitor } from "./visitor.js";
import type { AseRobotServices } from "./ase-robot-module.js";

/**
 * Register custom validation checks.
 * TODO : Call this function in the language module.ts file (see registerValidationChecks(...);)
 */
export function weaveAcceptMethods(services: AseRobotServices) {
  console.log("weave Accept Methods");
  const registry = services.validation.ValidationRegistry;
  const weaver = services.validation.AseRobotAcceptWeaver;
  registry.register(weaver.checks, weaver);
}

export class AseRobotAcceptWeaver {
  checks: ValidationChecks<AseRobotAstType> = {
    Else: this.weaveElse,
    Elseif: this.weaveElseif,
    Func: this.weaveFunc,
    Program: this.weaveProgram,
    FunCall: this.weaveFunCall,
    AssignVar: this.weaveAssignVar,
    declaVar: this.weavedeclaVar,
    Return: this.weaveReturn,
    And: this.weaveAnd,
    Or: this.weaveOr,
    EqualBool: this.weaveEqualBool,
    NotEqualBool: this.weaveNotEqualBool,
    getDistance: this.weavegetDistance,
    getTimestamp: this.weavegetTimestamp,
    setSpeed: this.weavesetSpeed,
    If: this.weaveIf,
    Loop: this.weaveLoop,
    Rotation: this.weaveRotation,
    EqualInt: this.weaveEqualInt,
    NotEqualInt: this.weaveNotEqualInt,
    Greater: this.weaveGreater,
    Lower: this.weaveLower,
    ConstBool: this.weaveConstBool,
    Var: this.weaveVar,
    ConstInt: this.weaveConstInt,
    Back: this.weaveBack,
    Front: this.weaveFront,
    LeftSide: this.weaveLeftSide,
    RightSide: this.weaveRightSide,
    AddExpression: this.weaveAddExpression,
    MultExpression: this.weaveMultExpression,
    mm: this.weaveMm,
    cm: this.weaveCm,
  };

  weaveMm(node: InterfaceAST.mm): void {
    (<any>node).accept = (AseRobotVisitor: AseRobotVisitor) => {
      return AseRobotVisitor.visitMm(node as unknown as ClassAST.mm);
    };
  }

  weaveCm(node: InterfaceAST.cm): void {
    (<any>node).accept = (AseRobotVisitor: AseRobotVisitor) => {
      return AseRobotVisitor.visitCm(node as unknown as ClassAST.cm);
    };
  }

  weaveElse(node: InterfaceAST.Else): void {
    (<any>node).accept = (AseRobotVisitor: AseRobotVisitor) => {
      return AseRobotVisitor.visitElse(node as unknown as ClassAST.Else);
    };
  }

  weaveElseif(node: InterfaceAST.Elseif): void {
    (<any>node).accept = (AseRobotVisitor: AseRobotVisitor) => {
      return AseRobotVisitor.visitElseif(node as unknown as ClassAST.Elseif);
    };
  }

  weaveAddExpression(node: InterfaceAST.AddExpression): void {
    (<any>node).accept = (AseRobotVisitor: AseRobotVisitor) => {
      return AseRobotVisitor.visitAddExpression(
        node as unknown as ClassAST.AddExpression,
      );
    };
  }

  weaveOr(node: InterfaceAST.Or): void {
    (<any>node).accept = (AseRobotVisitor: AseRobotVisitor) => {
      return AseRobotVisitor.visitOr(node as unknown as ClassAST.Or);
    };
  }

  weaveMultExpression(node: InterfaceAST.MultExpression): void {
    (<any>node).accept = (AseRobotVisitor: AseRobotVisitor) => {
      return AseRobotVisitor.visitMultExpression(
        node as unknown as ClassAST.MultExpression,
      );
    };
  }

  weaveFunc(node: InterfaceAST.Func): void {
    console.log("weaveFunction");
    (<any>node).accept = (AseRobotVisitor: AseRobotVisitor) => {
      return AseRobotVisitor.visitFunc(node as unknown as ClassAST.Func);
    };
  }

  weaveProgram(node: InterfaceAST.Program): void {
    console.log("weaveProgram");
    (<any>node).accept = (AseRobotVisitor: AseRobotVisitor) => {
      return AseRobotVisitor.visitProgram(node as unknown as ClassAST.Program);
    };
    console.log("accept interface Program !");
  }

  weaveFunCall(node: InterfaceAST.FunCall): void {
    (<any>node).accept = (AseRobotVisitor: AseRobotVisitor) => {
      return AseRobotVisitor.visitFunCall(node as unknown as ClassAST.FunCall);
    };
  }

  weaveAssignVar(node: InterfaceAST.AssignVar): void {
    (<any>node).accept = (AseRobotVisitor: AseRobotVisitor) => {
      return AseRobotVisitor.visitAssignVar(
        node as unknown as ClassAST.AssignVar,
      );
    };
  }

  weavedeclaVar(node: InterfaceAST.declaVar): void {
    (<any>node).accept = (AseRobotVisitor: AseRobotVisitor) => {
      return AseRobotVisitor.visitdeclaVar(
        node as unknown as ClassAST.declaVar,
      );
    };
  }

  weaveReturn(node: InterfaceAST.Return): void {
    (<any>node).accept = (AseRobotVisitor: AseRobotVisitor) => {
      return AseRobotVisitor.visitReturn(node as unknown as ClassAST.Return);
    };
  }

  weaveAnd(node: InterfaceAST.And): void {
    (<any>node).accept = (AseRobotVisitor: AseRobotVisitor) => {
      return AseRobotVisitor.visitAnd(node as unknown as ClassAST.And);
    };
  }

  weaveEqualBool(node: InterfaceAST.EqualBool): void {
    (<any>node).accept = (AseRobotVisitor: AseRobotVisitor) => {
      return AseRobotVisitor.visitEqualBool(
        node as unknown as ClassAST.EqualBool,
      );
    };
  }

  weaveNotEqualBool(node: InterfaceAST.NotEqualBool): void {
    (<any>node).accept = (AseRobotVisitor: AseRobotVisitor) => {
      return AseRobotVisitor.visitNotEqualBool(
        node as unknown as ClassAST.NotEqualBool,
      );
    };
  }

  weavegetDistance(node: InterfaceAST.getDistance): void {
    (<any>node).accept = (AseRobotVisitor: AseRobotVisitor) => {
      return AseRobotVisitor.visitgetDistance(
        node as unknown as ClassAST.getDistance,
      );
    };
  }

  weavegetTimestamp(node: InterfaceAST.getTimestamp): void {
    (<any>node).accept = (AseRobotVisitor: AseRobotVisitor) => {
      return AseRobotVisitor.visitgetTimestamp(
        node as unknown as ClassAST.getTimestamp,
      );
    };
  }

  weavesetSpeed(node: InterfaceAST.setSpeed): void {
    (<any>node).accept = (AseRobotVisitor: AseRobotVisitor) => {
      return AseRobotVisitor.visitsetSpeed(
        node as unknown as ClassAST.setSpeed,
      );
    };
  }

  weaveIf(node: InterfaceAST.If): void {
    (<any>node).accept = (AseRobotVisitor: AseRobotVisitor) => {
      return AseRobotVisitor.visitIf(node as unknown as ClassAST.If);
    };
  }

  weaveLoop(node: InterfaceAST.Loop): void {
    (<any>node).accept = (AseRobotVisitor: AseRobotVisitor) => {
      return AseRobotVisitor.visitLoop(node as unknown as ClassAST.Loop);
    };
  }

  weaveRotation(node: InterfaceAST.Rotation): void {
    (<any>node).accept = (AseRobotVisitor: AseRobotVisitor) => {
      return AseRobotVisitor.visitRotation(
        node as unknown as ClassAST.Rotation,
      );
    };
  }

  weaveEqualInt(node: InterfaceAST.EqualInt): void {
    (<any>node).accept = (AseRobotVisitor: AseRobotVisitor) => {
      return AseRobotVisitor.visitEqualInt(
        node as unknown as ClassAST.EqualInt,
      );
    };
  }

  weaveNotEqualInt(node: InterfaceAST.NotEqualInt): void {
    (<any>node).accept = (AseRobotVisitor: AseRobotVisitor) => {
      return AseRobotVisitor.visitNotEqualInt(
        node as unknown as ClassAST.NotEqualInt,
      );
    };
  }

  weaveGreater(node: InterfaceAST.Greater): void {
    (<any>node).accept = (AseRobotVisitor: AseRobotVisitor) => {
      return AseRobotVisitor.visitGreater(node as unknown as ClassAST.Greater);
    };
  }

  weaveLower(node: InterfaceAST.Lower): void {
    (<any>node).accept = (AseRobotVisitor: AseRobotVisitor) => {
      return AseRobotVisitor.visitLower(node as unknown as ClassAST.Lower);
    };
  }

  weaveConstBool(node: InterfaceAST.ConstBool): void {
    (<any>node).accept = (AseRobotVisitor: AseRobotVisitor) => {
      return AseRobotVisitor.visitConstBool(
        node as unknown as ClassAST.ConstBool,
      );
    };
  }

  weaveVar(node: InterfaceAST.Var): void {
    (<any>node).accept = (AseRobotVisitor: AseRobotVisitor) => {
      return AseRobotVisitor.visitVar(node as unknown as ClassAST.Var);
    };
  }

  weaveConstInt(node: InterfaceAST.ConstInt): void {
    (<any>node).accept = (AseRobotVisitor: AseRobotVisitor) => {
      return AseRobotVisitor.visitConstInt(
        node as unknown as ClassAST.ConstInt,
      );
    };
  }

  weaveBack(node: InterfaceAST.Back): void {
    (<any>node).accept = (AseRobotVisitor: AseRobotVisitor) => {
      return AseRobotVisitor.visitBack(node as unknown as ClassAST.Back);
    };
  }

  weaveFront(node: InterfaceAST.Front): void {
    (<any>node).accept = (AseRobotVisitor: AseRobotVisitor) => {
      return AseRobotVisitor.visitFront(node as unknown as ClassAST.Front);
    };
  }

  weaveLeftSide(node: InterfaceAST.LeftSide): void {
    (<any>node).accept = (AseRobotVisitor: AseRobotVisitor) => {
      return AseRobotVisitor.visitLeftSide(
        node as unknown as ClassAST.LeftSide,
      );
    };
  }

  weaveRightSide(node: InterfaceAST.RightSide): void {
    (<any>node).accept = (AseRobotVisitor: AseRobotVisitor) => {
      return AseRobotVisitor.visitRightSide(
        node as unknown as ClassAST.RightSide,
      );
    };
  }
}
