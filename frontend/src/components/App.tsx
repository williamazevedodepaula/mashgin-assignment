import React, { useCallback, useEffect, useState } from 'react';
import { ContainerCategories } from './behavior/categories/ContainerCategories';
import 'mdb-ui-kit/css/mdb.min.css';
import { MenuFacade } from '../api-facades/menu.facade';
import { ICategory, IMenu, IOrder, IProduct } from '../types';
import { PageCategories } from './ui/page/categories/PageCategories';
import { PageProducts } from './ui/page/products/PageProducts';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/brands';
import '@fortawesome/fontawesome-free/js/solid';
import { PageCheckout } from './ui/page/checkout/PageCheckout';
require('mdb-ui-kit')



function App() {
  //@TODO read from .env
  const imagesBaseUrl = 'http://localhost:3000/images/';
  const menuFacade = new MenuFacade('http://localhost:3000');

  const [page,setPage] = useState('categories');
  const [menu,setMenu] = useState({} as IMenu);
  const [order,setOrder] = useState({items:[]} as IOrder);
  const [selectedCategory,setSelectedCategory] = useState(undefined as ICategory|undefined);

  const initData = async()=>{
    try{
      setMenu(await menuFacade.fetchMenu());
    }catch(e){
      alert('An unknown error has occurried when connecting to the server')
    }
  }
  const handleFinishOrder = async(orderWithPayment:IOrder)=>{
    try{
      const savedOrder = await menuFacade.saveOrder(orderWithPayment);
      handleClearCartClick();
      alert(`Order successfully registered! ID: ${savedOrder.id}`)
    }catch(e){
      alert('An unknown error has occurried when saving the order')
    }
  }

  const handleCategoryClick = (category: ICategory) => {
    setSelectedCategory(category);
    setPage('products');
  }
  const handleClearCartClick = () => {
    const newOrder:IOrder = {...order, items:[]};
    setOrder(newOrder);
    if(page == 'checkout'){
      setPage('categories');
    }
  }
  const handleGoToChekoutClick = () => {
    setPage('checkout');
  }
  const handleKeepBuying = () => {
    setPage('categories');
  }
  const handleAddProductClick = (product:IProduct) => {
    const newOrder:IOrder = {...order};
    newOrder.items = [...order.items, {
      price: product.price,
      product_id: product.id
    }];
    setOrder(newOrder);
  }
  const handleRemoveProductClick = (product:IProduct) => {
    const newOrder:IOrder = {...order};
    newOrder.items = [...newOrder.items];
    const prod = newOrder.items.find((it)=>it.product_id == product.id);

    if(prod) {
      const index = newOrder.items.indexOf(prod);
      newOrder.items.splice(index,1);
    }
    setOrder(newOrder);
  }
  const handleBackClick = () => {
    switch(page){
      case 'products':
        return setPage('categories');
      case 'checkout':
          return setPage('products');
    }
  }

  useEffect(()=>{
    initData();
  },[])

  return (
    <div className="App">
      {(page == 'categories' && <PageCategories
        order={{...order}}
        categories={menu.categories}
        onCategoryClick={handleCategoryClick}
        onClearCartClick={handleClearCartClick}
        onGoToCheckoutClick={handleGoToChekoutClick}
        imagesBaseUrl={imagesBaseUrl}
      />)}
      {(page == 'products' && <PageProducts
        order={{...order}}
        menu={menu}
        selectedCategory={selectedCategory}
        onBackClick={handleBackClick}
        onAddProduct={handleAddProductClick}
        onRemoveProduct={handleRemoveProductClick}
        onClearCartClick={handleClearCartClick}
        onGoToCheckoutClick={handleGoToChekoutClick}
        imagesBaseUrl={imagesBaseUrl}
      />)}
      {(page == 'checkout' && <PageCheckout
        order={{...order}}
        menu={menu}
        onFinishOrder={handleFinishOrder}
        onKeepBuyingClick={handleKeepBuying}
        onBackClick={handleBackClick}
        onAddProduct={handleAddProductClick}
        onRemoveProduct={handleRemoveProductClick}
        onClearCartClick={handleClearCartClick}
        onGoToCheckoutClick={handleGoToChekoutClick}
        imagesBaseUrl={imagesBaseUrl}
      />)}
    </div>
  );
}

export default App;
