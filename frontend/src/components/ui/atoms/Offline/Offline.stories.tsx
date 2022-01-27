import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Offline } from './Offline';


export default {
  title: 'Atoms/Offline',
  component: Offline,
} as ComponentMeta<typeof Offline>;

const Template: ComponentStory<typeof Offline> = (args) => <Offline/>


export const Default = Template.bind({});
Default.args = {
  clickable: false
};
