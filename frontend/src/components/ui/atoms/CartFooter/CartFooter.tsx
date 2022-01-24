import { IOrder } from '../../../../types'

export interface CartFooterProps{
  order:IOrder
}

export const CartFooter = (props:CartFooterProps)=>{
  return <div>Display the Cart Footer</div>
}