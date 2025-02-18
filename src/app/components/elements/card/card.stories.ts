import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from '@storybook/test';

import { CardComponent } from './card.component';

const meta: Meta<CardComponent> = {
  title: 'Components/elements/Card',
  component: CardComponent,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['desktop', 'mobile'],
    },
    color: {
      control: { type: 'select' },
      options: ['purple', 'blue', 'green', 'red'],
    },
    title: { control: 'text' },
    description: { control: 'text' },
    pointer: { control: 'boolean' },
  },
  args: { onClick: fn() },
};

export default meta;
type Story = StoryObj<CardComponent>;

export const Desktop: Story = {
  args: {
    size: 'desktop',
  },
};

export const Mobile: Story = {
  args: {
    size: 'mobile',
  },
};
