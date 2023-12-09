// import React, { useContext, useState } from 'react'
// import { Avatar, Box, Button, Container, CssBaseline, Grid, Link, Typography } from '@mui/material'
// import '../assets/styles/index.css'
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as Yup from 'yup'
// import { FormInputText } from '../components/form/FormInputText.tsx'
// import { useForm } from 'react-hook-form'
// import yup from '../utils/yup.ts'
// import { Navigate } from 'react-router-dom';
// import { getAccessToken, setAccessToken, setStaff } from '../store/auth.ts';
// import { AuthContext } from '../App.tsx';
// import { useLogin } from '../hooks/useAuth.ts';
// import { useQueryClient } from 'react-query';
// import { MuiOtpInput } from 'mui-one-time-password-input'

// export interface LoginForm {
//     username: string
//     password: string
// }

// const defaultValues: LoginForm = {
//     username: '',
//     password: '',
// }

//  // @ts-ignore
// const authFormValidate: Yup.ObjectSchema<LoginForm> = yup.object({
//     username: yup
//         .string()
//         .required('Tên đăng nhập bắt buộc.')
//         .max(255, 'Tên đăng nhập không quá 255 kí tự'),
//     password: yup
//         .string()
//         .required('Mật khẩu bắt buộc.')
//         .max(255, 'mật khẩu không quá 255 kí tự')
// })

// const Login: React.FC = () => {
//     const { roleId, setRoleId, setUsername } = useContext(AuthContext)
//     const login = useLogin()
//     const accessToken = getAccessToken()
//     const { handleSubmit, control } = useForm<LoginForm>({
//         defaultValues: defaultValues,
//         resolver: yupResolver(authFormValidate)
//     });

    // const [otp, setOtp] = useState('')
    // const handleChange = (newValue: string) => {
    //     setOtp(newValue)
    // }
    
//     const onSubmit = async (data: LoginForm) => {
//         login.mutate(data);
//     };
        
//     if (accessToken && roleId) {
//         const queryClient = useQueryClient();
//         switch (roleId) {
//             case 1: {
//                 queryClient.invalidateQueries('exports-today', { refetchInactive: true })
//                 return <Navigate replace to='/admin/users'/>
//             }
//             case 2: {
//                 queryClient.invalidateQueries('exports-today', { refetchInactive: true })
//                 return <Navigate replace to='/sales/create'/>
//             }
//             default: {
//                 setUsername(null)
//                 setStaff(null)
//                 setAccessToken(null)
//                 setRoleId(null)
//             }
//         }
//     }
//     else 
//     return (
//         <Container component="main" maxWidth="xs">
//             <CssBaseline />
//             <Box
//                 sx={{
//                     marginTop: 8,
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                     marginLeftRight: 10,
//                 }}
//                 >
//                 <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>

//                 </Avatar>
//                 <Typography component="h1" variant="h5">
//                     Đăng nhập
//                 </Typography>
//                 <MuiOtpInput value={otp} onChange={handleChange} length={6} />
//                 <Box component="form"  noValidate sx={{ mt: 1 }}>
//                     <Grid container spacing={4}>
//                         <Grid item xs={8} sm={12}>
//                             <FormInputText
//                         name="username"
//                         control={control}
//                         label="Tên đăng nhập"
//                         placeholder='Nhập tên đăng nhập của bạn'
//                     />
//                         </Grid>
//                         <Grid item xs={8} sm={12}>
                        // <FormInputText
                        //     name="password"
                        //     type='password'
                        //     control={control}
                        //     label="Mật khẩu"
                        //     placeholder='Nhập mật khẩu của bạn'
                        // />
//                         </Grid>
//                     </Grid>
                    
//                     <Button
//                         onClick={handleSubmit(onSubmit)}
//                         type="submit"
//                         fullWidth
//                         variant="contained"
//                         sx={{ mt: 3, mb: 2 }}
//                     >
//                         Đăng nhập
//                     </Button>
//                     <Grid container>
//                         <Grid item xs>
                            // <Link href="/forgot-password" variant="body2">
                            //     Quên mật khẩu?
                            // </Link>
//                         </Grid>
//                     </Grid>
//                 </Box>
//             </Box>
//         </Container>
//     )
// }


import * as React from 'react';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import * as Yup from 'yup'
import { useLogin } from '../hooks/useAuth';
import { getAccessToken, setAccessToken, setStaff } from '../store/auth';
import { AuthContext } from '../App';
import { useQueryClient } from 'react-query';
import { Navigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FormInputText } from '../components/form/FormInputText';
import yup from '../utils/yup';
import { CustomLink } from '../components/CustomLink';

export interface LoginForm {
    username: string
    password: string
}

const defaultValues: LoginForm = {
    username: '',
    password: '',
}

 // @ts-ignore
const authFormValidate: Yup.ObjectSchema<LoginForm> = yup.object({
    username: yup
        .string()
        .required('Tên đăng nhập bắt buộc.')
        .max(255, 'Tên đăng nhập không quá 255 kí tự'),
    password: yup
        .string()
        .required('Mật khẩu bắt buộc.')
        .max(255, 'mật khẩu không quá 255 kí tự')
})


const Login = () => {
  const { roleId, setRoleId, setUsername } = React.useContext(AuthContext)
    const login = useLogin()
    const accessToken = getAccessToken()
    const { handleSubmit, control } = useForm<LoginForm>({
        defaultValues: defaultValues,
        resolver: yupResolver(authFormValidate)
    });
    
    const onSubmit = (data: LoginForm) => {
        login.mutate(data);
    };
        
    if (accessToken && roleId) {
        const queryClient = useQueryClient();
        switch (roleId) {
            case 1: {
                queryClient.invalidateQueries('exports-today', { refetchInactive: true })
                return <Navigate replace to='/admin/users'/>
            }
            case 2: {
                queryClient.invalidateQueries('exports-today', { refetchInactive: true })
                return <Navigate replace to='/sales/create'/>
            }
            default: {
                setUsername(null)
                setStaff(null)
                setAccessToken(null)
                setRoleId(null)
            }
        }
    }
    else 

  return (
    <Box
        sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}
    >
        <Typography marginTop={15} component="h1" variant="h3" color='primary'>
            Đăng nhập
        </Typography>
        <Box component="form" noValidate sx={{ mt: 2 }}>
            <Grid container spacing={3}>
                <Grid item xs={8} sm={12}>
                    <FormInputText
                        size='medium'
                        name="username"
                        control={control}
                        label="Tên đăng nhập"
                        placeholder='Nhập tên đăng nhập của bạn'
                    />
                </Grid>
                <Grid item xs={8} sm={12}>
                    <FormInputText
                        size='medium'
                        name="password"
                        type='password'
                        control={control}
                        label="Mật khẩu"
                        placeholder='Nhập mật khẩu của bạn'
                    />      
                </Grid>
            </Grid>
            
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 4, mb: 2, p: 1 }}
                    onClick={handleSubmit(onSubmit)}
                >
                    Đăng nhập
                </Button>
                
                <CustomLink link='/forgot-password' title='Quên mật khẩu?'/>
            </Box>
        </Box>
    </Box>
  );
}

export default Login


