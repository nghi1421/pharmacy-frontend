import * as React from 'react';
import Button from '@mui/material/Button';
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
            boxShadow: 0
        }}
    >
          <Typography component="h1" variant="h3" color='primary'
              sx={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2), -1px -1px 2px rgba(0, 0, 0, 0.2)' }}>
            Đăng nhập
        </Typography>
        <Box component="form" noValidate sx={{ mt: 2, width: '100%' }}>
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


