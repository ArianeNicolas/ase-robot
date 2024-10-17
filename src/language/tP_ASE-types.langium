import 'XMLType-types'

interface Program {
	Func: Func[]
}

interface Func {
	statement: Statement[]
	name: Str
	^type: Type
	parameter: Parameter[]
}

interface Statement {
}

interface Type {
}

interface Parameter {
	name: Str
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
	expression: ArithmeticExpression
	unit1: Unit
}

interface RobotLogic extends Statement {
}

interface Back extends Movement {
}

interface RightSide extends Movement {
}

interface Rotation extends RobotLogic {
	angle: ArithmeticExpression
}

interface setSpeed extends RobotFunc {
	unit: Unit
	speed: ArithmeticExpression
}

interface RobotFunc extends RobotLogic, Expression {
}

interface getDistance extends RobotFunc {
}

interface getTimestamp extends RobotFunc {
}

interface declaVar extends Statement {
	^type: Type
	declaName: Str
	expression: Expression
}

interface FunCall extends Statement, SingleValue, SingleValueBool {
	callName: Str
	parameters: Expression[]
}

interface SingleValue extends ArithmeticExpression {

}

interface Return extends Statement {
	expression: Expression
}

interface AssignVar extends Statement {
	var_to_assign: Var
	expression: Expression
}

interface Var extends SingleValue, SingleValueBool {
	name: Str
}

interface LeftSide extends Movement {
}

interface ArithmeticCondition extends Condition {
	arithmeticexpression: ArithmeticExpression[]
}
interface Comparison extends ArithmeticCondition {

}
interface Lower extends Comparison {
}

interface Greater extends Comparison {
}

interface EqualInt extends Comparison {
}
interface NotEqualInt extends Comparison {
}

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
	integerValue?: number
}

interface Addition extends ArithmeticOperation {
	multiplication?: Multiplication[]
	division?: Division[]
}

interface Substraction extends ArithmeticOperation {
	multiplication?: Multiplication[]
	division?: Division[]
}
interface ArithmeticOperation extends ArithmeticExpression {
	
}

interface Multiplication extends ArithmeticOperation {
	singlevalue?: SingleValue[]
	addition?: Addition[]
	substraction?: Substraction[]
}

interface Division extends ArithmeticOperation {
	singlevalue?: SingleValue[]
	addition?: Addition[]
	substraction?: Substraction[]
}

interface ConstBool extends SingleValueBool {
	BoolValue?: boolean
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

