import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Totalizer } from './Totalizer';

export default {
  title: 'Atoms/Totalizer',
  component: Totalizer,
} as ComponentMeta<typeof Totalizer>;

const Template: ComponentStory<typeof Totalizer> = (args) => <Totalizer />;

export const Default = Template.bind({});
Default.args = {

};
