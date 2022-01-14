import {todolistAPI} from "../../api/api";
import {ThunkType} from "../store";
import {RequestStatusType, setAppError, setAppStatus} from "./app-reducer";
import {handlingError, throwNewError} from "../../utils/error-utils";
import { ITodolist } from "../../types/types";

//constants
const ADD_TODOLIST = 'todolist/todolists-reducer/ADD_TODOLIST'
const SET_TODOLISTS = 'todolist/todolists-reducer/SET_TODOLISTS'
const CHANGE_TITLE_TODOLIST = 'todolist/todolists-reducer/CHANGE_TITLE_TODOLIST'
export const REMOVE_TODOLIST = 'todolist/todolists-reducer/REMOVE_TODOLIST'
const SET_TODOLIST_FILTER_STATUS = 'todolist/todolists-reducer/SET_TODOLIST_FILTER_STATUS'
const SET_TODOLISTS_STATUS = 'todolist/todolists-reducer/SET_TODOLISTS_STATUS'

//initial state
const iState = {
    todolists: [] as ITodolistWithFilter[],
    todolistsStatus: 'idle' as RequestStatusType,
}

//reducer
export const todolistsReducer = (state: StateToDoListType = iState, action: TTodolistReducerActions): StateToDoListType => {
    switch (action.type) {
        case ADD_TODOLIST:
            return {
                ...state,
                todolists: [{...action.todolist, filter: 'all'}, ...state.todolists]
            }
        case SET_TODOLISTS:
            return {
                ...state,
                todolists: action.todolists.map(i => ({...i, filter: 'all'}))
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
        case SET_TODOLIST_FILTER_STATUS:
            return {
                ...state,
                todolists: state.todolists.map(i => i.id === action.id ? {...i, filter: action.status} : i)
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

//action creators
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

export const setTodolistFilterStatusAC = (id: string, status: TFilter) => ({
    type: SET_TODOLIST_FILTER_STATUS, id, status
} as const)

export const setToDolistsStatusAC = (status: RequestStatusType) => ({
    type: SET_TODOLISTS_STATUS, status
} as const)

//thunks
export const createTodolistTC = (title: string): ThunkType => async dispatch => {
    try {
        dispatch(setAppError(null))
        dispatch(setAppStatus('loading'))

        const response = await todolistAPI.createTodolist(title)

        if (response.resultCode === 0) {
            dispatch(addToDolistAC(response.data.item))
            dispatch(setAppStatus('succeeded'))
        } else {
            throwNewError(dispatch,response.messages[0])
        }
    } catch (err) {
        handlingError(dispatch, err)
    }
}

export const getTodolistsTC = (): ThunkType => async dispatch => {
    try {
        dispatch(setAppError(null))
        dispatch(setAppStatus('loading'))

        const data = await todolistAPI.getTodolists()

        if (data) {
            dispatch(setTodolistsAC(data))
            dispatch(setAppStatus('succeeded'))
        } else {
            throwNewError(dispatch,'Todolist`s loading error')
        }
    } catch (err) {
        handlingError(dispatch, err)
    }
}

export const updateTodolistTitleTC = (todolistId: string, title: string): ThunkType => async dispatch => {
    try {
        dispatch(setAppError(null))
        dispatch(setAppStatus("loading"))

        const response = await todolistAPI.updateTodolistTitle(todolistId, title)

        if (response.resultCode === 0) {
            dispatch(changeTitleToDoListAC(todolistId, title))
            dispatch(setAppStatus("succeeded"))
        } else {
            throwNewError(dispatch,response.messages[0])
        }

    } catch (err) {
        handlingError(dispatch, err)
    }
}

export const deleteTodolistTC = (todolistId: string): ThunkType => async dispatch => {
    try {
        dispatch(setAppError(null))
        dispatch(setAppStatus("loading"))

        const response = await todolistAPI.deleteTodolist(todolistId)

        if (response.resultCode === 0) {
            dispatch(removeToDolistAC(todolistId))
            dispatch(setAppStatus("succeeded"))
        } else {
            throwNewError(dispatch,response.messages[0])
        }
    } catch (err) {
        handlingError(dispatch, err)
    }
}

//Types
export interface ITodolistWithFilter extends ITodolist {
    filter: TFilter
}

export type TFilter = 'all' | 'active' | 'completed'
export type StateToDoListType = typeof iState
export type TTodolistReducerActions =
    | TAddToDoList
    | TSetTodolists
    | TChangeTitleToDoList
    | TRemoveToDoList
    | TSetTodolistFilterStatusAC
    | TSetToDolistsStatus
type TAddToDoList = ReturnType<typeof addToDolistAC>
type TSetTodolists = ReturnType<typeof setTodolistsAC>
type TChangeTitleToDoList = ReturnType<typeof changeTitleToDoListAC>
export type TRemoveToDoList = ReturnType<typeof removeToDolistAC>
type TSetTodolistFilterStatusAC = ReturnType<typeof setTodolistFilterStatusAC>
type TSetToDolistsStatus = ReturnType<typeof setToDolistsStatusAC>


