import { ICategory, IProduct } from '.';

export interface IMenu{
  categories:ICategory[],
  items:IProduct[]
}