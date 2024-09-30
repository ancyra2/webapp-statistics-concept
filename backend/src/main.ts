import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  // NestJS uygulamasını oluştur
  const app = await NestFactory.create(AppModule);

  // Swagger yapılandırmasını tanımla
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();

  // Swagger dokümanını oluştur
  const document = SwaggerModule.createDocument(app, config);

  // Swagger arayüzünü '/api' yoluna kur
  SwaggerModule.setup('api', app, document);

  // Uygulamayı 3000 portunda başlat
  await app.listen(3000);
}
bootstrap();
