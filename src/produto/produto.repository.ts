import { Injectable, Inject } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { ProdutoEntity } from './produto.entity';

@Injectable()
export class ProdutoEntityRepository extends Repository<ProdutoEntity> {
  constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {
    super(ProdutoEntity, dataSource.createEntityManager());
  }
}
