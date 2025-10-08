import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions,ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import * as zxcvbn from 'zxcvbn'

@Injectable()
@ValidatorConstraint({ async: true })
    export class StrongPassValidator implements ValidatorConstraintInterface {
        constructor() {}

        async validate(value: any, validationArguments?: ValidationArguments): Promise <boolean> {
            const result = zxcvbn(value);
            var validarSenha =result.score >= 3;
            return validarSenha;
        }
    }

    export const SenhaForte = (opcoesValidacao: ValidationOptions) => {
        return (objeto: Object, propriedades: string) => {
            registerDecorator({
                target: objeto.constructor,
                propertyName: propriedades,
                options: opcoesValidacao,
                constraints: [],
                validator: StrongPassValidator
            });
        }
    }
