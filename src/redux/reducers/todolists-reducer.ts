//Action types
import {v1} from "uuid";
import {todolistAPI} from "../../api/api";

//Action types
const SET_TODOLISTS = 'SET_TODOLISTS'
const ADD_FILTER_TYPE = 'ADD_FILTER_TYPE'
export const ADD_TODOLIST = 'ADD_TODOLIST'
export const REMOVE_TODOLIST = 'REMOVE_TODOLIST'
const CHANGE_TITLE_TODOLIST = 'CHANGE_TITLE_TODOLIST'
const FILTER_TASKS_IN_TODOLIST = 'FILTER_TASKS_IN_TODOLIST'

//Action Creators
export const setTodolistsAC = (todolists: any) => ({type: SET_TODOLISTS, todolists} as const)

export const addFilterTypeAC = () => ({type: ADD_FILTER_TYPE} as const)

export const addToDolistAC = (title: string, todolistID: string) => ({type: ADD_TODOLIST, title, todolistID} as const)

export const removeToDolistAC = (toDoListID: string) => ({type: REMOVE_TODOLIST, toDoListID} as const)

export const changeTitleToDoListAC = (toDoListID: string, title: string) => ({
    type: CHANGE_TITLE_TODOLIST,
    toDoListID,
    title,
} as const)

export const filterTasksInToDoListAC = (filter: FilterValuesType, toDoListID: string) => ({
    type: FILTER_TASKS_IN_TODOLIST,
    filter,
    toDoListID
} as const)

//Types
export type StateToDoListType = Array<TTodolist>
export type ToDoListType = { id: string, addedDate: string, order: number, title: string }
export type TTodolist = ToDoListType & {
    filter: FilterValuesType
}
export type FilterValuesType = "all" | "active" | "completed";
export type GeneralActionType =
    AddToDoListType
    | RemoveToDoListType
    | ChangeTitleToDoListType
    | FilterTasksInToDoListType
    | SetTodolistsType
type SetTodolistsType = ReturnType<typeof setTodolistsAC>
export type AddToDoListType = ReturnType<typeof addToDolistAC>
export type RemoveToDoListType = ReturnType<typeof removeToDolistAC>
type ChangeTitleToDoListType = ReturnType<typeof changeTitleToDoListAC>
type FilterTasksInToDoListType = ReturnType<typeof filterTasksInToDoListAC>

//Reducer
export const todolistsReducer = (state: Array<any> = [], action: any): any => {
    switch (action.type) {

        case SET_TODOLISTS: {
            return [...state, ...action.todolists]
        }

        case ADD_FILTER_TYPE: {
            return state.map((t: any) => ({...t, filter: 'all'}))
        }

        case ADD_TODOLIST: {
            return [{
                id: action.toDoListID,
                title: action.title,
                order: 1,
                addedDate: Date.now().toString(),
                filter: 'all'
            }, ...state]
        }

        case REMOVE_TODOLIST: {
            return state.filter(i => i.id !== action.toDoListID)
        }

        case CHANGE_TITLE_TODOLIST: {
            return state.map(i => i.id === action.toDoListID ? {...i, title: action.title} : i)
        }

        case FILTER_TASKS_IN_TODOLIST: {
            return state.map(i => i.id === action.toDoListID ? {...i, filter: action.filter} : i)
        }

        default:
            return state
    }
}

//Thunk
export const getTodolistsTC = () => async (dispatch: any) => {
    try {
        const response = await todolistAPI.getTodolists()
        dispatch(setTodolistsAC(response.data))
        dispatch(addFilterTypeAC())
    } catch (err) {
        console.warn(err)
    }
}

export const createTodolistTC = (title: string) =>
    async (dispatch: any) => {
        try {
            const response = await todolistAPI.createTodolist(title)
            dispatch(addToDolistAC(title, response.data.data.item.id))
        } catch (err) {
            console.warn(err)
        }
    }

export const deleteTodolistTC = (todolistId: string) =>
    async (dispatch: any) => {
        try {
            const response = await todolistAPI.deleteTodolist(todolistId)
            dispatch(removeToDolistAC(todolistId))
        } catch (err) {
            console.warn(err)
        }
    }

export const updateTodolistTitleTC = (todolistId: string, newTitle: string) =>
    async (dispatch: any) => {
        try {
            const response = await todolistAPI.updateTodolistTitle(todolistId, newTitle)
            dispatch(changeTitleToDoListAC(todolistId, newTitle))
        } catch (err) {
            console.warn(err)
        }
    }