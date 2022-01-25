import { ICategory, IProduct } from '../../../../types'
import { Category } from '../Category/Category'
import { Product } from '../Product/Product'
export interface CategoryListProps {
  categories: ICategory[],
  imagesBaseUrl: string,
  onCategoryClick?:(categoryId:string|number)=>void
}

export const CategoryList = (props: CategoryListProps) => {
  return <div className="d-flex justify-content-center">
    {props.categories.map((category: ICategory, index: number) =>
      <div className="p-2">
        <Category
          key={index}
          onClick={props.onCategoryClick}
          imagesBaseUrl={props.imagesBaseUrl}
          {...category}
        />
      </div>)}

  </div>
}