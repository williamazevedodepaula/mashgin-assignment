import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CategoryList } from './CategoryList';
import sampleMenu from '../../../../../.storybook/resources/sample-menu.json';

const categories = sampleMenu.categories;

export default {
  title: 'Atoms/CategoryList',
  component: CategoryList,
  args: {
    categories,
    imagesBaseUrl: './sample-images',
  }
} as ComponentMeta<typeof CategoryList>;

const Template: ComponentStory<typeof CategoryList> = (args) => <CategoryList {...args}/>;

export const Default = Template.bind({});
Default.args = {

};

export const WithBrokenImagePath = Template.bind({});
WithBrokenImagePath.args = {
  categories:[
    categories[0],
    {
      name:categories[1].name,
      image_file:''
    },
    categories[2]
  ]
};
