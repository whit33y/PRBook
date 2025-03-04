import type { Meta, StoryObj} from '@storybook/angular';
import { PaginationComponent } from './pagination.component';

const meta: Meta<PaginationComponent> = {
    title: 'Components/elements/Pagination',
    component: PaginationComponent,
    tags: ['autodocs'],
    argTypes: {
        currentPage: { control: 'number'},
        maxPage: { control: 'number'},
        color: {
            control: { type: 'select' },
            options: ['purple', 'blue'],
        }
    }
}

export default meta;
type Story = StoryObj<PaginationComponent>;

export const purple: Story = {
  args: {
    color: 'purple',
  },
};
export const blue: Story = {
  args: {
    color: 'blue',
  },
};