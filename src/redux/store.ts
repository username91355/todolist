import {applyMiddleware, combineReducers, createStore } from "redux"
import {tasksReducer, TGeneralActionTasksReducer} from "./reducers/tasks-reducer";
import {TGeneralActionTodolistReducer, todolistsReducer} from "./reducers/todolists-reducer";
import thunk, {ThunkAction} from 'redux-thunk'

const rootReducres = combineReducers({
    todolist: todolistsReducer,
    tasks: tasksReducer
})

export type AppStateType = ReturnType<typeof rootReducres>
export type AppActionType = TGeneralActionTodolistReducer | TGeneralActionTasksReducer
export type ThunkType = ThunkAction<void, AppStateType, unknown, AppActionType>

export const store = createStore(rootReducres, applyMiddleware(thunk))

//@ts-ignore
window.store = store