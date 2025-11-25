import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.services';
import { ProdutoNormalizado } from './entities/produto-normalizado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProdutoNormalizado])],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
