import * as ASTInterfaces from "./generated/ast.js";
import { AstNode, CstNode, LangiumDocument } from "langium";

export interface AseRobotVisitor {
  visitElse(node: Else): any;
  visitElseif(node: Elseif): any;
  visitFunc(node: Func): any;
  visitProgram(node: Program): any;
  visitFunCall(node: FunCall): any;
  visitAssignVar(node: AssignVar): any;
  visitdeclaVar(node: declaVar): any;
  visitReturn(node: Return): any;
  visitAnd(node: And): any;
  visitOr(node: Or): any;
  visitEqualBool(node: EqualBool): any;
  visitNotEqualBool(node: NotEqualBool): any;
  visitgetDistance(node: getDistance): any;
  visitgetTimestamp(node: getTimestamp): any;
  visitsetSpeed(node: setSpeed): any;
  visitIf(node: If): any;
  visitLoop(node: Loop): any;
  visitRotation(node: Rotation): any;
  visitEqualInt(node: EqualInt): any;
  visitNotEqualInt(node: NotEqualInt): any;
  visitGreater(node: Greater): any;
  visitLower(node: Lower): any;
  visitConstBool(node: ConstBool): any;
  visitVar(node: Var): any;
  visitMultExpression(node: MultExpression): any;
  visitAddExpression(node: AddExpression): any;
  visitMm(node: mm): any;
  visitCm(node: cm): any;
  visitConstInt(node: ConstInt): any;
  visitBack(node: Back): any;
  visitFront(node: Front): any;
  visitLeftSide(node: LeftSide): any;
  visitRightSide(node: RightSide): any;
}

export class Condition implements ASTInterfaces.Condition {
  // the constructor must take all attribute of the implemented interface
  // simply copy-paste the interface fields as public parameters
  // you can find them in generated/ast.ts
  constructor(public $type: "Condition") {}
  accept(AseRobotVisitor: AseRobotVisitor): any {}
}

export class MultExpression implements ASTInterfaces.MultExpression {
  constructor(public $type: "MultExpression") {}
  $container!: AddExpression;
  op!: string;
  singlevalue!: ArithmeticExpression[];
  $containerProperty?: string | undefined;
  $containerIndex?: number | undefined;
  $cstNode?: CstNode | undefined;
  $document?: LangiumDocument<AstNode> | undefined;
  accept(AseRobotVisitor: AseRobotVisitor): any {}
}

export class AddExpression implements ASTInterfaces.AddExpression {
  $container!: AddExpression;
  $type!: "AddExpression";
  addExpression?: AddExpression | undefined;
  multexpression!: MultExpression[];
  op!: string;
  $containerProperty?: string | undefined;
  $containerIndex?: number | undefined;
  $cstNode?: CstNode | undefined;
  $document?: LangiumDocument<AstNode> | undefined;
}

export class Else implements ASTInterfaces.Else {
  // the constructor must take all attribute of the implemented interface
  // simply copy-paste the interface fields as public parameters
  // you can find them in generated/ast.ts
  constructor(public $type: "Else") {}
  $container!: If;
  statement!: Statement[];
  $containerProperty?: string | undefined;
  $containerIndex?: number | undefined;
  $cstNode?: CstNode | undefined;
  $document?: LangiumDocument<AstNode> | undefined;
  accept(AseRobotVisitor: AseRobotVisitor): any {}
}

export class Elseif implements ASTInterfaces.Elseif {
  // the constructor must take all attribute of the implemented interface
  // simply copy-paste the interface fields as public parameters
  // you can find them in generated/ast.ts
  constructor(public $type: "Elseif") {}
  $container!: If;
  condition!: Condition;
  statement!: Statement[];
  $containerProperty?: string | undefined;
  $containerIndex?: number | undefined;
  $cstNode?: CstNode | undefined;
  $document?: LangiumDocument<AstNode> | undefined;
  accept(AseRobotVisitor: AseRobotVisitor): any {}
}

export class Expression implements ASTInterfaces.Expression {
  // the constructor must take all attribute of the implemented interface
  // simply copy-paste the interface fields as public parameters
  // you can find them in generated/ast.ts
  constructor(public $type: "Expression") {}
  accept(AseRobotVisitor: AseRobotVisitor): any {}
}

export class Func implements ASTInterfaces.Func {
  // the constructor must take all attribute of the implemented interface
  // simply copy-paste the interface fields as public parameters
  // you can find them in generated/ast.ts
  constructor(public $type: "Func") {}
  $container!: Program;
  name!: string;
  parameter!: Parameter[];
  statement!: Statement[];
  type!: Type;
  $containerProperty?: string | undefined;
  $containerIndex?: number | undefined;
  $cstNode?: CstNode | undefined;
  $document?: LangiumDocument<AstNode> | undefined;
  accept(AseRobotVisitor: AseRobotVisitor): any {}
}

export class Program implements ASTInterfaces.Program {
  // the constructor must take all attribute of the implemented interface
  // simply copy-paste the interface fields as public parameters
  // you can find them in generated/ast.ts
  constructor(public $type: "Program") {}
  Func!: Func[];
  $container?: AstNode | undefined;
  $containerProperty?: string | undefined;
  $containerIndex?: number | undefined;
  $cstNode?: CstNode | undefined;
  $document?: LangiumDocument<AstNode> | undefined;
  accept(AseRobotVisitor: AseRobotVisitor): any {
    console.log("acceptProgram concrete");
    AseRobotVisitor.visitProgram(this);
  }
}

export class ControlStructure implements ASTInterfaces.ControlStructure {
  // the constructor must take all attribute of the implemented interface
  // simply copy-paste the interface fields as public parameters
  // you can find them in generated/ast.ts
  constructor(public $type: "ControlStructure") {}
  condition!: Condition;
  statement!: Statement[];
  $container?: AstNode | undefined;
  $containerProperty?: string | undefined;
  $containerIndex?: number | undefined;
  $cstNode?: CstNode | undefined;
  $document?: LangiumDocument<AstNode> | undefined;
  accept(AseRobotVisitor: AseRobotVisitor): any {}
}

export class Parameter implements ASTInterfaces.Parameter {
  // the constructor must take all attribute of the implemented interface
  // simply copy-paste the interface fields as public parameters
  // you can find them in generated/ast.ts
  constructor(public $type: "Parameter") {}
  $container!: Func;
  name!: string;
  type!: Type;
  $containerProperty?: string | undefined;
  $containerIndex?: number | undefined;
  $cstNode?: CstNode | undefined;
  $document?: LangiumDocument<AstNode> | undefined;
  accept(AseRobotVisitor: AseRobotVisitor): any {}
}

export class Statement implements ASTInterfaces.Statement {
  // the constructor must take all attribute of the implemented interface
  // simply copy-paste the interface fields as public parameters
  // you can find them in generated/ast.ts
  constructor(public $type: "Statement") {}
  accept(AseRobotVisitor: AseRobotVisitor): any {}
}

export class Type implements ASTInterfaces.Type {
  // the constructor must take all attribute of the implemented interface
  // simply copy-paste the interface fields as public parameters
  // you can find them in generated/ast.ts
  constructor(public $type: "Type") {}
  accept(AseRobotVisitor: AseRobotVisitor): any {}
}

export class Unit implements ASTInterfaces.Unit {
  // the constructor must take all attribute of the implemented interface
  // simply copy-paste the interface fields as public parameters
  // you can find them in generated/ast.ts
  constructor(public $type: "Unit") {}
  accept(AseRobotVisitor: AseRobotVisitor): any {}
}

export class FunCall implements ASTInterfaces.FunCall {
  // the constructor must take all attribute of the implemented interface
  // simply copy-paste the interface fields as public parameters
  // you can find them in generated/ast.ts
  constructor(public $type: "FunCall") {}
  callName!: string;
  parameters!: Expression[];
  $container?: AstNode | undefined;
  $containerProperty?: string | undefined;
  $containerIndex?: number | undefined;
  $cstNode?: CstNode | undefined;
  $document?: LangiumDocument<AstNode> | undefined;
  accept(AseRobotVisitor: AseRobotVisitor): any {}
}

export class BoolCondition implements ASTInterfaces.BoolCondition {
  // the constructor must take all attribute of the implemented interface
  // simply copy-paste the interface fields as public parameters
  // you can find them in generated/ast.ts
  constructor(public $type: "BoolCondition") {}
  accept(AseRobotVisitor: AseRobotVisitor): any {}
}

export class ArithmeticCondition implements ASTInterfaces.ArithmeticCondition {
  // the constructor must take all attribute of the implemented interface
  // simply copy-paste the interface fields as public parameters
  // you can find them in generated/ast.ts
  constructor(public $type: "ArithmeticCondition") {}
  arithmeticexpression: ArithmeticExpression[] = [];
  $container?: AstNode | undefined;
  $containerProperty?: string | undefined;
  $containerIndex?: number | undefined;
  $cstNode?: CstNode | undefined;
  $document?: LangiumDocument<AstNode> | undefined;
  accept(AseRobotVisitor: AseRobotVisitor): any {}
}

export class ArithmeticExpression
  implements ASTInterfaces.ArithmeticExpression
{
  // the constructor must take all attribute of the implemented interface
  // simply copy-paste the interface fields as public parameters
  // you can find them in generated/ast.ts
  constructor(public $type: "ArithmeticExpression") {}
  accept(AseRobotVisitor: AseRobotVisitor): any {}
}

export class BoolExpression implements ASTInterfaces.BoolExpression {
  // the constructor must take all attribute of the implemented interface
  // simply copy-paste the interface fields as public parameters
  // you can find them in generated/ast.ts
  constructor(public $type: "BoolExpression") {}
  accept(AseRobotVisitor: AseRobotVisitor): any {}
}

export class RobotFunc implements ASTInterfaces.RobotFunc {
  // the constructor must take all attribute of the implemented interface
  // simply copy-paste the interface fields as public parameters
  // you can find them in generated/ast.ts
  constructor(public $type: "RobotFunc") {}
  accept(AseRobotVisitor: AseRobotVisitor): any {}
}

export class AssignVar implements ASTInterfaces.AssignVar {
  // the constructor must take all attribute of the implemented interface
  // simply copy-paste the interface fields as public parameters
  // you can find them in generated/ast.ts
  constructor(public $type: "AssignVar") {}
  expression!: Expression;
  var_to_assign!: Var;
  $container?: AstNode | undefined;
  $containerProperty?: string | undefined;
  $containerIndex?: number | undefined;
  $cstNode?: CstNode | undefined;
  $document?: LangiumDocument<AstNode> | undefined;
  accept(AseRobotVisitor: AseRobotVisitor): any {}
}

export class declaVar implements ASTInterfaces.declaVar {
  // the constructor must take all attribute of the implemented interface
  // simply copy-paste the interface fields as public parameters
  // you can find them in generated/ast.ts
  constructor(public $type: "declaVar") {}
  declaName!: string;
  expression!: Expression;
  type!: Type;
  $container?: AstNode | undefined;
  $containerProperty?: string | undefined;
  $containerIndex?: number | undefined;
  $cstNode?: CstNode | undefined;
  $document?: LangiumDocument<AstNode> | undefined;
  accept(AseRobotVisitor: AseRobotVisitor): any {}
}

export class Return implements ASTInterfaces.Return {
  // the constructor must take all attribute of the implemented interface
  // simply copy-paste the interface fields as public parameters
  // you can find them in generated/ast.ts
  constructor(public $type: "Return") {}
  return!: Expression;
  $container?: AstNode | undefined;
  $containerProperty?: string | undefined;
  $containerIndex?: number | undefined;
  $cstNode?: CstNode | undefined;
  $document?: LangiumDocument<AstNode> | undefined;
  accept(AseRobotVisitor: AseRobotVisitor): any {}
}

export class RobotLogic implements ASTInterfaces.RobotLogic {
  // the constructor must take all attribute of the implemented interface
  // simply copy-paste the interface fields as public parameters
  // you can find them in generated/ast.ts
  constructor(public $type: "RobotLogic") {}
  accept(AseRobotVisitor: AseRobotVisitor): any {}
}

export class Bool implements ASTInterfaces.Bool {
  // the constructor must take all attribute of the implemented interface
  // simply copy-paste the interface fields as public parameters
  // you can find them in generated/ast.ts
  constructor(public $type: "Bool") {}
  accept(AseRobotVisitor: AseRobotVisitor): any {}
}

export class Nbr implements ASTInterfaces.Nbr {
  // the constructor must take all attribute of the implemented interface
  // simply copy-paste the interface fields as public parameters
  // you can find them in generated/ast.ts
  constructor(public $type: "Nbr") {}
  accept(AseRobotVisitor: AseRobotVisitor): any {}
}

export class Void implements ASTInterfaces.Void {
  // the constructor must take all attribute of the implemented interface
  // simply copy-paste the interface fields as public parameters
  // you can find them in generated/ast.ts
  constructor(public $type: "Void") {}
  accept(AseRobotVisitor: AseRobotVisitor): any {}
}

export class cm implements ASTInterfaces.cm {
  // the constructor must take all attribute of the implemented interface
  // simply copy-paste the interface fields as public parameters
  // you can find them in generated/ast.ts
  constructor(public $type: "cm") {}
  accept(AseRobotVisitor: AseRobotVisitor): any {}
}

export class mm implements ASTInterfaces.mm {
  // the constructor must take all attribute of the implemented interface
  // simply copy-paste the interface fields as public parameters
  // you can find them in generated/ast.ts
  constructor(public $type: "mm") {}
  accept(AseRobotVisitor: AseRobotVisitor): any {}
}

export class Comparison implements ASTInterfaces.Comparison {
  // the constructor must take all attribute of the implemented interface
  // simply copy-paste the interface fields as public parameters
  // you can find them in generated/ast.ts
  constructor(public $type: "Comparison") {}
  arithmeticexpression!: ArithmeticExpression[];
  $container?: AstNode | undefined;
  $containerProperty?: string | undefined;
  $containerIndex?: number | undefined;
  $cstNode?: CstNode | undefined;
  $document?: LangiumDocument<AstNode> | undefined;
  accept(AseRobotVisitor: AseRobotVisitor): any {}
}

export class And implements ASTInterfaces.And {
  // the constructor must take all attribute of the implemented interface
  // simply copy-paste the interface fields as public parameters
  // you can find them in generated/ast.ts
  constructor(public $type: "And") {}
  condition!: Condition[];
  $containerProperty?: string | undefined;
  $containerIndex?: number | undefined;
  $cstNode?: CstNode | undefined;
  $document?: LangiumDocument<AstNode> | undefined;
  accept(AseRobotVisitor: AseRobotVisitor): any {}
}

export class Or implements ASTInterfaces.Or {
  // the constructor must take all attribute of the implemented interface
  // simply copy-paste the interface fields as public parameters
  // you can find them in generated/ast.ts
  constructor(public $type: "Or") {}
  condition!: Condition[];
  $container?: AstNode | undefined;
  $containerProperty?: string | undefined;
  $containerIndex?: number | undefined;
  $cstNode?: CstNode | undefined;
  $document?: LangiumDocument<AstNode> | undefined;
  accept(AseRobotVisitor: AseRobotVisitor): any {}
}

export class EqualBool implements ASTInterfaces.EqualBool {
  // the constructor must take all attribute of the implemented interface
  // simply copy-paste the interface fields as public parameters
  // you can find them in generated/ast.ts
  constructor(public $type: "EqualBool") {}
  singlevaluebool!: SingleValueBool[];
  $container?: AstNode | undefined;
  $containerProperty?: string | undefined;
  $containerIndex?: number | undefined;
  $cstNode?: CstNode | undefined;
  $document?: LangiumDocument<AstNode> | undefined;
  accept(AseRobotVisitor: AseRobotVisitor): any {}
}

export class NotEqualBool implements ASTInterfaces.NotEqualBool {
  // the constructor must take all attribute of the implemented interface
  // simply copy-paste the interface fields as public parameters
  // you can find them in generated/ast.ts
  constructor(public $type: "NotEqualBool") {}
  singlevaluebool!: SingleValueBool[];
  $container?: AstNode | undefined;
  $containerProperty?: string | undefined;
  $containerIndex?: number | undefined;
  $cstNode?: CstNode | undefined;
  $document?: LangiumDocument<AstNode> | undefined;
  accept(AseRobotVisitor: AseRobotVisitor): any {}
}

export class SingleValueBool implements ASTInterfaces.SingleValueBool {
  // the constructor must take all attribute of the implemented interface
  // simply copy-paste the interface fields as public parameters
  // you can find them in generated/ast.ts
  constructor(public $type: "SingleValueBool") {}
  accept(AseRobotVisitor: AseRobotVisitor): any {}
}

export class ArithmeticOperation implements ASTInterfaces.ArithmeticOperation {
  // the constructor must take all attribute of the implemented interface
  // simply copy-paste the interface fields as public parameters
  // you can find them in generated/ast.ts
  constructor(public $type: "ArithmeticOperation") {}
  $container!: AddExpression | MultExpression;
  $containerProperty?: string | undefined;
  $containerIndex?: number | undefined;
  $cstNode?: CstNode | undefined;
  $document?: LangiumDocument<AstNode> | undefined;
  accept(AseRobotVisitor: AseRobotVisitor): any {}
}

export class SingleValue implements ASTInterfaces.SingleValue {
  // the constructor must take all attribute of the implemented interface
  // simply copy-paste the interface fields as public parameters
  // you can find them in generated/ast.ts
  constructor(public $type: "SingleValue") {}
  accept(AseRobotVisitor: AseRobotVisitor): any {}
}

export class getDistance implements ASTInterfaces.getDistance {
  // the constructor must take all attribute of the implemented interface
  // simply copy-paste the interface fields as public parameters
  // you can find them in generated/ast.ts
  constructor(public $type: "getDistance") {}
  accept(AseRobotVisitor: AseRobotVisitor): any {}
}

export class getTimestamp implements ASTInterfaces.getTimestamp {
  // the constructor must take all attribute of the implemented interface
  // simply copy-paste the interface fields as public parameters
  // you can find them in generated/ast.ts
  constructor(public $type: "getTimestamp") {}
  accept(AseRobotVisitor: AseRobotVisitor): any {}
}

export class setSpeed implements ASTInterfaces.setSpeed {
  // the constructor must take all attribute of the implemented interface
  // simply copy-paste the interface fields as public parameters
  // you can find them in generated/ast.ts
  constructor(public $type: "setSpeed") {}
  speed!: ArithmeticExpression;
  unit!: Unit;
  $container?: AstNode | undefined;
  $containerProperty?: string | undefined;
  $containerIndex?: number | undefined;
  $cstNode?: CstNode | undefined;
  $document?: LangiumDocument<AstNode> | undefined;
  accept(AseRobotVisitor: AseRobotVisitor): any {}
}

export class If implements ASTInterfaces.If {
  // the constructor must take all attribute of the implemented interface
  // simply copy-paste the interface fields as public parameters
  // you can find them in generated/ast.ts
  constructor(public $type: "If") {}
  else?: Else | undefined;
  elseif!: Elseif[];
  condition!: Condition;
  statement!: Statement[];
  $container?: AstNode | undefined;
  $containerProperty?: string | undefined;
  $containerIndex?: number | undefined;
  $cstNode?: CstNode | undefined;
  $document?: LangiumDocument<AstNode> | undefined;
  accept(AseRobotVisitor: AseRobotVisitor): any {}
}

export class Loop implements ASTInterfaces.Loop {
  // the constructor must take all attribute of the implemented interface
  // simply copy-paste the interface fields as public parameters
  // you can find them in generated/ast.ts
  constructor(public $type: "Loop") {}
  condition!: Condition;
  statement!: Statement[];
  $container?: AstNode | undefined;
  $containerProperty?: string | undefined;
  $containerIndex?: number | undefined;
  $cstNode?: CstNode | undefined;
  $document?: LangiumDocument<AstNode> | undefined;
  accept(AseRobotVisitor: AseRobotVisitor): any {}
}

export class Movement implements ASTInterfaces.Movement {
  // the constructor must take all attribute of the implemented interface
  // simply copy-paste the interface fields as public parameters
  // you can find them in generated/ast.ts
  constructor(public $type: "Movement") {}
  expression!: ArithmeticExpression;
  unit1!: Unit;
  $container?: AstNode | undefined;
  $containerProperty?: string | undefined;
  $containerIndex?: number | undefined;
  $cstNode?: CstNode | undefined;
  $document?: LangiumDocument<AstNode> | undefined;
  accept(AseRobotVisitor: AseRobotVisitor): any {}
}

export class Rotation implements ASTInterfaces.Rotation {
  // the constructor must take all attribute of the implemented interface
  // simply copy-paste the interface fields as public parameters
  // you can find them in generated/ast.ts
  constructor(public $type: "Rotation") {}
  angle!: ArithmeticExpression;
  $container?: AstNode | undefined;
  $containerProperty?: string | undefined;
  $containerIndex?: number | undefined;
  $cstNode?: CstNode | undefined;
  $document?: LangiumDocument<AstNode> | undefined;
  accept(AseRobotVisitor: AseRobotVisitor): any {}
}

export class EqualInt implements ASTInterfaces.EqualInt {
  // the constructor must take all attribute of the implemented interface
  // simply copy-paste the interface fields as public parameters
  // you can find them in generated/ast.ts
  constructor(public $type: "EqualInt") {}
  arithmeticexpression!: ArithmeticExpression[];
  $container?: AstNode | undefined;
  $containerProperty?: string | undefined;
  $containerIndex?: number | undefined;
  $cstNode?: CstNode | undefined;
  $document?: LangiumDocument<AstNode> | undefined;
  accept(AseRobotVisitor: AseRobotVisitor): any {}
}

export class NotEqualInt implements ASTInterfaces.NotEqualInt {
  // the constructor must take all attribute of the implemented interface
  // simply copy-paste the interface fields as public parameters
  // you can find them in generated/ast.ts
  constructor(public $type: "NotEqualInt") {}
  arithmeticexpression!: ArithmeticExpression[];
  $container?: AstNode | undefined;
  $containerProperty?: string | undefined;
  $containerIndex?: number | undefined;
  $cstNode?: CstNode | undefined;
  $document?: LangiumDocument<AstNode> | undefined;
  accept(AseRobotVisitor: AseRobotVisitor): any {}
}

export class Greater implements ASTInterfaces.Greater {
  // the constructor must take all attribute of the implemented interface
  // simply copy-paste the interface fields as public parameters
  // you can find them in generated/ast.ts
  constructor(public $type: "Greater") {}
  arithmeticexpression!: ArithmeticExpression[];
  $container?: AstNode | undefined;
  $containerProperty?: string | undefined;
  $containerIndex?: number | undefined;
  $cstNode?: CstNode | undefined;
  $document?: LangiumDocument<AstNode> | undefined;
  accept(AseRobotVisitor: AseRobotVisitor): any {}
}

export class Lower implements ASTInterfaces.Lower {
  // the constructor must take all attribute of the implemented interface
  // simply copy-paste the interface fields as public parameters
  // you can find them in generated/ast.ts
  constructor(public $type: "Lower") {}
  arithmeticexpression!: ArithmeticExpression[];
  $container?: AstNode | undefined;
  $containerProperty?: string | undefined;
  $containerIndex?: number | undefined;
  $cstNode?: CstNode | undefined;
  $document?: LangiumDocument<AstNode> | undefined;
  accept(AseRobotVisitor: AseRobotVisitor): any {}
}

export class ConstBool implements ASTInterfaces.ConstBool {
  // the constructor must take all attribute of the implemented interface
  // simply copy-paste the interface fields as public parameters
  // you can find them in generated/ast.ts
  constructor(public $type: "ConstBool") {}
  BoolValue!: boolean;
  $container?: AstNode | undefined;
  $containerProperty?: string | undefined;
  $containerIndex?: number | undefined;
  $cstNode?: CstNode | undefined;
  $document?: LangiumDocument<AstNode> | undefined;
  accept(AseRobotVisitor: AseRobotVisitor): any {}
}

export class Var implements ASTInterfaces.Var {
  // the constructor must take all attribute of the implemented interface
  // simply copy-paste the interface fields as public parameters
  // you can find them in generated/ast.ts
  constructor(public $type: "Var") {}
  $container!: AssignVar;
  name!: string;
  $containerProperty?: string | undefined;
  $containerIndex?: number | undefined;
  $cstNode?: CstNode | undefined;
  $document?: LangiumDocument<AstNode> | undefined;
  accept(AseRobotVisitor: AseRobotVisitor): any {}
}

/*export class Addition implements ASTInterfaces.Addition {
    // the constructor must take all attribute of the implemented interface
    // simply copy-paste the interface fields as public parameters
    // you can find them in generated/ast.ts
    constructor(public $type: 'Addition'){}
    $container!: Division | Multiplication;
    division!: Division[];
    multiplication!: Multiplication[];
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
    $container!: Addition | Substraction;
    addition!: Addition[];
    singlevalue!: SingleValue[];
    substraction!: Substraction[];
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
    $container!: Addition | Substraction;
    addition!: Addition[];
    singlevalue!: SingleValue[];
    substraction!: Substraction[];
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
    $container!: Division | Multiplication;
    division!: Division[];
    multiplication!: Multiplication[];
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(AseRobotVisitor: AseRobotVisitor) : any {}
}*/

export class ConstInt implements ASTInterfaces.ConstInt {
  // the constructor must take all attribute of the implemented interface
  // simply copy-paste the interface fields as public parameters
  // you can find them in generated/ast.ts
  constructor(public $type: "ConstInt") {}
  integerValue!: number;
  $container?: AstNode | undefined;
  $containerProperty?: string | undefined;
  $containerIndex?: number | undefined;
  $cstNode?: CstNode | undefined;
  $document?: LangiumDocument<AstNode> | undefined;
  accept(AseRobotVisitor: AseRobotVisitor): any {}
}

export class Back implements ASTInterfaces.Back {
  // the constructor must take all attribute of the implemented interface
  // simply copy-paste the interface fields as public parameters
  // you can find them in generated/ast.ts
  constructor(public $type: "Back") {}
  expression!: ArithmeticExpression;
  unit1!: Unit;
  $container?: AstNode | undefined;
  $containerProperty?: string | undefined;
  $containerIndex?: number | undefined;
  $cstNode?: CstNode | undefined;
  $document?: LangiumDocument<AstNode> | undefined;
  accept(AseRobotVisitor: AseRobotVisitor): any {}
}

export class Front implements ASTInterfaces.Front {
  // the constructor must take all attribute of the implemented interface
  // simply copy-paste the interface fields as public parameters
  // you can find them in generated/ast.ts
  constructor(public $type: "Front") {}
  expression!: ArithmeticExpression;
  unit1!: Unit;
  $container?: AstNode | undefined;
  $containerProperty?: string | undefined;
  $containerIndex?: number | undefined;
  $cstNode?: CstNode | undefined;
  $document?: LangiumDocument<AstNode> | undefined;
  accept(AseRobotVisitor: AseRobotVisitor): any {}
}

export class LeftSide implements ASTInterfaces.LeftSide {
  // the constructor must take all attribute of the implemented interface
  // simply copy-paste the interface fields as public parameters
  // you can find them in generated/ast.ts
  constructor(public $type: "LeftSide") {}
  expression!: ArithmeticExpression;
  unit1!: Unit;
  $container?: AstNode | undefined;
  $containerProperty?: string | undefined;
  $containerIndex?: number | undefined;
  $cstNode?: CstNode | undefined;
  $document?: LangiumDocument<AstNode> | undefined;
  accept(AseRobotVisitor: AseRobotVisitor): any {}
}

export class RightSide implements ASTInterfaces.RightSide {
  // the constructor must take all attribute of the implemented interface
  // simply copy-paste the interface fields as public parameters
  // you can find them in generated/ast.ts
  constructor(public $type: "RightSide") {}
  expression!: ArithmeticExpression;
  unit1!: Unit;
  $container?: AstNode | undefined;
  $containerProperty?: string | undefined;
  $containerIndex?: number | undefined;
  $cstNode?: CstNode | undefined;
  $document?: LangiumDocument<AstNode> | undefined;
  accept(AseRobotVisitor: AseRobotVisitor): any {}
}
