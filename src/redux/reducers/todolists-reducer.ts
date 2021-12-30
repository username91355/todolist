import {ITodolist, todolistAPI} from "../../api/api";
import {ThunkType} from "../store";
import {RequestStatusType, setAppStatus} from "./app-reducer";

//Action types
const ADD_TODOLIST = 'todolist/todolists-reducer/ADD_TODOLIST'
const SET_TODOLISTS = 'todolist/todolists-reducer/SET_TODOLISTS'
const CHANGE_TITLE_TODOLIST = 'todolist/todolists-reducer/CHANGE_TITLE_TODOLIST'
export const REMOVE_TODOLIST = 'todolist/todolists-reducer/REMOVE_TODOLIST'
const SET_TODOLISTS_STATUS = 'todolist/todolists-reducer/SET_TODOLISTS_STATUS'

const initialState = {
    todolists: [] as ITodolist[],
    todolistsStatus: 'idle' as RequestStatusType,
}

//Reducer
export const todolistsReducer = (state: StateToDoListType = initialState, action: TGeneralActionTodolistReducer): StateToDoListType => {
    switch (action.type) {
        case ADD_TODOLIST:
            return {
                ...state,
                todolists: [action.todolist, ...state.todolists]
            }
        case SET_TODOLISTS:
            return {
                ...state,
                todolists: [...action.todolists]
            }
        case CHANGE_TITLE_TODOLIST:
            return {
                ...state,
                todolists: state.todolists.map(i => i.id === action.toDoListID ? {...i, title: action.title} : i)
            }
        case SET_TODOLISTS_STATUS:
            return {
                ...state,
                todolistsStatus: action.status
            }
        case REMOVE_TODOLIST:
            return {
                ...state,
                todolists: state.todolists.filter(i => i.id !== action.toDoListID)
            }
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

export const setToDolistsStatusAC = (status: RequestStatusType) => ({
    type: SET_TODOLISTS_STATUS, status
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
        dispatch(setAppStatus('loading'))
        const data = await todolistAPI.getTodolists()

        if (data.length) {
            dispatch(setTodolistsAC(data))
            dispatch(setAppStatus('succeeded'))
        } else {
            dispatch(setAppStatus('failed'))
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

//Types
export type StateToDoListType = typeof initialState
export type TGeneralActionTodolistReducer =
    | TAddToDoList
    | TSetTodolists
    | TChangeTitleToDoList
    | TRemoveToDoList
    | TSetToDolistsStatus
type TAddToDoList = ReturnType<typeof addToDolistAC>
type TSetTodolists = ReturnType<typeof setTodolistsAC>
type TChangeTitleToDoList = ReturnType<typeof changeTitleToDoListAC>
export type TRemoveToDoList = ReturnType<typeof removeToDolistAC>
type TSetToDolistsStatus = ReturnType<typeof setToDolistsStatusAC>


