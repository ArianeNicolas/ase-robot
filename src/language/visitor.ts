import * as ASTInterfaces from '../language/generated/ast.js';
import { AstNode, CstNode, LangiumDocument } from 'langium';

export interface AseRobotVisitor{
    // TODO : create one visit method for each concept of the language
    // Take a look at your abstract syntax for that
    visitProgram(node : Program) : any;

}

// TODO : create one concrete class for each concept
export class Program implements ASTInterfaces.Program {
    $type: 'Program';
    $container?: AstNode | undefined;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    Func: ASTInterfaces.Func[] = [];
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor($type: 'Program'){
        this.$type = $type;
    }
    accept (visitor: AseRobotVisitor) : any {}
}