import React, {useCallback, useEffect, useState} from 'react';
import {
    deleteTodolistTC, updateTodolistTitleTC
} from '../../redux/reducers/todolists-reducer';
import AddItemForm from "../common/AddItemForm/AddItemForm";
import MutableSpan from "../common/MutableSpan/MutableSpan";
import IconButton from '@mui/material/IconButton';
import {Button} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {Paper} from "@mui/material";
import {
    createTaskTC, getTasksTC
} from "../../redux/reducers/tasks-reducer";
import {useDispatch} from "react-redux";
import Task from '../Task/Task';
import {ITask, TaskStatuses} from "../../api/api";

type TProps = {
    toDoListID: string
    title: string
    tasks: Array<ITask>
}

type TFilter = 'all' | 'completed' | 'active'

const Todolist: React.FC<TProps> = props => {

    const {
        toDoListID,
        title,
        tasks
    } = props

    const dispatch = useDispatch();

    const [filter,setFilter] = useState<TFilter>('all')

    useEffect(() => {
        dispatch(getTasksTC(toDoListID))
    }, [dispatch, toDoListID])

    const changeTitleToDoList = useCallback((title: string, toDoListID: string) => {
        dispatch(updateTodolistTitleTC(toDoListID, title))
    }, [dispatch])

    const addTask = useCallback((title: string, toDoListID: string) => {
        dispatch(createTaskTC(toDoListID, title))
    }, [dispatch])

    const removeToDoList = useCallback((toDoListID: string) => {
        dispatch(deleteTodolistTC(toDoListID))
    }, [dispatch])

    const removeToDoListHandler = useCallback(() => {
        removeToDoList(toDoListID)
    }, [toDoListID, removeToDoList])

    const addTaskHandler = useCallback((title: string) => {
        addTask(title, toDoListID);
    }, [addTask, toDoListID])

    const changeTitle = useCallback((title: string) => {
        changeTitleToDoList(title, toDoListID)
    }, [toDoListID, changeTitleToDoList])

    //Filter tasks

    const onAllClickHandler = useCallback(() => setFilter("all"),
        [])

    const onActiveClickHandler = useCallback(() => setFilter("active"),
        [])

    const onCompletedClickHandler = useCallback(() => setFilter("completed"),
        [])

    let filteredTasks = tasks ? tasks : [];

    if (filter === "active") {
        filteredTasks = props.tasks.filter((t: ITask) => t.status !== TaskStatuses.Completed)
    }

    if (filter === "completed") {
        filteredTasks = props.tasks.filter((t: ITask) => t.status === TaskStatuses.Completed)
    }

    return (
        <Paper elevation={5}>
            <div style={{padding: '10px'}}>
                <MutableSpan title={title} onChangeTitle={changeTitle}/>
                <IconButton onClick={removeToDoListHandler}>
                    <DeleteIcon/>
                </IconButton>
                <AddItemForm addTask={addTaskHandler}/>
                <div>
                    {
                        filteredTasks.map( t => {
                            return <Task
                                key={t.id}
                                task={t}
                                toDoListID={toDoListID}
                            />
                        })
                    }
                </div>
                <div>
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
    )
}

export default React.memo(Todolist)