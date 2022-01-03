import { ITodolist } from "../../types/types";
import {
    addToDolistAC,
    changeTitleToDoListAC, removeToDolistAC, setTodolistFilterStatusAC,
    setTodolistsAC, setToDolistsStatusAC, StateToDoListType,
    todolistsReducer
} from "./todolists-reducer";

const testNewTodolist: ITodolist = {
    id: 'stringID',
    title: 'titleTodolist',
    order: 1,
    addedDate: 'Added date'
}

const testState: StateToDoListType = {
    todolists: [
        {
            id: 'testState_ID',
            title: 'testState_titleTodolist',
            order: 0,
            addedDate: 'testState_AddedDate',
            filter: 'all'
        }
    ],
    todolistsStatus: 'idle'
}

describe('Todolist reducer', () => {
    it('Add to do list', () => {
        const result = todolistsReducer(testState, addToDolistAC(testNewTodolist))

        expect(result.todolists.length).toBe(2)
        expect(result.todolists[0]).toEqual({...testNewTodolist, filter: 'all'})
        expect(result).not.toEqual(testState)
        expect(result).not.toBe(testState)
    })

    it('Set all to do lists', () => {
        const startState: StateToDoListType = {
            todolists: [],
            todolistsStatus: 'idle'
        }
        const result = todolistsReducer(startState, setTodolistsAC(testState.todolists))

        expect(result.todolists.length).toBe(1)
        expect(result.todolists[0]).toEqual(testState.todolists[0])
        expect(result).not.toEqual(startState)
        expect(result).not.toBe(testState)
    })

    it('Change to do list title', () => {
        const result = todolistsReducer(testState, changeTitleToDoListAC('testState_ID', 'New title'))

        expect(result.todolists.length).toBe(1)
        expect(result.todolists[0].title).toBe('New title')
        expect(result).not.toEqual(testState)
        expect(result).not.toBe(testState)
    })

    it('Remove to do list', () => {
        const result = todolistsReducer(testState, removeToDolistAC('testState_ID'))

        expect(result.todolists.length).toBe(0)
        expect(result.todolists.find(el => el.id === 'testState_ID')).toBeUndefined()
        expect(result).not.toEqual(testState)
        expect(result).not.toBe(testState)
    })

    it('Change to do list filter status', () => {
        const result = todolistsReducer(testState, setTodolistFilterStatusAC('testState_ID', 'active'))

        expect(result.todolists.length).toBe(1)
        expect(result.todolists[0].filter).toBe('active')
        expect(result).not.toEqual(testState)
        expect(result).not.toBe(testState)
    })

    it('Change to do list status', () => {
        const result = todolistsReducer(testState, setToDolistsStatusAC('loading'))

        expect(result.todolistsStatus).toBe('loading')
        expect(result).not.toEqual(testState)
        expect(result).not.toBe(testState)
    })

})
