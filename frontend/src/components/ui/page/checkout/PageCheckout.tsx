import { O_DIRECTORY } from 'constants'
import { useCallback } from 'react'
import { IMenu, IOrder, IPayment, IProduct } from '../../../../types'
import { PaymentForm } from '../../atoms/PaymentForm/PaymentForm'
import { ProductList } from '../../atoms/ProductList/ProductList'
import { Totalizer } from '../../atoms/Totalizer/Totalizer'

export interface PageCheckoutProps {
  menu: IMenu,
  order: IOrder,
  imagesBaseUrl: string
}

export const PageCheckout = function (props: PageCheckoutProps) {

  const handleSubmitPayment = (payment:IPayment)=>{

  }

  return <div>
    <Totalizer total={props.order?.total || 0} />
    <PaymentForm onSubmitPayment={handleSubmitPayment}/>
    <ProductList
      checkout={true}
      imagesBaseUrl={props.imagesBaseUrl}
      items={productsInCart(props.order, props.menu)}/>
  </div>
}

function productsInCart(order: IOrder, menu: IMenu): IProduct[] {
  if (!order) return [];
  return menu.items.filter((product) => order.items.find((it) => it.product_id == product.id));
}
