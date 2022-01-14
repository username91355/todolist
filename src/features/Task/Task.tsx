import React, {ChangeEvent} from 'react';
import {Checkbox} from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import {MutableSpan} from "../../components/MutableSpan/MutableSpan";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import {deleteTaskTC, updateTaskTC} from "../../redux/reducers/tasks-reducer";
import {useDispatch} from "react-redux";
import {TaskStatuses} from "../../api/api";
import {ITask} from '../../types/types';
import styles from './Task.module.css'

type TProps = {
    task: ITask
    toDoListID: string
}

export const Task: React.FC<TProps> = React.memo(props => {

    const {task, toDoListID} = props

    const dispatch = useDispatch()

    const removeTaskOnTask = () => {
        dispatch(deleteTaskTC(toDoListID, task.id))
    }

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const newTaskStatus = task.status === TaskStatuses.Completed
            ? TaskStatuses.New
            : TaskStatuses.Completed

        dispatch(updateTaskTC(toDoListID, {
            ...task,
            completed: e.currentTarget.checked,
            status: newTaskStatus
        }))
    }

    const changeTaskTitle = (title: string) => {
        dispatch(updateTaskTC(toDoListID, {
            ...task,
            title: title
        }))
    }

    return <div className={styles.task__wrapper}>
        <Checkbox
            onChange={changeTaskStatus}
            checked={task.status === 2}
            icon={<BookmarkBorderIcon/>}
            checkedIcon={<BookmarkIcon/>}
        />
        <MutableSpan title={task.title} onChangeTitle={changeTaskTitle}/>
        <IconButton onClick={removeTaskOnTask} style={{marginLeft: 'auto'}}>
            <ClearIcon/>
        </IconButton>
    </div>
})

