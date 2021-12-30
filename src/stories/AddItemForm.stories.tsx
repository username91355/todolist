import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {ComponentMeta, ComponentStory,} from "@storybook/react";
import {action} from "@storybook/addon-actions";

export default {
    title: "ToDoList/AddItemForm",
    component: AddItemForm,
    // argTypes: {
    //      addTask: {
    //         description: 'Button inside form clicked'
    //     }
    // }
    // args: {
    //     addTask: action('Button inside form clicked')
    // }
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = args => <AddItemForm {...args}/>;

export const AddItemFormBase = Template.bind({});
AddItemFormBase.args = {
    addTask: action('Button inside form clicked')
}
