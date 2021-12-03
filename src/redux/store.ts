import {combineReducers, createStore } from "redux"
import {tasksReducer} from "./reducers/tasks-reducer";
import {todolistsReducer} from "./reducers/todolists-reducer";

const rootReducres = combineReducers({
    toDoList: todolistsReducer,
    tasks: tasksReducer
})

export type AppStateType = ReturnType<typeof rootReducres>

export const store = createStore(rootReducres)