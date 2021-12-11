import {applyMiddleware, combineReducers, createStore } from "redux"
import {tasksReducer} from "./reducers/tasks-reducer";
import {todolistsReducer} from "./reducers/todolists-reducer";
import thunk from 'redux-thunk'

const rootReducres = combineReducers({
    toDoList: todolistsReducer,
    tasks: tasksReducer
})

export type AppStateType = ReturnType<typeof rootReducres>

export const store = createStore(rootReducres, applyMiddleware(thunk))