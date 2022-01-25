import { IOrderItem, IProduct } from '../../../../types'
import { Product } from '../Product/Product'
export interface ProductListProps {
  items: IProduct[],
  checkout: boolean,
  imagesBaseUrl: string,
  itemsInCart:IOrderItem[]
  onAddProduct: (product:IProduct) => void
  onRemoveProduct: (product:IProduct) => void
}

export const ProductList = (props: ProductListProps) => {
  return <div className="d-flex justify-content-start flex-wrap">
    {
      props.items.map((product: IProduct, index: number) =>
      <div className="p-2">
        <Product
          key={index}
          amountInCart={getAmountInCart(product)}
          checkout={props.checkout}
          imagesBaseUrl={props.imagesBaseUrl}
          onPlusClick={()=>props.onAddProduct?.(product)}
          onMinusClick={()=>props.onRemoveProduct?.(product)}
          {...product}
        />
        </div>)
    }
  </div>

  function getAmountInCart(product:IProduct){
    return props.itemsInCart?.filter((it)=>it.product_id == product.id).length||0;
  }
}