// import { Injectable } from "@nestjs/common";
// import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
// import { UsuariosArmazenados } from "../usuario.service";

// @Injectable()
// @ValidatorConstraint({ async: true })
// export class EmailUnicoValidator implements ValidatorConstraintInterface {
//     constructor(private clsUsuariosArmazenados: UsuariosArmazenados) {}

//     async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
//         const validarEmail = await this.clsUsuariosArmazenados.validaEmail(value);
//         return !validarEmail;
//     }
// }


// export const EmailUnico = (opcoesValidacao: ValidationOptions) => {
//     return (objeto: Object, propriedade: string) => {
//         registerDecorator({
//             target: objeto.constructor,
//             propertyName: propriedade,
//             options: opcoesValidacao,
//             constraints: [],
//             validator: EmailUnicoValidator
//         });
//     }
// }

import { Injectable } from "@nestjs/common";
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { Repository } from "typeorm";
import { Inject } from "@nestjs/common";
import { USUARIO } from "../usuario.entity";

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailUnicoValidator implements ValidatorConstraintInterface {
  constructor(
    @Inject('USUARIO_REPOSITORY')
    private usuarioRepository: Repository<USUARIO>,
  ) {}

  async validate(value: any, _args?: ValidationArguments): Promise<boolean> {
    if (!value) return false;
    const usuario = await this.usuarioRepository.findOne({ where: { EMAIL: value } });
    return !usuario; // retorna true se não existir, false se já cadastrado
  }

  defaultMessage(_args?: ValidationArguments): string {
    return 'Email já cadastrado.';
  }
}

// Decorator
export const EmailUnico = (opcoesValidacao?: ValidationOptions) => {
  return (objeto: Object, propriedade: string) => {
    registerDecorator({
      target: objeto.constructor,
      propertyName: propriedade,
      options: opcoesValidacao,
      constraints: [],
      validator: EmailUnicoValidator,
    });
  };
};
