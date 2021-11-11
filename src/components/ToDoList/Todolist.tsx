import React, {ChangeEvent} from 'react';
import {
    changeTitleToDoListAC,
    filterTasksInToDoListAC,
    FilterValuesType,
    removeToDolistAC
} from '../../redux/reducers/todolists-reducer';
import {AddItemForm} from "../common/AddItemForm/AddItemForm";
import {MutableSpan} from "../common/MutableSpan/MutableSpan";
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import {Button, Checkbox} from "@mui/material";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DeleteIcon from '@mui/icons-material/Delete';
import {Paper} from "@mui/material";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    StateTasksType
} from "../../redux/reducers/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../redux/store";

type PropsType = {
    toDoListID: string
    title: string
    filter: FilterValuesType
    // changeTaskStatus: (taskId: string, isDone: boolean, toDoListID: string) => void
    // changeFilter: (value: FilterValuesType, toDoListID: string) => void
    // removeToDoList: (toDoListID: string) => void
    // changeTitle: (title: string, toDoListID: string) => void
    // addTask: (title: string, toDoListID: string) => void
    // removeTask: (taskId: string, toDoListID: string) => void
    // changeTaskTitle: (title: string, toDoListID: string, taskId: string) => void
}

export function Todolist(props: PropsType) {

    //MapStateToProps
    let tasks = useSelector<RootReducerType, StateTasksType>(state => state.tasks)

    let filtredTasks = tasks[props.toDoListID];

    if (props.filter === "active") {
        filtredTasks = tasks[props.toDoListID].filter(t => t.isDone === false);
    }

    if (props.filter === "completed") {
        filtredTasks = tasks[props.toDoListID].filter(t => t.isDone === true);
    }

    //MapDispatchToProps
    let dispatch = useDispatch();

    function changeTitleToDoList(title: string, toDoListID: string) {
        dispatch(changeTitleToDoListAC(title, toDoListID))
    }

    function addTask(title: string, toDoListID: string) {
        dispatch(addTaskAC(title, toDoListID))
    }

    function removeTask(taskId: string, toDoListID: string) {
        dispatch(removeTaskAC(taskId, toDoListID))
    }

    function changeTaskTitle(title: string, toDoListID: string, taskId: string) {
        dispatch(changeTaskTitleAC(title, toDoListID, taskId))
    }

    function changeStatus(taskId: string, isDone: boolean, toDoListID: string) {
        dispatch(changeTaskStatusAC(taskId, isDone, toDoListID))
    }

    function changeFilter(filter: FilterValuesType, toDoListID: string) {
        dispatch(filterTasksInToDoListAC(filter, toDoListID))
    }

    function removeToDoList(toDoListID: string) {
        dispatch(removeToDolistAC(toDoListID))
        //dispatch(removeTasksListAC(toDoListID))
    }

    const removeToDoListHandler = () => {
        removeToDoList(props.toDoListID)
    }

    const addTaskHandler = (title: string) => {
        addTask(title, props.toDoListID);
    }

    const changeTitle = (title: string) => {
        changeTitleToDoList(title, props.toDoListID)
    }

    const onAllClickHandler = () => changeFilter("all", props.toDoListID);
    const onActiveClickHandler = () => changeFilter("active", props.toDoListID);
    const onCompletedClickHandler = () => changeFilter("completed", props.toDoListID);

    return (
        <Paper elevation={5}>
            <div style={{padding: '10px'}}>
                <MutableSpan title={props.title} onChangeTitle={changeTitle}/>
                <IconButton onClick={removeToDoListHandler}>
                    <DeleteIcon/>
                </IconButton>
                <AddItemForm addTask={addTaskHandler}/>
                <div>
                    {
                        filtredTasks.map(t => {

                            const onClickHandler = () => removeTask(t.id, props.toDoListID)

                            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                changeStatus(t.id, e.currentTarget.checked, props.toDoListID);
                            }

                            const changeTuskTitleHandler = (title: string) => {
                                changeTaskTitle(title, props.toDoListID, t.id)
                            }

                            return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                                <Checkbox
                                    onChange={onChangeHandler}
                                    checked={t.isDone}
                                    icon={<BookmarkBorderIcon/>}
                                    checkedIcon={<BookmarkIcon/>}
                                />
                                <MutableSpan title={t.title} onChangeTitle={changeTuskTitleHandler}/>
                                <IconButton onClick={onClickHandler}>
                                    <ClearIcon/>
                                </IconButton>
                            </div>
                        })
                    }
                </div>
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
