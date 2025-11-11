import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity('produtos_normalizados')
@Index(['nomeLimpo'])
@Index(['mercado'])
@Index(['coletadoEm'])
export class ProdutoEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'mercado', type: 'varchar', length: 50 })
  mercado!: string;

  @Column({ name: 'marca', type: 'varchar', length: 50 })
  marca!: string;

  @Column({ name: 'peso', type: 'varchar', length: 20 })
  peso!: string;

  @Column({ name: 'nome_original', type: 'varchar', length: 255 })
  nomeOriginal!: string;

  @Column({ name: 'nome_limpo', type: 'varchar', length: 255 })
  nomeLimpo!: string;

  @Column({ name: 'nome_ordenado', type: 'varchar', length: 255 })
  nomeOrdenado!: string;

  @Column({ name: 'url', type: 'varchar', length: 255, nullable: true })
  url?: string;

  @Column({ name: 'preco', type: 'decimal', precision: 10, scale: 2 })
  preco!: number;

  @Column({ name: 'image', type: 'varchar', length: 255, nullable: true })
  imagem?: string;

  @Column({ name: 'coletado_em', type: 'datetime' })
  coletadoEm!: Date;
}
