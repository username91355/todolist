import React, {ChangeEvent} from 'react';
import {FilterValuesType} from '../../redux/toDoListReducer';
import {AddItemForm} from "../common/AddItemForm/AddItemForm";
import {MutableSpan} from "../common/MutableSpan/MutableSpan";
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import {Button, Checkbox} from "@mui/material";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DeleteIcon from '@mui/icons-material/Delete';
import {Paper} from "@mui/material";
import {TaskType} from "../../redux/taskReducer";

type PropsType = {
    toDoListID: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    changeTaskStatus: (taskId: string, isDone: boolean, toDoListID: string) => void
    changeFilter: (value: FilterValuesType, toDoListID: string) => void
    removeToDoList: (toDoListID: string) => void
    changeTitle: (title: string, toDoListID: string) => void
    addTask: (title: string, toDoListID: string) => void
    removeTask: (taskId: string, toDoListID: string) => void
    changeTaskTitle: (title: string, toDoListID: string, taskId: string) => void
}

export function Todolist(props: PropsType) {

    const removeToDoList = () => {
        props.removeToDoList(props.toDoListID)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.toDoListID);
    }

    const changeTitle = (title: string) => {
        props.changeTitle(title, props.toDoListID)
    }

    const onAllClickHandler = () => props.changeFilter("all", props.toDoListID);
    const onActiveClickHandler = () => props.changeFilter("active", props.toDoListID);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.toDoListID);

    return (
        <Paper elevation={5}>
            <div style={{padding: '10px'}}>
                <MutableSpan title={props.title} onChangeTitle={changeTitle}/>
                <IconButton onClick={removeToDoList}>
                    <DeleteIcon/>
                </IconButton>
                <AddItemForm addTask={addTask}/>
                <div>
                    {
                        props.tasks.map(t => {

                            const onClickHandler = () => props.removeTask(t.id, props.toDoListID)

                            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeTaskStatus(t.id, e.currentTarget.checked, props.toDoListID);
                            }

                            const changeTuskTitleHandler = (title: string) => {
                                props.changeTaskTitle(title, props.toDoListID, t.id)
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
