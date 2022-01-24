import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import sampleMenu from '../../../../../.storybook/resources/sample-menu.json';
import { CartFooter } from './CartFooter';

const prod1 = sampleMenu.items[0];
const prod2 = sampleMenu.items[3];

export default {
  title: 'Atoms/CartFooter',
  component: CartFooter,
  args:{
    order:{
      items: [{
        price: prod1.price,
        product_id: prod1.id,
      },
      {
        price: prod2.price,
        product_id: prod2.id,
      }]
    },
  }
} as ComponentMeta<typeof CartFooter>;

const Template: ComponentStory<typeof CartFooter> = (args) => <CartFooter {...args}/>;

export const Default = Template.bind({});
Default.args = {

};
