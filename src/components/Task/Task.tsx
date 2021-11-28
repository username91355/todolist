import React, {ChangeEvent} from 'react';
import {Checkbox} from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import MutableSpan from "../common/MutableSpan/MutableSpan";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TaskType} from "../../redux/reducers/tasks-reducer";

type TProps = {
    task: TaskType
    //id: string
    toDoListID: string
}

const Task: React.FC<TProps> = props => {

    const {
        task,
        //id,
        toDoListID,
    } = props

    // const task = useSelector<RootReducerType, TaskType>(state => state.tasks[toDoListID]
    //     .filter((task: TaskType) => task.id === id)[0])
    const dispatch = useDispatch()

    const removeTask = () => {
        dispatch(removeTaskAC(task.id, toDoListID))
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(task.id, e.currentTarget.checked, toDoListID))
    }

    const changeTuskTitle = (title: string) => {
        dispatch(changeTaskTitleAC(title, toDoListID, task.id))
    }

    return <div className={task.isDone ? "is-done" : ""}>
        <Checkbox
            onChange={onChangeHandler}
            checked={task.isDone}
            icon={<BookmarkBorderIcon/>}
            checkedIcon={<BookmarkIcon/>}
        />
        <MutableSpan title={task.title} onChangeTitle={changeTuskTitle}/>
        <IconButton onClick={removeTask}>
            <ClearIcon/>
        </IconButton>
    </div>
}

export default React.memo(Task);