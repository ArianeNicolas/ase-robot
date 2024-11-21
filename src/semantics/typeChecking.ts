import { Statement, Type } from "../language/generated/ast.js";
import { Scene } from "../web/simulator/scene.js";
import {AddExpression, And, AseRobotVisitor, AssignVar, Back, ConstBool, cm, mm, ConstInt, ControlStructure, declaVar, Else, Elseif, EqualBool, EqualInt, Front, Func, FunCall, getDistance, getTimestamp, Greater, If, LeftSide, Loop, Lower, MultExpression, NotEqualBool, NotEqualInt, Or, Program, Return, RightSide, Rotation, setSpeed, Var} from "../language/visitor.js"

export class typeChecking implements AseRobotVisitor {

    vars: Map<string, any>[] = [];
    funcs: Map<string, [Type, Type[]]> = new Map<string, [Type, Type[]]>();
    program: Program = new Program("Program");

    visitElse(node: Else) {
        node.statement.forEach((statement) => statement.accept(this))
    }
    visitElseif(node: Elseif) {
        if(node.condition.accept(this)){
            node.statement.forEach((statement) => statement.accept(this));
        }
    }
    visitFunc(node: Func) {
        for (let statement of node.statement) {
            const isReturn = this.isReturn(statement);
            const isControlStructure = this.isControleStructure(statement);
            const result = statement.accept(this);
    
            if (isReturn || (isControlStructure && result != null)) {
                if(result.type != this.funcs.get(node.name)?.[0]){
                    throw new Error("Return type does not match function type");
                }
            }
        }
    }
    visitProgram(node: Program) {
        this.program = node;
        node.Func.forEach((func) => {
            this.funcs.set(func.name, [func.type, []]);
            func.parameter.forEach((param) => {
                this.funcs.get(func.name)?.[1].push(param.type);
            });
        });
        node.Func.forEach((func) => {
            this.vars.push(new Map<string, any>());
            func.accept(this);
            this.vars.pop();
        });
    }

    visitFunCall(node: FunCall) {
        this.program.Func.forEach(f => {
            if(f.name == node.callName){
                let map = new Map<string, any>();
                for(let i = 0; i<node.parameters.length; i++) {
                    let value = node.parameters[i].accept(this);
                    if(value.type != this.funcs.get(f.name)?.[1][i]){
                        throw new Error("Parameter type does not match function type");
                    }
                    map.set(f.parameter[i].name, value);
                }
                this.vars.push(map);
                let returnValue = f.accept(this);
                if(returnValue.type != this.funcs.get(f.name)?.[0]){
                    throw new Error("Return type does not match function type");
                }
                this.vars.pop();
                return returnValue;
            }
        });
        throw new Error("Function not found");
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
    visitAnd(node: And) {
        throw new Error("Method not implemented.");
    }
    visitOr(node: Or) {
        throw new Error("Method not implemented.");
    }
    visitEqualBool(node: EqualBool) {
        throw new Error("Method not implemented.");
    }
    visitNotEqualBool(node: NotEqualBool) {
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
    visitMultExpression(node: MultExpression) {
        throw new Error("Method not implemented.");
    }
    visitAddExpression(node: AddExpression) {
        throw new Error("Method not implemented.");
    }
    visitMm(node: mm) {
        throw new Error("Method not implemented.");
    }
    visitCm(node: cm) {
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

    isReturn(object: Statement): object is Return {
        return 'return' in object;
    }

    isControleStructure(object: Statement): object is ControlStructure {
        return ('condition' in object && 'statement' in object);
    }
}