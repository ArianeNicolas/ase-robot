import type { ValidationAcceptor, ValidationChecks } from 'langium';
import { AseRobotAstType, AssignVar, declaVar, Func, FunCall, Program, Statement, Type } from './generated/ast.js';
import type { AseRobotServices } from './ase-robot-module.js';
import { ProgramFunction } from './function.js';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: AseRobotServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.AseRobotValidator;
    const checks: ValidationChecks<AseRobotAstType> = {
        Program: validator.checkProgram,
        Func: validator.checkFunction
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class AseRobotValidator {

    
    public vars: Map<string, Type> = new Map<string, Type>();

    checkFunctions(program: Program, accept: ValidationAcceptor): void {
        let knownFunctions: Map<string,ProgramFunction> = new Map<string, ProgramFunction>();
        let functions = program.Func;
        for(const func of functions){
            for(const f of knownFunctions.values()){
                if(f.name === func.name){
                    accept('error','Function already exists', {node: func, property: 'name'});
                }
            }
            let parameters = new Map<string, Type>();

            for(const param of func.parameter){
                parameters.set(param.name, param.type);
            }
            knownFunctions.set(func.name, new ProgramFunction(func.name, parameters, func.type));
        }

        for(const func of functions){
            for (const s of func.statement) {
                if (this.isFunCall(s)) {
                    let exists = false;
                    for(const f of knownFunctions.values()){
                        if(s.callName === f.name){
                            exists = true;
                        }
                    }
                    if(!exists){
                        accept('error','Function doesnt exist', {node: s, property: 'callName'});
                    }
                    else{
                        let f = knownFunctions.get(s.callName);
                        if(f?.parameters.size != s.parameters.length) {
                            accept('error', 'Wrong number of arguments', {node: s, property: 'parameters'});
                        }
                    }
                }
            }
        }
    }

    checkProgram(program: Program, accept: ValidationAcceptor): void {
        this.checkFunctions(program, accept);
    }

    isDeclaVar(object: Statement): object is declaVar {
        return 'declaName' in object;
    }

    isFunCall(object: Statement): object is FunCall {
        return 'callName' in object;
    }

    isAssignVar(object: Statement): object is AssignVar {
        return 'var_to_assign' in object;
    }

    checkAssignVarExist(func: Func, accept: ValidationAcceptor): void {
        let declarations: declaVar[] = [];
        for (const s of func.statement) {
            if (this.isAssignVar(s)) {
                let exists = false;
                for(const d of declarations){
                    if(s.var_to_assign.name === d.declaName){
                        exists = true;
                    }
                }
                if(!exists){
                    accept('error','Variable doesnt exist', {node: s, property: 'var_to_assign'});
                }
            }
            else if (this.isDeclaVar(s)){
                declarations.push(s);
            }
        }
    }

    checkDeclaVar(func: Func, accept: ValidationAcceptor): void {
        let knownVars: string[] = [];
        let variables: declaVar[] = [];
        for (const s of func.statement) {
            if (this.isDeclaVar(s)) {
                variables.push(s);
            }
        }

        for(const v of variables){
            let exists = false;
            for(const knownVar of knownVars){
                if(v.declaName === knownVar){
                    accept('error','Variable already exists', {node: v, property: 'declaName'});
                    exists = true;
                }
            }
            if(!exists) {
                knownVars.push(v.declaName);
            }
            
        }
    }

    checkFunction(func: Func, accept: ValidationAcceptor): void {
        this.checkAssignVarExist(func, accept);
        this.checkDeclaVar(func, accept);
    }

    variableExists(name: string): boolean {
        for(const v of this.vars.keys()){
            if(v === name){
                return true;
            }
        }
        return false;
    }

    /*checkAssignVar(assignVar: AssignVar, accept: ValidationAcceptor): void {
        if (!this.variableExists(assignVar.var.name)){
            accept('error','Variable doesnt exist', {node: assignVar, property: 'var'});
        }
        else {
            let assignation = assignVar.expression;
            if assignation
        }
    }*/



}
