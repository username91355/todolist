import { ITask } from "../../types/types";
import {addTaskAC, IStateTasks, removeTaskAC, setTasksAC, tasksReducer, updateTaskAC} from "./tasks-reducer";
import {removeToDolistAC} from "./todolists-reducer";

const testTask: ITask = {
    addedDate: 'addedDate',
    deadline: 'deadline',
    description: 'description',
    id: 'testTaskId',
    order: 1,
    priority: 0,
    startDate: 'startDate',
    status: 0,
    title: 'title',
    todoListId: 'testTodoListId',
    completed: true,
}

const testState: IStateTasks = {
    'testStateToDoListID': [{
        addedDate: 'testStateAddedDate',
        deadline: 'testStateDeadline',
        description: 'testStateDescription',
        id: 'TaskId',
        order: 0,
        priority: 1,
        startDate: 'testStateStartDate',
        status: 1,
        title: 'testStateTasktitle',
        todoListId: 'testStateToDoListID',
        completed: false,
    }]
}

const taskWithChange = {
    addedDate: 'testStateAddedDate',
    deadline: 'testStateDeadline',
    description: 'testStateDescription',
    id: 'TaskId',
    order: 0,
    priority: 2,
    startDate: 'testStateStartDate',
    status: 1,
    title: 'NEWtestStateTasktitle',
    todoListId: 'testStateToDoListID',
    completed: false,
}
describe('Tasks reducer',()=>{
    it('Add task AC', () => {
        const result = tasksReducer(testState, addTaskAC('testTodoListId', testTask))
        const resultTestStatetwoTask = tasksReducer(testState, addTaskAC('testStateToDoListID', testTask))

        expect(result['testTodoListId']).toEqual([testTask])
        expect(result['testStateToDoListID']).toEqual(testState['testStateToDoListID'])
        expect(resultTestStatetwoTask['testStateToDoListID'].length).toBe(2)
        expect(resultTestStatetwoTask['testStateToDoListID'][0]).toEqual(testTask)
        expect(result).not.toEqual(testState)
        expect(result).not.toBe(testState)
    })

    it('Set tasks AC', () => {
        const startState: IStateTasks = {'testTodoListId': []}
        const result = tasksReducer(startState, setTasksAC('testTodoListId', [testTask]))

        expect(result['testTodoListId']).toEqual([testTask])
        expect(result['testTodoListId'].length).toBe(1)
        expect(result).not.toEqual(startState)
        expect(result).not.toBe(testState)
    })

    it('Update task AC', () => {
        const result = tasksReducer(testState, updateTaskAC('testStateToDoListID', 'TaskId', taskWithChange))

        expect(result['testStateToDoListID']).toEqual([taskWithChange])
        expect(result['testStateToDoListID'].length).toBe(1)
        expect(result['testStateToDoListID'][0].title).toBe('NEWtestStateTasktitle')
        expect(result['testStateToDoListID'][0].priority).toBe(2)
        expect(result).not.toEqual(testState)
        expect(result).not.toBe(testState)
    })

    it('Remove task AC', () => {
        const result = tasksReducer(testState, removeTaskAC('testStateToDoListID', 'TaskId'))

        expect(result['testStateToDoListID']).toEqual([])
        expect(result['testStateToDoListID'].length).toBe(0)
        expect(result).not.toEqual(testState)
        expect(result).not.toBe(testState)
    })
    it('Remove To do list AC', () => {
        const result = tasksReducer(testState, removeToDolistAC('testStateToDoListID'))

        expect(result['testStateToDoListID']).toBeUndefined()
        expect(result).toEqual({})
        expect(result.hasOwnProperty('testStateToDoListID')).toBeFalsy()
        expect(result).not.toBe(testState)
    });
})
