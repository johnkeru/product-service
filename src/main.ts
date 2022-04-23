import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import {Logger} from '@nestjs/common';

const logger = new Logger('Product 🛒');

async function bootstrap() {
  const isprod = process.env.PROD ? await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,{
    transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBIT_MQ_URL || 'amqps://eoayjqkg:pHq77ZZcEV1f08J67xO1HHNGfSGTcCbB@shrimp.rmq.cloudamqp.com/eoayjqkg'],
        queue: 'product_queue',
        queueOptions: {
          durable: false
        },
      },
  }) : 
  await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,{
    transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 8000
      },
  });

  const app = isprod
  app.listen();
  logger.log('Product service is listening...');
}
bootstrap();
