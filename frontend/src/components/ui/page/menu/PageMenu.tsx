import { O_DIRECTORY } from 'constants'
import { IMenu, IOrder, IProduct } from '../../../../types'
import { CartFooter } from '../../atoms/CartFooter/CartFooter'
import { CategoryCarousel } from '../../atoms/CategoryCarousel/CategoryCarousel'
import { PaymentForm } from '../../atoms/PaymentForm/PaymentForm'
import { ProductList } from '../../atoms/ProductList/ProductList'
import { Totalizer } from '../../atoms/Totalizer/Totalizer'

export interface PageMenuProps {
  menu: IMenu,
  order: IOrder,
  imagesBaseUrl: string
}

export const PageMenu = function (props: PageMenuProps) {
  return <div>
    <CategoryCarousel
      categories={props.menu.categories}
      imagesBaseUrl={props.imagesBaseUrl}/>
    <Totalizer total={props.order.total || 0} />
    <ProductList
      checkout={false}
      imagesBaseUrl={props.imagesBaseUrl}
      items={props.menu.items}/>
    <CartFooter order={props.order}/>
  </div>
}

function productsInCart(order: IOrder, menu: IMenu): IProduct[] {
  if (!order) return [];
  return menu.items.filter((product) => order.items.find((it) => it.product_id == product.id));
}