import { ICategory, IProduct } from '../../../../types'
import { Category } from '../Category/Category'
import { Product } from '../Product/Product'
export interface CategoryListProps {
  categories: ICategory[],
  imagesBaseUrl: string,
  onCategoryClick?:(category:ICategory)=>void
}

export const CategoryList = (props: CategoryListProps) => {
  return <div className="d-flex justify-content-center">
    {props.categories.map((category: ICategory, index: number) =>
      <div className="p-2">
        <Category
          key={index}
          onClick={()=>props.onCategoryClick?.(category)}
          imagesBaseUrl={props.imagesBaseUrl}
          {...category}
        />
      </div>)}

  </div>
}