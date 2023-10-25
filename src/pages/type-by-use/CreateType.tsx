import { Button, Grid, Paper, Typography } from "@mui/material"
import { FormInputText } from "../../components/form/FormInputText"
import yup from "../../utils/yup";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup'
import { useCreateTypeMutation } from "../../redux/api/typeByUseApi";
import { enqueueSnackbar } from "notistack";
import { MutationResponse } from "../../types/response.ts/MutationResponse";

export interface PositionForm {
    name: string;
    detail: string;
}

const defaultValues = {
    name: "",
    detail: '',
};

 // @ts-ignore
const positionFormValidate: Yup.ObjectSchema<PositionForm> = yup.object({
    name: yup
        .string()
        .required('Tên công dụng bắt buộc.')
        .max(100, 'Tên công dụng không quá 100 kí tự'),
    detail: yup
        .string()
        .required('Chi tiết công dụng bắt buộc.')
        .max(255, 'Chi tiết công dụng không quá 255 kí tự'),
})
const CreateType: React.FC = () => {
    const navigate = useNavigate()
    // const { displayNotification } = useNotification();

    const [createType, { isLoading }] = useCreateTypeMutation();

    const { handleSubmit, reset, control } = useForm<PositionForm>({
        defaultValues: defaultValues,
        resolver: yupResolver(positionFormValidate)
    });

    const onSubmit = async (data: PositionForm) => {
        try {
            const response: any = await createType(data)
            console.log(response)
            if (response.data.message) {
                navigate('/type-by-uses');
                enqueueSnackbar(
                    response.data.message, {
                    autoHideDuration: 3000,
                    variant: 'success'
                })
            }
            else {
                enqueueSnackbar(
                    response.data.errorMessage, {
                    autoHideDuration: 3000,
                    variant: 'error'
                })
            }
        }
        catch (error) {

        }
    };

    const backToTable = () => {
        navigate('/type-by-uses')
    }
    return (
        <Paper sx={{ px:6, py:4 }}>
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
                        disabled={isLoading}
                        sx={{
                            textTransform: 'none',
                        }}
                        onClick={handleSubmit(onSubmit)}
                    >
                        Thêm
                    </Button>

                    <Button
                        disabled={isLoading}
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

export default CreateType