import type { Meta, StoryObj } from '@storybook/angular';
import { StartingPageComponent } from './starting-page.component';

const meta: Meta<StartingPageComponent> = {
  title: 'Pages/Starting-page',
  component: StartingPageComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<StartingPageComponent>;

export const StartingPage: Story = {
  args: {},
};
