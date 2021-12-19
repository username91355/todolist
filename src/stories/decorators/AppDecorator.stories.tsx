import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {tasksReducer} from "../../redux/reducers/tasks-reducer";
import {todolistsReducer} from "../../redux/reducers/todolists-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolist: todolistsReducer
});

export const storyBookStore = createStore(rootReducer, applyMiddleware(thunk));

export const AppDecoratorStories = (storyFn: () => React.ReactNode) => { //React.ReactNode - возвращает JSX
    return (
        <Provider store={storyBookStore}>
            {storyFn()}
        </Provider>
    );
};