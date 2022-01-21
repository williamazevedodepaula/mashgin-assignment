import { Menu } from '../../model';

export interface IMenuService{
  fetchMenu():Promise<Menu>
}