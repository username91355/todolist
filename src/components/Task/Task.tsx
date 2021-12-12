import React, {ChangeEvent} from 'react';
import {Checkbox} from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import MutableSpan from "../common/MutableSpan/MutableSpan";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import {deleteTaskTC, updateTaskTC} from "../../redux/reducers/tasks-reducer";
import {useDispatch} from "react-redux";
import {TaskStatuses, TTask} from "../../api/api";

type TProps = {
    task: TTask
    toDoListID: string
}

const Task: React.FC<TProps> = props => {

    const {
        task,
        toDoListID
    } = props

    const dispatch = useDispatch()

    const removeTaskOnTask = () => {
        dispatch(deleteTaskTC(toDoListID,task.id))
    }

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {

        const newTaskStatus = task.status === TaskStatuses.Complited
            ? TaskStatuses.New
            : TaskStatuses.Complited

        dispatch(updateTaskTC(toDoListID,
            task.id,
            task.title,
            task.description,
            e.currentTarget.checked,
            newTaskStatus,
            task.priority,
            task.startDate,
            task.deadline))

    }

    const changeTaskTitle = (title: string) => {
        dispatch(updateTaskTC(toDoListID,
            task.id,
            title,
            task.description,
            task.completed,
            task.status,
            task.priority,
            task.startDate,
            task.deadline))
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