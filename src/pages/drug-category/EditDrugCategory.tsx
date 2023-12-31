import { Button, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Typography } from "@mui/material"
import { FormInputText } from "../../components/form/FormInputText"
import yup from "../../utils/yup";
import { useLocation, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup'
import React from "react";
import { useUpdateDrugCategory } from "../../hooks/useDrugCategory";
import { FormInputFloat } from "../../components/form/FormInputFloat";
import { useGetDataTypeByUses } from "../../hooks/useTypeByUse";

export interface DrugCategoryEditForm {
    id: string;
    name: string;
    unit: string;
    minimalUnit: string;
    vat: number;
    conversionQuantity: number;
    instruction: string;
    preserved: string;
    typeId: string;
    form: string;
    price: number;
}

 // @ts-ignore
const drugCategoryVaidate: Yup.ObjectSchema<DrugCategoryForm> = yup.object({
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
        .max(100, 'VAT phải là nhỏ hơn 100'),
    conversionQuantity: yup
        .number()
        .min(1, 'Số lượng quy đổi phải lớn hơn 0'),
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

const EditDrugCategory: React.FC = () => {
    const { state } = useLocation()
    const navigate = useNavigate()
    const { data, isLoading } = useGetDataTypeByUses();
    const { handleSubmit, reset, control, watch, setError } = useForm<DrugCategoryEditForm>({
        defaultValues: {
            ...state.drugCategoryData,
            vat: state.drugCategoryData.vat * 100,
            typeId: state.drugCategoryData.type.id
        },
        resolver: yupResolver(drugCategoryVaidate)
    });
    const updateDrugCategory = useUpdateDrugCategory(setError)

    const watchUnit = watch('unit')
    const watchMinimalUnit = watch('minimalUnit')

    const onSubmit = async (data: DrugCategoryEditForm) => {
        updateDrugCategory.mutate(data);
    };

    const backToTable = () => {
        navigate('/admin/drug-categories')
    }
    return (
        <Paper sx={{ px: 6, py: 4 }}>
            {
                state.drugCategoryData ? 
                    <React.Fragment>
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
                                    step='0.5'
                                    min={0}
                                    max={100}
                                    postfix='%'
                                    control={control}
                                    prefix=''
                                />
                            </Grid>

                            <Grid item xs={8} sm={3}>
                                <FormControl fullWidth>
                                    <InputLabel>Phân loại công dụng</InputLabel>
                                    <Controller
                                        render={({ field: { onChange, value } }) => (
                                                <Select
                                                    key='type-by-uses-select'
                                                    onChange={onChange}
                                                    value={value}
                                                    label='Phân loại công dụng'
                                                >
                                                    {
                                                        isLoading
                                                            ?
                                                            <CircularProgress sx={{ margin: 'auto' }} />
                                                            :
                                                            data.map((typeByUse: any) => (
                                                                <MenuItem
                                                                    key={`type-by-uses-${typeByUse.id}`}
                                                                    value={typeByUse.id}
                                                                >
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
                            <Grid item xs={8} sm={3}>
                                <FormInputFloat
                                    name='conversionQuantity'
                                    label='Số lượng quy đổi'
                                    step='1'
                                    min={0}
                                    max={200000}
                                    prefix={`1 ${watchUnit} = `}
                                    control={control}
                                    postfix={ watchMinimalUnit}
                                />
                            </Grid>

                            <Grid item xs={8} sm={6}>
                                <FormInputText
                                    name="instruction"
                                    control={control}
                                    label="Hướng dẫn sử dụng"
                                    placeholder='Nhập hướng dẫn sử dụng'
                                />
                            </Grid>

                            <Grid item xs={8} sm={5}>
                                <FormInputText
                                    name="preserved"
                                    control={control}
                                    label="Cách bảo quản"
                                    placeholder='Nhập cách bảo quản'
                                />
                            </Grid>

                            <Grid item xs={8} sm={3}>
                                <FormInputText
                                    name="form"
                                    control={control}
                                    label="Dạng thuốc"
                                    placeholder='Nhập dạng thuốc'
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
                    </React.Fragment>
            : <>Not found</>    
        }
            
        </Paper>
    )
}

export default EditDrugCategory