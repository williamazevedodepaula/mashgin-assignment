import { ICategory, IOrder, IProduct } from '../../../../types'
import { CategoryList } from '../../atoms/CategoryList/CategoryList'
import { TopBar } from '../../atoms/TopBar/TopBar';
import { Totalizer } from '../../atoms/Totalizer/Totalizer'

export interface PageCategoriesProps {
  categories: ICategory[],
  order: IOrder,
  imagesBaseUrl: string,
  onGoToCheckoutClick:()=>void
  onClearCartClick:()=>void
  onCategoryClick:(category:ICategory)=>void
}

/**
 * This component will display the entire Categories
 * screen/view (the home screen of the application)
 */
export const PageCategories = function (props: PageCategoriesProps) {

  let categories = [{
    name: 'All products',
    id: 0,
    image_id: '1268544544'
  } as ICategory].concat(props.categories);

  return <div>
    <TopBar title="Mashgin - Home"/>

    <Totalizer
      order={props.order}
      onClearCartClick={props.onClearCartClick}
      onGoToCheckoutClick={props.onGoToCheckoutClick} />

    <h3 className="text-center">Please, select a category:</h3>
    <CategoryList
      categories={categories}
      imagesBaseUrl={props.imagesBaseUrl}
      onCategoryClick={props.onCategoryClick}/>
  </div>
}