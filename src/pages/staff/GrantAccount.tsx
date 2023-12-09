import { Box, Button, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material"
import { FormInputText } from "../../components/form/FormInputText"
import yup from "../../utils/yup";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useGetRoles } from "../../hooks/useAuth";
import { Role } from "../../types/Role";

export interface GrandAccountForm {
    username: string
    roleId: string
}

//@ts-ignore
const grantAccountValidate: Yup.ObjectSchema<GrandAccountForm> = yup.object({
    username: yup
        .string()
        .required('Tên đăng nhập bắt buộc.')
        .min(6, 'Tên đăng nhập tối thiểu 6 kí tự.')
        .max(255, 'Tên đăng nhập tối đa 255 kí tự.'),
})

interface ChangePasswordProps {
    closeModal: () => void;
}

export const GrantAccount: React.FC<ChangePasswordProps> = ({ closeModal }) => {
    const { isLoading, data } = useGetRoles()
    const { handleSubmit, reset, control, watch } = useForm<GrandAccountForm>({
        defaultValues: {
            username: '',
            roleId: '1',
        },
        resolver: yupResolver(grantAccountValidate)
    });

    const onSubmit = (data: GrandAccountForm) => {
    }

    const refreshForm = () => {
        reset();
    }
    return (
        <Box sx={{ px: 3, pt: 4, pb: 2 }}>
            <Grid container spacing={3}>
                <Grid item xs={8} sm={12}>
                    <FormInputText
                        name="username"
                        type='username'
                        control={control}
                        label="Tên đăng nhập"
                        placeholder='Nhập tên đăng nhập của tài khoản'
                    />
                </Grid>
                <Grid item xs={8} sm={12}>
                    <FormControl fullWidth>
                        <InputLabel >Chức vụ</InputLabel>
                        <Controller
                            render={({ field: { onChange, value } }) => (
                                    <Select
                                        size='small'
                                        onChange={onChange}
                                        value={value}
                                        label='Chức vụ'
                                    >
                                        {
                                            isLoading
                                                ?
                                                <CircularProgress sx={{ margin: 'auto' }} />
                                                :
                                            data.map((position: any) => (
                                                <MenuItem
                                                    key={`position-${position.id}`}
                                                    value={position.id}>
                                                    {position.name}
                                                </MenuItem>)
                                                )
                                        }
                                </Select>
                            )}
                            control={control}
                            name='roleId'
                        />    
                    </FormControl>
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