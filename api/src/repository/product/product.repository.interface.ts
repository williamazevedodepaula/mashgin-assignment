import { Product } from '../../model';

export interface IProductRepository{
  listProducts():Promise<Product[]>
}