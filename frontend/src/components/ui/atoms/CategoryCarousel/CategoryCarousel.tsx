import { ICategory, IProduct } from '../../../../types'
import { Category } from '../Category/Category'
import { Product } from '../Product/Product'
export interface CategoryCarouselProps {
  categories: ICategory[],
  imagesBaseUrl: string,
}

export const CategoryCarousel = (props: CategoryCarouselProps) => {
  return <div className="d-flex justify-content-center">
    {props.categories.map((category: ICategory, index: number) =>
      <Category
          key = { index }
          imagesBaseUrl = { props.imagesBaseUrl }
          { ...category }
      />
      )}

  </div>
}