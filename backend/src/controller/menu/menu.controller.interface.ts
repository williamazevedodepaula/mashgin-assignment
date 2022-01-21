import { Menu } from '../../model';

export interface IMenuController{
  fetchMenu():Promise<Menu>
}