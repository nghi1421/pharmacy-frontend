import { useForm } from 'react-hook-form';
import yup from '../../utils/yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormInputText } from '../../components/form/FormInputText';
import { useEffect } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useForgotPassword } from '../../hooks/useAuth';
import { CustomLink } from '../../components/CustomLink';

export interface EmailData {
    email: string
}

const defaultValues: EmailData = {
    email: '',
}

 // @ts-ignore
const forgotPasswordValidate: Yup.ObjectSchema<EmailData> = yup.object({
    email: yup
        .string()
        .required('Email bắt buộc.')
        .email('Email không hợp lệ.'),
})

interface InitComponentProps {
    setOtpResponse: (s: string) => void
    setEmail: (s: string) => void
}

export const EmailForm: React.FC<InitComponentProps> = ({ setOtpResponse, setEmail}) => {
    const forgotPassword = useForgotPassword()
    const { handleSubmit, control, watch } = useForm<EmailData>({
        defaultValues: defaultValues,
        resolver: yupResolver(forgotPasswordValidate)
    });
    const onSubmit = (data: EmailData) => {
        forgotPassword.mutate(data)
    };

    useEffect(() => {
        if (forgotPassword.data) {
            setEmail(watch('email'))
            setOtpResponse(forgotPassword.data)
        }
    }, [forgotPassword.data])
    return (
        <>
            <Typography marginTop={15} component="h1" variant="h3" color='primary' flex={1}>
                Quên mật khẩu
            </Typography>
            <Box sx={{ mt: 2, width: '100%', px: 8, pt: 2, }} >
                <Grid container spacing={3}>
                    <Grid item xs={8} sm={12}>
                        <FormInputText
                            size='medium'
                            name="email"
                            control={control}
                            label="Email"
                            placeholder='Nhập địa chỉ email tài khoản quên mật khẩu'
                        />
                    </Grid>
                </Grid>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 4, mb: 2 }}
                        onClick={handleSubmit(onSubmit)}
                    >
                        Gửi OTP
                    </Button>
                    
                    <CustomLink link='/login' title='Quay về trang đăng nhập'/>
                </Box>
            </Box>
        </>
    )
}