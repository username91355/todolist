import React, {useCallback, useEffect} from 'react';
import styles from './Todolist.module.css';
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist";
import {createTodolistTC, getTodolistsTC, ITodolistWithFilter} from "../../redux/reducers/todolists-reducer";
import {IStateTasks} from "../../redux/reducers/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {useNavigate} from "react-router-dom";

export const TodolistList: React.FC = () => {

    const
        todolists = useSelector<AppStateType, ITodolistWithFilter[]>(state => state.todolist.todolists),
        isAuth = useSelector((state: AppStateType) => state.auth.isAuth),
        tasks = useSelector<AppStateType, IStateTasks>(state => state.tasks),
        navigate = useNavigate(),
        dispatch = useDispatch()

    useEffect(() => {
        if (!isAuth) {
            navigate('/login')
        }
    }, [dispatch, isAuth, navigate])

    useEffect(() => {
        if (isAuth) {
            dispatch(getTodolistsTC())
        }
    }, [dispatch, isAuth])

    const addToDoList = useCallback((title: string) => {
        dispatch(createTodolistTC(title))
    }, [dispatch])

    return (
        <div className={styles.todolist__container}>
            <AddItemForm addTask={addToDoList}/>
            <div className={styles.todolist__todolists}>
                {todolists.map(t => {
                    return (
                        <Todolist key={t.id}
                                  tasks={tasks[t.id]}
                                  toDoListID={t.id}
                                  title={t.title}
                                  filter={t.filter}
                        />

                    )
                })}
            </div>
        </div>
    );
};