
import type { ValidationAcceptor, ValidationChecks } from 'langium';
import type { AseRobotAstType } from './generated/ast.js';
import * as InterfaceAST from './generated/ast.js';
import * as ClassAST from './visitor.js';
import { AseRobotVisitor } from './visitor.js';
import type { AseRobotServices } from './ase-robot-module.js';

/**
 * Register custom validation checks.
 * TODO : Call this function in the language module.ts file (see registerValidationChecks(...);)
 */
export function weaveAcceptMethods(services: AseRobotServices) {
    const registry = services.validation.ValidationRegistry;
    const weaver = services.validation.AseRobotAcceptWeaver
    registry.register(weaver.checks, weaver);
}

export class AseRobotAcceptWeaver {
    
    // TODO : Remove lines for abstract concepts
    checks: ValidationChecks<AseRobotAstType> = {
        Condition : this.weaveCondition,
		Else : this.weaveElse,
		Elseif : this.weaveElseif,
		Expression : this.weaveExpression,
		Func : this.weaveFunc,
		Program : this.weaveProgram,
		ArithmeticExpression : this.weaveArithmeticExpression,
		ControlStructure : this.weaveControlStructure,
		Parameter : this.weaveParameter,
		Statement : this.weaveStatement,
		Type : this.weaveType,
		Unit : this.weaveUnit,
		FunCall : this.weaveFunCall,
		BoolCondition : this.weaveBoolCondition,
		BoolExpression : this.weaveBoolExpression,
		RobotFunc : this.weaveRobotFunc,
		AssignVar : this.weaveAssignVar,
		declaVar : this.weavedeclaVar,
		Return : this.weaveReturn,
		RobotLogic : this.weaveRobotLogic,
		Bool : this.weaveBool,
		Nbr : this.weaveNbr,
		Void : this.weaveVoid,
		cm : this.weavecm,
		mm : this.weavemm,
		Comparison : this.weaveComparison,
		And : this.weaveAnd,
		Or : this.weaveOr,
		EqualBool : this.weaveEqualBool,
		NotEqualBool : this.weaveNotEqualBool,
		SingleValueBool : this.weaveSingleValueBool,
		ArithmeticOperation : this.weaveArithmeticOperation,
		SingleValue : this.weaveSingleValue,
		getDistance : this.weavegetDistance,
		getTimestamp : this.weavegetTimestamp,
		setSpeed : this.weavesetSpeed,
		If : this.weaveIf,
		Loop : this.weaveLoop,
		Movement : this.weaveMovement,
		Rotation : this.weaveRotation,
		EqualInt : this.weaveEqualInt,
		NotEqualInt : this.weaveNotEqualInt,
		Greater : this.weaveGreater,
		Lower : this.weaveLower,
		ConstBool : this.weaveConstBool,
		Var : this.weaveVar,
		Addition : this.weaveAddition,
		Division : this.weaveDivision,
		Multiplication : this.weaveMultiplication,
		Substraction : this.weaveSubstraction,
		ConstInt : this.weaveConstInt,
		Back : this.weaveBack,
		Front : this.weaveFront,
		LeftSide : this.weaveLeftSide,
		RightSide : this.weaveRightSide
    };

    
weaveCondition(node : InterfaceAST.Condition, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.visitCondition(node as unknown as ClassAST.Condition); }
}

weaveElse(node : InterfaceAST.Else, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.visitElse(node as unknown as ClassAST.Else); }
}

weaveElseif(node : InterfaceAST.Elseif, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.visitElseif(node as unknown as ClassAST.Elseif); }
}

weaveExpression(node : InterfaceAST.Expression, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.visitExpression(node as unknown as ClassAST.Expression); }
}

weaveFunc(node : InterfaceAST.Func, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.visitFunc(node as unknown as ClassAST.Func); }
}

weaveProgram(node : InterfaceAST.Program, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.visitProgram(node as unknown as ClassAST.Program); }
}


weaveControlStructure(node : InterfaceAST.ControlStructure, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.visitControlStructure(node as unknown as ClassAST.ControlStructure); }
}

weaveParameter(node : InterfaceAST.Parameter, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.visitParameter(node as unknown as ClassAST.Parameter); }
}

weaveStatement(node : InterfaceAST.Statement, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.visitStatement(node as unknown as ClassAST.Statement); }
}

weaveType(node : InterfaceAST.Type, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.visitType(node as unknown as ClassAST.Type); }
}

weaveUnit(node : InterfaceAST.Unit, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.visitUnit(node as unknown as ClassAST.Unit); }
}

weaveFunCall(node : InterfaceAST.FunCall, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.visitFunCall(node as unknown as ClassAST.FunCall); }
}

weaveBoolCondition(node : InterfaceAST.BoolCondition, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.visitBoolCondition(node as unknown as ClassAST.BoolCondition); }
}

weaveArithmeticExpression(node : InterfaceAST.ArithmeticExpression, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.visitArithmeticExpression(node as unknown as ClassAST.ArithmeticExpression); }
}

weaveBoolExpression(node : InterfaceAST.BoolExpression, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.visitBoolExpression(node as unknown as ClassAST.BoolExpression); }
}

weaveRobotFunc(node : InterfaceAST.RobotFunc, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.visitRobotFunc(node as unknown as ClassAST.RobotFunc); }
}

weaveAssignVar(node : InterfaceAST.AssignVar, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.visitAssignVar(node as unknown as ClassAST.AssignVar); }
}

weavedeclaVar(node : InterfaceAST.declaVar, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.visitdeclaVar(node as unknown as ClassAST.declaVar); }
}

weaveReturn(node : InterfaceAST.Return, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.visitReturn(node as unknown as ClassAST.Return); }
}

weaveRobotLogic(node : InterfaceAST.RobotLogic, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.visitRobotLogic(node as unknown as ClassAST.RobotLogic); }
}

weaveBool(node : InterfaceAST.Bool, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.visitBool(node as unknown as ClassAST.Bool); }
}

weaveNbr(node : InterfaceAST.Nbr, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.visitNbr(node as unknown as ClassAST.Nbr); }
}

weaveVoid(node : InterfaceAST.Void, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.visitVoid(node as unknown as ClassAST.Void); }
}

weavecm(node : InterfaceAST.cm, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.visitcm(node as unknown as ClassAST.cm); }
}

weavemm(node : InterfaceAST.mm, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.visitmm(node as unknown as ClassAST.mm); }
}

weaveComparison(node : InterfaceAST.Comparison, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.visitComparison(node as unknown as ClassAST.Comparison); }
}

weaveAnd(node : InterfaceAST.And, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.visitAnd(node as unknown as ClassAST.And); }
}

weaveOr(node : InterfaceAST.Or, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.AseRobotVisitor(node as unknown as ClassAST.Or); }
}

weaveEqualBool(node : InterfaceAST.EqualBool, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.visitEqualBool(node as unknown as ClassAST.EqualBool); }
}

weaveNotEqualBool(node : InterfaceAST.NotEqualBool, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.visitNotEqualBool(node as unknown as ClassAST.NotEqualBool); }
}

weaveSingleValueBool(node : InterfaceAST.SingleValueBool, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.visitSingleValueBool(node as unknown as ClassAST.SingleValueBool); }
}

weaveArithmeticOperation(node : InterfaceAST.ArithmeticOperation, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.visitArithmeticOperation(node as unknown as ClassAST.ArithmeticOperation); }
}

weaveSingleValue(node : InterfaceAST.SingleValue, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.visitSingleValue(node as unknown as ClassAST.SingleValue); }
}

weavegetDistance(node : InterfaceAST.getDistance, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.visitgetDistance(node as unknown as ClassAST.getDistance); }
}

weavegetTimestamp(node : InterfaceAST.getTimestamp, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.visitgetTimestamp(node as unknown as ClassAST.getTimestamp); }
}

weavesetSpeed(node : InterfaceAST.setSpeed, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.visitsetSpeed(node as unknown as ClassAST.setSpeed); }
}

weaveIf(node : InterfaceAST.If, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.visitIf(node as unknown as ClassAST.If); }
}

weaveLoop(node : InterfaceAST.Loop, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.visitLoop(node as unknown as ClassAST.Loop); }
}

weaveMovement(node : InterfaceAST.Movement, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.visitMovement(node as unknown as ClassAST.Movement); }
}

weaveRotation(node : InterfaceAST.Rotation, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.visitRotation(node as unknown as ClassAST.Rotation); }
}

weaveEqualInt(node : InterfaceAST.EqualInt, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.visitEqualInt(node as unknown as ClassAST.EqualInt); }
}

weaveNotEqualInt(node : InterfaceAST.NotEqualInt, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.visitNotEqualInt(node as unknown as ClassAST.NotEqualInt); }
}

weaveGreater(node : InterfaceAST.Greater, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.visitGreater(node as unknown as ClassAST.Greater); }
}

weaveLower(node : InterfaceAST.Lower, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.visitLower(node as unknown as ClassAST.Lower); }
}

weaveConstBool(node : InterfaceAST.ConstBool, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.visitConstBool(node as unknown as ClassAST.ConstBool); }
}

weaveVar(node : InterfaceAST.Var, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.visitVar(node as unknown as ClassAST.Var); }
}

weaveAddition(node : InterfaceAST.Addition, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.visitAddition(node as unknown as ClassAST.Addition); }
}

weaveDivision(node : InterfaceAST.Division, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.visitDivision(node as unknown as ClassAST.Division); }
}

weaveMultiplication(node : InterfaceAST.Multiplication, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.visitMultiplication(node as unknown as ClassAST.Multiplication); }
}

weaveSubstraction(node : InterfaceAST.Substraction, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.visitSubstraction(node as unknown as ClassAST.Substraction); }
}

weaveConstInt(node : InterfaceAST.ConstInt, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.visitConstInt(node as unknown as ClassAST.ConstInt); }
}

weaveBack(node : InterfaceAST.Back, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.visitBack(node as unknown as ClassAST.Back); }
}

weaveFront(node : InterfaceAST.Front, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.visitFront(node as unknown as ClassAST.Front); }
}

weaveLeftSide(node : InterfaceAST.LeftSide, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.visitLeftSide(node as unknown as ClassAST.LeftSide); }
}

weaveRightSide(node : InterfaceAST.RightSide, accept : ValidationAcceptor) : void {
    (<any> node).accept = (AseRobotVisitor: AseRobotVisitor) => { return AseRobotVisitor.visitRightSide(node as unknown as ClassAST.RightSide); }
}


}
