import {Provider} from "react-redux";
import {combineReducers, createStore} from "redux";
import {v1} from "uuid";
import {tasksReducer} from "../../redux/reducers/tasks-reducer";
import {todolistsReducer} from "../../redux/reducers/todolists-reducer";
import {AppStateType} from "../../redux/store";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    toDoList: todolistsReducer
});

const initialGlobalState: AppStateType = {
    toDoList: [
        {id: 'TODOLIST_ID1', title: 'Tasks', filter: 'all'},
        {id: 'TODOLIST_ID2', title: 'Second tasks', filter: 'all'}
    ],

    tasks: {
        ['TODOLIST_ID1']: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        ['TODOLIST_ID2']: [
            {id: v1(), title: 'Storybook', isDone: true},
            {id: v1(), title: 'Mongo DB', isDone: false},
            {id: v1(), title: 'MySQL', isDone: false},
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppStateType);

export const AppDecoratorStories = (storyFn: () => React.ReactNode) => { //React.ReactNode - возвращает JSX
    return (
        <Provider store={storyBookStore}>
            {storyFn()}
        </Provider>
    );
};