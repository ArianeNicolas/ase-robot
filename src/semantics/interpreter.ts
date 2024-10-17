import {AseRobotVisitor, Program} from "../language/visitor.js"

export class Interpreter implements AseRobotVisitor {
    visitProgram(node: Program) {
        throw new Error("Method not implemented.");
    }

}