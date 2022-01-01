import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AppStateType} from "../redux/store";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {Todolist} from "../features/ToDoList/Todolist";
import {Header} from '../components/Header/Header';
import {Container, Grid, LinearProgress} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {RequestStatusType} from "../redux/reducers/app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {IStateTasks} from "../redux/reducers/tasks-reducer";
import {
    createTodolistTC,
    getTodolistsTC,
    ITodolistWithFilter,
} from "../redux/reducers/todolists-reducer";

export const App: React.FC = () => {

    const
        todolists = useSelector<AppStateType, ITodolistWithFilter[]>(state => state.todolist.todolists),
        appStatus = useSelector<AppStateType, RequestStatusType>(state => state.app.appStatus),
        appError = useSelector<AppStateType, string | null>(state => state.app.appError),
        tasks = useSelector<AppStateType, IStateTasks>(state => state.tasks),
        dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTodolistsTC())
    }, [dispatch])

    const addToDoList = useCallback((title: string) => {
        dispatch(createTodolistTC(title))
    }, [dispatch])

    return (
        <div className={'app__wrapper'}>
            <Header/>
            {appError && <ErrorSnackbar error={appError}/>}
            {appStatus === 'loading'
                ? <LinearProgress/>
                : <div style={{height: '6px'}}/>}
            <Container>
                <Grid container>
                    <Grid item xs={12}>
                        <AddItemForm addTask={addToDoList}/>
                    </Grid>
                    <Grid container spacing={3}>
                        {todolists.map(t => {
                            return (
                                <Grid key={t.id} item xs={4} style={{minWidth: '300px'}}>
                                    <Todolist key={t.id}
                                              tasks={tasks[t.id]}
                                              toDoListID={t.id}
                                              title={t.title}
                                              filter={t.filter}
                                    />
                                </Grid>
                            )
                        })}
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}
