import React from 'react';
import { Meta, StoryFn } from '@storybook/react/types-6-0';
import Pill, { PillType } from './Pill';

export default {
    title: 'Components/Pill',
    component: Pill,
} as Meta

const Template: StoryFn<PillType> = (args) => <Pill {...args} />;

export const Default = Template.bind({});
Default.args = {
    message: 'This is a pill',
};
