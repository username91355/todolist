import {combineReducers, createStore } from "redux"
import {tasksReducer} from "./reducers/tasks-reducer";
import {todolistsReducer} from "./reducers/todolists-reducer";

export type RootReducerType = ReturnType<typeof rootReducres>

const rootReducres = combineReducers({
    toDoList: todolistsReducer,
    tasks: tasksReducer
})

export const store = createStore(rootReducres)