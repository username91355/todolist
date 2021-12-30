import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AppStateType} from "../redux/store";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import Todolist from "../features/ToDoList/Todolist";
import Header from '../components/Header/Header';
import {Container, Grid, LinearProgress} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {RequestStatusType} from "../redux/reducers/app-reducer";
import {
    createTodolistTC,
    getTodolistsTC,
} from "../redux/reducers/todolists-reducer";
import {ITodolist} from "../api/api";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";


function App() {

    const
        todolists = useSelector<AppStateType, ITodolist[]>(state => state.todolist.todolists),
        appStatus = useSelector<AppStateType, RequestStatusType>(state => state.app.appStatus),
        appError = useSelector<AppStateType, string | null>(state => state.app.error),
        tasks = useSelector<AppStateType, any>(state => state.tasks), // any = import {SetTaskType} from "./redux/reducers/tasks-reducer"
        dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTodolistsTC())
    }, [dispatch])

    const addToDoList = useCallback((title: string) => {
        dispatch(createTodolistTC(title))
    }, [dispatch])

    return (
        <div className={'app__wrapper'}>
            <ErrorSnackbar error={appError}/>
            <Header/>
            {appStatus === 'loading' && <LinearProgress/>}
            <Container>
                <Grid container>
                    <Grid item xs={12}>
                        <AddItemForm addTask={addToDoList}/>
                    </Grid>
                    <Grid container spacing={3}>
                        {
                            todolists.map(t => {
                                return (
                                    <Grid key={t.id} item xs={4} style={{minWidth: '300px'}}>
                                        <Todolist key={t.id}
                                                  tasks={tasks[t.id]}
                                                  toDoListID={t.id}
                                                  title={t.title}
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