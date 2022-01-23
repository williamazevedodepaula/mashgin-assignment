import { OrderItem, Payment } from '.';

export interface Order {
  id?: string
  total?: number
  payment: Payment
  items: OrderItem[]
}