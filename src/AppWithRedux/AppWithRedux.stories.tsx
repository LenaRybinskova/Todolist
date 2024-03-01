import type {Meta, StoryObj} from '@storybook/react';
import App from './App';
import {ReduxStoreProviderDecorator} from './ReduxStoreProviderDecorator';


const meta: Meta<typeof App> = {
    title: 'TODOLISTS/AppWithRedux',
    component: App,
    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator],
    args: {
        demo: false
    }
};

export default meta;
type Story = StoryObj<typeof App>;

export const AppWithReduxStory: Story = {
    args:{
        demo:true
    }
}






