import type { Meta, StoryObj } from '@storybook/angular';
import { InputComponent } from './input.component';

const meta: Meta<InputComponent> = {
  title: 'Components/elements/Input',
  component: InputComponent,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    type: { control: 'text' },
    value: { control: 'text' },
    disabled: { control: 'boolean' },
    valueChange: { action: 'valueChange' },
  },
};

export default meta;
type Story = StoryObj<InputComponent>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text',
    type: 'text',
    value: '',
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Cannot edit',
    type: 'text',
    value: 'Read only',
    disabled: true,
  },
};
