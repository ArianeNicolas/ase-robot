import {AddExpression, And, AseRobotVisitor, AssignVar, Back, Bool, BoolExpression, cm, Comparison, ConstBool, ConstInt, declaVar, Else, Elseif, EqualBool, EqualInt, Front, Func, FunCall, getDistance, getTimestamp, Greater, If, LeftSide, Loop, Lower, mm, MultExpression, Nbr, NotEqualBool, NotEqualInt, Or, Parameter, Program, Return, RightSide, RobotFunc, RobotLogic, Rotation, setSpeed, Type, Unit, Var, Void} from "../language/visitor.js"

export class Interpreter implements AseRobotVisitor {
    
    vars: Map<string, any>[] = [];

    visitMultExpression(node: MultExpression):number {
        let returnValue = node.singlevalue[0].accept(this);
        for(let i = 1; i < node.singlevalue.length; i++){
            if(node.op[i] === '*'){
                returnValue = returnValue * node.singlevalue[i].accept(this);
            }else if(node.op === '/'){
                returnValue = returnValue / node.singlevalue[i].accept(this);
            }
        }
        return returnValue;
    }
    visitAddExpression(node: AddExpression):number {
        let returnValue = node.multexpression[0].accept(this);
        for(let i = 1; i < node.multexpression.length; i++){
            if(node.op[i] === '+'){
                returnValue = returnValue + node.multexpression[i].accept(this);
            }else if(node.op === '-'){
                returnValue = returnValue - node.multexpression[i].accept(this);
            }
        }
        return returnValue;
    }

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
    visitFunCall(node: FunCall) {
        throw new Error("Method not implemented.");
    }
    visitAssignVar(node: AssignVar) {
        this.vars[this.vars.length-1].set(node.var_to_assign.name, node.expression.accept(this));
    }
    visitdeclaVar(node: declaVar) {
        this.vars[this.vars.length-1].set(node.declaName, node.expression.accept(this));
    }
    visitReturn(node: Return): any {
        return node.expression.accept(this);
    }
    visitAnd(node: And): boolean {
        let returnValue = node.condition[0].accept(this);
        for(let i = 1; i < node.condition.length; i++){
            returnValue = returnValue && node.condition[i].accept(this);
        }
        return returnValue;
    }
    visitOr(node: Or): boolean {
        let returnValue = node.condition[0].accept(this);
        for(let i = 1; i < node.condition.length; i++){
            returnValue = returnValue || node.condition[i].accept(this);
        }
        return returnValue;
    }
    visitEqualBool(node: EqualBool): boolean {
        return node.singlevaluebool[0].accept(this) === node.singlevaluebool[1].accept(this);
    }
    visitNotEqualBool(node: NotEqualBool): boolean {
        return node.singlevaluebool[0].accept(this) !== node.singlevaluebool[1].accept(this);
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
        return this.vars[this.vars.length-1].get(node.name);
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