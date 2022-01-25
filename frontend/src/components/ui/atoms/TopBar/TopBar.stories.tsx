import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TopBar } from './TopBar';


export default {
  title: 'Atoms/TopBar',
  component: TopBar,
  args:{
    title: 'Mashgin Checkout'
  },
} as ComponentMeta<typeof TopBar>;

const Template: ComponentStory<typeof TopBar> = (args) => <TopBar {...args}/>

export const Default = Template.bind({});
Default.args = {

};
