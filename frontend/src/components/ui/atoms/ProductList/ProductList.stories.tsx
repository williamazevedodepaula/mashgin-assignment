import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ProductList } from './ProductList';
import sampleMenu from '../../../../../.storybook/resources/sample-menu.json';
import { IProduct } from '../../../../types';

const products = sampleMenu.items;

export default {
  title: 'Atoms/ProductList',
  component: ProductList,
  args: {
    items:products as IProduct[],
    checkout: false,
    imagesBaseUrl: './sample-images',
  }
} as ComponentMeta<typeof ProductList>;

const Template: ComponentStory<typeof ProductList> = (args) => <ProductList {...args}/>;

export const Default = Template.bind({});
Default.args = {

};

export const Checkout = Template.bind({});
Checkout.args = {
  checkout: true
};
