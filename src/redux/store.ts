import {combineReducers, createStore } from "redux"
import {taskReducer} from "./reducers/taskReducer";
import {toDoListReducer} from "./reducers/toDoListReducer";

export type RootReducerType = ReturnType<typeof rootReducres>

const rootReducres = combineReducers({
    toDoList: toDoListReducer,
    tasks: taskReducer
})

export const store = createStore(rootReducres)