import { IMenu, IOrder, IPayment, IProduct } from '../../../../types'
import { PaymentForm } from '../../atoms/PaymentForm/PaymentForm'
import { ProductList } from '../../atoms/ProductList/ProductList'
import { TopBar } from '../../atoms/TopBar/TopBar'
import { Totalizer } from '../../atoms/Totalizer/Totalizer'

export interface PageCheckoutProps {
  menu: IMenu,
  order: IOrder,
  imagesBaseUrl: string
  onGoToCheckoutClick:()=>void
  onClearCartClick:()=>void
  onAddProduct: (product:IProduct) => void
  onRemoveProduct: (product:IProduct) => void
  onKeepBuyingClick: () => void
  onFinishOrder:(order:IOrder)=> void
  onBackClick:()=> void
}

export const PageCheckout = function (props: PageCheckoutProps) {

  const handleSubmitPayment = (payment:IPayment)=>{
    const orderToSubmit = Object.assign(props.order);
    orderToSubmit.payment = payment;

    props.onFinishOrder(orderToSubmit);
  }

  const itemsCount = props.order?.items?.length||0;

  return <div>
    <TopBar title="Mashgin - Checkout" onBackClick={props.onBackClick}/>

    <Totalizer
      checkout={true}
      order={props.order}
      onClearCartClick={props.onClearCartClick}
      onGoToCheckoutClick={props.onGoToCheckoutClick}
      onKeepBuyingClick={props.onKeepBuyingClick}/>

    <div className="m-5">
      <PaymentForm onSubmitPayment={handleSubmitPayment}/>
    </div>

    <h4>You have {itemsCount} itens in your cart:</h4>
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
