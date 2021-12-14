import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {tasksReducer} from "../../redux/reducers/tasks-reducer";
import {todolistsReducer} from "../../redux/reducers/todolists-reducer";
import {AppStateType} from "../../redux/store";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolist: todolistsReducer
});

const initialGlobalState: AppStateType = {

    todolist: [
        {id: 'TODOLIST_ID1',
            title: 'titleTodolist1',
            order: 1,
            addedDate: 'Added date1'},
        {id: 'TODOLIST_ID2',
            title: 'titleTodolist2',
            order: 1,
            addedDate: 'Added date2'}
    ],

    tasks: {
        ['TODOLIST_ID1']: [
            {
                addedDate: 'addedDate',
                deadline: 'deadline',
                description: 'description',
                id: 'testTaskId',
                order: 1,
                priority: 0,
                startDate: 'startDate',
                status: 0,
                title: 'title',
                todoListId: 'TODOLIST_ID1',
                completed: true,
            },
            {
                addedDate: 'addedDate2',
                deadline: 'deadline2',
                description: 'description2',
                id: 'testTaskId2',
                order: 0,
                priority: 0,
                startDate: 'startDate2',
                status: 2,
                title: 'title2',
                todoListId: 'TODOLIST_ID1',
                completed: false,
            }
        ],
        ['TODOLIST_ID2']: [
            {
                addedDate: 'addedDate3',
                deadline: 'deadline3',
                description: 'description3',
                id: 'testTaskId3',
                order: 0,
                priority: 0,
                startDate: 'startDate3',
                status: 2,
                title: 'title3',
                todoListId: 'TODOLIST_ID2',
                completed: false,
            }
        ]
    }
};

export const storyBookStore = createStore(rootReducer, applyMiddleware(thunk));

export const AppDecoratorStories = (storyFn: () => React.ReactNode) => { //React.ReactNode - возвращает JSX
    return (
        <Provider store={storyBookStore}>
            {storyFn()}
        </Provider>
    );
};