import { ICategory, IProduct } from '../../../../types'
import { Category } from '../Category/Category'
import { Product } from '../Product/Product'
export interface CategoryCarouselProps {
  categories: ICategory[],
  imagesBaseUrl: string,
}

export const CategoryCarousel = (props: CategoryCarouselProps) => {
  return <div>
    Product List
    <ul>
      {props.categories.map((category: ICategory, index: number) =>
        <li><Category
          key={index}
          imagesBaseUrl={props.imagesBaseUrl}
          {...category}
        />)
        </li>
      )}
    </ul>

  </div>
}