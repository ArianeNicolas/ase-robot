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

interface Condition extends BoolExpression {
	expression: Expression[]
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

interface FunCall extends Statement, ArithmeticExpression, BoolExpression {
	name?: Str
}

interface Return extends Statement {
	expression: Expression
}

interface AssignVar extends Statement {
	var: Var
	expression: Expression
}

interface Var extends ArithmeticExpression, BoolExpression {
	name?: Str
}

interface LeftSide extends Movement {
}

interface Lower extends ArithmeticCondition {
}

interface ArithmeticCondition extends Condition {
	arithmeticexpression: ArithmeticExpression[]
}

interface Greater extends ArithmeticCondition {
}

interface Equal extends ArithmeticCondition, BoolCondition {
}

interface BoolCondition extends Condition, BoolExpression {
}

interface NotEqual extends ArithmeticCondition, BoolCondition {
}

interface And extends BoolCondition {
}

interface Or extends BoolCondition {
}

interface ConstInt extends ArithmeticExpression {
	integerValue?: Int
}

interface Addition extends ArithmeticOperation {
}

interface ArithmeticOperation extends ArithmeticExpression {
	arithmeticexpression: ArithmeticExpression[]
}

interface Substraction extends ArithmeticOperation {
}

interface Multiplication extends ArithmeticOperation {
}

interface Division extends ArithmeticOperation {
}

interface ConstBool extends BoolExpression {
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

