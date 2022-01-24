import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Product } from './Product';

export default {
  title: 'Atoms/Product',
  component: Product,
} as ComponentMeta<typeof Product>;

const Template: ComponentStory<typeof Product> = (args) => <Product />;

export const Default = Template.bind({});
Default.args = {

};
