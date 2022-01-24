import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CategoryCarousel } from './CategoryCarousel';
import sampleMenu from '../../../../../.storybook/resources/sample-menu.json';

const categories = sampleMenu.categories;

export default {
  title: 'Atoms/CategoryCarousel',
  component: CategoryCarousel,
  args: {
    categories,
    imagesBaseUrl: './sample-images',
  }
} as ComponentMeta<typeof CategoryCarousel>;

const Template: ComponentStory<typeof CategoryCarousel> = (args) => <CategoryCarousel {...args}/>;

export const Default = Template.bind({});
Default.args = {

};
