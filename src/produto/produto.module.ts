import { Module } from '@nestjs/common';
import { ProdutoService } from './produto.services';
import { ProdutoEntityRepository } from './produto.repository';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [ProdutoService, ProdutoEntityRepository],
  exports: [ProdutoService],
})
export class ProdutoModule {}
