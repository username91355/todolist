import React, {useCallback} from 'react';
import {
    changeTitleToDoListAC, deleteTodolistTC,
    filterTasksInToDoListAC,
    FilterValuesType,
    removeToDolistAC, updateTodolistTitleTC
} from '../../redux/reducers/todolists-reducer';
import AddItemForm from "../common/AddItemForm/AddItemForm";
import MutableSpan from "../common/MutableSpan/MutableSpan";
import IconButton from '@mui/material/IconButton';
import {Button} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {Paper} from "@mui/material";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    TaskType
} from "../../redux/reducers/tasks-reducer";
import {useDispatch} from "react-redux";
import Task from '../Task/Task';

type PropsType = {
    toDoListID: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
}

function Todolist(props: any) {

    //MapDispatchToProps
    let dispatch = useDispatch();

    const changeTitleToDoList = useCallback((title: string, toDoListID: string) => {
        dispatch(updateTodolistTitleTC(toDoListID, title))
        //dispatch(changeTitleToDoListAC(title, toDoListID))
    }, [dispatch])

    const addTask = useCallback((title: string, toDoListID: string) => {
        dispatch(addTaskAC(title, toDoListID))
    }, [dispatch])

    const changeFilter = useCallback((filter: FilterValuesType, toDoListID: string) => {
        dispatch(filterTasksInToDoListAC(filter, toDoListID))
    }, [dispatch])

    const removeToDoList = useCallback((toDoListID: string) => {
        dispatch(deleteTodolistTC(toDoListID))
        //dispatch(removeToDolistAC(toDoListID))
    }, [dispatch])

    const removeTask = (taskId: string, toDoListID: string) => {
        dispatch(removeTaskAC(taskId, toDoListID))
    }

    const onChangeHandler = (taskId: string, isDone: boolean, toDoListID: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, toDoListID))
    }

    const changeTuskTitle = (title: string, toDoListID: string, taskId: string) => {
        dispatch(changeTaskTitleAC(title, toDoListID, taskId))
    }

    const removeToDoListHandler = useCallback(() => {
        removeToDoList(props.toDoListID)
    }, [props.toDoListID, removeToDoList])

    const addTaskHandler = useCallback((title: string) => {
        addTask(title, props.toDoListID);
    }, [addTask, props.toDoListID])

    const changeTitle = useCallback((title: string) => {
        changeTitleToDoList(title, props.toDoListID)
    }, [props.toDoListID, changeTitleToDoList])

    const onAllClickHandler = useCallback(() => changeFilter("all", props.toDoListID),
        [changeFilter, props.toDoListID])

    const onActiveClickHandler = useCallback(() => changeFilter("active", props.toDoListID),
        [changeFilter, props.toDoListID])

    const onCompletedClickHandler = useCallback(() => changeFilter("completed", props.toDoListID),
        [changeFilter, props.toDoListID])

    let filteredTasks = props.tasks;

    if (props.filter === "active") {
        filteredTasks = props.tasks.filter((t: TaskType) => t.isDone === false)
    }

    if (props.filter === "completed") {
        filteredTasks = props.tasks.filter((t: TaskType) => t.isDone === true)
    }

    return (
        <Paper elevation={5}>
            <div style={{padding: '10px'}}>
                <MutableSpan title={props.title} onChangeTitle={changeTitle}/>
                <IconButton onClick={removeToDoListHandler}>
                    <DeleteIcon/>
                </IconButton>
                <AddItemForm addTask={addTaskHandler}/>
                {/*<div>*/}
                {/*    {*/}
                {/*        filteredTasks.map((t: TaskType) => {*/}
                {/*            return <Task*/}
                {/*                key={t.id}*/}
                {/*                task={t}*/}
                {/*                //id={t.id}*/}
                {/*                toDoListID={props.toDoListID}*/}
                {/*                removeTask={removeTask}*/}
                {/*                onChangeHandler={onChangeHandler}*/}
                {/*                changeTuskTitle={changeTuskTitle}*/}
                {/*            />*/}
                {/*        })*/}
                {/*    }*/}
                {/*</div>*/}
                <div>
                    <Button variant={props.filter === 'all' ? "contained" : "outlined"}
                            onClick={onAllClickHandler}
                            size={'small'}>All</Button>
                    <Button variant={props.filter === 'active' ? "contained" : "outlined"}
                            onClick={onActiveClickHandler}
                            size={'small'}>Active</Button>
                    <Button variant={props.filter === 'completed' ? "contained" : "outlined"}
                            onClick={onCompletedClickHandler}
                            size={'small'}>Completed</Button>
                </div>
            </div>
        </Paper>
    )
}

export default React.memo(Todolist)