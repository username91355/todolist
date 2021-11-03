import React from 'react';
import './App.css';
import {v1} from 'uuid';
import {Todolist} from './components/ToDoList/Todolist';
import {AddItemForm} from "./components/common/AddItemForm/AddItemForm";
import ButtonAppBar from "./components/common/Header/Header";
import {Container, Grid} from "@mui/material";
import {
    addTaskAC,
    removeTaskAC,
    changeTaskTitleAC,
    changeTaskStatusAC,
    removeTasksListAC, createTasksListAC, StateTasksType,
} from "./redux/reducers/taskReducer";
import {
    addToDolistAC,
    changeTitleToDoListAC,
    filterTasksInToDoListAC, FilterValuesType,
    removeToDolistAC, StateToDoListType, ToDoListType,
} from "./redux/reducers/toDoListReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "./redux/store";

function App() {

    //MapStateToProps

    let toDoList = useSelector<RootReducerType,StateToDoListType>(state => state.toDoList)
    let tasks = useSelector<RootReducerType,StateTasksType>(state => state.tasks)

    // const TODOLIST_ID1 = v1()
    // const TODOLIST_ID2 = v1()
    //
    // const [toDoList, dispatchToDoList] = useReducer(toDoListReducer,[
    //     {id: TODOLIST_ID1, title: 'Tasks', filter: 'all'},
    //     {id: TODOLIST_ID2, title: 'Second tasks', filter: 'all'}
    // ])
    //
    //
    // const [tasks, dispatchTasks] = useReducer(taskReducer,{
    //     [TODOLIST_ID1]: [
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: true},
    //         {id: v1(), title: "ReactJS", isDone: false},
    //         {id: v1(), title: "Rest API", isDone: false},
    //         {id: v1(), title: "GraphQL", isDone: false},
    //     ],
    //     [TODOLIST_ID2]: [
    //         {id: v1(), title: "Storybook", isDone: true},
    //         {id: v1(), title: "Mongo DB", isDone: false},
    //         {id: v1(), title: "MySQL", isDone: false},
    //     ]
    // })


    //MapDispatchToProps
    let dispatch = useDispatch();

    function addToDoList(title: string) {
        const toDoListID = v1()
        dispatch(addToDolistAC(title, toDoListID))
        dispatch(createTasksListAC(title, toDoListID))
    }

    function removeToDoList(toDoListID: string) {
        dispatch(removeToDolistAC(toDoListID))
        dispatch(removeTasksListAC(toDoListID))
    }

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

    return (
        <div className={'app__wrapper'}>
            <ButtonAppBar/>
            <Container>
                <Grid container>
                    <Grid item xs={12}>
                        <AddItemForm addTask={addToDoList}/>
                    </Grid>

                    <Grid container spacing={3}>
                        {
                            toDoList.map((t: ToDoListType) => {
                                let tasksForTodolist = tasks[t.id];

                                if (t.filter === "active") {
                                    tasksForTodolist = tasks[t.id].filter(t => t.isDone === false);
                                }
                                if (t.filter === "completed") {
                                    tasksForTodolist = tasks[t.id].filter(t => t.isDone === true);
                                }

                                return (
                                    <Grid key={t.id} item xs={4} style={{minWidth: '300px'}}>
                                        <Todolist key={t.id}
                                                  toDoListID={t.id}
                                                  title={t.title}
                                                  filter={t.filter}
                                                  tasks={tasksForTodolist}
                                                  changeTaskStatus={changeStatus}
                                                  changeFilter={changeFilter}
                                                  removeToDoList={removeToDoList}
                                                  changeTitle={changeTitleToDoList}
                                                  addTask={addTask}
                                                  removeTask={removeTask}
                                                  changeTaskTitle={changeTaskTitle}
                                        />
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default App;