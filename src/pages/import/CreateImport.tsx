import { Box, Button, CircularProgress, Grid, IconButton, InputAdornment, Paper, TextField, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import React, { useEffect, useState } from "react";
import { FormAutocomplete } from "../../components/form/FormAutocomplete";
import { useForm } from "react-hook-form";
import { useGetDataProviders } from "../../hooks/useProvider";
import { getStaff } from "../../store/auth";
import { FormInputText } from "../../components/form/FormInputText";
import { FormInputDate } from "../../components/form/FormInputDate";
import { FormInputCurrency } from "../../components/form/FormInputCurrency";
import { useGetDataDrugCategories } from "../../hooks/useDrugCategory";
import TableAction from "../../components/table/TableAction";
import TableSelectDrugCategory from "../../components/table/TableSelectDrugCategory";
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from "@mui/styles";
import globalEvent from "../../utils/emitter";
import ReplayIcon from '@mui/icons-material/Replay';

const useStyles = makeStyles({
  customTextField: {
    "& input::placeholder": {
      fontSize: "15px"
    }
    },
    // rotateIcon: {
    //     "&:hover": {
    //         '& .MuiSvgIcon-root': {
    //             animation: "$spin 0.2s linear forwards"
    //         }
    //     }
    // },
    // "@keyframes spin": {
    //   "0%": {
    //     transform: "rotate(360deg)"
    //   },
    //   "100%": {
    //     transform: "rotate(0deg)"
    //   }
    // }
})

interface ColumnDrugCategory {
    key: string;
    value: string;
}

export interface ImportForm {
    provider: any;
    note: string;
    importDate: string
    paid: string
    importDetails: []
}

const columns: ColumnDrugCategory[] = [
    { key: 'id', value: 'Mã thuốc'},
    { key: 'name', value: 'Tên thuốc' },
    { key: 'quantity', value: 'Tồn kho' },
    { key: 'unit', value: 'Đơn vị nhập' },
    { key: 'formatedPrice', value: 'Đơn giá bán' },
    { key: 'minimalUnit', value: 'Đơn vị bán' },
    { key: 'use', value: 'Công dụng'},
]

const CreateImport: React.FC = () => {
    const navigate = useNavigate()
    const classes = useStyles();
    const staff = getStaff();
    const { isLoading: drugCategoryLoading, data: drugCategories, refetch } = useGetDataDrugCategories()
    const [drugs, setDrugs] = useState<any[]>([])
    const [cloneDrugs, setCloneDrugs] = useState<any[]>([])
    const [selectedDrugs, setSelectedDrugs] = useState<any[]>([])
    const [pay, setPay] = useState<number[]>([0 , 0, 0])
    const { data: providers, isLoading: providerLoading } = useGetDataProviders()
    const { handleSubmit, control, watch } = useForm<ImportForm>({
    });
    const [search, setSearch] = useState<string>('')

    const watchProvider = watch('provider')

    const handleSearchData = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = event.target.value as string
        if (searchTerm.trim().length > 0) {
            setDrugs(cloneDrugs.filter(
                drug => (drug.name).toLowerCase().includes(searchTerm.toLowerCase()) && !drug.checked
            ))
        }
        else {
            setDrugs(cloneDrugs)
        }
        setSearch(event.target.value as string);
    }

    useEffect(() => {
        globalEvent.emit('close-sidebar')
    }, [])

    useEffect(() => {
        if (drugCategories && drugCategories.length > 0) {
            const data = drugCategories.map((drug: any) => {
                return { ...drug, checked: false }
            });
            setCloneDrugs(data)
            setDrugs(data)
        }
    }, [drugCategories])

    useEffect(() => {
        if (selectedDrugs.length > 0) {
            const withoutVat = selectedDrugs.reduce((value, drug) => {
                return value + drug.quantity * drug.unitPrice
            }, 0)

            const vat = selectedDrugs.reduce((value, drug) => {
                return value + drug.rawVat*drug.quantity * drug.unitPrice
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
        const data = drugs.map(drug => {
            return drug.id === drugCategory.id ? {...drug, checked: true} : drug
        })
        setDrugs(data)
        setCloneDrugs(data)
        selectedDrugs.push({...drugCategory, checked: false, quantity: 0, unitPrice: 0, expiryDate: new Date(), batchId: ''})
    }

    const unCheckDrugCategory = (drugCategory: any) => {
        const data = drugs.map(drug => {
            return drug.id === drugCategory.id ? {...drug, checked: false} : drug
        })
        setDrugs(data)
        setCloneDrugs(data)
        const newSelectedDrugs = selectedDrugs.filter((drug) => drug.id !== drugCategory.id);
        setSelectedDrugs(newSelectedDrugs);
    }

    const updateSelectedDrugs = (drugCategory: any) => {
        setSelectedDrugs(selectedDrugs.map(drug => {
            return drug.id === drugCategory.id ?  drugCategory : drug
        }))
    }

    const backToTable = () => {
        navigate('/admin/imports')
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
                    <Box
                        sx={{
                            minHeight: '88%',
                            border: 1,
                            borderColor: 'grey.300',
                            mt: 4,
                            px: 2,
                            borderRadius: 2,
                            boxShadow: 1
                        }}
                    >
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
                        size='small'
                        name="importDate"
                        control={control}
                        label="Ngày nhập hàng"
                        placeholder='x'
                    />
                </Grid>

                <Grid item xs={8} sm={3}>
                    <FormInputText
                        size='small'
                        name="note"
                        control={control}
                        label="Ghi chú"
                        placeholder='Nhập ghi chú'
                    />
                </Grid>

                <Grid item xs={8} sm={3}>
                    <FormInputCurrency
                        size='small'
                        control={control}
                        name='paid'
                        label='Đã thanh toán'
                        placeholder='Nhập số tiền đã thanh toán'
                    />
                </Grid>

                <Grid item xs={8} sm={3}>
                    <FormInputDate
                        size='small'
                        name="maturityDate"
                        control={control}
                        label="Ngày đáo hạn"
                        placeholder='x'
                    />
                </Grid>
                
                <Grid item xs={12} sm={12} container>
                    <Typography mb='20px' variant="subtitle2" sx={{ fontWeight: 'fontWeightBold', mt: 2 }}>
                        Thuốc đã chọn
                    </Typography>
                    <TableSelectDrugCategory
                        rows={selectedDrugs}
                        tooltip='Nhấn để bỏ chọn thuốc'
                        keyTable='selected-drug-category-table-key'
                        action={unCheckDrugCategory}
                        update={updateSelectedDrugs}
                    /> 
                </Grid>

                <Grid item xs={12} sm={12} container 
                    sx={{
                        display: 'flex',
                        justifyContent: "end",
                        gap: 4
                    }}
                >
                    <Typography variant="subtitle2">
                        Tổng tiền (chưa tính VAT): { pay[0] ? pay[0].toLocaleString() : '_'} VND
                    </Typography>

                    <Typography variant="subtitle2">
                        Tiền thuế VAT: { pay[1] ? pay[1].toLocaleString() : '_'} VND
                    </Typography>

                    <Typography variant="subtitle2" sx={{ color: "#148c07"  }}>
                        Tổng tiền: { pay[2] ? pay[2].toLocaleString() : '_'} VND
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={12} container 
                >
                    <Box sx={{ display: 'flex', width: '100%' }}>
                        <Typography mb='20px' variant="subtitle2" sx={{ fontWeight: 'fontWeightBold', mt: 2 }}>
                            Danh mục thuốc
                        </Typography>
                        <TextField
                            onChange={handleSearchData}
                            classes={{ root: classes.customTextField }}
                            size='small'
                            sx={{ flexGrow: 1, my :'auto', mr: '35%', ml: 2}}
                            label="Tìm kiếm"
                            value={search}
                            placeholder="Nhập thông tin danh mục thuốc theo tên"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment
                                        position='end'
                                    >
                                        <SearchIcon />
                                    </InputAdornment>
                                )
                            }}
                        />
                        <Button
                            variant='contained'
                            color="success"
                            aria-label="Delete"
                            sx={{
                                height: '70%',
                                m: 'auto',
                                textTransform: 'none',
                            }}
                            onClick={ () => refetch()}
                        >
                            <ReplayIcon  />
                            Làm mới
                        </Button>
                    </Box>
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



export default CreateImport