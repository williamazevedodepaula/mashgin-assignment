import { IPayment } from '../../../../types'

export interface PaymentFormProps{
  onSubmitPayment:(payment:IPayment)=>void
}

export const PaymentForm = (props:PaymentFormProps)=>{
  return <div>Display the Payment Form</div>
}