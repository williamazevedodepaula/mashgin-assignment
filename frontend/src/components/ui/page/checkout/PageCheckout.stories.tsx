import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import sampleMenu from '../../../../../.storybook/resources/sample-menu.json';
import { PageCheckout } from './PageCheckout';

const prod1 = sampleMenu.items[0];
const prod2 = sampleMenu.items[3];

export default {
  title: 'Pages/Checkout',
  component: PageCheckout,
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
    imagesBaseUrl: './sample-images',
  }
} as ComponentMeta<typeof PageCheckout>;

const Template: ComponentStory<typeof PageCheckout> = (args) => <PageCheckout {...args}/>;

export const Default = Template.bind({});
Default.args = {

};
