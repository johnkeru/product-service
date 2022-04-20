import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { ProductDocument } from './utils/product.dto';
import { ProductService } from './product.service';
import { ProductResponse } from './utils/product.response';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}
    
    @MessagePattern('products')
    async products({cursor, limit, category, search, guserid}:ProductsInput) {
        return await this.productService.findAll(cursor, limit, category, search, guserid)
    }
    @MessagePattern('product')
    async product(_id: string) {
        return await this.productService.findById(_id);
    }
    @MessagePattern('delete')
    async delete(_id:string):Promise<string>{
        return await this.productService.delete(_id);
    }
    @MessagePattern('create')
    async create(product: ProductDocument):Promise<ProductResponse> {
        return await this.productService.post(product);
    }
    @MessagePattern('update')
    async update(product: ProductDocument):Promise<ProductResponse> {
        return await this.productService.update(product);
    }

    @EventPattern('updateImage')
    async updateImage(data:{img: string, guserid: string}) {
        let {img, guserid} = data
        await this.productService.updateImage(img, guserid);
    }
    // IS GUSER ONLINE ??

    @EventPattern('guser-online')
    async isGuserOnline(guserEmail: string) {
        await this.productService.isGuserOnline(guserEmail);
    }
    @EventPattern('guser-offline')
    async isGuserOffline(guserEmail: string) {
        await this.productService.isGuserOffline(guserEmail);
    }

    // COMMENTS AREA....

    @EventPattern('addComment')
    async addComment(_id:string){
        await this.productService.addComment(_id);
    }

    @EventPattern('removeComment')
    async removeComment(_id:string){
        await this.productService.removeComment(_id);
    }
}
