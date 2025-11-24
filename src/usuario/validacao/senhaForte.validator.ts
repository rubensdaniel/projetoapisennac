import { Injectable } from "@nestjs/common";
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import * as zxcvbn from "zxcvbn";

@Injectable()
@ValidatorConstraint({ async: true })
export class StrongPassValidator implements ValidatorConstraintInterface {
  async validate(value: any, _args?: ValidationArguments): Promise<boolean> {
    if (!value) return false;

    const result = zxcvbn(value);
    return result.score >= 3; // força a senha a ser média ou forte
  }

  defaultMessage(_args?: ValidationArguments): string {
    return "A senha deve ser mais forte";
  }
}

// Decorator
export const SenhaForte = (opcoesValidacao?: ValidationOptions) => {
  return (objeto: Object, propriedade: string) => {
    registerDecorator({
      target: objeto.constructor,
      propertyName: propriedade,
      options: opcoesValidacao,
      constraints: [],
      validator: StrongPassValidator,
    });
  };
};
