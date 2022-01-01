import {MutableSpan} from "../components/MutableSpan/MutableSpan";
import {ComponentMeta, ComponentStory,} from "@storybook/react";
import {action} from "@storybook/addon-actions";

export default {
    title: "ToDoList/MutableSpan",
    component: MutableSpan,
    args: {
        onChangeTitle: action("Mutable span has been changed. Entered text")
    }
} as ComponentMeta<typeof MutableSpan>;

const Template: ComponentStory<typeof MutableSpan> = args => <MutableSpan {...args}/>;

export const MutableSpanDefault = Template.bind({});
MutableSpanDefault.args = {
   title: 'Test title'
}