import {
    Button,
    CircularProgress,
    Grid,
    Paper,
    Typography
} from "@mui/material"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useGetPositionsQuery } from "../../redux/api/positionApi";
import { Position } from "../../types/Position";
import { FormInputText } from "../../components/form/FormInputText";
import { useForm } from "react-hook-form";
import { genders } from '../../utils/constants'
import { FormInputDropdown } from "../../components/form/FormInputDropdown";
import yup from '../../utils/yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { Item } from "../../types/props/FormInputListProps";
import Address from "../../components/Address";
import { FormInputDate } from "../../components/form/FormInputDate";
import { FormInputCheckBox } from "../../components/form/FormInputCheckBox";

interface StaffForm {
    name: string;
    phoneNumber: string;
    gender: string;
    dob: Date|null;
    email: string,
    identification: string;
    positionId: string;
    isWorking: boolean;
}

const defaultValues = {
    name: "",
    phoneNumber: "",
    gender: '1',
    dob: null,
    email: '',
    identification: '',
    positionId: '1',
    isWorking: true
};

const staffFormValidate = yup.object({
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
    dob: yup
        .date()
        .nullable(),
    identification: yup
        .string()
        .onlyNumber('CCCD không hợp lệ.'),
})

const CreateStaff: React.FC = () => {
    const navigate = useNavigate()
    const [address, setAddress] = useState<string>('')
    let { data, error, isLoading } = useGetPositionsQuery()
    const [positions, setPositions] = useState<Item[]>([]);
  
    useEffect(() => {
        const positions: Item[] = data.data.map((position: Position) => {
            return { value: position.id.toString(), label: position.name }
        })
        setPositions(positions);
    }, [])

    
    const { handleSubmit, watch, reset, control, setValue } = useForm<StaffForm>({
        defaultValues: defaultValues,
        resolver: yupResolver(staffFormValidate)
    });
    const watchIsWorking = watch('isWorking')

    const onSubmit = (data: StaffForm) => console.log(data);

    const backToTable = () => {
        navigate('/staffs')
    }
    return (
    <Paper sx={{ px:6, py:4 }}>
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
                {
                    !isLoading ?
                    <FormInputDropdown
                        name="positionId"
                        control={control}
                        label="Chức vụ"
                        placeholder='a'
                        list={positions}
                    />
                    : <CircularProgress sx={{ margin: 'auto'}}/>
                }  
            </Grid>
                
            <Address setAddress={setAddress} />  
                
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
    </Paper>)
}

export default CreateStaff