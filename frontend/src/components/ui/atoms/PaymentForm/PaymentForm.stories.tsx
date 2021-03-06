import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { PaymentForm } from './PaymentForm';

export default {
  title: 'Atoms/PaymentForm',
  component: PaymentForm,
  args:{

  }
} as ComponentMeta<typeof PaymentForm>;

const Template: ComponentStory<typeof PaymentForm> = (args) => <PaymentForm {...args}/>;

export const Default = Template.bind({});
Default.args = {

};
