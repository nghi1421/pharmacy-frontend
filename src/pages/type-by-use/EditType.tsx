import { Button, Grid, Paper, Typography } from "@mui/material"
import { FormInputText } from "../../components/form/FormInputText"
import yup from "../../utils/yup";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup'
import { useCreateTypeMutation, useGetTypeQuery} from "../../redux/api/typeByUseApi";
import { enqueueSnackbar } from "notistack";

export interface TypeByUseEditForm {
    id: string;
    name: string;
    detail: string;
}

const defaultValues = {
    id: '',
    name: "",
    detail: '',
};

 // @ts-ignore
const typeFormValidate: Yup.ObjectSchema<TypeByUseEditForm> = yup.object({
    name: yup
        .string()
        .required('Tên công dụng bắt buộc.')
        .max(100, 'Tên công dụng không quá 100 kí tự'),
    detail: yup
        .string()
        .required('Chi tiết công dụng bắt buộc.')
        .max(255, 'Chi tiết công dụng không quá 255 kí tự'),
})
const EditType: React.FC = () => {
    const { typeId } = useParams()
    const navigate = useNavigate()
    const [createType, { isLoading }] = useCreateTypeMutation();
    const { data, isError } = useGetTypeQuery(typeId)

    // if (!data) {
    //     return (
    //         <div>Test</div>
    //     )
    // }
    // useEffect(() => {
    //     if (isFirstRender && params.typeId) {
    //         const response = getType(params.typeId).then((data) => console.log(data));
    //         console.log(response);
    //     }
    // }, [])

    const { handleSubmit, reset, control, setValue } = useForm<TypeByUseEditForm>({
        defaultValues: defaultValues,
        resolver: yupResolver(typeFormValidate)
    });

    const onSubmit = async (data: TypeByUseEditForm) => {
        try {
            const response: any = await createType(data)
            console.log(response)
            if (response.data.message) {
                enqueueSnackbar(
                    response.data.message, {
                    autoHideDuration: 3000,
                    variant: 'success'
                })
            }
            else {
                navigate('/type-by-uses');
                console.log(123123123);

                enqueueSnackbar(
                    response.data.errorMessage, {
                    autoHideDuration: 3000,
                    variant: 'error'
                })
            }
        }
        catch (error: unknown) {
            enqueueSnackbar(
                error, {
                autoHideDuration: 3000,
                variant: 'error'
            })
        }
    };

    const backToTable = () => {
        navigate('/type-by-uses')
    }

    if (!data) {
       return  <div>Test</div>
    }

    console.log(data);
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

export default EditType