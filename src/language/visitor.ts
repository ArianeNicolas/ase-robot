
import * as ASTInterfaces from './generated/ast.js';
import { AstNode, CstNode, LangiumDocument } from 'langium';

export interface AseRobotVisitor{
    visitCondition(node : Condition) : any;
	visitElse(node : Else) : any;
	visitElseif(node : Elseif) : any;
	visitExpression(node : Expression) : any;
	visitFunc(node : Func) : any;
	visitProgram(node : Program) : any;
	visitControlStructure(node : ControlStructure) : any;
	visitParameter(node : Parameter) : any;
	visitStatement(node : Statement) : any;
	visitType(node : Type) : any;
	visitUnit(node : Unit) : any;
	visitFunCall(node : FunCall) : any;
	visitBoolCondition(node : BoolCondition) : any;
	visitArithmeticExpression(node : ArithmeticExpression) : any;
	visitBoolExpression(node : BoolExpression) : any;
	visitRobotFunc(node : RobotFunc) : any;
	visitAssignVar(node : AssignVar) : any;
	visitdeclaVar(node : declaVar) : any;
	visitReturn(node : Return) : any;
	visitRobotLogic(node : RobotLogic) : any;
	visitBool(node : Bool) : any;
	visitNbr(node : Nbr) : any;
	visitVoid(node : Void) : any;
	visitcm(node : cm) : any;
	visitmm(node : mm) : any;
	visitComparison(node : Comparison) : any;
	visitAnd(node : And) : any;
	AseRobotVisitor(node : Or) : any;
	visitEqualBool(node : EqualBool) : any;
	visitNotEqualBool(node : NotEqualBool) : any;
	visitSingleValueBool(node : SingleValueBool) : any;
	visitArithmeticOperation(node : ArithmeticOperation) : any;
	visitSingleValue(node : SingleValue) : any;
	visitgetDistance(node : getDistance) : any;
	visitgetTimestamp(node : getTimestamp) : any;
	visitsetSpeed(node : setSpeed) : any;
	visitIf(node : If) : any;
	visitLoop(node : Loop) : any;
	visitMovement(node : Movement) : any;
	visitRotation(node : Rotation) : any;
	visitEqualInt(node : EqualInt) : any;
	visitNotEqualInt(node : NotEqualInt) : any;
	visitGreater(node : Greater) : any;
	visitLower(node : Lower) : any;
	visitConstBool(node : ConstBool) : any;
	visitVar(node : Var) : any;
	visitAddition(node : Addition) : any;
	visitDivision(node : Division) : any;
	visitMultiplication(node : Multiplication) : any;
	visitSubstraction(node : Substraction) : any;
	visitConstInt(node : ConstInt) : any;
	visitBack(node : Back) : any;
	visitFront(node : Front) : any;
	visitLeftSide(node : LeftSide) : any;
	visitRightSide(node : RightSide) : any;
}


export class Condition implements ASTInterfaces.Condition {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Condition'){}
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

export class Else implements ASTInterfaces.Else {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Else'){}
    $container!: ASTInterfaces.If;
    statement!: ASTInterfaces.Statement[];
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

export class Elseif implements ASTInterfaces.Elseif {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Elseif'){}
    $container!: ASTInterfaces.If;
    condition!: ASTInterfaces.Condition;
    statement!: ASTInterfaces.Statement[];
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

export class Expression implements ASTInterfaces.Expression {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Expression'){}
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

export class Func implements ASTInterfaces.Func {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Func'){}
    $container!: ASTInterfaces.Program;
    name!: string;
    parameter!: ASTInterfaces.Parameter[];
    statement!: ASTInterfaces.Statement[];
    type!: ASTInterfaces.Type;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

export class Program implements ASTInterfaces.Program {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Program'){}
    Func!: ASTInterfaces.Func[];
    $container?: AstNode | undefined;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

export class ControlStructure implements ASTInterfaces.ControlStructure {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'ControlStructure'){}
    condition!: ASTInterfaces.Condition;
    statement!: ASTInterfaces.Statement[];
    $container?: AstNode | undefined;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

export class Parameter implements ASTInterfaces.Parameter {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Parameter'){}
    $container!: ASTInterfaces.Func;
    name!: string;
    type!: ASTInterfaces.Type;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

export class Statement implements ASTInterfaces.Statement {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Statement'){}
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

export class Type implements ASTInterfaces.Type {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Type'){}
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

export class Unit implements ASTInterfaces.Unit {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Unit'){}
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

export class FunCall implements ASTInterfaces.FunCall {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'FunCall'){}
    callName!: string;
    parameters!: ASTInterfaces.Expression[];
    $container?: AstNode | undefined;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

export class BoolCondition implements ASTInterfaces.BoolCondition {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'BoolCondition'){}
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

export class ArithmeticExpression implements ASTInterfaces.ArithmeticExpression {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'ArithmeticExpression'){}
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

export class BoolExpression implements ASTInterfaces.BoolExpression {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'BoolExpression'){}
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

export class RobotFunc implements ASTInterfaces.RobotFunc {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'RobotFunc'){}
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

export class AssignVar implements ASTInterfaces.AssignVar {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'AssignVar'){}
    expression!: ASTInterfaces.Expression;
    var_to_assign!: ASTInterfaces.Var;
    $container?: AstNode | undefined;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

export class declaVar implements ASTInterfaces.declaVar {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'declaVar'){}
    declaName!: string;
    expression!: ASTInterfaces.Expression;
    type!: ASTInterfaces.Type;
    $container?: AstNode | undefined;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

export class Return implements ASTInterfaces.Return {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Return'){}
    expression!: ASTInterfaces.Expression;
    $container?: AstNode | undefined;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

export class RobotLogic implements ASTInterfaces.RobotLogic {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'RobotLogic'){}
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

export class Bool implements ASTInterfaces.Bool {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Bool'){}
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

export class Nbr implements ASTInterfaces.Nbr {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Nbr'){}
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

export class Void implements ASTInterfaces.Void {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Void'){}
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

export class cm implements ASTInterfaces.cm {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'cm'){}
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

export class mm implements ASTInterfaces.mm {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'mm'){}
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

export class Comparison implements ASTInterfaces.Comparison {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Comparison'){}
    arithmeticexpression!: ASTInterfaces.ArithmeticExpression[];
    $container?: AstNode | undefined;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

export class And implements ASTInterfaces.And {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'And'){}
    $container!: ASTInterfaces.Or;
    comparison!: ASTInterfaces.Comparison[];
    singlevaluebool!: ASTInterfaces.SingleValueBool[];
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

export class Or implements ASTInterfaces.Or {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Or'){}
    and!: ASTInterfaces.And[];
    comparison!: ASTInterfaces.Comparison[];
    $container?: AstNode | undefined;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

export class EqualBool implements ASTInterfaces.EqualBool {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'EqualBool'){}
    singlevaluebool!: ASTInterfaces.SingleValueBool[];
    $container?: AstNode | undefined;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

export class NotEqualBool implements ASTInterfaces.NotEqualBool {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'NotEqualBool'){}
    singlevaluebool!: ASTInterfaces.SingleValueBool[];
    $container?: AstNode | undefined;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

export class SingleValueBool implements ASTInterfaces.SingleValueBool {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'SingleValueBool'){}
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

export class ArithmeticOperation implements ASTInterfaces.ArithmeticOperation {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'ArithmeticOperation'){}
    $container!: ASTInterfaces.Addition | ASTInterfaces.Division | ASTInterfaces.Multiplication | ASTInterfaces.Substraction;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

export class SingleValue implements ASTInterfaces.SingleValue {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'SingleValue'){}
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

export class getDistance implements ASTInterfaces.getDistance {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'getDistance'){}
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

export class getTimestamp implements ASTInterfaces.getTimestamp {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'getTimestamp'){}
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

export class setSpeed implements ASTInterfaces.setSpeed {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'setSpeed'){}
    speed!: ASTInterfaces.ArithmeticExpression;
    unit!: ASTInterfaces.Unit;
    $container?: AstNode | undefined;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

export class If implements ASTInterfaces.If {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'If'){}
    else?: ASTInterfaces.Else | undefined;
    elseif!: ASTInterfaces.Elseif[];
    condition!: ASTInterfaces.Condition;
    statement!: ASTInterfaces.Statement[];
    $container?: AstNode | undefined;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

export class Loop implements ASTInterfaces.Loop {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Loop'){}
    condition!: ASTInterfaces.Condition;
    statement!: ASTInterfaces.Statement[];
    $container?: AstNode | undefined;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

export class Movement implements ASTInterfaces.Movement {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Movement'){}
    expression!: ASTInterfaces.ArithmeticExpression;
    unit1!: ASTInterfaces.Unit;
    $container?: AstNode | undefined;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

export class Rotation implements ASTInterfaces.Rotation {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Rotation'){}
    angle!: ASTInterfaces.ArithmeticExpression;
    $container?: AstNode | undefined;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

export class EqualInt implements ASTInterfaces.EqualInt {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'EqualInt'){}
    arithmeticexpression!: ASTInterfaces.ArithmeticExpression[];
    $container?: AstNode | undefined;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

export class NotEqualInt implements ASTInterfaces.NotEqualInt {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'NotEqualInt'){}
    arithmeticexpression!: ASTInterfaces.ArithmeticExpression[];
    $container?: AstNode | undefined;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

export class Greater implements ASTInterfaces.Greater {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Greater'){}
    arithmeticexpression!: ASTInterfaces.ArithmeticExpression[];
    $container?: AstNode | undefined;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

export class Lower implements ASTInterfaces.Lower {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Lower'){}
    arithmeticexpression!: ASTInterfaces.ArithmeticExpression[];
    $container?: AstNode | undefined;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

export class ConstBool implements ASTInterfaces.ConstBool {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'ConstBool'){}
    BoolValue!: boolean;
    $container?: AstNode | undefined;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

export class Var implements ASTInterfaces.Var {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Var'){}
    $container!: ASTInterfaces.AssignVar;
    name!: string;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

export class Addition implements ASTInterfaces.Addition {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Addition'){}
    $container!: ASTInterfaces.Division | ASTInterfaces.Multiplication;
    division!: ASTInterfaces.Division[];
    multiplication!: ASTInterfaces.Multiplication[];
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

export class Division implements ASTInterfaces.Division {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Division'){}
    $container!: ASTInterfaces.Addition | ASTInterfaces.Substraction;
    addition!: ASTInterfaces.Addition[];
    singlevalue!: ASTInterfaces.SingleValue[];
    substraction!: ASTInterfaces.Substraction[];
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

export class Multiplication implements ASTInterfaces.Multiplication {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Multiplication'){}
    $container!: ASTInterfaces.Addition | ASTInterfaces.Substraction;
    addition!: ASTInterfaces.Addition[];
    singlevalue!: ASTInterfaces.SingleValue[];
    substraction!: ASTInterfaces.Substraction[];
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

export class Substraction implements ASTInterfaces.Substraction {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Substraction'){}
    $container!: ASTInterfaces.Division | ASTInterfaces.Multiplication;
    division!: ASTInterfaces.Division[];
    multiplication!: ASTInterfaces.Multiplication[];
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

export class ConstInt implements ASTInterfaces.ConstInt {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'ConstInt'){}
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

export class Back implements ASTInterfaces.Back {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Back'){}
    expression!: ASTInterfaces.ArithmeticExpression;
    unit1!: ASTInterfaces.Unit;
    $container?: AstNode | undefined;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

export class Front implements ASTInterfaces.Front {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Front'){}
    expression!: ASTInterfaces.ArithmeticExpression;
    unit1!: ASTInterfaces.Unit;
    $container?: AstNode | undefined;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

export class LeftSide implements ASTInterfaces.LeftSide {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'LeftSide'){}
    expression!: ASTInterfaces.ArithmeticExpression;
    unit1!: ASTInterfaces.Unit;
    $container?: AstNode | undefined;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

export class RightSide implements ASTInterfaces.RightSide {
    // the constructor must take all attribute of the implemented interface 
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'RightSide'){}
    expression!: ASTInterfaces.ArithmeticExpression;
    unit1!: ASTInterfaces.Unit;
    $container?: AstNode | undefined;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}

