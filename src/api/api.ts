import axios from "axios";
import {ITask, ITodolist} from "../types/types";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': '6e713ecd-57df-4877-9a84-e619dbd38570'
    }
});

export const todolistAPI = {

    createTodolist(title: string): Promise<IResponse<{ item: ITodolist }>> {
        return instance
            .post<IResponse<{ item: ITodolist }>>('/todo-lists', {title})
            .then(response => response.data)
            .catch(err => err)
    },

    getTodolists(): Promise<Array<ITodolist>> {
        return instance
            .get<Array<ITodolist>>('/todo-lists')
            .then(response => response.data)
            .catch(err => err)
    },

    updateTodolistTitle(todolistId: string, title: string): Promise<IResponse> {
        return instance
            .put<IResponse>(`/todo-lists/${todolistId}`, {title})
            .then(response => response.data)
            .catch(err => err)
    },

    deleteTodolist(todolistId: string): Promise<IResponse> {
        return instance
            .delete<IResponse>(`/todo-lists/${todolistId}`)
            .then(response => response.data)
            .catch(err => err)
    },

    createTask(todolistId: string, title: string): Promise<IResponse<{ item: ITask }>> {
        return instance
            .post<IResponse<{ item: ITask }>>(`/todo-lists/${todolistId}/tasks`, {title})
            .then(response => response.data)
            .catch(err => err)
    },

    getTasks(todolistId: string, count: number = 10, page: number = 1) {
        return instance
            .get<IGetTasksResponse>(`/todo-lists/${todolistId}/tasks/?count=${count}&page=${page}`)
            .then(response => response)
            .catch(err => err)
    },

    updateTask(todolistId: string, task: ITask): Promise<IResponse<{ item: ITask }>> {
        return instance
            .put<IResponse<{ item: ITask }>>(`/todo-lists/${todolistId}/tasks/${task.id}`, {...task})
            .then(response => response.data)
            .catch(err => err)
    },

    deleteTask(todolistId: string, taskId: string): Promise<IResponse> {
        return instance
            .delete<IResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`)
            .then(response => response.data)
            .catch(err => err)
    },

}

export const authAPI = {
    me(): Promise<IResponse<IUser>> {
        return instance
            .get<IResponse<IUser>>('/auth/me')
            .then(response => response.data)
            .catch(err => err)
    },
    login(email:string, password: string, rememberMe: boolean): Promise<IResponse<{userId: number}>> {
        return instance
            .post<IResponse<{userId: number}>>('/auth/login', {email,password,rememberMe})
            .then(response => response.data)
            .catch(err => err)
    },
    logout(): Promise<IResponse> {
        return instance
            .delete<IResponse>('/auth/login')
            .then(response => response.data)
            .catch(err => err)
    }
}

//types
interface IGetTasksResponse {
    error: string | null
    items: ITask[]
    totalCount: number
}

interface IResponse<T = {}> {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}

interface IUser {
    id: number
    email: string
    login: string
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    High = 2,
    Urgently = 3,
    Later = 4
}