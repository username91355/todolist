import {v1} from "uuid";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer,
    StateTasksType,
} from "./tasks-reducer";
import {addToDolistAC, removeToDolistAC} from "./todolists-reducer";

test('To do list reducer: Add task', () => {
    const TODOLIST_ID1 = v1()
    const TODOLIST_ID2 = v1()

    let startState: StateTasksType = {
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

    let endState = tasksReducer(startState, addTaskAC('New task', TODOLIST_ID2))

    expect(endState[TODOLIST_ID2].length).toBe(4)
    expect(endState[TODOLIST_ID2][0].title).toBe('New task')
    expect(endState[TODOLIST_ID2][0].isDone).toBe(false)
})

test('To do list reducer: Remove task ', () => {
    const TODOLIST_ID1 = v1()
    const TODOLIST_ID2 = v1()
    const TASK_ID = 'TEST'

    let startState: StateTasksType = {
        [TODOLIST_ID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: TASK_ID, title: "GraphQL", isDone: false},
        ],
        [TODOLIST_ID2]: [
            {id: v1(), title: "Storybook", isDone: true},
            {id: v1(), title: "Mongo DB", isDone: false},
            {id: v1(), title: "MySQL", isDone: false},
        ]
    }

    let endState = tasksReducer(startState, removeTaskAC(TASK_ID, TODOLIST_ID1))

    expect(endState[TODOLIST_ID1].length).toBe(4)
    expect(endState[TODOLIST_ID1].some(i => i.title === "GraphQL")).toBe(false)
    expect(endState[TODOLIST_ID1][4]).toBe(undefined)
})

test('To do list reducer: Change task title', () => {
    const TODOLIST_ID1 = v1()
    const TODOLIST_ID2 = v1()
    const TASK_ID = 'TEST'

    let startState: StateTasksType = {
        [TODOLIST_ID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: TASK_ID, title: "GraphQL", isDone: false},
        ],
        [TODOLIST_ID2]: [
            {id: v1(), title: "Storybook", isDone: true},
            {id: v1(), title: "Mongo DB", isDone: false},
            {id: v1(), title: "MySQL", isDone: false},
        ]
    }

    let endState = tasksReducer(startState, changeTaskTitleAC('New title', TODOLIST_ID1, TASK_ID))

    expect(endState[TODOLIST_ID1].length).toBe(5)
    expect(endState[TODOLIST_ID1][4].title).toBe('New title')
    expect(endState[TODOLIST_ID1][4].id).toBe(TASK_ID)
    expect(endState[TODOLIST_ID1][4].isDone).toBe(false)

})

test('To do list reducer: Change task status', () => {
    const TODOLIST_ID1 = v1()
    const TODOLIST_ID2 = v1()
    const TASK_ID = 'TEST'

    let startState: StateTasksType = {
        [TODOLIST_ID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: TASK_ID, title: "GraphQL", isDone: false},
        ],
        [TODOLIST_ID2]: [
            {id: v1(), title: "Storybook", isDone: true},
            {id: v1(), title: "Mongo DB", isDone: false},
            {id: v1(), title: "MySQL", isDone: false},
        ]
    }

    let endState = tasksReducer(startState, changeTaskStatusAC(TASK_ID, true, TODOLIST_ID1))

    expect(endState[TODOLIST_ID1].length).toBe(5)
    expect(endState[TODOLIST_ID1][4].title).toBe("GraphQL")
    expect(endState[TODOLIST_ID1][4].id).toBe(TASK_ID)
    expect(endState[TODOLIST_ID1][4].isDone).toBe(true)
})

test('To do list reducer: Create tasks list', () => {
    const TODOLIST_ID1 = v1()
    const TODOLIST_ID2 = v1()

    let startState: StateTasksType = {
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

    let action = addToDolistAC('TITLE')
    let endState = tasksReducer(startState, action)

    expect(Object.keys(endState).length).toBe(3)
    expect(Object.keys(endState)[2]).toBe(action.toDoListID)
})

test('To do list reducer: Remove tasks list', () => {
    const TODOLIST_ID1 = v1()
    const TODOLIST_ID2 = v1()

    let startState: StateTasksType = {
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

    let endState = tasksReducer(startState, removeToDolistAC(TODOLIST_ID1))

    expect(Object.keys(endState).length).toBe(1)
    expect(Object.keys(endState)[0]).toBe(TODOLIST_ID2)
})



