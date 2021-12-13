import {
    addToDolistAC,
    changeTitleToDoListAC, removeToDolistAC,
    setTodolistsAC,
    StateToDoListType,
    todolistsReducer
} from "./todolists-reducer";
import {ITodolist} from "../../api/api";

const testNewTodolist: ITodolist = {
    id: 'stringID',
    title: 'titleTodolist',
    order: 1,
    addedDate: 'Added date'
}

const testState: StateToDoListType = [
    {
        id: 'testState_ID',
        title: 'testState_titleTodolist',
        order: 0,
        addedDate: 'testState_AddedDate'
    }
]

describe('Todolist reducer',()=>{
    it('Add to do list', () => {

        const result = todolistsReducer(testState, addToDolistAC(testNewTodolist))

        expect(result.length).toBe(2)
        expect(result[0]).toEqual(testNewTodolist)
        expect(result).not.toEqual(testState)
    })

    it('Set all to do lists', () => {
        const startState: StateToDoListType = []

        const result = todolistsReducer(startState, setTodolistsAC(testState))

        expect(result.length).toBe(1)
        expect(result[0]).toEqual(testState[0])
        expect(result).not.toEqual(startState)
    })

    it('Change to do list title', ()=> {
        const result = todolistsReducer(testState, changeTitleToDoListAC('testState_ID', 'New title'))

        expect(result.length).toBe(1)
        expect(result[0].title).toBe('New title')
        expect(result).not.toEqual(testState)
    })

    it('Remove to do list', ()=> {
        const result = todolistsReducer(testState, removeToDolistAC('testState_ID'))

        expect(result.length).toBe(0)
        expect(result.find(el => el.id === 'testState_ID')).toBeUndefined()
        expect(result).not.toEqual(testState)
    })
})
