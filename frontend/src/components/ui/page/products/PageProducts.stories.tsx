import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import sampleMenu from '../../../../../.storybook/resources/sample-menu.json';
import { PageProducts } from './PageProducts';

const prod1 = sampleMenu.items[0];
const prod2 = sampleMenu.items[3];

export default {
  title: 'Pages/Products',
  component: PageProducts,
  args: {
    menu: sampleMenu,
    order: {
      items: [{
        price: prod1.price,
        product_id: prod1.id,
      },
      {
        price: prod2.price,
        product_id: prod2.id,
      }]
    },
    selectedCategory:{
      id:0,
      name: 'All Products'
    },
    imagesBaseUrl: './sample-images',
  },
} as ComponentMeta<typeof PageProducts>;

const Template: ComponentStory<typeof PageProducts> = (args) => <PageProducts {...args}/>;

export const AllProducts = Template.bind({});
AllProducts.args = {
  selectedCategory:{
    id:0,
    name: 'All Products',
    image_id:''
  },
};

export const FilteredCategory = Template.bind({});
FilteredCategory.args = {
  selectedCategory:{
    id:1,
    name: 'Bakery',
    image_id:''
  },
};

export const NoProducts = Template.bind({});
NoProducts.args = {
  selectedCategory:{
    id:5,
    name: 'Candy',
    image_id:''
  },
};
