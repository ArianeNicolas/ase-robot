import 'XMLType-types'

interface Program {
	Func: Func[]
}

interface Func {
	statement: Statement[]
	name?: Str
	^type: Type
	parameter: Parameter[]
}

interface Statement {
}

interface Type {
}

interface Parameter {
	name?: Str
	^type: Type
}

interface Condition {

}

interface BoolExpression extends Expression {
}

interface Expression {
}

interface Unit {
}

interface ArithmeticExpression extends Expression {
}

interface If extends ControlStructure {
	elseif: Elseif[]
	else?: Else
}

interface Elseif {
	condition: Condition
	statement: Statement[]
}
interface Else {
	statement: Statement[]
}

interface ControlStructure extends Statement {
	condition: Condition
	statement: Statement[]
}

interface Loop extends ControlStructure {
}

interface Front extends Movement {
}

interface Movement extends RobotLogic {
	expression: Expression
	unit1: Unit
}

interface RobotLogic extends Statement {
}

interface Back extends Movement {
}

interface RightSide extends Movement {
}

interface Rotation extends RobotLogic {
	angle?: Int
}

interface setSpeed extends RobotFunc {
	unit: Unit
	speed: Int
}

interface RobotFunc extends RobotLogic, Expression {
}

interface getDistance extends RobotFunc {
}

interface getTimestamp extends RobotFunc {
}

interface declaVar extends Statement {
	^type: Type
	name?: Str
	expression: Expression
}

interface FunCall extends Statement, SingleValue, SingleValueBool {
	name?: Str
	expression: Expression[]
}

interface SingleValue extends ArithmeticExpression {

}

interface Return extends Statement {
	expression: Expression
}

interface AssignVar extends Statement {
	var: Var
	expression: Expression
}

interface Var extends SingleValue, SingleValueBool {
	name?: Str
}

interface LeftSide extends Movement {
}

interface ArithmeticCondition extends Condition {
	arithmeticexpression: ArithmeticExpression[]
}
interface Comparison extends ArithmeticCondition {

}
// interface Lower extends ArithmeticCondition {
// }

// interface Greater extends ArithmeticCondition {
// }

// interface EqualInt extends ArithmeticCondition {
// }
// interface NotEqualInt extends ArithmeticCondition {
// }

interface EqualBool extends BoolCondition {
	singlevaluebool: SingleValueBool[]
}

interface NotEqualBool extends BoolCondition {
	singlevaluebool: SingleValueBool[]
}


interface BoolCondition extends Condition, BoolExpression {
}

interface SingleValueBool extends BoolCondition{}

interface And extends BoolCondition{
	singlevaluebool?: SingleValueBool[]
	comparison?: Comparison[]
}


interface Or extends BoolCondition {
	and?: And[]
	comparison?: Comparison[]
}

interface ConstInt extends SingleValue {
	integerValue?: Int
}

interface Addition extends ArithmeticOperation {
	multiplication: Multiplication[]
}

interface ArithmeticOperation extends ArithmeticExpression {
	
}


interface Multiplication extends ArithmeticOperation {
	singlevalue: SingleValue[]
}


interface ConstBool extends SingleValueBool {
	BoolValue?: Boolean
}

interface mm extends Unit {
}

interface cm extends Unit {
}

interface Nbr extends Type {
}

interface Bool extends Type {
}

interface Void extends Type {
}

