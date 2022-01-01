import {App} from '../app/App'
import {ComponentMeta, ComponentStory} from "@storybook/react";
import React from "react";
import {AppDecoratorStories} from "./decorators/AppDecorator.stories";

export default {
    title: "App/App",
    component: App,
    decorators:[AppDecoratorStories]
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = () => <App />;

export const AppDefault = Template.bind({});
AppDefault.args = {}
