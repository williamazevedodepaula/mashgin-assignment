import React, { useCallback, useEffect, useState } from 'react';
import 'mdb-ui-kit/css/mdb.min.css';
import { ApiFacade } from '../api-facades/api.facade';
import { ICategory, IMenu, IOrder, IPayment, IProduct } from '../types';
import { PageCategories } from './ui/page/categories/PageCategories';
import { PageProducts } from './ui/page/products/PageProducts';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/brands';
import '@fortawesome/fontawesome-free/js/solid';
import { PageCheckout } from './ui/page/checkout/PageCheckout';
require('mdb-ui-kit')



function App() {
  const api_url = process.env.REACT_APP_API_URL || 'http://localhost:3000';
  const imagesBaseUrl = `${api_url}/images/`;
  const apiFacade = new ApiFacade(api_url);

  const [page,setPage] = useState('categories');
  const [menu,setMenu] = useState({} as IMenu);
  const [loading,setLoading] = useState(true);
  const [offline,setOffline] = useState(false);
  const [order,setOrder] = useState({items:[]} as IOrder);
  const [selectedCategory,setSelectedCategory] = useState(undefined as ICategory|undefined);

  const initData = async()=>{
    try{
      setLoading(true);
      setMenu(await apiFacade.fetchMenu());
      setLoading(false);
    }catch(error){
      setLoading(false);
      setOffline(true);
      console.error('An unknown error has occurried when connecting to the server', error);
    }
  }

  const handleFinishOrder = async(orderWithPayment:IOrder)=>{
    try{
      if(!validateCard(orderWithPayment.payment)) return;

      const savedOrder = await apiFacade.saveOrder(orderWithPayment);
      handleClearCartClick();
      alert(`Order successfully registered! ID: ${savedOrder.id}`)
    }catch(e){
      alert('An unknown error has occurried when saving the order. Please, try again!')
    }
  }

  const validateCard = (payment?:IPayment)=>{
    if(! payment) return true;
    if(! payment.paymentMethod.includes('Card')) return true;

    let cardNumberSize = payment?.cardNumber?.toString().length;
    let securityCodeSize = payment?.cardSecurityCode?.toString().length;
    if(![15,16].includes(cardNumberSize!)){
      alert(`Card number should contain 15 or 16 digits`);
      return false;
    }else if(![3,4].includes(securityCodeSize!)){
      alert(`Security code should contain 3 or 4 digits`);
      return false;
    }

    return true;
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
        loading={loading}
        offline={offline}
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
