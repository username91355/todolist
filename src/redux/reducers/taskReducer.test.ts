export const testState = {
    tasks: ['Task 1', 'Task 2', 'Task 3']
}

type ActionType = {
    type: 'ADD_TUSK'
    title: string
    toDoListID: string
}

const action: ActionType = {
    type: 'ADD_TUSK',
    title: 'Test title',
    toDoListID: 'ID-TO-DO-LIST'
}

const testReducer = (state: any = testState, action: ActionType) => {

    switch (action.type) {
        case "ADD_TUSK": {
            return {
                ...state,
                tasks: [...state.tasks, 'Task 4']
            }
        }
        default:
            return state

    }
}

test('Test ADD_TUSK action', () => {

    let result = testReducer(testState, action)

    expect(result.tasks[3]).toBe('Task 4')

})
