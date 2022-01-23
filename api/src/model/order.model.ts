import { OrderItem, Payment } from '.';

export interface Order {
  id: number
  total: number
  payment: Payment
  items: OrderItem[]
}