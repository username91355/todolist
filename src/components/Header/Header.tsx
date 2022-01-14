import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {logout} from '../../redux/reducers/auth-reducer';
import {useNavigate} from "react-router-dom";
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';

export const Header: React.FC = React.memo(() => {

    const
        dispatch = useDispatch(),
        navigate = useNavigate(),
        isAuth = useSelector((state: AppStateType) => state.auth.isAuth),
        login = useSelector((state: AppStateType) => state.auth.login)

    const logOut = () => {
        dispatch(logout())
        navigate('/login')
    }

    const loginHandler = () => {
        navigate('/login')
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h5"
                                component="div"
                                sx={{flexGrow: 1}}>
                        My to do
                    </Typography>
                    {isAuth
                        ? <div style={{display: 'flex', alignItems: 'center'}}>
                            {login}
                            <Button variant={'outlined'}
                                    style={{marginLeft: '10px'}}
                                    color="inherit"
                                    onClick={logOut}>Logout</Button>
                        </div>
                        : <Button variant={'outlined'}
                                  color="inherit" onClick={loginHandler}>Login</Button>}
                </Toolbar>
            </AppBar>
        </Box>
    );
})