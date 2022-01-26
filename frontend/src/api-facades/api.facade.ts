import  axios from 'axios';
import { IMenu, IOrder } from '../types';

export class ApiFacade{
  constructor(
    private baseUrl:string
  ){}

  async fetchMenu():Promise<IMenu>{
    const { data } = await axios.get(`${this.baseUrl}/menu`);
    return data || [];
  }

  async saveOrder(order:IOrder):Promise<IOrder>{
    const { data } = await axios.post(`${this.baseUrl}/orders`,order,{headers:{

    }});
    return data || [];
  }
}