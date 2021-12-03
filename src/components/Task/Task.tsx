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
    removeTask: (taskId: string, toDoListID: string) => void
    onChangeHandler: (taskId: string, isDone: boolean, toDoListID: string) => void
    changeTuskTitle: (title: string, toDoListID: string, taskId: string) => void
}


const Task: React.FC<TProps> = props => {

    const {
        task,
        //id,
        toDoListID,
        removeTask,
        onChangeHandler,
        changeTuskTitle
    } = props

    // const task = useSelector<RootReducerType, TaskType>(state => state.tasks[toDoListID]
    //     .filter((task: TaskType) => task.id === id)[0])
    //const dispatch = useDispatch()

    const removeTaskOnTask = () => {
        removeTask(task.id, toDoListID)
    }

    const onChangeHandlerOnTask = (e: ChangeEvent<HTMLInputElement>) => {
        onChangeHandler(task.id, e.currentTarget.checked, toDoListID)
    }

    const changeTuskTitleOnTask = (title: string) => {
        changeTuskTitle(title, toDoListID, task.id)
    }

    return <div className={task.isDone ? "is-done" : ""}>
        <Checkbox
            onChange={onChangeHandlerOnTask}
            checked={task.isDone}
            icon={<BookmarkBorderIcon/>}
            checkedIcon={<BookmarkIcon/>}
        />
        <MutableSpan title={task.title} onChangeTitle={changeTuskTitleOnTask}/>
        <IconButton onClick={removeTaskOnTask}>
            <ClearIcon/>
        </IconButton>
    </div>
}

export default React.memo(Task);