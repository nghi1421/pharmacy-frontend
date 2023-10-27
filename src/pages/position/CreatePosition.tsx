import { Button, Grid, Paper, Typography } from "@mui/material"
import { FormInputText } from "../../components/form/FormInputText"
import yup from "../../utils/yup";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup'

export interface PositionForm {
    name: string;
}

const defaultValues = {
    name: "",
};

 // @ts-ignore
const positionFormValidate: Yup.ObjectSchema<PositionForm>
    = yup.object({
    name: yup
        .string()
        .required('Tên chức vụ bắt buộc.')
        .max(255),
})
const CreatePosition: React.FC = () => {
    const navigate = useNavigate()

    const { handleSubmit, reset, control } = useForm<PositionForm>({
        defaultValues: defaultValues,
        resolver: yupResolver(positionFormValidate)
    });

    const onSubmit = (data: PositionForm) => console.log(data);

    const backToTable = () => {
        navigate('/positions')
    }
    return (
        <Paper sx={{ px:6, py:4 }}>
            <Typography variant="h6" gutterBottom mb='20px'>
                Thông tin chức vụ
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={8} sm={6}>
                    <FormInputText
                        name="name"
                        control={control}
                        label="Tên chức vu"
                        placeholder='Nhập tên chức vụ'
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

export default CreatePosition