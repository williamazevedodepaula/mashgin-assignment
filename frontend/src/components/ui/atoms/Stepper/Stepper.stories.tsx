import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Stepper } from './Stepper';


export default {
  title: 'Atoms/Stepper',
  component: Stepper,
  args:{
    currentAmount:8
  },
} as ComponentMeta<typeof Stepper>;

const Template: ComponentStory<typeof Stepper> = (args) => <Stepper {...args}/>

export const Default = Template.bind({});
Default.args = {

};
