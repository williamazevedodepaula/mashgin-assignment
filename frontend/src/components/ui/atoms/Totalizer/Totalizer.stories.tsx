import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Totalizer } from './Totalizer';
import sampleMenu from '../../../../../.storybook/resources/sample-menu.json';

const prod1 = sampleMenu.items[0];
const prod2 = sampleMenu.items[3];
const prod3 = sampleMenu.items[5];

export default {
  title: 'Atoms/Totalizer',
  component: Totalizer,
  args: {
    order: {
      items: [{
        price: prod1.price,
        product_id: prod1.id,
      },
      {
        price: prod2.price,
        product_id: prod2.id,
      },
      {
        price: prod3.price,
        product_id: prod3.id,
      }]
    },
  }
} as ComponentMeta<typeof Totalizer>;

const Template: ComponentStory<typeof Totalizer> = (args) => <Totalizer {...args} />;

export const Default = Template.bind({});
Default.args = {

};

export const EmptyCart = Template.bind({});
EmptyCart.args = {
  order: undefined
};
