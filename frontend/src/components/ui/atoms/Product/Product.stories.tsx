import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Product } from './Product';
import sampleMenu from '../../../../../.storybook/resources/sample-menu.json';

const product = sampleMenu.items[0];

export default {
  title: 'Atoms/Product',
  component: Product,
  args: {
    checkout: false,
    imagesBaseUrl: './sample-images',
    ...product
  }
} as ComponentMeta<typeof Product>;

const Template: ComponentStory<typeof Product> = (args) => <Product {...args}/>;

export const Default = Template.bind({});
Default.args = {

};
