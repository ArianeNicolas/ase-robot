/*import type { ValidationAcceptor, ValidationChecks } from 'langium';
import type { AseRobotAstType } from './generated/ast.js';
import type { AseRobotServices } from './ase-robot-module.js';*/

/**
 * Register custom validation checks.
 */
/*export function registerValidationChecks(services: AseRobotServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.AseRobotValidator;
    const checks: ValidationChecks<AseRobotAstType> = {
        Person: validator.checkPersonStartsWithCapital
    };
    registry.register(checks, validator);
}*/

/**
 * Implementation of custom validations.
 */
export class AseRobotValidator {

    /*checkPersonStartsWithCapital(person: Person, accept: ValidationAcceptor): void {
        if (person.name) {
            const firstChar = person.name.substring(0, 1);
            if (firstChar.toUpperCase() !== firstChar) {
                accept('warning', 'Person name should start with a capital.', { node: person, property: 'name' });
            }
        }
    }*/

}
