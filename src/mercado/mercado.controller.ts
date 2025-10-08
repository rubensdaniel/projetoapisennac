import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { MercadosArmazenados } from './mercado.dm';
import { MercadoEntity } from './mercado.entity';
import { CriarMercadoDto } from './dto/criaMercado.dto';

@Controller('mercados')
export class MercadoController {
  constructor(private readonly mercadosArmazenados: MercadosArmazenados) {}

  @Post()
  async criar(@Body() dados: CriarMercadoDto): Promise<MercadoEntity> {
    const novoMercado = new MercadoEntity(dados.nome, dados.endereco);
    this.mercadosArmazenados.adicionarMercado(novoMercado);
    return novoMercado;
  }

  @Get()
  async listar(): Promise<MercadoEntity[]> {
    return this.mercadosArmazenados.mercados;
  }

  @Get(':id')
  async buscarPorId(@Param('id') id: string): Promise<MercadoEntity> {
    return this.mercadosArmazenados.buscarMercado(id);
  }

  @Put(':id')
  async atualizar(
    @Param('id') id: string,
    @Body() dados: Partial<MercadoEntity>,
  ): Promise<MercadoEntity> {
    return this.mercadosArmazenados.atualizaMercado(id, dados);
  }

  @Delete(':id')
  async remover(@Param('id') id: string): Promise<MercadoEntity> {
    return this.mercadosArmazenados.removeMercado(id);
  }
}
