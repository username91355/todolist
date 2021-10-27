//Action types
const ADD_TODOLIST = 'ADD_TODOLIST'
const REMOVE_TODOLIST = 'REMOVE_TODOLIST'
const CHANGE_TITLE_TODOLIST = 'CHANGE_TITLE_TODOLIST'
const FILTER_TASKS_IN_TODOLIST = 'FILTER_TASKS_IN_TODOLIST'

//Action Creators
export const addToDolistAC = (title: string, toDoListID: string) => ({type: ADD_TODOLIST, title, toDoListID} as const)
export const removeToDolistAC = (toDoListID: string) => ({type: REMOVE_TODOLIST, toDoListID} as const)
export const changeTitleToDoListAC = (title: string, toDoListID: string) => ({type: CHANGE_TITLE_TODOLIST, title, toDoListID} as const)
export const filterTasksInToDoListAC = (filter: FilterValuesType, toDoListID: string) => ({type: FILTER_TASKS_IN_TODOLIST, filter, toDoListID} as const)

//Types
export type ToDoListType = { id: string, title: string, filter: FilterValuesType }
export type FilterValuesType = "all" | "active" | "completed";
type StateTasksType = any // !!! The uuid type is not the same as the string type !!!

type GeneralActionType = AddToDoListType | RemoveToDoListType | ChangeTitleToDoListType | FilterTasksInToDoListType
type AddToDoListType = ReturnType<typeof addToDolistAC>
type RemoveToDoListType = ReturnType<typeof removeToDolistAC>
type ChangeTitleToDoListType = ReturnType<typeof changeTitleToDoListAC>
type FilterTasksInToDoListType = ReturnType<typeof filterTasksInToDoListAC>

//Reducer
export const toDoListReducer = (state: StateTasksType, action: GeneralActionType) => {
    switch (action.type) {

        case ADD_TODOLIST: {
            return [{id: action.toDoListID, title: action.title, filter: 'all'}, ...state]
        }

        case REMOVE_TODOLIST: {
            return state.filter((i: ToDoListType) => i.id !== action.toDoListID)
        }

        case CHANGE_TITLE_TODOLIST: {
            return state.map((i: ToDoListType) => i.id === action.toDoListID ? {...i, title: action.title} : i)
        }

        case FILTER_TASKS_IN_TODOLIST: {
            return state.map((i: ToDoListType) => i.id === action.toDoListID ? {...i, filter: action.filter} : i)
        }

        default:
            return state
    }
}