import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Card } from './Card';


export default {
  title: 'Atoms/Card',
  component: Card,
  args:{
    imageUrl: './sample-images/3e1bd1342800f7.jpg',
    value: 'card value',
    imageAlt: 'Image Alt',
    height: 18,
    width: 12,
    imageHeight: 10
  },
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args}>
  <button>Here goes any html content</button>
</Card>;

const ClickableTemplate: ComponentStory<typeof Card> = (args) => <Card {...args}>
  <div>Click Here!!</div>
</Card>;

export const Default = Template.bind({});
Default.args = {
  clickable: false
};

export const Clickable = ClickableTemplate.bind({});
Clickable.args = {
  clickable:true
};


export const ImageNotFound = ClickableTemplate.bind({});
ImageNotFound.args = {
  imageUrl:'teste'
};
