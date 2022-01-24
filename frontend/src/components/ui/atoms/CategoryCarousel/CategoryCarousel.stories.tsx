import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CategoryCarousel } from './CategoryCarousel';

export default {
  title: 'Atoms/CategoryCarousel',
  component: CategoryCarousel,
} as ComponentMeta<typeof CategoryCarousel>;

const Template: ComponentStory<typeof CategoryCarousel> = (args) => <CategoryCarousel />;

export const Default = Template.bind({});
Default.args = {

};
