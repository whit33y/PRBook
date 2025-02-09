import type { Meta, StoryObj } from '@storybook/angular';
import { LoginPageComponent } from './login-page.component';
LoginPageComponent;

const meta: Meta<LoginPageComponent> = {
  title: 'Pages/Login-page',
  component: LoginPageComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<LoginPageComponent>;

export const LoginPage: Story = {
  args: {},
};
