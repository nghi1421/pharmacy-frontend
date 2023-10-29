import React from 'react'
import { Avatar, Box, Button, Container, CssBaseline, Grid, Link, Typography } from '@mui/material'
import '../assets/styles/index.css'
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup'
import { FormInputText } from '../components/form/FormInputText.tsx'
import { useForm } from 'react-hook-form'
import yup from '../utils/yup.ts'
import { enqueueSnackbar } from 'notistack';
import { login } from '../hooks/useAuth.ts';
import { useNavigate } from 'react-router-dom';
import { setAccessToken, setStaff } from '../store/auth.ts';

interface AuthForm {
    username: string
    password: string
}

const defaultValues: AuthForm = {
    username: '',
    password: '',
}

 // @ts-ignore
const authFormValidate: Yup.ObjectSchema<TypeByUseEditForm> = yup.object({
    username: yup
        .string()
        .required('Tên đăng nhập bắt buộc.')
        .max(255, 'Tên đăng nhập không quá 255 kí tự'),
    password: yup
        .string()
        .required('Mật khẩu bắt buộc.')
        .max(255, 'mật khẩu không quá 255 kí tự')
})

const Login: React.FC = () => {
    const navigate = useNavigate()
    const { handleSubmit, control } = useForm<AuthForm>({
        defaultValues: defaultValues,
        resolver: yupResolver(authFormValidate)
    });

    const onSubmit = async (data: AuthForm) => {
        const response = await login(data.username, data.password);
        if (response.data.message) {
            setStaff(response.data.data.staff)
            setAccessToken(response.data.accessToken);
            enqueueSnackbar(
                response.data.message, {
                autoHideDuration: 3000,
                variant: 'success'
            })
            navigate('/users')
        }
        else {
            enqueueSnackbar(
                response.data.errorMessage, {
                autoHideDuration: 3000,
                variant: 'error'
            })
        }
    };
        
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginLeftRight: 10,
                }}
                >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>

                </Avatar>
                <Typography component="h1" variant="h5">
                    Đăng nhập
                </Typography>
                <Box component="form"  noValidate sx={{ mt: 1 }}>
                    <Grid container spacing={4}>
                        <Grid item xs={8} sm={12}>
                            <FormInputText
                        name="username"
                        control={control}
                        label="Tên đăng nhập"
                        placeholder='Nhập tên đăng nhập của bạn'
                    />
                        </Grid>
                        <Grid item xs={8} sm={12}>
                        <FormInputText
                            name="password"
                            control={control}
                            label="Mật khẩu"
                            placeholder='Nhập mật khẩu của bạn'
                        />
                        </Grid>
                    </Grid>
                    
                    <Button
                        onClick={handleSubmit(onSubmit)}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Đăng nhập
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="" variant="body2">
                                Quên mật khẩu?
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}

export default Login