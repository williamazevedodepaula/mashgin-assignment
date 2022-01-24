import { IProduct } from '../../../../types'
import { Product } from '../Product/Product'
export interface ProductListProps {
  items: IProduct[],
  checkout: boolean,
  imagesBaseUrl: string,
}

export const ProductList = (props: ProductListProps) => {
  return <div>
    Product List
    <ul>
      {props.items.map((product: IProduct, index: number) =>
        <li><Product
          key={index}
          checkout={props.checkout}
          imagesBaseUrl={props.imagesBaseUrl}
          {...product}
        />)
        </li>
      )}
    </ul>

  </div>
}