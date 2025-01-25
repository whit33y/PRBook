import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from '@storybook/test';
import { HeaderComponent } from './header.component';

const meta: Meta<HeaderComponent> = {
  title: 'Components/Header',
  component: HeaderComponent,
  tags: ['autodocs'],
  parameters: {
    viewport: {
      viewports: {
        small: {
          name: 'Small Screen',
          styles: { width: '360px', height: '360px' },
        },
        tablet: {
          name: 'Tablet',
          styles: { width: '768px', height: '1024px' },
        },
        desktop: {
          name: 'Desktop',
          styles: { width: '1280px', height: '800px;' },
        },
      },
    },
  },
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<HeaderComponent>;

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'small',
    },
  },
  args: {},
};

export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
  args: {},
};
export const Desktop: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  args: {},
};
