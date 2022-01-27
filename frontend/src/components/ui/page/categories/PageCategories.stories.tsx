import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import sampleMenu from '../../../../../.storybook/resources/sample-menu.json';
import { PageCategories } from './PageCategories';

const prod1 = sampleMenu.items[0];
const prod2 = sampleMenu.items[3];

export default {
  title: 'Pages/Categories',
  component: PageCategories,
  args: {
    categories: sampleMenu.categories,
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
  },
} as ComponentMeta<typeof PageCategories>;

const Template: ComponentStory<typeof PageCategories> = (args) => <PageCategories {...args}/>;

export const Default = Template.bind({});
Default.args = {};


export const NoCategories = Template.bind({});
NoCategories.args = {
  categories: []
};
