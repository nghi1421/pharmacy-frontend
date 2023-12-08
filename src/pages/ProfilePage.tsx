import { Box, Button, Grid } from "@mui/material"
import { FormInputText } from "../components/form/FormInputText"
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import yup from "../utils/yup";
import { FormInputDate } from "../components/form/FormInputDate";
import Address from "../components/Address";
import { useState } from "react";
import { getStaff } from "../store/auth";
import { FormInputDropdown } from "../components/form/FormInputDropdown";
import { genders } from "../utils/constants";

export interface ProfileForm {
    name: string;
    phoneNumber: string;
    gender: string;
    dob: Date | null;
    address: string;
    email: string,
}

const maxDate = new Date(dayjs().format('YYYY-MM-DD'))
maxDate.setFullYear(new Date(dayjs().format('YYYY-MM-DD')).getFullYear() - 18)

//@ts-ignore
const staffFormValidate: Yup.ObjectSchema<ProfileForm> = yup.object({
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
})

interface ProfilePageProps {
    closeModal: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ closeModal }) => {
    const staff = getStaff()
    const [address, setAddress] = useState<string>('')
    const [counter, setCounter] = useState(Math.random())
    const { handleSubmit, reset, control } = useForm<ProfileForm>({
        defaultValues: {
            name: staff.name,
            address: staff.address,
            email: staff.email,
            dob: staff.dob,
            phoneNumber: staff.phoneNumber,
            gender: staff.gender
        },
        resolver: yupResolver(staffFormValidate)
    });

    const refreshForm = () => {
        reset();
        setAddress(staff.rawAddress);
        setCounter(Math.random())
    }
    return (
        <Box sx={{ px: 3, pt: 4, pb: 2 }}>
            <Grid container spacing={3}>
                <Grid item xs={8} sm={6}>
                    <FormInputText
                        name="name"
                        control={control}
                        label="Họ và tên"
                        placeholder='Nhập họ và tên'
                    />
                </Grid>
                
                 <Grid item xs={8} sm={6}>
                    <FormInputText
                        name="email"
                        control={control}
                        label="Email"
                        placeholder='Nhập email'
                    />
                </Grid>

                <Grid item xs={8} sm={5}>
                    <FormInputText
                        name="phoneNumber"
                        control={control}
                        label="Số điện thoại"
                        placeholder='Nhập số điện thoại'
                    />
                </Grid>
                <Grid item xs={8} sm={4}>
                    <FormInputDate
                        name="dob"
                        control={control}
                        label="Ngày sinh"
                        placeholder='x'
                    />
                </Grid>
                <Grid item xs={8} sm={3}>
                    <FormInputDropdown
                        name="gender"
                        control={control}
                        label="Giới tính"
                        placeholder='Giới tính'
                        list={genders}
                    />
                </Grid>
                <Address gridSize={6} setAddress={setAddress} key={counter} initAddress={staff.rawAddress} />  

                <Grid item xs={8} sm={12} sx={{ display: 'flex', justifyContent: 'end', gap: 2 }}>
                    <Button
                        color='success'
                        variant="contained"
                        sx={{ textTransform: 'none' }}
                    >
                        Cập nhật
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