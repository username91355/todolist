import { v1 } from "uuid";
import {
    toDoListReducer,
    StateToDoListType,
    addToDolistAC,
    removeToDolistAC,
    changeTitleToDoListAC, filterTasksInToDoListAC
} from "./toDoListReducer";

test('To do list reducer: Add to do list', () => {
    const TODOLIST_ID1 = v1()
    const TODOLIST_ID2 = v1()
    const TODOLIST_ID3 = v1()

    let startState: StateToDoListType = [
        {id: TODOLIST_ID1, title: 'Tasks', filter: 'all'},
        {id: TODOLIST_ID2, title: 'Second tasks', filter: 'all'}
    ]

    let endState = toDoListReducer(startState, addToDolistAC('New to do list', TODOLIST_ID3))



    expect(endState.length).toBe(3)
    expect(endState[0].id).toBe(TODOLIST_ID3)
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

    let endState = toDoListReducer(startState, removeToDolistAC(TODOLIST_ID1))



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

    let endState = toDoListReducer(startState, changeTitleToDoListAC('New title', TODOLIST_ID1))



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

    let endStateWithFilterCompleted = toDoListReducer(startState, filterTasksInToDoListAC('completed', TODOLIST_ID1))
    let endStateWithFilterActive = toDoListReducer(startState, filterTasksInToDoListAC('active', TODOLIST_ID2))


    expect(endStateWithFilterCompleted.length).toBe(2)
    expect(endStateWithFilterCompleted[0].id).toBe(TODOLIST_ID1)
    expect(endStateWithFilterCompleted[0].title).toBe('Tasks')
    expect(endStateWithFilterCompleted[0].filter).toBe('completed')

    expect(endStateWithFilterActive.length).toBe(2)
    expect(endStateWithFilterActive[1].id).toBe(TODOLIST_ID2)
    expect(endStateWithFilterActive[1].title).toBe('Second tasks')
    expect(endStateWithFilterActive[1].filter).toBe('active')
})