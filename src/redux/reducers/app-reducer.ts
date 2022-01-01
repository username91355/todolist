//constants
const SET_APP_STATUS = 'todolist/app-reducer/SET_APP_STATUS'
const SET_APP_ERROR = 'todolist/app-reducer/SET_APP_ERROR'

//initial state
const iState = {
    appStatus: 'idle' as RequestStatusType,
    appError: null as string | null
}

//reducer
export const appReducer = (state: InitialStateType = iState, action: TAppActions): InitialStateType => {
    switch (action.type) {
        case SET_APP_STATUS:
            return {...state, appStatus: action.status}
        case SET_APP_ERROR:
            return {...state, appError: action.error}
        default:
            return state
    }
}

//action creators
export const setAppStatus = (status: RequestStatusType) => ({type: SET_APP_STATUS, status} as const)
export const setAppError = (error: string | null) => ({type: SET_APP_ERROR, error} as const)

//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = typeof iState
export type TAppActions =
    | TSetAppStatus
    | TSetAppError
type TSetAppStatus = ReturnType<typeof setAppStatus>
type TSetAppError = ReturnType<typeof setAppError>