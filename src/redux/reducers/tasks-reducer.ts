import {v1} from "uuid";
import {AddToDoListType, REMOVE_TODOLIST, RemoveToDoListType} from "./todolists-reducer";
import {todolistAPI, TTask} from "../../api/api";

//Action types
const SET_TODOLIST_TASKS = 'SET_TODOLIST_TASKS'
const ADD_TASK = 'ADD_TASK'
const REMOVE_TASK = 'REMOVE_TASK'
const UPDATE_TASK = 'UPDATE_TASK'

//Action Creators
export const setTodolistTasksAC = (todolistId: string, tasks: any) => ({
    type: SET_TODOLIST_TASKS,
    todolistId,
    tasks
} as const)
export const addTaskAC = (toDoListID: string, title: string) => ({type: ADD_TASK, title, toDoListID} as const)
export const removeTaskAC = (toDoListID: string, taskId: string) => ({type: REMOVE_TASK, taskId, toDoListID} as const)
export const updateTaskAC = (todolistId: string, taskId: string, title: string,
                             description: string | null, completed: boolean, status: number,
                             priority: number, startDate: string | null, deadline: string | null) => ({
    type: UPDATE_TASK, todolistId, taskId, title,
    description, completed, status,
    priority, startDate, deadline
} as const)


//Types
export type StateTasksType = { [key: string]: Array<TTask> }
export type GeneralActionType =
    SetTasksType
    | AddTuskType
    | RemoveTaskType
    | AddToDoListType
    | RemoveToDoListType
    | UpdateTaskType
type SetTasksType = ReturnType<typeof setTodolistTasksAC>
type AddTuskType = ReturnType<typeof addTaskAC>
type RemoveTaskType = ReturnType<typeof removeTaskAC>
type UpdateTaskType = ReturnType<typeof updateTaskAC>

//Reducer
export const tasksReducer = (state: StateTasksType = {}, action: GeneralActionType): StateTasksType => {
    switch (action.type) {

        case SET_TODOLIST_TASKS:
            return {
                ...state,
                [action.todolistId]: action.tasks
            }


        case ADD_TASK: {
            return {
                ...state,
                [action.toDoListID]: [{id: v1(), title: action.title, isDone: false}, ...state[action.toDoListID]]
            }
        }

        case REMOVE_TASK: {
            return {
                ...state,
                [action.toDoListID]: state[action.toDoListID].filter((i: any) => i.id !== action.taskId)
            }
        }

        case UPDATE_TASK: {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map((i: any) => i.id === action.taskId ? {
                    ...i,
                    title: action.title,
                    description: action.description,
                    completed: action.completed,
                    status: action.status,
                    priority: action.priority,
                    startDate: action.startDate,
                    deadline: action.deadline,
                } : i)
            }
        }

        case REMOVE_TODOLIST: {
            let stateCopy = {...state}
            delete stateCopy[action.toDoListID]
            return stateCopy
        }

        default:
            return state
    }
}

export const getTasksTC = (todolistId: string) =>
    async (dispatch: any) => {
        try {
            const response = await todolistAPI.getTasks(todolistId)
            dispatch(setTodolistTasksAC(todolistId, response.data.items))
        } catch (err) {
            console.warn(err)
        }
    }

export const createTaskTC = (todolistId: string, title: string) =>
    async (dispatch: any) => {
        try {
            const response = await todolistAPI.createTask(todolistId, title)
            dispatch(addTaskAC(todolistId, title))
        } catch (err) {
            console.warn(err)
        }
    }

export const deleteTaskTC = (todolistId: string, taskId: string) =>
    async (dispatch: any) => {
        try {
            const response = await todolistAPI.deleteTask(todolistId, taskId)
            dispatch(removeTaskAC(todolistId, taskId))
        } catch (err) {
            console.warn(err)
        }
    }

export const updateTaskTC = (todolistId: string,
                             taskId: string,
                             title: string,
                             description: string | null,
                             completed: boolean,
                             status: number,
                             priority: number,
                             startDate: string | null,
                             deadline: string | null) =>
    async (dispatch: any) => {
        try {
            const response = await todolistAPI.updateTask(todolistId, taskId,
                title, description, completed, status, priority, startDate, deadline)
            dispatch(updateTaskAC(todolistId, taskId,
                title, description, completed, status, priority, startDate, deadline))
        } catch (err) {
            console.warn(err)
        }
    }

//Types


