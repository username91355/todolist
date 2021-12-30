const SET_APP_STATUS = 'TODOLIST/APP/SET_APP_STATUS'

const initialState = {
    appStatus: 'idle' as RequestStatusType,
    error: null as string | null
}

export const appReducer = (state: InitialStateType = initialState, action: TAppActions): InitialStateType => {
    switch (action.type) {
        case SET_APP_STATUS:
            return {...state, appStatus: action.status}
        default:
            return state
    }
}

export const setAppStatus = (status: RequestStatusType) => ({type: SET_APP_STATUS, status})

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type InitialStateType = typeof initialState
export type TAppActions =
    | TSetAppStatus
type TSetAppStatus = ReturnType<typeof setAppStatus>