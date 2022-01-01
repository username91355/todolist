import {todolistAPI} from "../../api/api";
import {ThunkType} from "../store";
import {REMOVE_TODOLIST, setToDolistsStatusAC, TRemoveToDoList} from "./todolists-reducer";
import {setAppError} from "./app-reducer";
import {handlingError, throwNewError} from "../../utils/error-utils";
import {ITask} from "../../types/types";

//constants
const ADD_TASK = 'todolist/tasks-reducer/ADD_TASK'
const SET_TASKS = 'todolist/tasks-reducer/SET_TODOLIST_TASKS'
const UPDATE_TASK = 'todolist/tasks-reducer/UPDATE_TASK'
const REMOVE_TASK = 'todolist/tasks-reducer/REMOVE_TASK'

//eeducer
export const tasksReducer = (state: IStateTasks = {}, action: TTasksReducerActions): IStateTasks => {
    switch (action.type) {
        case ADD_TASK:
            const oldTasks = state[action.todoListId]
                ? [...state[action.todoListId]]
                : []
            return {
                ...state,
                [action.todoListId]: [action.task, ...oldTasks]
            }
        case SET_TASKS:
            return {
                ...state,
                [action.todolistId]: action.tasks
            }
        case UPDATE_TASK:
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map((i: any) => i.id === action.taskId
                    ? {...action.task}
                    : i)
            }
        case REMOVE_TASK:
            return {
                ...state,
                [action.toDoListID]: state[action.toDoListID].filter((i: any) => i.id !== action.taskId)
            }
        case REMOVE_TODOLIST:
            delete state[action.toDoListID]
            return {...state}
        default:
            return state
    }
}

//action creators
export const addTaskAC = (todoListId: string, task: ITask) => ({
    type: ADD_TASK, todoListId, task
} as const)

export const setTasksAC = (todolistId: string, tasks: Array<ITask>) => ({
    type: SET_TASKS, todolistId, tasks
} as const)

export const updateTaskAC = (todolistId: string, taskId: string, task: ITask) => ({
    type: UPDATE_TASK, todolistId, taskId, task
} as const)

export const removeTaskAC = (toDoListID: string, taskId: string) => ({
    type: REMOVE_TASK, taskId, toDoListID
} as const)

//thunks
export const createTaskTC = (todolistId: string, title: string): ThunkType => async dispatch => {
    try {
        dispatch(setAppError(null))
        dispatch(setToDolistsStatusAC('loading'))

        const response = await todolistAPI.createTask(todolistId, title)
        if (response.resultCode === 0) {
            dispatch(addTaskAC(todolistId, response.data.item))
            dispatch(setToDolistsStatusAC('succeeded'))
        } else {
            throwNewError(dispatch, response.messages[0])
        }
    } catch (err) {
        handlingError(dispatch, err)
    }
}

export const getTasksTC = (todolistId: string): ThunkType => async dispatch => {
    try {
        dispatch(setAppError(null))
        dispatch(setToDolistsStatusAC('loading'))

        const response = await todolistAPI.getTasks(todolistId)

        if (!response.data.error) {
            dispatch(setTasksAC(todolistId, response.data.items))
            dispatch(setToDolistsStatusAC('succeeded'))
        } else {
            throwNewError(dispatch, response.messages[0])
        }
    } catch (err) {
        handlingError(dispatch, err)
    }
}

export const updateTaskTC = (todolistId: string, task: ITask): ThunkType => async dispatch => {
    try {
        dispatch(setAppError(null))
        dispatch(setToDolistsStatusAC('loading'))

        const response = await todolistAPI.updateTask(todolistId, {...task})
        if (response.resultCode === 0) {
            const newTask = response.data.item
            dispatch(updateTaskAC(todolistId, newTask.id, {...newTask}))
            dispatch(setToDolistsStatusAC('succeeded'))
        } else {
            throwNewError(dispatch, response.messages[0])
        }
    } catch (err) {
        handlingError(dispatch, err)
    }
}

export const deleteTaskTC = (todolistId: string, taskId: string): ThunkType => async dispatch => {
    try {
        dispatch(setAppError(null))
        dispatch(setToDolistsStatusAC('loading'))

        const response = await todolistAPI.deleteTask(todolistId, taskId)

        if (response.resultCode === 0) {
            dispatch(removeTaskAC(todolistId, taskId))
            dispatch(setToDolistsStatusAC('succeeded'))
        } else {
            throwNewError(dispatch, response.messages[0])
        }
    } catch (err) {
        handlingError(dispatch, err)
    }
}

//types
export interface IStateTasks {
    [key: string]: Array<ITask>
}

export type TTasksReducerActions =
    TSetTasks
    | TAddTusk
    | TRemoveTask
    | TUpdateTask
    | TRemoveToDoList
type TAddTusk = ReturnType<typeof addTaskAC>
type TSetTasks = ReturnType<typeof setTasksAC>
type TUpdateTask = ReturnType<typeof updateTaskAC>
type TRemoveTask = ReturnType<typeof removeTaskAC>



