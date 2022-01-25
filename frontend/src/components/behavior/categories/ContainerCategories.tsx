import { useState } from 'react'
import { IOrder } from '../../../types';
import { PageCategories } from '../../ui/page/categories/PageCategories'

export interface ContainerCategoriesProps {
  imagesBaseUrl: string
}

export const ContainerCategories = (props: ContainerCategoriesProps) => {
  const [categories, setCategories] = useState([]);
  const [order, setOrder] = useState({} as IOrder)

  const handleCategoryClick = (categoryId: string | number) => {

  }
  const handleClearCartClick = () => {

  }
  const handleGoToChekoutClick = () => {

  }

  return <PageCategories
    order={order}
    categories={categories}
    onCategoryClick={handleCategoryClick}
    onClearCartClick={handleClearCartClick}
    onGoToCheckoutClick={handleGoToChekoutClick}
    imagesBaseUrl={props.imagesBaseUrl}
  />
}