import React, {ChangeEvent} from 'react';
import {Checkbox} from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import MutableSpan from "../common/MutableSpan/MutableSpan";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import {deleteTaskTC, updateTaskTC} from "../../redux/reducers/tasks-reducer";
import {useDispatch} from "react-redux";
import {ITask, TaskStatuses} from "../../api/api";

type TProps = {
    task: ITask
    toDoListID: string
}

const Task: React.FC<TProps> = props => {

    const {
        task,
        toDoListID
    } = props

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

    return <div className={task.completed ? "is-done" : ""}>
        <Checkbox
            onChange={changeTaskStatus}
            checked={task.status === 2}
            icon={<BookmarkBorderIcon/>}
            checkedIcon={<BookmarkIcon/>}
        />
        <MutableSpan title={task.title} onChangeTitle={changeTaskTitle}/>
        <IconButton onClick={removeTaskOnTask}>
            <ClearIcon/>
        </IconButton>
    </div>
}

export default React.memo(Task);