import { Button, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Typography } from "@mui/material"
import Address from "../../components/Address"
import { FormInputText } from "../../components/form/FormInputText"
import yup from "../../utils/yup";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup'
import { useUpdateStaff } from "../../hooks/useStaff";
import { FormInputDropdown } from "../../components/form/FormInputDropdown";
import { FormInputDate } from "../../components/form/FormInputDate";
import { FormInputCheckBox } from "../../components/form/FormInputCheckBox";
import { genders } from "../../utils/constants";
import { useGetDataPositions } from "../../hooks/usePosition";

export interface StaffEditForm {
    id: string;
    name: string;
    phoneNumber: string;
    gender: string;
    dob: Date|null;
    email: string,
    identification: string;
    positionId: string;
    isWorking: boolean;
    address: string;
}

const maxDate = new Date()
maxDate.setFullYear(new Date().getFullYear() - 18)

//@ts-ignore
const staffFormValidate: Yup.ObjectSchema<StaffForm> = yup.object({
    name: yup
        .string()
        .required('Tên nhân viên bắt buộc.')
        .max(255),
    phoneNumber: yup
        .string()
        .required('Số điện thoại bắt buộc.')
        //@ts-ignore
        .phoneNumber('Số điện thoại không hợp lệ.'),
    email: yup
        .string()
        .required('Email bắt buộc.')
        .email('Email không hợp lệ.'),
    gender: yup
        .string()
        .required('Giới tính bắt buộc')
        .oneOf(['0', '1', '2']),
    dob: yup
        .date()
        .max(maxDate, 'Nhân viên phải trên 18 tuổi.'),
    identification: yup
        .string()
        //@ts-ignore
        .onlyNumber('CCCD không hợp lệ.'),
})

const EditStaff: React.FC = () => {
    const { state } = useLocation()
    const navigate = useNavigate()
    let { data, isLoading } = useGetDataPositions()
    const [counter, setCounter] = useState(Math.random())
    const [address, setAddress] = useState<string>('')
    const { handleSubmit, reset, control, setError } = useForm<StaffEditForm>({
        defaultValues: {...state.staffData, positionId: state.staffData.position.id},
        resolver: yupResolver(staffFormValidate)
    });
    const updateStaff = useUpdateStaff(setError)

    const onSubmit = (data: StaffEditForm) => {
        updateStaff.mutate({ ...data, address: address });
    }

    const backToTable = () => {
        navigate('/admin/staffs')
    }
    return (
        <Paper sx={{ px:6, py:4 }}>
            {
                state.staffData ? 
                    <React.Fragment>
                        <Typography variant="h6" gutterBottom mb='20px'>
                            Thông tin nhân viên
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={8} sm={5}>
                                <FormInputText
                                    name="name"
                                    control={control}
                                    label="Họ và tên"
                                    placeholder='Nhập họ và tên nhân viên'
                                />
                            </Grid>
                            <Grid item xs={8} sm={5}>
                                <FormInputText
                                    name="phoneNumber"
                                    control={control}
                                    label="Số điện thoại"
                                    placeholder='Nhập họ số điện thoại'
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
                            <Grid item xs={8} sm={4}>
                                <FormInputText
                                    name="email"
                                    control={control}
                                    label="Email"
                                    placeholder='Nhập email nhân viên'
                                />
                            </Grid>
                            <Grid item xs={8} sm={4}>
                                <FormInputText
                                    name="identification"
                                    control={control}
                                    label="CCCD"
                                    placeholder='Nhập số CCCD nhân viên'
                                />
                            </Grid>
                        
                            <Grid item xs={8} sm={4}>
                                <FormControl fullWidth>
                                    <InputLabel >Chức vụ</InputLabel>
                                    <Controller
                                        render={({ field: { onChange, value } }) => (
                                            <Select
                                                onChange={onChange}
                                                value={value}
                                                label='Chức vụ'
                                            >
                                                {
                                                    isLoading
                                                        ?
                                                        <CircularProgress sx={{ margin: 'auto' }} />
                                                        :
                                                    data.map((position: any) => (<MenuItem
                                                        key={`position-${position.id}`}
                                                        value={position.id}>
                                                                {position.name}
                                                            </MenuItem>)
                                                        )
                                                }
                                            </Select>
                                        )}
                                        control={control}
                                        name='positionId'
                                    />    
                    
                                </FormControl>
                            </Grid>
                                
                            <Address setAddress={setAddress} key={counter} initAddress={state.staffData.address} />  
                                
                            <Grid item xs={8} sm={4}>
                                <FormInputDate
                                    name="dob"
                                    control={control}
                                    label="Ngày sinh"
                                    placeholder='x'
                                />
                            </Grid>
                            
                            <Grid item xs={12} sm={12}>
                                <FormInputCheckBox
                                    name="isWorking"
                                    control={control}
                                    label="Nhân viên đang làm việc"
                                    placeholder='x'
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

export default EditStaff