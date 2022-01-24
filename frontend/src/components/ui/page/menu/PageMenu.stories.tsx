import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import sampleMenu from '../../../../../.storybook/resources/sample-menu.json';
import { PageMenu } from './PageMenu';

const prod1 = sampleMenu.items[0];
const prod2 = sampleMenu.items[3];

export default {
  title: 'Pages/Menu',
  component: PageMenu,
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
} as ComponentMeta<typeof PageMenu>;

const Template: ComponentStory<typeof PageMenu> = (args) => <PageMenu {...args}/>;

export const Default = Template.bind({});
Default.args = {

};
