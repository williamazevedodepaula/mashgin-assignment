import 'mocha';
import 'chai/register-should';
import { Category, Menu, Product } from '../../model';
import { ICategoryRepository, IProductRepository } from '../../repository';
import { IMenuService } from './menu.service.interface';
import { MenuService } from './menu.service';
import * as sinon from 'sinon';
import { assert } from 'chai';
import * as menuMock from '../../../../resources/sample-menu.json';

describe('MenuService',()=>{
  let categoriesMock:Category[] = menuMock.categories;
  let productsMock:Product[] = menuMock.items;

  let listCategoriesSpy:sinon.SinonSpy;
  let listProductsSpy:sinon.SinonSpy;

  let productRepositoryMock:IProductRepository = {
    listProducts:async()=>(productsMock)
  };
  let categoriesRepositoryMock:ICategoryRepository = {
    listCategories:async()=>(categoriesMock)
  };

  let menuService:IMenuService;

  beforeEach('prepare the controller and create the mocks',()=>{
    menuService = new MenuService(
      categoriesRepositoryMock,
      productRepositoryMock
    );
  })

  beforeEach('prepare the spyes',()=>{
    listCategoriesSpy = sinon.spy(categoriesRepositoryMock,'listCategories');
    listProductsSpy = sinon.spy(productRepositoryMock,'listProducts');
  })

  afterEach(()=>{
    sinon.restore();
  })

  describe('Testing fetchMenu method',()=>{
    it('Should combine the products and categories returned from the repositories',async()=>{
      const menu = await menuService.fetchMenu();
      assert(listCategoriesSpy.calledOnce, 'Should have called repository`s listCategories method once');
      assert(listProductsSpy.calledOnce, 'Should have called repository`s listProduct method once');
      menu.should.deep.equal(menuMock);
    })
  })
})