import { FormEvent, useState } from 'react'
import TextInput from '../components/form/InputText.tsx'
import { Avatar, Box, Button, Container, CssBaseline, Grid, Link, Typography } from '@mui/material'
import '../assets/styles/index.css'
import { useAppDispatch } from '../redux/store/hooks.ts'
import { authenticate } from '../redux/authSlice'

function Login() {
    const dispatch = useAppDispatch()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        dispatch(authenticate({ username, password }))
    }
        
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
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextInput
                        label='Tên đăng nhập'
                        placeHolder='Nhập tên đăng nhập'
                        value={username}
                        onChange={setUsername} />
                    <TextInput
                        label='Mật khẩu'
                        placeHolder='Nhập mật khẩu'
                        type='password'
                        value={password}
                        onChange={setPassword}
                    />
                    <Button
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