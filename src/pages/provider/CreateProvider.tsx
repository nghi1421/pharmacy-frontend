import { Button, Grid, Paper, Typography } from "@mui/material"
import Address from "../../components/Address"
import { FormInputText } from "../../components/form/FormInputText"
import yup from "../../utils/yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup'
import { useCreateProvider } from "../../hooks/useProvider";

export interface ProviderForm {
    name: string;
    phoneNumber: string;
    email: string;
    address: string;
}

const defaultValues = {
    name: "",
    phoneNumber: "",
    email: '',
    address: ''
};

//@ts-ignore
const providerFormValidate: Yup.ObjectSchema<ProviderForm> = yup.object({
    name: yup
        .string()
        .required('Công ti dược bắt buộc.')
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
})
const CreateProvider: React.FC = () => {
    const navigate = useNavigate()
    const [counter, setCounter] = useState(Math.random())
    const createProvider = useCreateProvider()
    const [address, setAddress] = useState<string>('')

    const { handleSubmit, reset, control } = useForm<ProviderForm>({
        defaultValues: defaultValues,
        resolver: yupResolver(providerFormValidate)
    });

    const onSubmit = (data: ProviderForm) => createProvider.mutate({...data, address: address});

    const backToTable = () => {
        navigate('/providers')
    }
    return (
        <Paper sx={{ px:6, py:4 }}>
            <Typography variant="h6" gutterBottom mb='20px'>
                Thông tin công ty dược
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
                    
                <Address setAddress={setAddress} address={address} key={counter} />  

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

export default CreateProvider