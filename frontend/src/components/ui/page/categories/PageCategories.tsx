import { ICategory, IOrder, IProduct } from '../../../../types'
import { CategoryList } from '../../atoms/CategoryList/CategoryList'
import { Totalizer } from '../../atoms/Totalizer/Totalizer'

export interface PageCategoriesProps {
  categories: ICategory[],
  order: IOrder,
  imagesBaseUrl: string,
  onGoToCheckoutClick:()=>void
  onClearCartClick:()=>void
  onCategoryClick:(categoryId:string|number)=>void
}

export const PageCategories = function (props: PageCategoriesProps) {

  let categories = [{
    name: 'All products',
    id: 0,
    image_id: '1268544544'
  } as ICategory].concat(props.categories);

  return <div>
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
      <a className="navbar-brand">Mashgin Checkout</a>
        <form className="d-flex input-group w-auto">

        </form>
      </div>
    </nav>

    <h3 className="text-center">Please, select a category:</h3>

    <CategoryList
      categories={categories}
      imagesBaseUrl={props.imagesBaseUrl}
      onCategoryClick={props.onCategoryClick}/>
    <Totalizer
      order={props.order}
      onClearCartClick={props.onClearCartClick}
      onGoToCheckoutClick={props.onGoToCheckoutClick} />
  </div>
}