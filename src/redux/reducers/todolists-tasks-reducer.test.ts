import {
    initialStateForTaskReducer,
    initialStateForToDoListReducer,
    TODOLIST_ID1,
    TODOLIST_ID2
} from "./initial-states";
import {addToDolistAC, removeToDolistAC, todolistsReducer, ToDoListType} from "./todolists-reducer";
import {StateTasksType, tasksReducer} from "./tasks-reducer";

test('Add to do list: id`s should be equals', () => {
    const startTasksState: StateTasksType = initialStateForTaskReducer;
    const startTodolistsState: Array<ToDoListType> = initialStateForToDoListReducer;

    const action = addToDolistAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[2];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.toDoListID);
    expect(idFromTodolists).toBe(action.toDoListID);
});

test('Remove to do list: tasks list should be deleted', () => {
    const startTasksState: StateTasksType = initialStateForTaskReducer;
    const startTodolistsState: Array<ToDoListType> = initialStateForToDoListReducer;

    const action = removeToDolistAC(TODOLIST_ID1);

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);

    expect(keys.length).toBe(1)
    expect(keys[0]).toBe(TODOLIST_ID2)
    expect(endTodolistsState.length).toBe(1)
    expect(endTodolistsState[0].id).toEqual(TODOLIST_ID2)
});
