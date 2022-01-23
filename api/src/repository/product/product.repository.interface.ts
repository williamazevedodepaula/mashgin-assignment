import { Product } from '../../model';

export interface IProductRepository{
  listProducts():Promise<Product[]>
  findProductById(id:number|string):Promise<Product|undefined>
}