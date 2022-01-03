import {ThunkType} from "../store";
import {authAPI} from "../../api/api";
import {handlingError, throwNewError} from "../../utils/error-utils";
import {setAppStatus} from "./app-reducer";

//constants
const SET_USER_DATA = 'todolist/auth-reducer/SET_USER_DATA'
const REMOVE_USER_DATA = 'todolist/auth-reducer/REMOVE_USER_DATA'
const SET_APP_INIT_STATUS = 'todolist/auth-reducer/SET_APP_INIT_STATUS'

//initial state
const iState = {
    appInit: false as boolean,
    isAuth: false as boolean,
    id: null as Nullable<number>,
    email: null as Nullable<string>,
    login: null as Nullable<string>,
}

export const authReducer = (state: TAuthReducerState = iState, action: TAuthReducerActions) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                isAuth: true,
                id: action.id,
                email: action.email,
                login: action.login,
            }
        case REMOVE_USER_DATA:
            return {
                ...state,
                isAuth: false,
                id: null,
                email: null,
                login: null,
            }
        case SET_APP_INIT_STATUS:
            return {
                ...state,
                appInit: action.init
            }
        default:
            return state
    }
}

//action creators
export const setUserData = (id: number, email: string, login: string) => ({
    type: SET_USER_DATA,
    id,
    email,
    login
} as const)
export const removeUserData = () => ({type: REMOVE_USER_DATA} as const)
export const setAppInitStatus = (init: boolean) => ({type: SET_APP_INIT_STATUS, init} as const)

//thunks
export const authMe = (): ThunkType => async dispatch => {
    try {
        dispatch(setAppStatus('loading'))
        dispatch(setAppInitStatus(false))
        const result = await authAPI.me()

        if (result.resultCode === 0) {
            dispatch(setUserData(result.data.id, result.data.email, result.data.login))
            dispatch(setAppInitStatus(true))
            dispatch(setAppStatus('succeeded'))
        } else {
            dispatch(setAppInitStatus(true))
            throwNewError(dispatch, result.messages[0])
        }
    } catch (err) {
        handlingError(dispatch, err)
    }
}

export const login = (email: string, password: string, rememberMe: boolean): ThunkType => async dispatch => {
    try {
        dispatch(setAppStatus('loading'))
        const result = await authAPI.login(email, password, rememberMe)

        if (result.resultCode === 0) {
            await dispatch(authMe())
            dispatch(setAppStatus('succeeded'))
        } else {
            throwNewError(dispatch, result.messages[0])
        }
    } catch (err) {
        handlingError(dispatch, err)
    }
}

export const logout = (): ThunkType => async dispatch => {
    try {
        dispatch(setAppInitStatus(false))
        dispatch(setAppStatus('loading'))
        const result = await authAPI.logout()

        if (result.resultCode === 0) {
            dispatch(removeUserData())
            dispatch(setAppStatus('succeeded'))
            dispatch(setAppInitStatus(true))
        } else {
            dispatch(setAppInitStatus(true))
            throwNewError(dispatch, result.messages[0])
        }
    } catch (err) {
        handlingError(dispatch, err)
    }
}

//types
type Nullable<T> = T | null
export type TAuthReducerState = typeof iState

export type TAuthReducerActions =
    | TSetUserData
    | TRemoveUserData
    | TSetAppInitStatus
type TSetUserData = ReturnType<typeof setUserData>
type TRemoveUserData = ReturnType<typeof removeUserData>
type TSetAppInitStatus = ReturnType<typeof setAppInitStatus>
