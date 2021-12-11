import React, {useCallback, useEffect} from 'react';
import './App.css';
import Todolist from './components/ToDoList/Todolist';
import AddItemForm from "./components/common/AddItemForm/AddItemForm";
import Header from "./components/common/Header/Header";
import {Container, Grid} from "@mui/material";
import {
    createTodolistTC,
    getTodolistsTC,
    StateToDoListType
} from "./redux/reducers/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./redux/store";
import {StateTasksType} from "./redux/reducers/tasks-reducer";

function App() {

    //MapStateToProps
    let toDoList = useSelector<AppStateType, StateToDoListType>(state => state.toDoList)
    let tasks = useSelector<AppStateType, StateTasksType>(state => state.tasks)

    //MapDispatchToProps
    let dispatch = useDispatch();

    const addToDoList = useCallback((title: string) => {
        dispatch(createTodolistTC(title))
        //dispatch(addToDolistAC(title))
    }, [dispatch])

    useEffect(()=> {
        dispatch(getTodolistsTC())
    },[])

    return (
        <div className={'app__wrapper'}>
            <Header/>
            <Container>
                <Grid container>
                    <Grid item xs={12}>
                        <AddItemForm addTask={addToDoList}/>
                    </Grid>

                    <Grid container spacing={3}>
                        {
                            toDoList.map(t => {
                                return (
                                    <Grid key={t.id} item xs={4} style={{minWidth: '300px'}}>
                                        <Todolist key={t.id}
                                                  tasks={tasks[t.id]}
                                                  toDoListID={t.id}
                                                  title={t.title}
                                                  filter={(!t.filter ? 'all' : t.filter)}
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