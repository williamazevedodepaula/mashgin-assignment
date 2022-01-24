import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Product } from './Product';

const product = {
  "category_id": 1,
  "id": 1,
  "image_id": "293202f9d9f7f4",
  "name": "Bagel",
  "price": 2.0
};

export default {
  title: 'Atoms/Product',
  component: Product,
  args: {
    checkout: false,
    imagesBaseUrl: 'http://localhost:3000/images',
    ...product
  }
} as ComponentMeta<typeof Product>;

const Template: ComponentStory<typeof Product> = (args) => <Product {...args}/>;

export const Default = Template.bind({});
Default.args = {

};
