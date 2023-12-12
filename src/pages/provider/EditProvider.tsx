import { Button, Grid, Paper, Typography } from "@mui/material"
import Address from "../../components/Address"
import { FormInputText } from "../../components/form/FormInputText"
import yup from "../../utils/yup";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup'
import { useUpdateProvider } from "../../hooks/useProvider";

export interface ProviderEditForm {
    id: string;
    name: string;
    phoneNumber: string;
    email: string;
    address: string;
}

//@ts-ignore
const providerFormValidate: Yup.ObjectSchema<ProviderEditForm> = yup.object({
    name: yup
        .string()
        .required('Tên coogn ty dược bắt buộc.')
        .max(255, 'Tên coogn ty dược tối đa 255 kí tự'),
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
})
const EditProvider: React.FC = () => {
    const { state } = useLocation()
    const navigate = useNavigate()
    const [counter, setCounter] = useState(Math.random())
    const [address, setAddress] = useState<string>('')
    const { handleSubmit, reset, control, setError } = useForm<ProviderEditForm>({
        defaultValues: { ...state.providerData, id: state.providerData.id },
        resolver: yupResolver(providerFormValidate)
    });
    const updateProvider = useUpdateProvider(setError)

    const onSubmit = (data: ProviderEditForm) =>
        updateProvider.mutate({ ...data, address: address });

    const backToTable = () => {
        navigate('/admin/providers')
    }
    return (
        <Paper sx={{ px: 6, py: 4 }}>
            {
                state.providerData ?
                    <React.Fragment>
                        <Typography variant="h6" gutterBottom mb='20px'>
                            Thông tin chức vụ thuốc
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={8} sm={4}>
                                <FormInputText
                                    name="name"
                                    control={control}
                                    label="Tên công ty dược"
                                    placeholder='Nhập tên công ty dược'
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
                                    placeholder='Nhập email công ty dược'
                                />
                            </Grid>

                            <Address setAddress={setAddress} key={counter} initAddress={state.providerData.address} />

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

export default EditProvider