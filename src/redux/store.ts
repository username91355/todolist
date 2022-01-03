import {applyMiddleware, combineReducers, createStore } from "redux"
import {tasksReducer, TTasksReducerActions} from "./reducers/tasks-reducer";
import {TTodolistReducerActions, todolistsReducer} from "./reducers/todolists-reducer";
import thunk, {ThunkAction} from 'redux-thunk'
import {appReducer, TAppActions} from "./reducers/app-reducer";
import {authReducer, TAuthReducerActions} from "./reducers/auth-reducer";

const rootReducres = combineReducers({
    todolist: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

export type AppStateType = ReturnType<typeof rootReducres>
export type AppActionType = TTodolistReducerActions | TTasksReducerActions | TAppActions | TAuthReducerActions
export type ThunkType = ThunkAction<void, AppStateType, unknown, AppActionType>

export const store = createStore(rootReducres, applyMiddleware(thunk))

//@ts-ignore
window.store = store