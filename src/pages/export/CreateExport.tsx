import { Box, Button, CircularProgress, Grid, Paper, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import React, { useEffect, useState } from "react";
import { FormAutocomplete } from "../../components/form/FormAutocomplete";
import { useForm } from "react-hook-form";
import { getStaff } from "../../store/auth";
import { FormInputText } from "../../components/form/FormInputText";
import { FormInputDate } from "../../components/form/FormInputDate";
import TableAction from "../../components/table/TableAction";
import { useGetDataCustomers } from "../../hooks/useCustomer";
import TableExportSelectDrug from "../../components/table/TableExportSelectDrug";
import { useGetDataDrugCategories } from "../../hooks/useDrugCategory";

export interface ColumnDrugCategory {
    key: string;
    value: string;
}

export interface ImportForm {
    customer: any;
    note: string;
    exportDate: string
    precriptionId: string
    exportDetails: []
}

const columns: ColumnDrugCategory[] = [
    { key: 'id', value: 'Mã thuốc'},
    { key: 'name', value: 'Tên thuốc' },
    { key: 'formatedPrice', value: 'Đơn giá bán' },
    { key: 'minimalUnit', value: 'Đơn vị bán' },
    { key: 'vat', value: 'Thuế VAT' },
    { key: 'use', value: 'Công dụng'},
]

const CreateExport: React.FC = () => {
    const navigate = useNavigate()
    const staff = getStaff();
    const { isLoading: drugCategoryLoading, data: drugCategories } = useGetDataDrugCategories()
    const [drugs, setDrugs] = useState<any[]>([])
    const [selectedDrugs, setSelectedDrugs] = useState<any[]>([])
    const [pay, setPay] = useState<number[]>([0 , 0, 0])
    const { data: customer, isLoading: customerLoading } = useGetDataCustomers()
    const { handleSubmit, control, watch } = useForm<ImportForm>({
    });

    const watchCustomer = watch('customer')

    useEffect(() => {
        if (drugCategories && drugCategories.length > 0) {
            setDrugs(drugCategories.map((drug: any) => {
                return {...drug, checked: false}
            }))
        }
    }, [drugCategories])

    useEffect(() => {
        if (selectedDrugs.length > 0) {
            const withoutVat = selectedDrugs.reduce((value, drug) => {
                return value + drug.quantity * drug.price
            }, 0)

            const vat = selectedDrugs.reduce((value, drug) => {
                return value + drug.rawVat * drug.quantity * drug.price
            }, 0)

            const total = vat + withoutVat;

            setPay([withoutVat, vat, total])
        }
        else {
            setPay([0, 0, 0])
        }
    }, [selectedDrugs])

    const onSubmit = (data: ImportForm) => { 
        console.log(selectedDrugs)
        console.log(data)
    };

    const checkDrugCategory = (drugCategory: any) => {
        setDrugs(drugs.map(drug => {
            return drug.id === drugCategory.id ? {...drug, checked: true} : drug
        }))
        selectedDrugs.push({...drugCategory, checked: false, quantity: 0})
    }

    const unCheckDrugCategory = (drugCategory: any) => {
        setDrugs(drugs.map(drug => {
            return drug.id === drugCategory.id ? {...drug, checked: false} : drug
        }))
        const newSelectedDrugs = selectedDrugs.filter((drug) => drug.id !== drugCategory.id);
        setSelectedDrugs(newSelectedDrugs);
    }

    const updateQuantity = (drugCategory: any) => {
        setSelectedDrugs(selectedDrugs.map(drug => {
            return drug.id === drugCategory.id ?  drugCategory : drug
        }))
    }

    const backToTable = () => {
        navigate('/export')
    }

    return (
        <Paper sx={{ px:6, py:4 }}>
            <Typography variant="h4" gutterBottom mb='20px'>
                Thông tin phiếu xuất hàng
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={8} sm={6} >
                    <Box sx={{ border: 1, borderColor: 'grey.300', mt:4, px: 2, borderRadius: 2, boxShadow: 1 }}>
                        <Typography variant="subtitle2" mb='20px' sx={{ fontWeight: 'fontWeightBold', mt: 2 }}>
                            Khách hàng
                        </Typography>
                        {
                                customerLoading
                            ?
                                <CircularProgress sx={{ margin: 'auto' }} />
                            :
                                <FormAutocomplete
                                    control={control}
                                    label='Tên khách hàng'
                                    placeholder='Chọn khách hàng'
                                    name='customer'
                                    options={customer}
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
                                {watchCustomer?.phoneNumber ? watchCustomer.phoneNumber : ''}
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
                                {watchCustomer?.email ? watchCustomer.email : ''}
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
                                {watchCustomer?.address ? watchCustomer.address : ''}
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
                        name="exportDate"
                        control={control}
                        label="Ngày xuất hàng"
                        placeholder='x'
                    />
                </Grid>

                <Grid item xs={8} sm={3}>
                    <FormInputText
                        name="precriptionId"
                        control={control}
                        label="Mã đơn thuốc"
                        placeholder='Nhập mã đơn thuốc/toa thuốc'
                    />
                </Grid>

                <Grid item xs={8} sm={6}>
                    <FormInputText
                        name="note"
                        control={control}
                        label="Ghi chú"
                        placeholder='Nhập ghi chú'
                    />
                </Grid>

                
                
                <Grid item xs={12} sm={12} container>
                    <Typography mb='20px' variant="subtitle2" sx={{ fontWeight: 'fontWeightBold', mt: 2 }}>
                        Thuốc đã chọn
                    </Typography>
                    <TableExportSelectDrug
                        rows={selectedDrugs}
                        tooltip='Nhấn để bỏ chọn thuốc'
                        keyTable='selected-drug-export-category-table-key'
                        action={unCheckDrugCategory}
                        update={updateQuantity}
                    /> 
                </Grid>

                <Grid item xs={12} sm={12} container 
                    sx={{
                        display: 'flex',
                        justifyContent: "end",
                        gap: 4
                    }}
                >
                    <Typography variant="subtitle2" sx={{  }}>
                        Tổng tiền (chưa tính VAT): { pay[0] ? pay[0].toLocaleString() : '_'} VND
                    </Typography>

                    <Typography variant="subtitle2" sx={{  }}>
                        Tiền thuế VAT: { pay[1] ? pay[1].toLocaleString() : '_'} VND
                    </Typography>

                    <Typography variant="subtitle2" sx={{ color: "#148c07"  }}>
                        Tổng tiền: { pay[2] ? pay[2].toLocaleString() : '_'} VND
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={12} container 
                >
                    <Typography mb='20px' variant="subtitle2" sx={{ fontWeight: 'fontWeightBold', mt: 2 }}>
                        Danh mục thuốc
                    </Typography>
                    {
                        drugCategoryLoading
                        ?
                            <CircularProgress sx={{ margin: 'auto' }} />
                        :
                            <TableAction
                                rows={drugs}
                                tooltip='Nhấn để chọn thuốc'
                                columns={columns}
                                keyTable='drug-category-table-key'
                                action={checkDrugCategory}
                            />
                    }  
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
                        Tạo phiếu
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

export default CreateExport