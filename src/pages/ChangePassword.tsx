import { Box, Button, Grid } from "@mui/material"
import { FormInputText } from "../components/form/FormInputText"
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import yup from "../utils/yup";
import * as Yup from 'yup';

export interface ChangePasswordForm {
    oldPassword: string
    newPassword: string
    confirmationPassword: string
}

const changePasswordValidate: Yup.ObjectSchema<ChangePasswordForm> = yup.object({
    oldPassword: yup
        .string()
        .required('Tên đăng nhập bắt buộc.')
        .min(6)
        .max(255),
    newPassword: yup
        .string()
        .required('Mật khẩu bắt buộc.')
        .min(6)
        .max(255),
    confirmationPassword: yup
        .string()
        .required('Xác nhận mật khẩu bắt buộc.')
        .oneOf([Yup.ref('newPassword'), ''], 'Xác nhận mật khẩu không khớp.')
        .min(6)
        .max(255),
})

interface ChangePasswordProps {
    closeModal: () => void;
}

export const ChangePassword: React.FC<ChangePasswordProps> = ({ closeModal }) => {
    const { handleSubmit, reset, control } = useForm<ChangePasswordForm>({
        defaultValues: {
            oldPassword: '',
            newPassword: '',
            confirmationPassword: ''
        },
        resolver: yupResolver(changePasswordValidate)
    });

    const onSubmit = (data: ChangePasswordForm) => {
        //submit here
    }

    const refreshForm = () => {
        reset();
    }

    return (
        <Box sx={{ px: 3, pt: 4, pb: 2 }}>
            <Grid container spacing={3}>
                <Grid item xs={8} sm={12}>
                    <FormInputText
                        name="oldPassword"
                        type='password'
                        control={control}
                        label="Mật khẩu cũ"
                        placeholder='Nhập mật khẩu cũ'
                    />
                </Grid>
                
                 <Grid item xs={8} sm={12}>
                    <FormInputText
                        name="newPassword"
                        type='password'
                        control={control}
                        label="Mật khẩu mới"
                        placeholder='Nhập mật khẩu mới'
                    />
                </Grid>

                <Grid item xs={8} sm={12}>
                    <FormInputText
                        name="confirmationPassword"
                        type='password'
                        control={control}
                        label="Xác nhận mật khẩu"
                        placeholder='Nhập xác nhận mật khẩu'
                    />
                </Grid>

                <Grid item xs={8} sm={12} sx={{ display: 'flex', justifyContent: 'end', gap: 2 }}>
                    <Button
                        color='success'
                        variant="contained"
                        sx={{ textTransform: 'none' }}
                        onClick={handleSubmit(onSubmit)}
                    >
                        Đổi mật khẩu
                    </Button>

                    <Button
                        color='primary'
                        variant="outlined"
                        sx={{ textTransform: 'none' }}
                        onClick={() => refreshForm()}
                    >
                        Làm mới
                    </Button>

                     <Button
                        color='error'
                        variant="outlined"
                        sx={{ textTransform: 'none' }}
                        onClick={() => closeModal()}
                    >
                        Quay về
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}