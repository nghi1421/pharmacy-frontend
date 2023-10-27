import { Button, Grid, Paper, Typography } from "@mui/material"
import { FormInputText } from "../../components/form/FormInputText"
import yup from "../../utils/yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup'
import React from "react";
import { useUpdateTypeByUse } from "../../hooks/useTypeByUse";

export interface DrugCategoryEditForm {
    id: string;
    name: string;
    detail: string;
}

 // @ts-ignore
const typeFormValidate: Yup.ObjectSchema<DrugCategoryEditForm> = yup.object({
    name: yup
        .string()
        .required('Tên công dụng bắt buộc.')
        .max(100, 'Tên công dụng không quá 100 kí tự'),
    detail: yup
        .string()
        .required('Chi tiết công dụng bắt buộc.')
        .max(255, 'Chi tiết công dụng không quá 255 kí tự'),
})
const EditDrugCategory: React.FC = () => {
    const { state } = useLocation()
    const navigate = useNavigate()
    const updateTypeByUse = useUpdateTypeByUse()

    const { handleSubmit, reset, control } = useForm<DrugCategoryEditForm>({
        defaultValues: state.typeByUseData,
        resolver: yupResolver(typeFormValidate)
    });

    const onSubmit = async (data: DrugCategoryEditForm) => {
        updateTypeByUse.mutate(data);
    };

    const backToTable = () => {
        navigate('/type-by-uses')
    }
    return (
        <Paper sx={{ px: 6, py: 4 }}>
            {
                state.typeByUseData ? 
                    <React.Fragment>
                        <Typography variant="h6" gutterBottom mb='20px'>
                            Thông tin công dụng thuốc
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={8} sm={6}>
                                <FormInputText
                                    name="name"
                                    control={control}
                                    label="Tên công dụng"
                                    placeholder='Nhập tên công dụng thuốc'
                                />
                            </Grid>

                            <Grid item xs={8} sm={6}>
                                <FormInputText
                                    name="detail"
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
                                    Cập nhật
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