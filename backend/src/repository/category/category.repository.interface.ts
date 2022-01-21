import { Category } from '../../model';

export interface ICategoryRepository{
  listCategories():Promise<Category[]>
}