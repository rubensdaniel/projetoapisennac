import { NestFactory } from '@nestjs/core';
import { ProdutoModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(ProdutoModule);

  const config = new DocumentBuilder()
    .setTitle('API Produto')
    .setDescription('API de preços de produtos — documentação gerada pelo Swagger')
    .setVersion('1.0')
    .addTag('Produtos')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ? +process.env.PORT : 3000);
}
bootstrap();
