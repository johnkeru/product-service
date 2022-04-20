import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';

const dburl = 'mongodb+srv://kerutman:bXqvqNY6sL5fNdAz@bigway.dqi7m.mongodb.net/product?retryWrites=true&w=majority'

@Module({
  imports: [
    MongooseModule.forRoot(dbUrl),
    ProductModule,
  ],
})
export class AppModule {}
