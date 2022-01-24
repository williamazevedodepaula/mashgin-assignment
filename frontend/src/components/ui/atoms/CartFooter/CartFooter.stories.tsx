import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CartFooter } from './CartFooter';

export default {
  title: 'Atoms/CartFooter',
  component: CartFooter,
} as ComponentMeta<typeof CartFooter>;

const Template: ComponentStory<typeof CartFooter> = (args) => <CartFooter />;

export const Default = Template.bind({});
Default.args = {

};
