import {Task} from "../features/Task/Task";
import {ComponentMeta, ComponentStory,} from "@storybook/react";
import {AppDecoratorStories} from "./decorators/AppDecorator.stories";
import { ITask } from "../types/types";

const testTask: ITask = {
    addedDate: 'addedDate',
    deadline: 'deadline',
    description: 'description',
    id: 'testTaskId',
    order: 1,
    priority: 0,
    startDate: 'startDate',
    status: 0,
    title: 'title',
    todoListId: 'testTodoListId',
    completed: true,
}

const testTaskCompleted = {...testTask, status: 2}

export default {
    title: "ToDoList/Task",
    component: Task,
    decorators: [AppDecoratorStories],
    // args: {
    //     removeTask: action("Task has been remove"),
    //     onChangeHandler: action("Task state has been changed"),
    //     changeTuskTitle: action("Task title has been changed")
    // }
} as ComponentMeta<typeof Task>;

// В современном синтаксисе помещается в args
// const removeTask = action("Task has been remove")
// const onChangeHandler = action("Task state has been changed")
// const changeTuskTitle = action("Task title has been changed")
//
// const baseArgs = {
//     removeTask,
//     onChangeHandler,
//     changeTuskTitle
// }

const Template: ComponentStory<typeof Task> = args => <Task {...args}/>;

export const DefaultTask = Template.bind({});
DefaultTask.args = {
    task: testTask,
    toDoListID: 'testTodoListId',
}

// export const IsCompleteTask = () => {
//     return <Task task={testTaskCompleted}
//                  toDoListID={'testTodoListId'}/>
// }

export const IsCompleteTask = Template.bind({})
IsCompleteTask.args = {
    task: testTaskCompleted,
    toDoListID: 'testTodoListId',
}