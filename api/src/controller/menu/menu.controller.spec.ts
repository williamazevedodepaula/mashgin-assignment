import 'mocha';
import 'chai/register-should';
import { Menu } from '../../model';
import { IMenuService } from '../../service/menu/menu.service.interface';
import { MenuController } from './menu.controller';
import { IMenuController } from './menu.controller.interface'
import * as sinon from 'sinon';
import { assert } from 'chai';

import * as menuMock from '../../../../resources/sample-menu.json';

describe('MenuController',()=>{

  let fetchMenuSpy:sinon.SinonSpy;

  let menuServiceMock:IMenuService = {
    fetchMenu:async()=>(menuMock)
  };

  let menuController:IMenuController;

  beforeEach('prepare the controller and create the mocks',()=>{
    menuController = new MenuController(menuServiceMock);
  })

  beforeEach('prepare the spyes',()=>{
    fetchMenuSpy = sinon.spy(menuServiceMock,'fetchMenu');
  })

  afterEach(()=>{
    sinon.restore();
  })

  describe('Testing fetchMenu method',()=>{
    it('Should call service`s fetchMenu method',async()=>{
      const menu = await menuController.fetchMenu();
      assert(fetchMenuSpy.calledOnce, 'Should have called service`s fetch method once');
      menu.should.deep.equal(menuMock)
    })
  })
})