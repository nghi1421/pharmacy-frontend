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
import * as Yup from 'yup'
import { useCreateCustomer } from "../../hooks/useCustomer";

export interface CustomerForm {
    name: string;
    phoneNumber: string;
    email: string,
    gender: string;
    address: string;
}

const defaultValues = {
    name: "",
    phoneNumber: "",
    email: '',
    gender: '1',
    address: ''
};

// @ts-ignore
const customerFormValidate: Yup.ObjectSchema<CustomerForm>
    = yup.object({
        name: yup
            .string()
            .required('Tên khách hàng bắt buộc.')
            .max(255, 'Tên khách hàng tối đa 255 kí tự'),
        phoneNumber: yup
            .string()
            .required('Số điện thoại bắt buộc.')
            // @ts-ignore
            .phoneNumber('Số điện thoại không hợp lệ.')
            .max(15, 'Số điện thoại tối đa 15 kí tự'),
        email: yup
            .string()
            .required('Email bắt buộc.')
            .email('Email không hợp lệ.')
            .max(255, 'Email tối đa 255 kí tự'),
        gender: yup
            .string()
            .required('Giới tính bắt buộc')
            .oneOf(['0', '1', '2'], 'Giới tinh không hợp lệ.'),
    })
const CreateCustomer: React.FC = () => {
    const navigate = useNavigate()
    const [address, setAddress] = useState<string>('')
    const [counter, setCounter] = useState(Math.random())
    const { handleSubmit, reset, control, setError } = useForm<CustomerForm>({
        defaultValues: defaultValues,
        resolver: yupResolver(customerFormValidate)
    });
    const createCustomer = useCreateCustomer(setError)

    const onSubmit = (data: CustomerForm) => {
        createCustomer.mutate({ ...data, address: address })
    };

    const backToTable = () => {
        navigate('/admin/customers')
    }
    return (
        <Paper sx={{ px: 6, py: 4 }}>
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
                <Grid item xs={8} sm={3}>
                    <FormInputText
                        name="phoneNumber"
                        control={control}
                        label="Số điện thoại"
                        placeholder='Nhập họ số điện thoại'
                    />
                </Grid>

                <Grid item xs={8} sm={3}>
                    <FormInputText
                        name="email"
                        control={control}
                        label="Email"
                        placeholder='Nhập thông tin email'
                    />
                </Grid>

                <Grid item xs={8} sm={2}>
                    <FormInputDropdown
                        name="gender"
                        control={control}
                        label="Giới tính"
                        placeholder='Giới tính'
                        list={genders}
                    />
                </Grid>

                <Address setAddress={setAddress} key={counter} size='small' />

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
                        color="success"
                        sx={{
                            textTransform: 'none',
                        }}
                        onClick={() => {
                            reset();
                            setCounter(counter + 1)
                            setAddress('')
                        }}
                    >
                        Làm mới
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