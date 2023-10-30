import { Box, Button, CircularProgress, Grid, Paper, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import React from "react";
import { FormAutocomplete } from "../../components/form/FormAutocomplete";
import { useForm } from "react-hook-form";
import { useGetProviders } from "../../hooks/useProvider";
import { getStaff } from "../../store/auth";
import { FormInputText } from "../../components/form/FormInputText";
import { FormInputDate } from "../../components/form/FormInputDate";
import { FormInputCurrency } from "../../components/form/FormInputCurrency";

export interface ImportForm {
    provider: any;
    note: string;
    importDate: string
    paid: string
}

const CreateImport: React.FC = () => {
    const navigate = useNavigate()
    const staff = getStaff();
    const { data: providers, isLoading: providerLoading } = useGetProviders(2)
    const { handleSubmit, reset, control, watch } = useForm<ImportForm>({
    });
    const watchProvider = watch('provider')

    const onSubmit = (data: ImportForm) => { 
        // const paid = removePatternFormat(data.paid, {thousandSeparator: true});
        console.log(data)
    };

    const backToTable = () => {
        navigate('/imports')
    }

    return (
        <Paper sx={{ px:6, py:4 }}>
            <Typography variant="h4" gutterBottom mb='20px'>
                Thông tin phiếu nhập thuốc
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={8} sm={6} >
                    <Box sx={{ border: 1, borderColor: 'grey.300', mt:4, px: 2, borderRadius: 2, boxShadow: 1 }}>
                        <Typography variant="subtitle2" mb='20px' sx={{ fontWeight: 'fontWeightBold', mt: 2 }}>
                            Công ty dược
                        </Typography>
                        {
                                providerLoading
                            ?
                                <CircularProgress sx={{ margin: 'auto' }} />
                            :
                                <FormAutocomplete
                                    control={control}
                                    label='Tên công ty dược'
                                    placeholder='Chọn tên công ty dược'
                                    name='provider'
                                    options={providers}
                                />    
                        }

                        <Typography
                            mt='8px'
                            mb='8px'
                        >
                            <Typography display="inline" sx={{ textDecoration: 'underline' }}>
                                Số điện thoại:   
                            </Typography>

                            <Typography display="inline" sx={{ pl:1, textDecoration: 'none'}}>
                                {watchProvider?.phoneNumber ? watchProvider.phoneNumber : ''}
                            </Typography>
                        </Typography>

                        <Typography
                            mt='8px'
                            mb='8px'
                        >
                            <Typography display="inline" sx={{ textDecoration: 'underline' }}>
                                Email:   
                            </Typography>

                            <Typography display="inline" sx={{ pl:1, textDecoration: 'none'}}>
                                {watchProvider?.email ? watchProvider.email : ''}
                            </Typography>
                        </Typography>

                        <Typography
                            mt='8px'
                            mb='8px'
                        >
                            <Typography display="inline" sx={{ textDecoration: 'underline' }}>
                                Địa chỉ:   
                            </Typography>

                            <Typography display="inline" sx={{ pl:1, textDecoration: 'none'}}>
                                {watchProvider?.address ? watchProvider.address : ''}
                            </Typography>
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={8} sm={6} >
                    <Box sx={{ border: 1, borderColor: 'grey.300', mt: 4, px: 2, borderRadius: 2, boxShadow: 1 }}>
                        <Typography mb='20px' variant="subtitle2" sx={{ fontWeight: 'fontWeightBold', mt: 2 }}>
                        Thông tin nhân viên
                    </Typography>
        
                    <Typography
                        mt='8px'
                        mb='8px'
                    >
                        <Typography display="inline" sx={{ textDecoration: 'underline' }}>
                            Tên nhân viên:   
                        </Typography>

                        <Typography display="inline" sx={{ pl:1, textDecoration: 'none'}}>
                            {staff?.name ? staff.name : ''}
                        </Typography>
                    </Typography>

                    <Typography
                        mt='8px'
                        mb='8px'
                    >
                        <Typography display="inline" sx={{ textDecoration: 'underline' }}>
                            Số điện thoại:   
                        </Typography>

                        <Typography display="inline" sx={{ pl:1, textDecoration: 'none'}}>
                            {staff?.phoneNumber ? staff.phoneNumber : ''}
                        </Typography>
                    </Typography>

                    <Typography
                        mt='8px'
                        mb='8px'
                    >
                        <Typography display="inline" sx={{ textDecoration: 'underline' }}>
                            Email:   
                        </Typography>

                        <Typography display="inline" sx={{ pl:1, textDecoration: 'none'}}>
                            {staff?.email ? staff.email : ''}
                        </Typography>
                    </Typography>

                    <Typography
                        mt='8px'
                        mb='8px'
                    >
                        <Typography display="inline" sx={{ textDecoration: 'underline' }}>
                            Địa chỉ:   
                        </Typography>

                        <Typography display="inline" sx={{ pl:1, textDecoration: 'none'}}>
                            {staff?.address ? staff.address : ''}
                        </Typography>
                    </Typography>
                    </Box>
                </Grid>

                <Grid item xs={8} sm={3}>
                    <FormInputDate
                        name="importDate"
                        control={control}
                        label="Ngày nhập hàng"
                        placeholder='x'
                    />
                </Grid>

                <Grid item xs={8} sm={9}>
                    <FormInputText
                        name="note"
                        control={control}
                        label="Ghi chú"
                        placeholder='Nhập ghi chú'
                    />
                </Grid>

                <Grid item xs={8} sm={4}>
                    <FormInputCurrency
                        control={control}
                        name='paid'
                        label='Đã thanh toán'
                        placeholder='Nhập số tiền đã thanh toán'
                    />
                </Grid>

                <Grid item xs={8} sm={4}>
                    <FormInputDate
                        name="maturityDate"
                        control={control}
                        label="Ngày đáo hạn"
                        placeholder='x'
                    />
                </Grid>

                <Grid item xs={8} sm={4}>
                    <FormInputText
                        name="patchId"
                        control={control}
                        label="Mã lô hàng"
                        placeholder='Nhập mã lô hàng'
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
            
        </Paper>
    )
}

export default CreateImport