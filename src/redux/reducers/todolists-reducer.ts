import {ITodolist, todolistAPI} from "../../api/api";
import {ThunkType} from "../store";

//Action types
const ADD_TODOLIST = 'todolist/todolists-reducer/ADD_TODOLIST'
const SET_TODOLISTS = 'todolist/todolists-reducer/SET_TODOLISTS'
const CHANGE_TITLE_TODOLIST = 'todolist/todolists-reducer/CHANGE_TITLE_TODOLIST'
export const REMOVE_TODOLIST = 'todolist/todolists-reducer/REMOVE_TODOLIST'

//Types
export type StateToDoListType = Array<ITodolist>
export type TGeneralActionTodolistReducer =
    TAddToDoList
    | TSetTodolists
    | TChangeTitleToDoList
    | TRemoveToDoList
type TAddToDoList = ReturnType<typeof addToDolistAC>
type TSetTodolists = ReturnType<typeof setTodolistsAC>
type TChangeTitleToDoList = ReturnType<typeof changeTitleToDoListAC>
export type TRemoveToDoList = ReturnType<typeof removeToDolistAC>

//Reducer
export const todolistsReducer = (state: StateToDoListType = [], action: TGeneralActionTodolistReducer): StateToDoListType => {
    switch (action.type) {

        case ADD_TODOLIST:
            return [action.todolist, ...state]

        case SET_TODOLISTS:
            return [...state, ...action.todolists]

        case CHANGE_TITLE_TODOLIST:
            return state.map(i => i.id === action.toDoListID ? {...i, title: action.title} : i)

        case REMOVE_TODOLIST:
            return state.filter(i => i.id !== action.toDoListID)

        default:
            return state
    }
}

//Action Creators
export const addToDolistAC = (todolist: ITodolist) => ({
    type: ADD_TODOLIST, todolist
} as const)

export const setTodolistsAC = (todolists: Array<ITodolist>) => ({
    type: SET_TODOLISTS, todolists
} as const)

export const changeTitleToDoListAC = (toDoListID: string, title: string) => ({
    type: CHANGE_TITLE_TODOLIST, toDoListID, title,
} as const)

export const removeToDolistAC = (toDoListID: string) => ({
    type: REMOVE_TODOLIST, toDoListID
} as const)

//Thunk
export const createTodolistTC = (title: string): ThunkType => async dispatch => {
    try {
        const response = await todolistAPI.createTodolist(title)
        if (response.resultCode === 0) {
            dispatch(addToDolistAC(response.data.item))
        }
    } catch (err) {
        console.error(`Error in create Todolist TC: ${err}`)
    }
}

export const getTodolistsTC = (): ThunkType => async dispatch => {
    try {
        const data = await todolistAPI.getTodolists()

        if (data.length) {
            dispatch(setTodolistsAC(data))
        } else {
            throw new Error(`On todolistAPI.getTodolist's request was return: empty response or error. \n 
            Response content: ${data}`)
        }
    } catch (err) {
        console.error(err)
    }
}

export const updateTodolistTitleTC = (todolistId: string, title: string): ThunkType => async dispatch => {
    try {
        const response = await todolistAPI.updateTodolistTitle(todolistId, title)
        if (response.resultCode === 0) {
            dispatch(changeTitleToDoListAC(todolistId, title))
        }
    } catch (err) {
        console.error(`Error in update title Todolist TC: ${err}`)
    }
}

export const deleteTodolistTC = (todolistId: string): ThunkType => async dispatch => {
    try {
        const response = await todolistAPI.deleteTodolist(todolistId)
        if (response.resultCode === 0) {
            dispatch(removeToDolistAC(todolistId))
        }
    } catch (err) {
        console.error(`Error in delete Todolist TC: ${err}`)
    }
}


