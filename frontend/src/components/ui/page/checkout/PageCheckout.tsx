import { IMenu, IOrder, IPayment, IProduct } from '../../../../types'
import { PaymentForm } from '../../atoms/PaymentForm/PaymentForm'
import { ProductList } from '../../atoms/ProductList/ProductList'
import { Totalizer } from '../../atoms/Totalizer/Totalizer'

export interface PageCheckoutProps {
  menu: IMenu,
  order: IOrder,
  imagesBaseUrl: string
  onGoToCheckoutClick:()=>void
  onClearCartClick:()=>void
  onAddProduct: (product:IProduct) => void
  onRemoveProduct: (product:IProduct) => void
}

export const PageCheckout = function (props: PageCheckoutProps) {

  const handleSubmitPayment = (payment:IPayment)=>{

  }

  return <div>
    <Totalizer
      order={props.order}
      onClearCartClick={props.onClearCartClick}
      onGoToCheckoutClick={props.onGoToCheckoutClick}/>
    <PaymentForm onSubmitPayment={handleSubmitPayment}/>
    <ProductList
      checkout={false}
      imagesBaseUrl={props.imagesBaseUrl}
      items={productsInCart(props.order,props.menu)}
      itemsInCart={props.order.items||[]}
      onAddProduct={props.onAddProduct}
      onRemoveProduct={props.onRemoveProduct}
      />
  </div>
}

function productsInCart(order: IOrder, menu: IMenu): IProduct[] {
  if (!order) return [];
  return menu.items.filter((product) => order.items.find((it) => it.product_id == product.id));
}
