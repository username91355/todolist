import Task from "../components/Task/Task";
import {ComponentMeta, ComponentStory,} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {useState} from "react";

export default {
    title: "ToDoList/Task",
    component: Task,
    args: {
        removeTask: action("Task has been remove"),
        onChangeHandler: action("Task state has been changed"),
        changeTuskTitle: action("Task title has been changed")
    }
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

export const TaskIsDone = Template.bind({});
TaskIsDone.args = {
    task: {id: "task-id", title: 'Test task', isDone: true},
    toDoListID: 'test-to-do-list-id',
    //...baseArgs // В современном синтаксисе помещается в args
}

export const TaskNotIsDone = Template.bind({});
TaskNotIsDone.args = {
    task: {id: "task-second-id", title: 'Test task is not done', isDone: false},
    toDoListID: 'test-second-to-do-list-id',
    //...baseArgs // В современном синтаксисе помещается в args
}

export const UncontroledTask = () => {
    const [task, setTask] = useState({id: "task-id", title: 'Test task', isDone: false})

    return <Task task={task}
                 toDoListID={'test-to-do-list-id'}
                 removeTask={action("Task has been remove")}
                 onChangeHandler={() => setTask({...task, isDone: !task.isDone})}
                 changeTuskTitle={(title: string) => setTask({...task, title: title})}/>

}
