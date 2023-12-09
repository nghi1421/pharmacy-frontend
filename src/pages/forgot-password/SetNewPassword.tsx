import { Box, Button, Grid, Typography } from "@mui/material"
import { CustomLink } from "../../components/CustomLink"
import yup from "../../utils/yup"
import * as Yup from 'yup'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { FormInputText } from "../../components/form/FormInputText"
import { useSetNewPassword } from "../../hooks/useAuth"

export interface SetNewPasswordForm {
    email: string
    password: string
    confirmationPassword: string
}

//@ts-ignore
const setNewPasswordValidate: Yup.ObjectSchema<SetNewPasswordForm> = yup.object({
    password: yup
        .string()
        .required('Mật khẩu bắt buộc.')
        .min(6, 'Mật khẩu tối thiểu 6 kí tự')
        .max(255, 'Mật khẩu tối đa 255 kí tự'),
    confirmationPassword: yup
        .string()
        .required('Xác nhận mật khẩu bắt buộc.')
        .oneOf([Yup.ref('password'), ''], 'Xác nhận mật khẩu không khớp.')
        .min(6, 'Mật khẩu tối thiểu 6 kí tự')
        .max(255, 'Mật khẩu tối đa 255 kí tự'),
})

interface SetNewPasswordProps {
    email: string
}

export const SetNewPassword: React.FC<SetNewPasswordProps> = ({ email }) => {
    const setNewPassword = useSetNewPassword()
    const { handleSubmit, control } = useForm<SetNewPasswordForm>({
        defaultValues: {
            email: '',
            password: '',
            confirmationPassword: ''
        },
        resolver: yupResolver(setNewPasswordValidate)
    });
    
    const onSubmit = (data: SetNewPasswordForm) => {
        setNewPassword.mutate({...data, email})
    }
    return (
        <>
            <Typography marginTop={15} component="h1" variant="h3" color='primary' flex={1}>
                Đặt mật khẩu mới
            </Typography>
            <Box sx={{ mt: 2, width: '100%', px: 8, pt: 2, }} >
                <Grid container spacing={3}>
                    <Grid item xs={8} sm={12}>
                        <FormInputText
                            name="password"
                            type='password'
                            size='medium'
                            control={control}
                            label="Mật khẩu mới"
                            placeholder='Nhập mật khẩu mới'
                        />
                    </Grid>

                    <Grid item xs={8} sm={12}>
                        <FormInputText
                            name="confirmationPassword"
                            type='password'
                            size='medium'
                            control={control}
                            label="Xác nhận mật khẩu"
                            placeholder='Nhập xác nhận mật khẩu mới'
                        />
                    </Grid>
                </Grid>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 4, mb: 2 }}
                            onClick={handleSubmit(onSubmit)}
                        >
                            Đặt mật khẩu
                        </Button>

                    </Box>
                    <CustomLink link='/login' title='Quay về trang đăng nhập'/>
                </Box>
            </Box>
        </>
    )
}