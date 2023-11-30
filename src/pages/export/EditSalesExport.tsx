import { Box, Button, CircularProgress, Grid, InputAdornment, Paper, TextField, Typography } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom"
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { getStaff } from "../../store/auth";
import { FormInputText } from "../../components/form/FormInputText";
import { FormInputDate } from "../../components/form/FormInputDate";
import TableExportSelectDrug from "../../components/table/TableExportSelectDrug";
import TableDrugCategories from "../../components/table/TableDrugCategories";
import { useGetDataDrugCategories } from "../../hooks/useDrugCategory";
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from "@mui/styles";
import globalEvent from "../../utils/emitter";
import ReplayIcon from '@mui/icons-material/Replay';
import { FormInputDropdown } from "../../components/form/FormInputDropdown";
import { genders } from "../../utils/constants";
import Address from "../../components/Address";
import { useSearchCustomer } from '../../hooks/useCustomer'
import yup from "../../utils/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateExport } from "../../hooks/useExport";
import { useReactToPrint } from "react-to-print";
import ExportBill from "./ExportBill";
import { enqueueSnackbar } from "notistack";
import { ExportData, ExportDetailPdf } from "../../types/ExportType";
import dayjs from "dayjs";
import { TodaySales } from "../../components/TodaySales";
import { formatCurrency } from "../../utils/format";

const useStyles = makeStyles({
  customTextField: {
    "& input::placeholder": {
      fontSize: "15px"
    }
    },
})

export interface ColumnDrugCategory {
    key: string;
    value: string;
}

export interface ExportForm {
    customer?: CustomerForm,
    note: string;
    exportDate: Date
    prescriptionId: string
    exportDetails: any[]
    staffId: number;
    type: number
}

export interface CustomerForm {
    name: string;
    phoneNumber: string;
    gender: string;
    address: string;
}

const defaultValuesExport = {
    note: '',
    exportDate: new Date(dayjs().format('YYYY-MM-DD HH:mm:ss')),
    prescriptionId: '',
    exportDetails: [],
    staffId: 0,
    type: 1,
}

//@ts-ignore
const customerFormValidate: Yup.ObjectSchema<CustomerEditForm> = yup.object({
    name: yup
        .string()
        .required('Tên khách hàng bắt buộc.')
        .max(255),
    phoneNumber: yup
        .string()
        .required('Số điện thoại bắt buộc.')
        //@ts-ignore
        .phoneNumber('Số điện thoại không hợp lệ.'),
})

 // @ts-ignore
const exportValidate: Yup.ObjectSchema<ExportForm> = yup.object({
    note: yup
        .string()
        .max(255, 'Ghi chú không quá 255 kí tự'),
    exportDate: yup
        .date()
        .max(new Date(dayjs().add(1, 'day').format('YYYY-MM-DD')), 'Thời gian xuất hàng không hợp lệ.'),
    prescriptionId: yup
        .string()
        .required('Mã toa thuốc bắt buộc')
        .max(20),
});

const columns: ColumnDrugCategory[] = [
    { key: 'id', value: 'Mã thuốc'},
    { key: 'name', value: 'Tên thuốc' },
    { key: 'quantity', value: 'Số lượng tồn'},
    { key: 'formatedPrice', value: 'Đơn giá bán' },
    { key: 'minimalUnit', value: 'Đơn vị bán' },
    { key: 'vat', value: 'Thuế VAT' },
    { key: 'use', value: 'Công dụng'},
]

const EditSalesExport: React.FC = () => {
    const navigate = useNavigate()
    const classes = useStyles();
    const { state } = useLocation()
    const staff = getStaff();
    const { isLoading: drugCategoryLoading, data: drugCategories, refetch } = useGetDataDrugCategories()
    const {
        handleSubmit: handleSubmitCustomer,
        control: customerControl,
        watch,
        setValue: setValueCustomer,
        clearErrors,
        reset: resetCustomer
    } = useForm<CustomerForm>({
        defaultValues: {...state.exportTodayIndex.export.customer},
        resolver: yupResolver(customerFormValidate)
    });
    const setCustomer = (customer: CustomerForm) => {
        setValueCustomer('phoneNumber', customer.phoneNumber)
        setValueCustomer('name', customer.name)
        setValueCustomer('gender', customer.gender)
        setAddress(customer.address)
        clearErrors('phoneNumber'),
        clearErrors('name')
    }
    const searchCustomer = useSearchCustomer(setCustomer)
    const [drugs, setDrugs] = useState<any[]>([])
    const [cloneDrugs, setCloneDrugs] = useState<any[]>([])
    const [selectedDrugs, setSelectedDrugs] = useState<any[]>([])
    const [pay, setPay] = useState<number[]>([
        state.exportTodayIndex.export.totalPrice,
        state.exportTodayIndex.export.totalPriceWithVat - state.exportTodayIndex.export.totalPrice,
        state.exportTodayIndex.export.totalPriceWithVat
    ])
    const { handleSubmit, control, reset } = useForm<ExportForm>({
        defaultValues: defaultValuesExport,
        resolver: yupResolver(exportValidate)
    });
    const [address, setAddress] = useState<string>('');
    const [search, setSearch] = useState<string>('')
    const [exportData, setExportData] = useState<ExportData | null>(null)    
    const [exportDetailData, setExportDetailData] = useState<ExportDetailPdf[] | null>(null)
    const [selectedExport, setSelectedExport] = useState<number|null>(null)
    const createExport = useCreateExport(setExportData, setExportDetailData);
    let componentRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const [change, setChange] = useState<number>(Math.random())
    useEffect(() => {
        setAddress(state.exportTodayIndex.export.customer.address)
        setChange(Math.random())
        setValueCustomer('phoneNumber', state.exportTodayIndex.export.customer.phoneNumber)
        setValueCustomer('name', state.exportTodayIndex.export.customer.name)
        setValueCustomer('gender', state.exportTodayIndex.export.customer.gender)
        const selectDrugIds = state.exportTodayIndex.exportDetail.map((detail: any) => detail.drug.id)
        setSelectedDrugs(state.exportTodayIndex.exportDetail.map((detail: any) => {
            return {
                id: detail.drug.id,
                name: detail.drug.name,
                exportQuantity: detail.quantity,
                rawVat: detail.vat,
                vat: `${detail.vat * 100}%`,
                formatedPrice: formatCurrency(detail.unitPrice),
                price: detail.unitPrice,
                minimalUnit: detail.drug.minimalUnit,
                use: detail.drug.type.name,
                checked: true,
            }
        }))
        console.log(selectDrugIds);
        const data = drugCategories.map((drug: any) => {
            return { ...drug, checked: false }
        });
        // setDrugs(data)
        const handleDrugs = data.map((drug: any) => {
            return selectDrugIds.includes(drug.id) ? {...drug, checked: true} : drug
        })
        setCloneDrugs(handleDrugs)
        setDrugs(handleDrugs)
    }, [state])

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

    // useEffect(() => {
    //     if (drugCategories && drugCategories.length > 0) {
    //         const selectDrugIds = state.exportTodayIndex.exportDetail.map((detail: any) => detail.drug.id)
    //         const data = drugCategories.map((drug: any) => {
    //             return { ...drug, checked: false }
    //         });
    //         // setDrugs(data)
    //         const handleDrugs = data.map((drug: any) => {
    //             return selectDrugIds.includes(drug.id) ? {...drug, checked: true} : drug
    //         })
    //         setCloneDrugs(handleDrugs)
    //         setDrugs(handleDrugs)
    //     }
    // }, [drugCategories])

    useEffect(() => {
        globalEvent.emit('close-sidebar')
    }, [])

    useEffect(() => {
        if (selectedDrugs.length > 0) {
            const withoutVat = selectedDrugs.reduce((value, drug) => {
                return value + drug.exportQuantity * drug.price
            }, 0)

            const vat = selectedDrugs.reduce((value, drug) => {
                return value + drug.rawVat * drug.exportQuantity * drug.price
            }, 0)

            const total = vat + withoutVat;

            setPay([withoutVat, vat, total])
        }
        else {
            setPay([0, 0, 0])
        }
    }, [selectedDrugs])

    useEffect(() => {
        if (exportData && exportDetailData) {
            handlePrint();
        }
    }, [exportData, exportDetailData])

    const onSubmit = (data: ExportForm) => {
        const isInvalid = selectedDrugs.length === 0
            || selectedDrugs.some(drug => drug.error.length > 0);
        
        handleSubmitCustomer((_) => {})()
        if (isInvalid) {
            if (selectedDrugs.length === 0) {
                enqueueSnackbar('Vui lòng chọn ít nhất một danh mục thuốc.', {
                    variant: 'warning',
                    autoHideDuration: 3000
                })
            }
            else {
                enqueueSnackbar('Vui lòng kiểm tra dữ liệu.', {
                    variant: 'warning',
                    autoHideDuration: 3000
                })
            }
        }
        else {
            createExport.mutate({
                customer: {
                    name: watch('name'),
                    phoneNumber: watch('phoneNumber'),
                    address: address,
                    gender: watch('gender') 
                },
                type: 1,
                prescriptionId: data.prescriptionId,
                staffId: staff.id,
                exportDate: data.exportDate,
                note: data.note,
                exportDetails: selectedDrugs.map(drug => {
                    return { drugId: drug.id, quantity: drug.exportQuantity}
                })
            })
            // setSelectedDrugs([]),
            // setDrugs(cloneDrugs)
            // setSearch(''),
            // reset()
            // resetCustomer()
            // setAddress('')
        }
    };

    const checkDrugCategory = (drugCategory: any) => {
        const data = cloneDrugs.map(drug => {
            return drug.id === drugCategory.id ? {...drug, checked: true} : drug
        })
        setCloneDrugs(data)
        if (search.trim().length > 0) {
            setDrugs(data.filter(
                drug => (drug.name).toLowerCase().includes(search.toLowerCase()) && !drug.checked
            ))
        }
        else {
            setDrugs(data)
        }
        selectedDrugs.push({...drugCategory, checked: false, exportQuantity: 1, error: ''})
    }

    const unCheckDrugCategory = (drugCategory: any) => {
        const data = cloneDrugs.map(drug => {
            return drug.id === drugCategory.id ? {...drug, checked: false} : drug
        })
        setCloneDrugs(data);
        if (search.trim().length > 0) {
            setDrugs(data.filter(
                drug => (drug.name).toLowerCase().includes(search.toLowerCase()) && !drug.checked
            ))
        }
        else {
            setDrugs(data)
        }

        const newSelectedDrugs = selectedDrugs.filter((drug) => drug.id !== drugCategory.id);
        setSelectedDrugs(newSelectedDrugs);
    }

    const updateQuantity = (drugCategory: any) => {
        let validateError = ''
        if (drugCategory.exportQuantity > drugCategory.quantity) {
            validateError = 'Số lượng tồn không đủ để xuất bán.'
        }
        else {
            if (isNaN(drugCategory.exportQuantity)) {
                validateError = 'Số lượng bán bắt buộc'
            }
            else if (drugCategory.exportQuantity === 0) {
                validateError = 'Số lượng bán lớn hơn 0'
            }
            else {
                validateError = ''
            }
        }
        setSelectedDrugs(selectedDrugs.map(drug => {
            return drug.id === drugCategory.id ?  {...drugCategory, error: validateError} : drug
        }))
    }

    return (
        <Box sx={{ display: 'flex', gap: 2 }}>
            <Paper sx={{ px: 6, py: 4, flex: 3 }}>
                <Typography variant="h4" gutterBottom mb='20px'>
                    Thông tin bán hàng
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Grid container spacing={1.5} sx={{ flex: 4 }}>
                        <Grid item xs={8} sm={4}>
                            <Controller
                                name='phoneNumber'
                                control={customerControl}
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                }) => (
                                <TextField
                                    size='small'
                                    type='text'
                                    helperText={error ? error.message : null}
                                    error={!!error}
                                    onChange={onChange}
                                    onBlur={() => {
                                        searchCustomer.mutate(watch('phoneNumber'))
                                    }
                                    }
                                    value={value}
                                    fullWidth
                                    label="Số điện thoại khách hàng"
                                    variant="outlined"
                                    placeholder='Nhập số điện thoại khách hàng'
                                />
                                )}
                            />
                        </Grid>
                        <Grid item xs={8} sm={6}>
                            <FormInputText
                                size="small"
                                name="name"     
                                control={customerControl}
                                label="Họ và tên khách hàng"
                                placeholder='Nhập họ và tên khách hàng'
                            />
                        </Grid>
                        <Grid item xs={8} sm={2}>
                            <FormInputDropdown
                                name="gender"
                                control={customerControl}
                                label="Giới tính"
                                placeholder='Giới tính'
                                list={genders}
                            />
                        </Grid>
                        <Address key={change} gridSize={6} setAddress={setAddress} size='small' initAddress={address} />
                        
                    </Grid>

                    <Grid container spacing={1.5} width='30%' sx={{ flex: 2 }}>
                        <Grid item xs={8} sm={12}>
                            <FormInputDate
                                name="exportDate"
                                control={control}
                                label="Ngày xuất hàng"
                                placeholder='x'
                                withTime={true}
                            />
                        </Grid>

                        <Grid item xs={8} sm={12}>
                            <FormInputText
                                name="prescriptionId"
                                control={control}
                                label="Mã đơn thuốc"
                                placeholder='Nhập mã đơn thuốc/toa thuốc'
                            />
                        </Grid>

                        <Grid item xs={8} sm={12}>
                            <FormInputText
                                name="note"
                                control={control}
                                label="Ghi chú"
                                placeholder='Nhập ghi chú'
                            />
                        </Grid>
                    </Grid>
                </Box>
                    
                    
                <Grid container spacing={3} marginTop={2}>
                    <Grid item xs={12} sm={12} container>
                        <Typography mb='20px' variant="subtitle2" sx={{ fontWeight: 'fontWeightBold', mt: 2, fontSize: 16 }}>
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
                            Tổng tiền (chưa tính VAT): { pay[0] ? pay[0].toLocaleString() : '_'}đ
                        </Typography>

                        <Typography variant="subtitle2" sx={{  }}>
                            Tiền thuế VAT: { pay[1] ? pay[1].toLocaleString() : '_'}đ
                        </Typography>

                        <Typography variant="subtitle2" sx={{ color: "#148c07"  }}>
                            Tổng tiền: { pay[2] ? pay[2].toLocaleString() : '_'}đ
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={12} container 
                    >
                        <Box sx={{ display: 'flex', width: '100%', gap: 1 }}>
                            <Typography mb='20px' variant="subtitle2" sx={{ fontWeight: 'fontWeightBold', mt: 2, fontSize: 16 }}>
                                Danh mục thuốc
                            </Typography>
                            <TextField
                                onChange={handleSearchData}
                                classes={{ root: classes.customTextField }}
                                size='small'
                                sx={{ flexGrow: 1, my :'auto', mr: '20%', ml: 2}}
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
                                variant="contained"
                                color="primary"
                                sx={{
                                    height: '70%',
                                    m: 'auto',
                                    textTransform: 'none',
                                }}
                                onClick={handleSubmit(onSubmit)}
                            >
                                Hoàn và tạo phiếu mới
                            </Button>

                            <Button
                                variant="contained"
                                color="error"
                                sx={{
                                    height: '70%',
                                    m: 'auto',
                                    textTransform: 'none',
                                }}
                                onClick={() => {}}
                            >
                                Hoàn toàn bộ
                            </Button>
                            
                        </Box>
                        {
                            drugCategoryLoading
                            ?
                                <CircularProgress sx={{ margin: 'auto' }} />
                            :
                                <TableDrugCategories
                                    rows={drugs}
                                    tooltip='Nhấn để chọn thuốc'
                                    columns={columns}
                                    keyTable='drug-category-table-key'
                                    action={checkDrugCategory}
                                    type='export'
                                />
                        }  
                    </Grid>
                
                </Grid>
                <div style={{ display: 'none' }}>
                    <ExportBill
                        ref={componentRef}
                        exportData={exportData}
                        exportDetail={exportDetailData}
                    />
                </div>
                
            </Paper>
            <Box sx={{ flex: 1, px: 2, py: 1}}></Box>
            <TodaySales setSelectedExport={setSelectedExport} />
        </Box>
    )
}

export default EditSalesExport