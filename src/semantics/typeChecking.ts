import { Statement, Type } from "../language/generated/ast.js";
import {AddExpression, And, AseRobotVisitor, AssignVar, Back, ConstBool, cm, mm, ConstInt, ControlStructure, declaVar, Else, Elseif, EqualBool, EqualInt, Front, Func, FunCall, getDistance, getTimestamp, Greater, If, LeftSide, Loop, Lower, MultExpression, NotEqualBool, NotEqualInt, Or, Program, Return, RightSide, Rotation, setSpeed, Var, Parameter} from "../language/visitor.js"

export class typeChecking implements AseRobotVisitor {
    visitParam(node: Parameter) {
    }
    
    vars: Map<string, any>[] = [];
    funcs: Map<string, [Type, Type[]]> = new Map<string, [Type, Type[]]>();
    program: Program = new Program("Program");

    visitElse(node: Else) {
        node.statement.forEach((statement) => statement.accept(this));
    }

    visitElseif(node: Elseif) {
        if (node.condition.accept(this)) {
            node.statement.forEach((statement) => statement.accept(this));
        }
    }

    visitFunc(node: Func) {
        for (let statement of node.statement) {
            const isReturn = this.isReturn(statement);
            const isControlStructure = this.isControleStructure(statement);
            const result = statement.accept(this);
            if (isReturn || (isControlStructure && result != null)) {
                if (result.type != this.normalizeType(this.funcs.get(node.name)?.[0].$type)) {
                    throw new Error("Return type does not match function type");
                }
            }
        }
    }

    visitProgram(node: Program) {
        this.program = node;
        let isEntry = false;

        node.Func.forEach((func) => {
            this.funcs.set(func.name, [func.type, func.parameter.map((param) => param.type)]);
            if (func.name === "entry") {
                isEntry = true;
            }
        });

        if (!isEntry) {
            throw new Error("No entry function found");
        }

        node.Func.forEach((func) => {
            this.vars.push(new Map<string, any>());
            func.accept(this);
            this.vars.pop();
        });
    }

    visitFunCall(node: FunCall) {
        const func = this.funcs.get(node.callName);

        if (!func) throw new Error(`Function ${node.callName} not found`);

        const [returnType, paramTypes] = func;

        if (node.parameters.length !== paramTypes.length) {
            throw new Error(`Parameter count mismatch for function ${node.callName}`);
        }

        const paramValues = node.parameters.map((param, i) => {
            const value = param.accept(this);
            if (value.type !== this.normalizeType(paramTypes[i].$type)) {
                throw new Error(`Parameter type mismatch in function ${node.callName}`);
            }
            return value;
        });

        const localScope = new Map<string, any>(
            paramValues.map((value, i) => [this.program.Func.find((f) => f.name === node.callName)?.parameter[i].name!, value])
        );

        this.vars.push(localScope);
        const returnValue = this.funcs.get(node.callName)?.[0].$type
        this.vars.pop();

        if (this.normalizeType(returnValue) !== this.normalizeType(returnType.$type)) {
            throw new Error(`Return type mismatch for function ${node.callName}`);
        }

        return returnValue;
    }

    visitAssignVar(node: AssignVar) {
        const value = node.expression.accept(this);
        const varType = this.lookupVar(node.var_to_assign.name).type;

        if (this.normalizeType(value.type) !== this.normalizeType(varType)) {
            throw new Error(`Type mismatch in assignment to ${node.var_to_assign.name}`);
        }

        this.updateVar(node.var_to_assign.name, value);
    }

    visitdeclaVar(node: declaVar) {
        if (this.vars.length === 0) throw new Error("Variable declaration outside any scope");

        if (this.vars[this.vars.length - 1].has(node.declaName)) {
            throw new Error(`Variable ${node.declaName} already declared`);
        }
        const value = node.expression.accept(this);
        if (value.type !== this.normalizeType(node.type.$type)) {
            throw new Error(`Type mismatch in declaration of ${node.declaName}`);
        }

        this.vars[this.vars.length - 1].set(node.declaName, value);
    }

    visitReturn(node: Return) {
        return node.return?.accept(this);
    }

    visitIf(node: If) {
        const condition = node.condition.accept(this);
        if (condition.type !== "bool") {
            throw new Error("Condition in if statement must be a boolean");
        }
    
        if (condition.value) {
            node.statement.forEach((stmt) => stmt.accept(this));
        }

        return null;
    }
    

    visitLoop(node: Loop) {
        const condition = node.condition.accept(this);
        if (condition.type !== "bool") {
            throw new Error("Condition in loop statement must be a boolean");
        }

        node.statement.forEach((stmt) => stmt.accept(this));
    }

    visitVar(node: Var) {
        return this.lookupVar(node.name);
    }

    visitConstInt(node: ConstInt) {
        return { type: "int", value: node.integerValue };
    }

    visitConstBool(node: ConstBool) {
        return { type: "bool", value: node.BoolValue };
    }

    visitAddExpression(node: AddExpression) {
        let returnValue = node.multexpression[0].accept(this);
    
        for (let i = 1; i < node.multexpression.length; i++) {
            const current = node.multexpression[i].accept(this);
    
            if (node.op[i - 1] === "+") {
                if (current.type !== "int") {
                    throw new Error("Addition requires integer operands");
                }
                returnValue.value += current.value;
            } else if (node.op[i - 1] === "-") {
                if (current.type !== "int") {
                    throw new Error("Soustraction requires integer operands");
                }
                returnValue.value -= current.value;
            }
        }
    
        return returnValue;
    }

    visitMultExpression(node: MultExpression) {

        let returnValue = node.singlevalue[0].accept(this);
    
        for (let i = 1; i < node.singlevalue.length; i++) {
            const current = node.singlevalue[i].accept(this);   
            if (node.op[i - 1] === "*") {
                if (current.type !== "int") {
                    throw new Error("Multiplication requires integer operands");
                }
                returnValue.value *= current.value;
            } else if (node.op[i - 1] === "/") {
                if (current.type !== "int") {
                    throw new Error("Division requires integer operands");
                }
                if (current.value === 0) {
                    throw new Error("Division by zero is not allowed");
                }
                returnValue.value /= current.value;
            }
        }
        return returnValue;
    }
    

    visitAnd(node: And) {
        for (const condition of node.condition) {
            const result = condition.accept(this);
            if (result.type !== "bool") {
                throw new Error("Logical AND requires boolean operands");
            }
        }
    
        let value = true;
        for (const condition of node.condition) {
            const result = condition.accept(this);
            value = value && result.value;
            if (!value) break;
        }
    
        return { type: "bool", value };
    }
    
    visitOr(node: Or) {
        for (const condition of node.condition) {
            const result = condition.accept(this);
            if (result.type !== "bool") {
                throw new Error("Logical OR requires boolean operands");
            }
        }
        let value = false;
        for (const condition of node.condition) {
            const result = condition.accept(this);
            value = value || result.value;
            if (value) break;
        }
    
        return { type: "bool", value };
    }
    
    visitEqualBool(node: EqualBool) {
        const left = node.singlevaluebool[0].accept(this);
        const right = node.singlevaluebool[1].accept(this);
    
        if (left.type !== "bool" || right.type !== "bool") {
            throw new Error("Equality check requires boolean operands");
        }
    
        return { type: "bool", value: left.value === right.value };
    }
    
    visitNotEqualBool(node: NotEqualBool) {
        const left = node.singlevaluebool[0].accept(this);
        const right = node.singlevaluebool[1].accept(this);
    
        if (left.type !== "bool" || right.type !== "bool") {
            throw new Error("Inequality check requires boolean operands");
        }
    
        return { type: "bool", value: left.value !== right.value };
    }
    
    visitgetDistance(node: getDistance) {
        return { type: "int", value: 0 };
    }
    
    visitgetTimestamp(node: getTimestamp) {
        return { type: "int", value: Date.now() };
    }
    
    visitsetSpeed(node: setSpeed) {
        const speed = node.speed.accept(this);
    
        if (speed.type !== "int") {
            throw new Error("Speed must be an integer");
        }

        if(node.unit.accept(this) === "cm"){
            if(speed > 15){
                throw new Error("Speed must be less than 15 cm/s");
            }
        }else{
            if(speed > 150){
                throw new Error("Speed must be less than 150 mm/s");
            }
        }
    
        return { type: "void" };
    }
    
    visitRotation(node: Rotation) {
        const angle = node.angle.accept(this);
    
        if (angle.type !== "int") {
            throw new Error("Rotation angle must be an integer");
        }
    
        return { type: "void" };
    }
    
    visitEqualInt(node: EqualInt) {
        const left = node.arithmeticexpression[0].accept(this);
        const right = node.arithmeticexpression[1].accept(this);
    
        if (left.type !== "int" || right.type !== "int") {
            throw new Error("Equality check requires integer operands");
        }
    
        return { type: "bool", value: left.value === right.value };
    }
    
    visitNotEqualInt(node: NotEqualInt) {
        const left = node.arithmeticexpression[0].accept(this);
        const right = node.arithmeticexpression[1].accept(this);
    
        if (left.type !== "int" || right.type !== "int") {
            throw new Error("Inequality check requires integer operands");
        }
    
        return { type: "bool", value: left.value !== right.value };
    }
    
    visitGreater(node: Greater) {
        const left = node.arithmeticexpression[0].accept(this);
        const right = node.arithmeticexpression[1].accept(this);
    
        if (left.type !== "int" || right.type !== "int") {
            throw new Error("Greater-than comparison requires integer operands");
        }
    
        return { type: "bool", value: left.value > right.value };
    }
    
    visitLower(node: Lower) {
        const left = node.arithmeticexpression[0].accept(this);
        const right = node.arithmeticexpression[1].accept(this);
    
        if (left.type !== "int" || right.type !== "int") {
            throw new Error("Less-than comparison requires integer operands");
        }
    
        return { type: "bool", value: left.value < right.value };
    }
    
    visitMm(node: mm) {
        return { type: "int", value: node.accept(this).value };
    }
    
    visitCm(node: cm) {
        return { type: "int", value: node.accept(this).value * 10 };
    }
    
    visitBack(node: Back) {
        const distance = node.expression.accept(this);
    
        if (distance.type !== "int") {
            throw new Error("Back movement distance must be an integer");
        }

        if(node.unit1.accept(this) === "cm"){
            if(distance > 300){
                throw new Error("Distance to parkour must be less than 300 cm");
            }
        }else{
            if(distance > 3000){
                throw new Error("Distance to parkour must be less than 3000 mm");
            }
        }
    
        return { type: "void" };
    }
    
    visitFront(node: Front) {
        const distance = node.expression.accept(this);
        if (distance.type !== "int") {
            throw new Error("Front movement distance must be an integer");
        }

        if(node.unit1.accept(this) === "cm"){
            if(distance > 300){
                throw new Error("Distance to parkour must be less than 300 cm");
            }
        }else{
            if(distance > 3000){
                throw new Error("Distance to parkour must be less than 3000 mm");
            }
        }
    
        return { type: "void" };
    }
    
    visitLeftSide(node: LeftSide) {
        const distance = node.expression.accept(this);
    
        if (distance.type !== "int") {
            throw new Error("Left movement distance must be an integer");
        }

        if(node.unit1.accept(this) === "cm"){
            if(distance > 300){
                throw new Error("Distance to parkour must be less than 300 cm");
            }
        }else{
            if(distance > 3000){
                throw new Error("Distance to parkour must be less than 3000 mm");
            }
        }
    
        return { type: "void" };
    }
    
    visitRightSide(node: RightSide) {
        const distance = node.expression.accept(this);
    
        if (distance.type !== "int") {
            throw new Error("Right movement distance must be an integer");
        }

        if(node.unit1.accept(this) === "cm"){
            if(distance > 300){
                throw new Error("Distance to parkour must be less than 300 cm");
            }
        }else{
            if(distance > 3000){
                throw new Error("Distance to parkour must be less than 3000 mm");
            }
        }
    
        return { type: "void" };
    }
    
    lookupVar(name: string) {
        for (let i = this.vars.length - 1; i >= 0; i--) {
            if (this.vars[i].has(name)) {
                return this.vars[i].get(name);
            }
        }
        throw new Error(`Variable ${name} not found`);
    }

    updateVar(name: string, value: any) {
        for (let i = this.vars.length - 1; i >= 0; i--) {
            if (this.vars[i].has(name)) {
                this.vars[i].set(name, value);
                return;
            }
        }
        throw new Error(`Variable ${name} not found`);
    }

    isReturn(object: Statement): object is Return {
        return 'return' in object;
    }

    isControleStructure(object: Statement): object is ControlStructure {
        return object instanceof If || object instanceof Loop;
    }

    normalizeType(type: string | undefined): string {
        switch (type ?? '') {
            case "Nbr":
                return "int";
            case "Bool":
                    return "bool";
            default:
                return type ?? '';
        }
    }
    
}
