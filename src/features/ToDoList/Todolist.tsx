import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {MutableSpan} from "../../components/MutableSpan/MutableSpan";
import IconButton from '@mui/material/IconButton';
import {Button, CircularProgress, Paper} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {createTaskTC, getTasksTC} from "../../redux/reducers/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {Task} from '../Task/Task';
import {TaskStatuses} from "../../api/api";
import {AppStateType} from "../../redux/store";
import {ITask} from "../../types/types";
import styles from './Todolist.module.css'
import {
    deleteTodolistTC,
    setTodolistFilterStatusAC,
    TFilter,
    updateTodolistTitleTC
} from '../../redux/reducers/todolists-reducer';

export const Todolist: React.FC<IProps> = React.memo(props => {

    const {toDoListID, title, tasks, filter} = props

    const
        dispatch = useDispatch(),
        isAuth = useSelector((state: AppStateType) => state.auth.isAuth),
        todolistsStatus = useSelector((state: AppStateType) => state.todolist.todolistsStatus),
        isDisabled = todolistsStatus === 'loading'

    useEffect(() => {
        dispatch(getTasksTC(toDoListID))
    }, [dispatch, toDoListID, isAuth])

    //Work with todolist`s
    const changeTitle = useCallback((title: string) => {
        dispatch(updateTodolistTitleTC(toDoListID, title))
    }, [dispatch, toDoListID])

    const addTaskHandler = useCallback((title: string) => {
        dispatch(createTaskTC(toDoListID, title))
    }, [dispatch, toDoListID])

    const removeToDoListHandler = useCallback(() => {
        dispatch(deleteTodolistTC(toDoListID))
    }, [dispatch, toDoListID])

    //Filter tasks
    const setTodolistFilterStatus = useCallback((id: string, status: TFilter) => {
        dispatch(setTodolistFilterStatusAC(id, status))
    }, [dispatch])

    const onAllClickHandler = useCallback(() => setTodolistFilterStatus(toDoListID, "all"),
        [setTodolistFilterStatus, toDoListID])

    const onActiveClickHandler = useCallback(() => setTodolistFilterStatus(toDoListID, "active"),
        [setTodolistFilterStatus, toDoListID])

    const onCompletedClickHandler = useCallback(() => setTodolistFilterStatus(toDoListID, "completed"),
        [setTodolistFilterStatus, toDoListID])

    let filteredTasks = tasks ? tasks : [];

    if (filter === "active") {
        filteredTasks = props.tasks.filter((t: ITask) => t.status !== TaskStatuses.Completed)
    }

    if (filter === "completed") {
        filteredTasks = props.tasks.filter((t: ITask) => t.status === TaskStatuses.Completed)
    }

    return (
        <div>
            <Paper elevation={5} style={{maxWidth: '320px'}}>
                <div className={styles.todo__wrapper}>
                    <div>
                        <MutableSpan title={title}
                                     disabled={isDisabled}
                                     onChangeTitle={changeTitle}/>
                        <IconButton onClick={removeToDoListHandler} disabled={isDisabled}>
                            <DeleteIcon/>
                        </IconButton>
                    </div>
                    <AddItemForm addTask={addTaskHandler} disabled={isDisabled}/>
                    <div>
                        {todolistsStatus === 'loading'
                            ? <div style={{textAlign: 'center'}}>
                                <CircularProgress/>
                            </div>
                            : filteredTasks.map(t => {
                                return <Task
                                    key={t.id}
                                    task={t}
                                    toDoListID={toDoListID}
                                />
                            })
                        }
                    </div>
                    <hr/>
                    <div className={styles.todo__buttons}>
                        <Button
                            variant={filter === 'all' ? "contained" : "outlined"}
                            onClick={onAllClickHandler}
                            size={'small'}>All</Button>
                        <Button
                            variant={filter === 'active' ? "contained" : "outlined"}
                            onClick={onActiveClickHandler}
                            size={'small'}>Active</Button>
                        <Button
                            variant={filter === 'completed' ? "contained" : "outlined"}
                            onClick={onCompletedClickHandler}
                            size={'small'}>Completed</Button>
                    </div>
                </div>
            </Paper>
        </div>
    )
})

//types
interface IProps {
    toDoListID: string
    title: string
    tasks: Array<ITask>
    filter: TFilter
}