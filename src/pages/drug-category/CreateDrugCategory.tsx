import { Button, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material"
import { FormInputText } from "../../components/form/FormInputText"
import yup from "../../utils/yup";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup'
import { useGetTypesQuery } from "../../redux/api/typeByUseApi";
import { FormInputFloat } from "../../components/form/FormInputFloat";

interface PositionForm {
    name: string;
    unit: string;
    minimalUnit: string;
    vat: number;
    quantityConversion: number;
    instruction: string;
    preserved: string;
    typeId: string;
    form: string;
}

const defaultValues = {
    name: '',
    unit: 'thùng',
    minimalUnit: 'viên',
    vat: 0.0,
    quantityConversion: 0,
    instruction: '',
    preserved: '',
    typeId: '1',
    form: 'viên',
};

 // @ts-ignore
const positionFormValidate: Yup.ObjectSchema<PositionForm> = yup.object({
    name: yup
        .string()
        .required('Tên công dụng bắt buộc.')
        .max(100, 'Tên công dụng không quá 100 kí tự'),
    minimalUnit: yup
        .string()
        .required('Đơn bị bán bắt buộc.'),
    unit: yup
        .string()
        .required('Đơn vị nhập bắt bắt buộc.'),
    vat: yup
        .number()
        .min(0, 'VAT phải lớn hơn 0')
        .max(1, 'VAT phải là nhỏ hơn 1'),
    quantityConversion: yup
        .number()
        .min(0, 'Số lượng quy đổi phải lớn hơn 0'),
    instruction: yup
        .string()
        .required('Hướng dẫn sử dụng thuốc bắt buộc.'),
    preserved: yup
        .string()
        .required('Cách bảo quản thuốc bắt buộc.'),
    form: yup
        .string()
        .required('Dạng thuốc thuốc bắt buộc.'),
})
const CreateDrugCategory: React.FC = () => {
    const navigate = useNavigate()
    const { data, isLoading } = useGetTypesQuery();

    const { handleSubmit, reset, control } = useForm<PositionForm>({
        defaultValues: defaultValues,
        resolver: yupResolver(positionFormValidate)
    });

    const onSubmit = (data: PositionForm) => console.log(data);

    const backToTable = () => {
        navigate('/drug-categories')
    }
    return (
        <Paper sx={{ px:6, py:4 }}>
            <Typography variant="h6" gutterBottom mb='20px'>
                Thông tin danh mục thuốc
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={8} sm={4}>
                    <FormInputText
                        name="name"
                        control={control}
                        label="Tên thuốc"
                        placeholder='Nhập tên danh mục thuốc'
                    />
                </Grid>

                <Grid item xs={8} sm={3}>
                    <FormInputText
                        name="unit"
                        control={control}
                        label="Đơn vị nhập"
                        placeholder='Nhập đơn vị nhập thuốc'
                    />
                </Grid>

                <Grid item xs={8} sm={3}>
                    <FormInputText
                        name="minimalUnit"
                        control={control}
                        label="Đơn bị bán"
                        placeholder='Nhập đơn vị bán thuốc'
                    />
                </Grid>

                <Grid item xs={8} sm={2}>
                    <FormInputFloat
                        name='vat'
                        label='VAT'
                        step='0.01'
                        min={0}
                        max={1}
                        control={control}
                    />

                </Grid>

                <Grid item xs={8} sm={4}>
                    <FormControl fullWidth>
                        <InputLabel>Phân loại công dụng</InputLabel>
                        <Controller
                            render={({ field: { onChange, value } }) => (
                                    <Select
                                        onChange={onChange}
                                        value={value}
                                        label='Phân loại công dụng'
                                    >
                                        {
                                            isLoading
                                                ?
                                                <CircularProgress sx={{ margin: 'auto' }} />
                                                :
                                                data.data.map((typeByUse: any) => (<MenuItem value={typeByUse.id}>
                                                        {typeByUse.name}
                                                    </MenuItem>)
                                                )
                                        }
                                </Select>
                            )}
                            control={control}
                            name='typeId'
                        />    
        
                    </FormControl>
                </Grid>
                <Grid item xs={8} sm={6}>
                    <FormInputText
                        name="name"
                        control={control}
                        label="Chi tiết"
                        placeholder='Nhập chi tiết công dụng thuốc'
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
                        color="success"
                        sx={{
                            textTransform: 'none',
                        }}
                        onClick={() => reset()}
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

export default CreateDrugCategory