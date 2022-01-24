import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Category } from './Category';

export default {
  title: 'Atoms/Category',
  component: Category,
} as ComponentMeta<typeof Category>;

const Template: ComponentStory<typeof Category> = (args) => <Category />;

export const Default = Template.bind({});
Default.args = {

};
