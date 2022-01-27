import { ICategory, IOrder, IProduct } from '../../../../types'
import { CategoryList } from '../../atoms/CategoryList/CategoryList'
import { Offline } from '../../atoms/Offline/Offline';
import { Spinner } from '../../atoms/Spinner/Spinner';
import { TopBar } from '../../atoms/TopBar/TopBar';
import { Totalizer } from '../../atoms/Totalizer/Totalizer'

export interface PageCategoriesProps {
  categories: ICategory[],
  order: IOrder,
  imagesBaseUrl: string,
  loading?: boolean
  offline?: boolean
  onGoToCheckoutClick: () => void
  onClearCartClick: () => void
  onCategoryClick: (category: ICategory) => void
}

/**
 * This component will display the entire Categories
 * screen/view (the home screen of the application).
 *
 * If online==true, the component will display a message warning the user that it is offline
 * If loading==true, the component will display a spinner
 * otherwise, it will display the category list, as espected
 */
export const PageCategories = function (props: PageCategoriesProps) {
  let categories = [{
    name: 'All products',
    id: 0,
    image_id: '1268544544'
  } as ICategory].concat(props.categories);

  let display:'loading'|'offline'|'data' = 'data';
  if(props.loading) display = 'loading';
  if(props.offline) display = 'offline';

  return <div>
    <TopBar title="Mashgin - Home" />

    {display == 'loading' && <Spinner />}
    {display == 'offline' && <Offline />}
    {display == 'data' && <>
      <Totalizer
        order={props.order}
        onClearCartClick={props.onClearCartClick}
        onGoToCheckoutClick={props.onGoToCheckoutClick} />

      <h3 className="text-center">Please, select a category:</h3>

      <CategoryList
        categories={categories}
        imagesBaseUrl={props.imagesBaseUrl}
        onCategoryClick={props.onCategoryClick} />
    </>}


  </div>
}