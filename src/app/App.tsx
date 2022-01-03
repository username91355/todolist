import React, {useEffect} from 'react';
import './App.css';
import {AppStateType} from "../redux/store";
import {Header} from '../components/Header/Header';
import {CircularProgress, Container, LinearProgress} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {RequestStatusType} from "../redux/reducers/app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {TodolistList} from "../features/ToDoList/TodolistList";
import {Route, Routes, useNavigate} from 'react-router-dom';
import {Login} from "../features/login/Login";
import {authMe} from "../redux/reducers/auth-reducer";

export const App: React.FC = () => {

    const
        appInit = useSelector((state: AppStateType) => state.auth.appInit),
        isAuth = useSelector((state: AppStateType) => state.auth.isAuth),
        appStatus = useSelector<AppStateType, RequestStatusType>(state => state.app.appStatus),
        appError = useSelector<AppStateType, string | null>(state => state.app.appError),
        navigate = useNavigate(),
        dispatch = useDispatch()

    useEffect(() => {
        dispatch(authMe())
    }, [dispatch])

    useEffect(() => {
        if (appInit && !isAuth) {
            navigate('/login')
        }
    }, [appInit, isAuth, navigate])

    return (
        <div className={'app__wrapper'}>
            <Header/>
            {appError && <ErrorSnackbar error={appError}/>}
            {appStatus === 'loading'
                ? <LinearProgress/>
                : <div style={{height: '6px'}}/>}
            <Container>
                {appInit
                    ? <Routes>
                        <Route path='/'
                               element={<TodolistList/>}/>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='*' element={<div><ErrorSnackbar error={'Page not found'}/></div>}/>
                    </Routes>
                    : <div style={{
                        display: 'flex',
                        minHeight: '100vh',
                        alignItems: 'center',
                        justifyContent: 'space-around'
                    }}>
                        <CircularProgress/>
                    </div>
                }
            </Container>
        </div>
    );
}
