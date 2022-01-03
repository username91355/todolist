import FormControl from '@mui/material/FormControl';
import React, {useEffect} from 'react';
import {Button, Checkbox, FormControlLabel, FormGroup, FormLabel, Grid, Paper, TextField} from "@mui/material";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {login} from '../../redux/reducers/auth-reducer';
import {useNavigate} from "react-router-dom";
import {AppStateType} from "../../redux/store";

export const Login = () => {

    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            if (!values.email) {
                return {
                    email: 'Email is required field',
                }
            }
            if (!values.password) {
                return {
                    password: 'Password is required field',
                }
            }
        },
        onSubmit: values => {
            dispatch(login(values.email, values.password, values.rememberMe));
            navigate('/')
        },
    });

    useEffect(() => {
        if(isAuth) {
            navigate('/')
        }
    }, [isAuth, navigate])

    return (
        <div>
            <Grid container justifyContent={'center'}>
                <Grid item xs={4}>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl>
                            <Paper style={{padding: '15px'}}>
                                <FormLabel>
                                    Enter the test account details: <br/>
                                    Email: free@samuraijs.com <br/>
                                    Password: free
                                </FormLabel>
                                <FormGroup>
                                    <TextField type={'email'}
                                               label={'Email'}
                                               margin={'normal'}
                                               {...formik.getFieldProps('email')}/>
                                    <div>{formik.errors.email || null}</div>
                                    <TextField type={'password'}
                                               label={'Password'}
                                               margin={'normal'}
                                               {...formik.getFieldProps('password')}/>
                                    <div>{formik.errors.password || null}</div>
                                    <FormControlLabel
                                        label={'Remember me'}
                                        control={<Checkbox checked={formik.values.rememberMe}
                                                           {...formik.getFieldProps('rememberMe')}/>}/>
                                    <Button type={'submit'} variant={"contained"}
                                            disabled={!!(formik.errors.email || formik.errors.password)}>Login</Button>
                                </FormGroup>
                            </Paper>
                        </FormControl>
                    </form>
                </Grid>
            </Grid>
        </div>
    );
};