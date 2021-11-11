import React from 'react';
import './App.css';
import {Todolist} from './components/ToDoList/Todolist';
import {AddItemForm} from "./components/common/AddItemForm/AddItemForm";
import ButtonAppBar from "./components/common/Header/Header";
import {Container, Grid} from "@mui/material";
import {addToDolistAC, StateToDoListType, ToDoListType} from "./redux/reducers/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "./redux/store";

function App() {

    //MapStateToProps
    let toDoList = useSelector<RootReducerType,StateToDoListType>(state => state.toDoList)

    //MapDispatchToProps
    let dispatch = useDispatch();

    function addToDoList(title: string) {
        dispatch(addToDolistAC(title))
    }

    // const TODOLIST_ID1 = v1()
    // const TODOLIST_ID2 = v1()
    //
    // const [toDoList, dispatchToDoList] = useReducer(todolistsReducer,[
    //     {id: TODOLIST_ID1, title: 'Tasks', filter: 'all'},
    //     {id: TODOLIST_ID2, title: 'Second tasks', filter: 'all'}
    // ])
    //
    //
    // const [tasks, dispatchTasks] = useReducer(tasksReducer,{
    //     [TODOLIST_ID1]: [
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: true},
    //         {id: v1(), title: "ReactJS", isDone: false},
    //         {id: v1(), title: "Rest API", isDone: false},
    //         {id: v1(), title: "GraphQL", isDone: false},
    //     ],
    //     [TODOLIST_ID2]: [
    //         {id: v1(), title: "Storybook", isDone: true},
    //         {id: v1(), title: "Mongo DB", isDone: false},
    //         {id: v1(), title: "MySQL", isDone: false},
    //     ]
    // })

    return (
        <div className={'app__wrapper'}>
            <ButtonAppBar/>
            <Container>
                <Grid container>
                    <Grid item xs={12}>
                        <AddItemForm addTask={addToDoList}/>
                    </Grid>

                    <Grid container spacing={3}>
                        {
                            toDoList.map((t: ToDoListType) => {
                                return (
                                    <Grid key={t.id} item xs={4} style={{minWidth: '300px'}}>
                                        <Todolist key={t.id}
                                                  toDoListID={t.id}
                                                  title={t.title}
                                                  filter={t.filter}
                                        />
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default App;