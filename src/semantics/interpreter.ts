import {And, ArithmeticExpression, ArithmeticOperation, AseRobotVisitor, AssignVar, Back, Bool, BoolExpression, cm, Comparison, ConstBool, ConstInt, declaVar, Else, Elseif, EqualBool, EqualInt, Front, Func, FunCall, getDistance, getTimestamp, Greater, If, LeftSide, Loop, Lower, mm, Nbr, NotEqualBool, NotEqualInt, Or, Parameter, Program, Return, RightSide, RobotFunc, RobotLogic, Rotation, setSpeed, Type, Unit, Var, Void} from "../language/visitor.js"

export class Interpreter implements AseRobotVisitor {

    vars = new Map<string, any>();

    visitElse(node: Else) {
        node.statement.forEach((statement) => statement.accept(this));
    }
    visitElseif(node: Elseif) {
        if(node.condition.accept(this)){
            node.statement.forEach((statement) => statement.accept(this));
        }
    }
    visitFunc(node: Func) {
        node.statement.forEach((statement) => statement.accept(this));
    }
    visitParameter(node: Parameter) {
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
    visitEqualBool(node: EqualBool): boolean {
        return node.singlevaluebool[0].accept(this) === node.singlevaluebool[1].accept(this);
    }
    visitNotEqualBool(node: NotEqualBool): boolean {
        return node.singlevaluebool[0].accept(this) !== node.singlevaluebool[1].accept(this);
    }
    visitArithmeticOperation(node: ArithmeticOperation) {
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
       if(node.condition.accept(this)){
           node.statement.forEach((statement) => statement.accept(this));
       }
    }
    visitLoop(node: Loop) {
        while(node.condition.accept(this)){
            node.statement.forEach((statement) => statement.accept(this));
        }
    }
    visitRotation(node: Rotation) {
        throw new Error("Method not implemented.");
    }
    visitEqualInt(node: EqualInt): boolean {
        return node.arithmeticexpression[0].accept(this) === node.arithmeticexpression[1].accept(this);
    }
    visitNotEqualInt(node: NotEqualInt): boolean {
        return node.arithmeticexpression[0].accept(this) !== node.arithmeticexpression[1].accept(this);
    }
    visitGreater(node: Greater): boolean {
        return node.arithmeticexpression[0].accept(this) > node.arithmeticexpression[1].accept(this);
    }
    visitLower(node: Lower): boolean {
        return node.arithmeticexpression[0].accept(this) < node.arithmeticexpression[1].accept(this);
    }
    visitConstBool(node: ConstBool): boolean {
        return node.BoolValue;
    }
    visitVar(node: Var): any {
        return this.vars.get(node.name);
    }
    visitConstInt(node: ConstInt): number {
        return node.integerValue;
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
        node.Func.forEach((func) => func.accept(this));
    }

}