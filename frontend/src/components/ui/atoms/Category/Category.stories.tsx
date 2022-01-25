import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Category } from './Category';
import sampleMenu from '../../../../../.storybook/resources/sample-menu.json';

const category = sampleMenu.categories[0];

export default {
  title: 'Atoms/Category',
  component: Category,
  args:{
    ...category,
    imagesBaseUrl: './sample-images',
  },
} as ComponentMeta<typeof Category>;

const Template: ComponentStory<typeof Category> = (args) => <Category {...args}/>;

export const Default = Template.bind({});
Default.args = {

};
