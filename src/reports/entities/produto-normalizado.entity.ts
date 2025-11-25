import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('produtos_normalizados')
export class ProdutoNormalizado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  mercado: string;

  @Column({ length: 50 })
  marca: string;

  @Column({ length: 20 })
  peso: string;

  @Column()
  nome_original: string;

  @Column()
  nome_limpo: string;

  @Column()
  nome_ordenado: string;

  @Column()
  url: string;

  @Column('decimal', { precision: 10, scale: 2 })
  preco: number;

  @Column()
  image: string;

  @Column({ type: 'datetime' })
  coletado_em: Date;
}
