import { IOrderItem, IPayment } from '.';

export interface IOrder {
  id?: string
  total?: number
  payment?: IPayment
  items: IOrderItem[]
}