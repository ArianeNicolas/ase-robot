import {AseRobotVisitor, Program} from "../language/visitor.js"

export class Compiler implements AseRobotVisitor {
    visitProgram(node: Program) {
        throw new Error("Method not implemented.");
    }

}