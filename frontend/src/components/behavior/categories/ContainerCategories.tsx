import { useCallback, useEffect, useState } from 'react'
import { ApiFacade } from '../../../api-facades/api.facade';
import { ICategory, IMenu, IOrder } from '../../../types';
import { PageCategories } from '../../ui/page/categories/PageCategories'

export interface ContainerCategoriesProps {
  menu:IMenu
  order:IOrder
  imagesBaseUrl: string
}

export const ContainerCategories = (props: ContainerCategoriesProps) => {


  const handleCategoryClick = (category: ICategory | number) => {

  }
  const handleClearCartClick = () => {

  }
  const handleGoToChekoutClick = () => {

  }



  return <PageCategories
    order={props.order}
    categories={props.menu.categories}
    onCategoryClick={handleCategoryClick}
    onClearCartClick={handleClearCartClick}
    onGoToCheckoutClick={handleGoToChekoutClick}
    imagesBaseUrl={props.imagesBaseUrl}
  />
}