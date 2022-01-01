import {TaskPriorities, TaskStatuses} from "../api/api";

export interface ITodolist {
    addedDate: string
    id: string
    order: number
    title: string
}

export interface ITask {
    addedDate: string
    deadline: string | null
    description: string | null
    id: string
    order: number
    priority: TaskPriorities
    startDate: string | null
    status: TaskStatuses
    title: string
    todoListId: string
    completed: boolean
}
