import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ProductList } from './ProductList';

export default {
  title: 'Atoms/ProductList',
  component: ProductList,
} as ComponentMeta<typeof ProductList>;

const Template: ComponentStory<typeof ProductList> = (args) => <ProductList />;

export const Default = Template.bind({});
Default.args = {

};
