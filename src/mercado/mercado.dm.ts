import { Injectable } from '@nestjs/common';
import { MercadoEntity } from './mercado.entity';

@Injectable()
export class MercadosArmazenados {
  #mercados: MercadoEntity[] = [];

  adicionarMercado(mercado: MercadoEntity) {
    this.#mercados.push(mercado);
  }

  async nomeJaExiste(nome: string): Promise<boolean> {
    const mercadoEncontrado = this.#mercados.find(
      mercado => mercado.nome.toLowerCase() === nome.toLowerCase(),
    );
    return mercadoEncontrado !== undefined;
  }

  private buscaPorID(id: string): MercadoEntity {
    const mercado = this.#mercados.find(m => m.id === id);
    if (!mercado) {
      throw new Error('Mercado não encontrado');
    }
    return mercado;
  }

  async buscarMercado(id: string): Promise<MercadoEntity> {
    return this.buscaPorID(id);
  }

  async removeMercado(id: string): Promise<MercadoEntity> {
    const mercado = this.buscaPorID(id);
    this.#mercados = this.#mercados.filter(m => m.id !== id);
    return mercado;
  }

  async atualizaMercado(
    id: string,
    dados: Partial<MercadoEntity>,
  ): Promise<MercadoEntity> {
    const mercado = this.buscaPorID(id);

    Object.entries(dados).forEach(([chave, valor]) => {
      if (chave === 'id') return;
      if (valor === undefined) return;
      mercado[chave] = valor;
    });

    return mercado;
  }

  get mercados(): MercadoEntity[] {
    return this.#mercados;
  }
}
