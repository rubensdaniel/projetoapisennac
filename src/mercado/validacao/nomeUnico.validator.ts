import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { MercadosArmazenados } from '../mercado.dm';

@Injectable()
@ValidatorConstraint({ async: true })
export class NomeUnicoMercadoValidator implements ValidatorConstraintInterface {
  constructor(private readonly mercados: MercadosArmazenados) {}

  async validate(nome: any, args: ValidationArguments): Promise<boolean> {
    if (typeof nome !== 'string') return false;
    const existe = await this.mercados.nomeJaExiste(nome);
    return !existe;
  }

  defaultMessage(args: ValidationArguments) {
    return `Já existe um mercado com o nome "${args.value}"`;
  }
}

export const NomeUnico = (validationOptions?: ValidationOptions) => {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: NomeUnicoMercadoValidator,
    });
  };
};
