import { AddExpression, MultExpression } from "../language/generated/ast.js";
import {And, ArithmeticExpression, ArithmeticOperation, AseRobotVisitor, AssignVar, Back, Bool, BoolCondition, BoolExpression, cm, Comparison, Condition, ConstBool, ConstInt, ControlStructure, declaVar, Else, Elseif, EqualBool, EqualInt, Expression, Front, Func, FunCall, getDistance, getTimestamp, Greater, If, LeftSide, Loop, Lower, mm, Movement, Nbr, NotEqualBool, NotEqualInt, Or, Parameter, Program, Return, RightSide, RobotFunc, RobotLogic, Rotation, setSpeed, SingleValue, SingleValueBool, Statement, Type, Unit, Var, Void} from "../language/visitor.js"

export class Compiler implements AseRobotVisitor {

    visitCondition(node: Condition) {
        throw new Error("Method not implemented.");
    }
    visitElse(node: Else) {
        throw new Error("Method not implemented.");
    }
    visitElseif(node: Elseif) {
        throw new Error("Method not implemented.");
    }
    visitExpression(node: Expression) {
        throw new Error("Method not implemented.");
    }
    visitFunc(node: Func) {
        throw new Error("Method not implemented.");
    }
    visitControlStructure(node: ControlStructure) {
        throw new Error("Method not implemented.");
    }
    visitParameter(node: Parameter) {
        throw new Error("Method not implemented.");
    }
    visitStatement(node: Statement) {
        throw new Error("Method not implemented.");
    }
    visitType(node: Type) {
        throw new Error("Method not implemented.");
    }
    visitUnit(node: Unit) {
        throw new Error("Method not implemented.");
    }
    visitFunCall(node: FunCall) {
        throw new Error("Method not implemented.");
    }
    visitBoolCondition(node: BoolCondition) {
        throw new Error("Method not implemented.");
    }
    visitArithmeticExpression(node: ArithmeticExpression) {
        throw new Error("Method not implemented.");
    }
    visitBoolExpression(node: BoolExpression) {
        throw new Error("Method not implemented.");
    }
    visitRobotFunc(node: RobotFunc) {
        throw new Error("Method not implemented.");
    }
    visitAssignVar(node: AssignVar) {
        throw new Error("Method not implemented.");
    }
    visitdeclaVar(node: declaVar) {
        throw new Error("Method not implemented.");
    }
    visitReturn(node: Return) {
        throw new Error("Method not implemented.");
    }
    visitRobotLogic(node: RobotLogic) {
        throw new Error("Method not implemented.");
    }
    visitBool(node: Bool) {
        throw new Error("Method not implemented.");
    }
    visitNbr(node: Nbr) {
        throw new Error("Method not implemented.");
    }
    visitVoid(node: Void) {
        throw new Error("Method not implemented.");
    }
    visitcm(node: cm) {
        throw new Error("Method not implemented.");
    }
    visitmm(node: mm) {
        throw new Error("Method not implemented.");
    }
    visitComparison(node: Comparison) {
        throw new Error("Method not implemented.");
    }
    visitAnd(node: And) {
        throw new Error("Method not implemented.");
    }
    AseRobotVisitor(node: Or) {
        throw new Error("Method not implemented.");
    }
    visitEqualBool(node: EqualBool) {
        throw new Error("Method not implemented.");
    }
    visitNotEqualBool(node: NotEqualBool) {
        throw new Error("Method not implemented.");
    }
    visitSingleValueBool(node: SingleValueBool) {
        throw new Error("Method not implemented.");
    }
    visitArithmeticOperation(node: ArithmeticOperation) {
        throw new Error("Method not implemented.");
    }
    visitSingleValue(node: SingleValue) {
        throw new Error("Method not implemented.");
    }
    visitgetDistance(node: getDistance) {
        throw new Error("Method not implemented.");
    }
    visitgetTimestamp(node: getTimestamp) {
        throw new Error("Method not implemented.");
    }
    visitsetSpeed(node: setSpeed) {
        throw new Error("Method not implemented.");
    }
    visitIf(node: If) {
        throw new Error("Method not implemented.");
    }
    visitLoop(node: Loop) {
        throw new Error("Method not implemented.");
    }
    visitMovement(node: Movement) {
        throw new Error("Method not implemented.");
    }
    visitRotation(node: Rotation) {
        throw new Error("Method not implemented.");
    }
    visitEqualInt(node: EqualInt) {
        throw new Error("Method not implemented.");
    }
    visitNotEqualInt(node: NotEqualInt) {
        throw new Error("Method not implemented.");
    }
    visitGreater(node: Greater) {
        throw new Error("Method not implemented.");
    }
    visitLower(node: Lower) {
        throw new Error("Method not implemented.");
    }
    visitConstBool(node: ConstBool) {
        throw new Error("Method not implemented.");
    }
    visitVar(node: Var) {
        throw new Error("Method not implemented.");
    }
    visitConstInt(node: ConstInt) {
        throw new Error("Method not implemented.");
    }
    visitBack(node: Back) {
        throw new Error("Method not implemented.");
    }
    visitFront(node: Front) {
        throw new Error("Method not implemented.");
    }
    visitLeftSide(node: LeftSide) {
        throw new Error("Method not implemented.");
    }
    visitRightSide(node: RightSide) {
        throw new Error("Method not implemented.");
    }
    visitProgram(node: Program) {
        throw new Error("Method not implemented.");
    }
    visitMultExpression(node: MultExpression) {
        throw new Error("Method not implemented.");
    }
    visitAddExpression(node: AddExpression) {
        throw new Error("Method not implemented.");
    }

}