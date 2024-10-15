import { Type } from "./generated/ast.js";

export class ProgramFunction{

    public name: string;
    public parameters: Map<string, Type>;
    public returnType: Type;

    constructor(
        name: string,
        parameters: Map<string, Type>,
        returnType: Type,
    ){
        this.name = name;
        this.parameters = parameters;
        this.returnType = returnType;
    }
}