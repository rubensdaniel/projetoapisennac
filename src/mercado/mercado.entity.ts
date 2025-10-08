import { randomUUID } from 'crypto';

export class MercadoEntity {
  id: string;
  nome: string;
  endereco: string;

  constructor(nome: string, endereco: string) {
    this.id = randomUUID();
    this.nome = nome;
    this.endereco = endereco;
  }
}
