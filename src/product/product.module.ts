import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './product.controller';
import { ProductDto, ProductSchema } from './utils/product.dto';
import { ProductService } from './product.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: ProductDto.name, schema: ProductSchema }])],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
