import { Button, Grid, Paper, Typography } from "@mui/material"
import Address from "../../components/Address"
import { FormInputText } from "../../components/form/FormInputText"
import yup from "../../utils/yup";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup'
import { useUpdateCustomer } from "../../hooks/useCustomer";
import { FormInputDropdown } from "../../components/form/FormInputDropdown";
import { genders } from "../../utils/constants";

export interface CustomerEditForm {
    id: string;
    name: string;
    phoneNumber: string;
    address: string;
    gender: string;
}

//@ts-ignore
const customerFormValidate: Yup.ObjectSchema<CustomerEditForm> = yup.object({
    name: yup
        .string()
        .required('Tên khách hàng bắt buộc.')
        .max(255),
    phoneNumber: yup
        .string()
        .required('Số điện thoại bắt buộc.')
        //@ts-ignore
        .phoneNumber('Số điện thoại không hợp lệ.'),
})
const EditCustomer: React.FC = () => {
    const { state } = useLocation()
    const navigate = useNavigate()
    const [counter, setCounter] = useState(Math.random())
    const [address, setAddress] = useState<string>('')
    const { handleSubmit, reset, control, setError } = useForm<CustomerEditForm>({
        defaultValues: {...state.customerData, id: state.customerData.id},
        resolver: yupResolver(customerFormValidate)
    });
    const updateCustomer = useUpdateCustomer(setError)

    const onSubmit = (data: CustomerEditForm) =>
        updateCustomer.mutate({ ...data, address: address });

    const backToTable = () => {
        navigate('/admin/customers')
    }
    return (
        <Paper sx={{ px:6, py:4 }}>
            {
                state.customerData ? 
                    <React.Fragment>
                        <Typography variant="h6" gutterBottom mb='20px'>
                            Thông tin khách hàng
                        </Typography>
                        <Grid container spacing={3}>
                        <Grid item xs={8} sm={4}>
                            <FormInputText
                                size='small'
                                name="name"
                                control={control}
                                label="Tên khách hàng"
                                placeholder='Nhập tên khách hàng'
                            />
                        </Grid>
                        <Grid item xs={8} sm={4}>
                            <FormInputText
                                size='small'
                                name="phoneNumber"
                                control={control}
                                label="Số điện thoại"
                                placeholder='Nhập họ số điện thoại'
                            />
                            </Grid>
                        <Grid item xs={8} sm={2}>
                        <FormInputDropdown
                            size='small'
                            name="gender"
                            control={control}
                            label="Giới tính"
                            placeholder='Giới tính'
                            list={genders}
                        />
                        </Grid>
                            
                        <Address setAddress={setAddress} key={counter} initAddress={state.customerData.address} size='small'/>  

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
                                Cập nhật
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
                    </React.Fragment>
            : <>Not found</>    
        }
        </Paper>
    )
}

export default EditCustomer