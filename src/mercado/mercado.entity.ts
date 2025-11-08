// import { randomUUID } from 'crypto';

// export class MercadoEntity {
//   id: string;
//   nome: string;
//   endereco: string;

//   constructor(nome: string, endereco: string) {
//     this.id = randomUUID();
//     this.nome = nome;
//     this.endereco = endereco;
//   }
// }

import { randomUUID } from 'crypto';

export class MercadoEntity {
  id: string;
  nome: string;
  endereco: string;
  telefone: string;
  email: string;
  rua: string;
  numero: string;
  bairro: string;
  cep: string;

  constructor(
    nome: string,
    endereco: string,
    telefone: string,
    email: string,
    rua: string,
    numero: string,
    bairro: string,
    cep: string
  ) {
    this.id = randomUUID();
    this.nome = nome;
    this.endereco = endereco;
    this.telefone = telefone;
    this.email = email;
    this.rua = rua;
    this.numero = numero;
    this.bairro = bairro;
    this.cep = cep;
  }
}

