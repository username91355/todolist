import { Dispatch } from "redux";
import {setAppError, setAppStatus} from "../redux/reducers/app-reducer";

export const throwNewError = (dispatch: Dispatch, message: string | undefined) => {
    dispatch(setAppStatus('failed'))
    throw new Error(message || '')
}

export const handlingError = (dispatch: Dispatch, err: Error | unknown) => {
    if (err instanceof Error) {
        dispatch(setAppError(err.message))
    } else {
        dispatch(setAppError('An error has occurred'))
        console.error(`An error has occurred. Contact the administrator. Error data: ${err}`)
    }
}