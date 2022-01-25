import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DropDown } from './DropDown';


export default {
  title: 'Atoms/DropDown',
  component: DropDown,
  args:{
    valueList:['Item 1', 'Item 2', 'Item 3'],
    placeholder: 'Select an item',
    value: 'Item 1'
  },
} as ComponentMeta<typeof DropDown>;

const Template: ComponentStory<typeof DropDown> = (args) => <DropDown {...args}>
  <button>Here goes any html content</button>
</DropDown>;

const ClickableTemplate: ComponentStory<typeof DropDown> = (args) => <DropDown {...args}>
  <div>Click Here!!</div>
</DropDown>;

export const Default = Template.bind({});
Default.args = {
  value: undefined
};

export const Selected = Template.bind({});
Selected.args = {
  value: 'Item 1'
};