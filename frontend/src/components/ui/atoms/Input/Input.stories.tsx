import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Input } from './Input';


export default {
  title: 'Atoms/Input',
  component: Input,
  args: {
    inputId: 'teste',
    value: '3',
    type: 'text',
    label: 'Card Number',
    disabled: false
  }
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />


export const Default = Template.bind({});
Default.args = {
  clickable: false
};
