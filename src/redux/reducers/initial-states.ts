//Initial state
import {v1} from "uuid";
import {StateTasksType} from "./tasks-reducer";
import {StateToDoListType} from "./todolists-reducer";

export const TODOLIST_ID1 = v1()
export const TODOLIST_ID2 = v1()

export const initialStateForToDoListReducer: StateToDoListType = [
    {id: TODOLIST_ID1, title: 'Tasks', filter: 'all'},
    {id: TODOLIST_ID2, title: 'Second tasks', filter: 'all'}
]

export const initialStateForTaskReducer: StateTasksType  = {
    [TODOLIST_ID1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ],
    [TODOLIST_ID2]: [
        {id: v1(), title: "Storybook", isDone: true},
        {id: v1(), title: "Mongo DB", isDone: false},
        {id: v1(), title: "MySQL", isDone: false},
    ]
}