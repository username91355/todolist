import {v1} from "uuid";
import {ADD_TODOLIST, AddToDoListType, REMOVE_TODOLIST, RemoveToDoListType} from "./todolists-reducer";

//Action types
const ADD_TASK = 'ADD_TASK'
const REMOVE_TASK = 'REMOVE_TASK'
const CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE'
const CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS'

//Action Creators
export const addTaskAC = (title:string, toDoListID: string) => ({type: ADD_TASK, title, toDoListID} as const)
export const removeTaskAC = (taskId: string, toDoListID: string) => ({type: REMOVE_TASK, taskId, toDoListID} as const)
export const changeTaskTitleAC = (title: string, toDoListID: string, taskId: string) => ({type: CHANGE_TASK_TITLE, title, toDoListID, taskId} as const)
export const changeTaskStatusAC = (taskId: string, isDone: boolean, toDoListID: string) => ({type: CHANGE_TASK_STATUS, taskId, isDone, toDoListID} as const)


//Types
export type StateTasksType = { [key: string]: Array<TaskType> }
export type TaskType = { id: string, title: string, isDone: boolean }
export type GeneralActionType = AddTuskType | RemoveTaskType | ChangeTaskTitleType | ChangeTaskStatusType | AddToDoListType | RemoveToDoListType
type AddTuskType = ReturnType<typeof addTaskAC>
type RemoveTaskType = ReturnType<typeof removeTaskAC>
type ChangeTaskTitleType = ReturnType<typeof changeTaskTitleAC>
type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>

//Reducer
export const tasksReducer = (state: StateTasksType = {}, action: GeneralActionType): StateTasksType => {
    switch (action.type) {

        case ADD_TASK: {
            return {
                ...state,
                [action.toDoListID]: [{ id: v1(), title: action.title, isDone: false },...state[action.toDoListID]]
            }
        }

        case REMOVE_TASK: {
            return {
                ...state,
                [action.toDoListID]: state[action.toDoListID].filter( (i:TaskType) => i.id !== action.taskId )
            }
        }

        case CHANGE_TASK_TITLE: {
            return {
                ...state,
                [action.toDoListID]: state[action.toDoListID].map( (i:TaskType) => i.id === action.taskId ? {...i, title: action.title} : i )
            }
        }

        case CHANGE_TASK_STATUS: {
            return {
                ...state,
                [action.toDoListID]: state[action.toDoListID].map( (i:TaskType) => i.id === action.taskId ? {...i, isDone: action.isDone} : i )
            }
        }

        case ADD_TODOLIST: {
            return {
                ...state,
                [action.toDoListID]: []
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