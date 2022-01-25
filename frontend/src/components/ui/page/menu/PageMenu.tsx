import { O_DIRECTORY } from 'constants'
import { ICategory, IMenu, IOrder, IProduct } from '../../../../types'
import { ProductList } from '../../atoms/ProductList/ProductList'
import { TopBar } from '../../atoms/TopBar/TopBar'
import { Totalizer } from '../../atoms/Totalizer/Totalizer'

export interface PageMenuProps {
  menu: IMenu,
  order: IOrder,
  selectedCategory:ICategory
  imagesBaseUrl: string,
  onGoToCheckoutClick:()=>void
  onClearCartClick:()=>void
  onAddProduct: (product:IProduct) => void
  onRemoveProduct: (product:IProduct) => void
}

export const PageMenu = function (props: PageMenuProps) {
  return <div>
    <TopBar title={`Mashgin - Home / ${props.selectedCategory?.name}`}/>
    <Totalizer
      order={props.order}
      onClearCartClick={props.onClearCartClick}
      onGoToCheckoutClick={props.onGoToCheckoutClick} />
    <ProductList
      checkout={false}
      imagesBaseUrl={props.imagesBaseUrl}
      items={filterCategory(props.menu.items,props.selectedCategory?.id)}
      itemsInCart={props.order.items||[]}
      onAddProduct={props.onAddProduct}
      onRemoveProduct={props.onRemoveProduct}
      />
  </div>
}

function filterCategory(products: IProduct[],categoryId?:string|number): IProduct[] {
  if (!categoryId) return products;
  return products.filter((product) => product.category_id == categoryId);
}