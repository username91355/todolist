import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': '6e713ecd-57df-4877-9a84-e619dbd38570'
    }
});

export const todolistAPI = {

    getTodolists() {
        return instance
            .get<Array<TTodolist>>('/todo-lists')
    },

    createTodolist(title: string) {
        return instance
            .post<ResponseType<{ item: TTodolist }>>('/todo-lists', {
                title: title
            })
    },

    deleteTodolist(todolistId: string) {
        return instance
            .delete<ResponseType<{}>>(`/todo-lists/${todolistId}`)
    },

    updateTodolistTitle(todolistId: string, newTitle: string) {
        return instance
            .put<ResponseType<{}>>(`/todo-lists/${todolistId}`, {
                title: newTitle
            })
    },

    getTasks(todolistId: string, count: number = 10, page: number = 1) {
        return instance
            .get<GetTasksResponseType>(`/todo-lists/${todolistId}/tasks/?count=${count}&page=${page}`)
    },

    createTask(todolistId: string, title: string) {
        return instance
            .post<ResponseType<{ item: TTask }>>(`/todo-lists/${todolistId}/tasks`, {
                title: title
            })
    },

    deleteTask(todolistId: string, taskId: string) {
        return instance
            .delete<ResponseType<{}>>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },

    updateTask(todolistId: string,
               taskId: string,
               title: string,
               description: string | null,
               completed: boolean,
               status: number,
               priority: number,
               startDate: string | null,
               deadline: string | null) {
        debugger
        return instance
            .put<ResponseType<{ item: TTask }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, {
                title,
                description,
                completed,
                status,
                priority,
                startDate,
                deadline,
            })
    }
}

type TTodolist = {
    addedDate: string
    id: string
    order: number
    title: string
}

export type TTask = {
    addedDate: string
    deadline: string | null
    description: string | null
    id: string
    order: number
    priority: number
    startDate: string | null
    status: number
    title: string
    todoListId: string
    completed: boolean
}

type GetTasksResponseType = {
    error: string | null
    items: TTask[]
    totalCount: number
}

type ResponseType<T> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Complited = 2,
    Draft = 3
}