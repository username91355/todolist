import { v1 } from "uuid";
import {
    todolistsReducer,
    StateToDoListType,
    addToDolistAC,
    removeToDolistAC,
    changeTitleToDoListAC, filterTasksInToDoListAC
} from "./todolists-reducer";

test('To do list reducer: Add to do list', () => {
    const TODOLIST_ID1 = v1()
    const TODOLIST_ID2 = v1()

    let startState: StateToDoListType = [
        {id: TODOLIST_ID1, title: 'Tasks', filter: 'all'},
        {id: TODOLIST_ID2, title: 'Second tasks', filter: 'all'}
    ]

    let action = addToDolistAC('New to do list')

    let endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(3)
    expect(endState[0].id).toBe(action.toDoListID)
    expect(endState[0].title).toBe('New to do list')
    expect(endState[0].filter).toBe('all')
})

test('To do list reducer: Remove to do list', () => {
    const TODOLIST_ID1 = v1()
    const TODOLIST_ID2 = v1()

    let startState: StateToDoListType = [
        {id: TODOLIST_ID1, title: 'Tasks', filter: 'all'},
        {id: TODOLIST_ID2, title: 'Second tasks', filter: 'all'}
    ]

    let endState = todolistsReducer(startState, removeToDolistAC(TODOLIST_ID1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(TODOLIST_ID2)
    expect(endState[0].title).toBe('Second tasks')
    expect(endState[0].filter).toBe('all')
})

test('To do list reducer: Change title to do list', () => {
    const TODOLIST_ID1 = v1()
    const TODOLIST_ID2 = v1()

    let startState: StateToDoListType = [
        {id: TODOLIST_ID1, title: 'Tasks', filter: 'all'},
        {id: TODOLIST_ID2, title: 'Second tasks', filter: 'all'}
    ]

    let endState = todolistsReducer(startState, changeTitleToDoListAC('New title', TODOLIST_ID1))

    expect(endState.length).toBe(2)
    expect(endState[0].id).toBe(TODOLIST_ID1)
    expect(endState[0].title).toBe('New title')
    expect(endState[0].filter).toBe('all')
})

test('To do list reducer: Change filter', () => {
    const TODOLIST_ID1 = v1()
    const TODOLIST_ID2 = v1()

    let startState: StateToDoListType = [
        {id: TODOLIST_ID1, title: 'Tasks', filter: 'all'},
        {id: TODOLIST_ID2, title: 'Second tasks', filter: 'all'}
    ]

    let endStateWithFilterCompleted = todolistsReducer(startState, filterTasksInToDoListAC('completed', TODOLIST_ID1))
    let endStateWithFilterActive = todolistsReducer(startState, filterTasksInToDoListAC('active', TODOLIST_ID2))

    expect(endStateWithFilterCompleted.length).toBe(2)
    expect(endStateWithFilterCompleted[0].id).toBe(TODOLIST_ID1)
    expect(endStateWithFilterCompleted[0].title).toBe('Tasks')
    expect(endStateWithFilterCompleted[0].filter).toBe('completed')
    expect(endStateWithFilterActive.length).toBe(2)
    expect(endStateWithFilterActive[1].id).toBe(TODOLIST_ID2)
    expect(endStateWithFilterActive[1].title).toBe('Second tasks')
    expect(endStateWithFilterActive[1].filter).toBe('active')
})