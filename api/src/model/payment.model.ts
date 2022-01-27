export interface Payment {
  paymentMethod: string
  network?: string
  cardNumber?: string
  cardSecurityCode?: string
  pixCode?: string
}