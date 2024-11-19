import { Statement } from "../language/generated/ast.js";
import { Scene } from "../web/simulator/scene.js";
import {AddExpression, And, AseRobotVisitor, AssignVar, Back, ConstBool, cm, mm, ConstInt, ControlStructure, declaVar, Else, Elseif, EqualBool, EqualInt, Front, Func, FunCall, getDistance, getTimestamp, Greater, If, LeftSide, Loop, Lower, MultExpression, NotEqualBool, NotEqualInt, Or, Program, Return, RightSide, Rotation, setSpeed, Var} from "../language/visitor.js"

export class Interpreter implements AseRobotVisitor {

    
    
    vars: Map<string, any>[] = [];
    program: Program = new Program("Program");
    scene: Scene;

    constructor(scene: Scene){
        this.scene = scene;
    }

    visitMultExpression(node: MultExpression):number {
        let returnValue = node.singlevalue[0].accept(this);
        for(let i = 1; i < node.singlevalue.length; i++){
            if(node.op[i-1] === '*'){
                let mult = node.singlevalue[i].accept(this);
                console.log("* "+mult);
                returnValue = returnValue * mult;
            }else if(node.op[i-1] === '/'){
                returnValue = returnValue / node.singlevalue[i].accept(this);
            }
        }
        return returnValue;
    }
    visitAddExpression(node: AddExpression):number {
        let returnValue = node.multexpression[0].accept(this);
        for(let i = 1; i < node.multexpression.length; i++){
            if(node.op[i-1] === '+'){
                let add = node.multexpression[i].accept(this);
                console.log("+ "+add);
                returnValue = returnValue + add;
            }else if(node.op[i-1] === '-'){
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
    visitFunc(node: Func):any {
        console.log("Rentré dans la fonction "+node.name);
       
            node.statement.forEach((statement) => {
                let isReturn = this.isReturn(statement);
                let isControleStructure = this.isControleStructure(statement);
                let accept = statement.accept(this);
                if(isReturn || (isControleStructure && accept != null)){
                    console.log("return !");
                    let returnValue = accept;
                    this.vars.pop();
                    console.log(node.name, " : ", returnValue);
                    return returnValue;
                }
            });
       
    }
    visitFunCall(node: FunCall): any {
        this.program.Func.forEach(f => {
            if(f.name == node.callName){
                let map = new Map<string, any>();
                for(let i = 0; i<node.parameters.length; i++) {
                    let value = node.parameters[i].accept(this);
                    console.log(f.parameter[i].name + " = "+ value);
                    map.set(f.parameter[i].name, value);
                }
                this.vars.push(map);
                let returnValue = f.accept(this);
                this.vars.pop();
                return returnValue;
            }
        });
        
    }
    visitAssignVar(node: AssignVar) {
        console.log(node.var_to_assign.name + " = "+ node.expression.accept(this));
        this.vars[this.vars.length-1].set(node.var_to_assign.name, node.expression.accept(this));
    }
    visitdeclaVar(node: declaVar) {
        console.log("let " + node.declaName + " : "+ node.expression.accept(this));
        this.vars[this.vars.length-1].set(node.declaName, node.expression.accept(this));
    }
    visitReturn(node: Return): any {
        return node.return.accept(this);
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
        let intersection = this.scene.robot.getRay().intersect(this.scene.entities)
        return Math.sqrt(Math.pow(intersection!.x - this.scene.robot.pos.x, 2) + Math.pow(intersection!.y - this.scene.robot.pos.y, 2));
    }
    visitgetTimestamp(node: getTimestamp) {
        return this.scene.timestamps[this.scene.timestamps.length-1];
    }
    visitsetSpeed(node: setSpeed) {
        let speed = node.speed.accept(this);
        console.log("Speed : "+speed);
        if(node.unit.accept(this) === "cm"){
            this.scene.robot.speed = speed*10;
        }else{
            this.scene.robot.speed =speed;
        }
    }
    visitIf(node: If): any {
        if(node.condition.accept(this)){
            node.statement.forEach((statement) => {
                let isReturn = this.isReturn(statement);
                if(isReturn){
                    let returnValue = statement.accept(this)
                    this.vars.pop();
                    return returnValue;
                }
                else {
                    statement.accept(this);
                }
            });
        }
        return null
    }
    visitLoop(node: Loop): any {
        console.log("Get in Loop !");
       
        let i = 0;
        while(node.condition.accept(this)){
            console.log("loop"+i);
            node.statement.forEach((statement) => {
            
                let isReturn = this.isReturn(statement);
                if(isReturn){
                    let returnValue = statement.accept(this)
                    this.vars.pop();
                    return returnValue;
                }
                else {
                    statement.accept(this);
                }
                i++;
            });
        }
        return null
    }
    visitRotation(node: Rotation) {
        this.scene.robot.turn(node.angle.accept(this));
    }
    visitEqualInt(node: EqualInt): boolean {
        return node.arithmeticexpression[0].accept(this) === node.arithmeticexpression[1].accept(this);
    }
    visitNotEqualInt(node: NotEqualInt): boolean {
        return node.arithmeticexpression[0].accept(this) !== node.arithmeticexpression[1].accept(this);
    }
    visitGreater(node: Greater): boolean {
        console.log(node.arithmeticexpression[0].accept(this) + " > " + node.arithmeticexpression[1].accept(this));
        return node.arithmeticexpression[0].accept(this) > node.arithmeticexpression[1].accept(this);
    }
    visitLower(node: Lower): boolean {
        console.log(node.arithmeticexpression[0].accept(this) + " < " + node.arithmeticexpression[1].accept(this));
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
        if(node.unit1.accept(this) === "cm"){
            this.scene.robot.move(-node.expression.accept(this));
        }else{
            this.scene.robot.move(-node.expression.accept(this)/10);
        }
            
    }
    visitFront(node: Front) {
        if(node.unit1.accept(this) === "cm"){
            this.scene.robot.move(node.expression.accept(this));
        }else{
            this.scene.robot.move(node.expression.accept(this)/10);
        }
    }
    visitLeftSide(node: LeftSide) {
        if(node.unit1.accept(this) === "cm"){
            this.scene.robot.side(node.expression.accept(this));
        }else{
            this.scene.robot.move(node.expression.accept(this)/10);
        }
    }
    visitRightSide(node: RightSide) {
        if(node.unit1.accept(this) === "cm"){
            this.scene.robot.side(-node.expression.accept(this));
        }else{
            this.scene.robot.move(-node.expression.accept(this)/10);
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
        console.log("Rentré dans le programme !");
        node.Func.forEach((func) => {
            if(func.name == "entry"){
                this.vars.push(new Map<string, any>());
                func.accept(this);
                this.vars.pop();
            }});
    }

    isReturn(object: Statement): object is Return {
        return 'return' in object;
    }

    isControleStructure(object: Statement): object is ControlStructure {
        return ('condition' in object && 'statement' in object);
    }


}