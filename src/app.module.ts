import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';

const dburl = process.env.PROD ? 
  'mongodb+srv://kerutman:bXqvqNY6sL5fNdAz@bigway.dqi7m.mongodb.net/product?retryWrites=true&w=majority' : 
  'mongodb://127.0.0.1:27017'

@Module({
  imports: [
    MongooseModule.forRoot(dburl),
    ProductModule,
  ],
})
export class AppModule {}
