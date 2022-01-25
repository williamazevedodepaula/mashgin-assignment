import { IProduct } from '../../../../types'
import { Product } from '../Product/Product'
export interface ProductListProps {
  items: IProduct[],
  checkout: boolean,
  imagesBaseUrl: string,
}

export const ProductList = (props: ProductListProps) => {
  return <div className="d-flex justify-content-start flex-wrap">
    {
      props.items.map((product: IProduct, index: number) =>
      <div className="p-2">
        <Product
          key={index}
          amountInCart={0}//@TODO
          checkout={props.checkout}
          imagesBaseUrl={props.imagesBaseUrl}
          {...product}
        />
        </div>)
    }
  </div>
}