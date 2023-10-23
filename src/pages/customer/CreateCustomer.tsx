import { Button, Grid, Paper, Typography } from "@mui/material"
import Address from "../../components/Address"
import { FormInputText } from "../../components/form/FormInputText"
import { FormInputDropdown } from "../../components/form/FormInputDropdown"
import yup from "../../utils/yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { genders } from "../../utils/constants";
import { yupResolver } from "@hookform/resolvers/yup";

interface CustomerForm {
    name: string;
    phoneNumber: string;
    gender: string;
    email: string;
}

const defaultValues = {
    name: "",
    phoneNumber: "",
    gender: '1',
    email: '',
};

const maxDate = new Date()
maxDate.setFullYear(new Date().getFullYear() - 18)

const customerFormValidate = yup.object({
    name: yup
        .string()
        .required('Tên nhân viên bắt buộc.')
        .max(255),
    phoneNumber: yup
        .string()
        .required('Số điện thoại bắt buộc.')
        .phoneNumber('Số điện thoại không hợp lệ.'),
    email: yup
        .string()
        .required('Email bắt buộc.')
        .email('Email không hợp lệ.'),
    gender: yup
        .string()
        .required('Giới tính bắt buộc')
        .oneOf(['0', '1', '2']),
})
const CreateCustomer: React.FC = () => {
    const navigate = useNavigate()
    const [address, setAddress] = useState<string>('')

    const { handleSubmit, watch, reset, control, setValue } = useForm<CustomerForm>({
        defaultValues: defaultValues,
        resolver: yupResolver(customerFormValidate)
    });

    const onSubmit = (data: CustomerForm) => console.log(data);

    const backToTable = () => {
        navigate('/custumers')
    }
    return (
        <Paper sx={{ px:6, py:4 }}>
            <Typography variant="h6" gutterBottom mb='20px'>
                Thông tin khách hàng
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={8} sm={4}>
                    <FormInputText
                        name="name"
                        control={control}
                        label="Họ và tên"
                        placeholder='Nhập họ và tên khách hàng'
                    />
                </Grid>
                <Grid item xs={8} sm={4}>
                    <FormInputText
                        name="phoneNumber"
                        control={control}
                        label="Số điện thoại"
                        placeholder='Nhập họ số điện thoại'
                    />
                </Grid>
                
                <Grid item xs={8} sm={4}>
                    <FormInputText
                        name="email"
                        control={control}
                        label="Email"
                        placeholder='Nhập email khách hàng'
                    />
                </Grid>
                    
                <Address setAddress={setAddress} />  

                <Grid item xs={8} sm={2}>
                    <FormInputDropdown
                        name="gender"
                        control={control}
                        label="Giới tính"
                        placeholder='Giới tính'
                        list={genders}
                    />
                </Grid>

                <Grid item xs={12} sm={12} container 
                    sx={{
                        display: 'flex',
                        justifyContent: "end",
                        gap: 2
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            textTransform: 'none',
                        }}
                        onClick={handleSubmit(onSubmit)}
                    >
                        Thêm
                    </Button>

                    <Button
                        variant="contained"
                        color="error"
                        sx={{
                            textTransform: 'none',
                        }}
                        onClick={backToTable}
                    >
                        Quay về
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default CreateCustomer