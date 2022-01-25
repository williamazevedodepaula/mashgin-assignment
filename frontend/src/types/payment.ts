export interface IPayment {
  paymentMethod: string
  network?: string
  cardNumber?: string
  cardSecurityCode?: string
  pixCode?: string
}