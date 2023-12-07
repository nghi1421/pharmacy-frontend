import { Box, Button, Chip, CircularProgress, Grid, InputAdornment, Paper, TextField, Typography } from "@mui/material"
import { useLocation } from "react-router-dom"
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
import { FormInputDropdown } from "../../components/form/FormInputDropdown";
import { genders } from "../../utils/constants";
import Address from "../../components/Address";
import { useSearchCustomer } from '../../hooks/useCustomer'
import yup from "../../utils/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRefundAndCreateNewExport, useRefundExport } from "../../hooks/useExport";
import { useReactToPrint } from "react-to-print";
import ExportBill from "./ExportBill";
import { enqueueSnackbar } from "notistack";
import { ExportData, ExportDetailPdf, ExportDetailRawData } from "../../types/ExportType";
import dayjs from "dayjs";
import { TodaySales } from "../../components/TodaySales";
import { formatCurrency, formatDate, formatNumber } from "../../utils/format";
import { useConfirmDialog } from "../../hooks/useConfirmDialog";
import ConfirmDialog from "../../components/ConfirmDialog";
import { handleAddress } from "../../utils/address";
import { TextShow } from "../../components/TextShow";
import TableData from "../../components/table/TableData";
import { DrugCategory, DrugCategoryHandled } from "../../types/DrugCategory";

const useStyles = makeStyles({
  customTextField: {
    "& input::placeholder": {
      fontSize: "15px"
    }
    },
})

const getVairantColorType = (type: number): string => {
    switch (type) {
        case 1: return 'success'
        case 2: return 'warning'
        default: return 'error'
    }
}

const getVairantLabelType = (type: number): string => {
    switch (type) {
        case 1: return 'Bán'
        case 2: return 'Hoàn'
        default: return 'Hủy'
    }
}

export interface ColumnDrugCategory {
    key: string;
    value: string;
}

export interface EditExportForm {
    id: number;
    customer?: CustomerForm,
    note: string;
    exportDate: Date
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

const columnsDetail: ColumnDrugCategory[] = [
    { key: 'id', value: 'Mã thuốc' },
    { key: 'drugName', value: 'Tên thuốc' },
    { key: 'quantity', value: 'Số lượng bán'},
    { key: 'unitPrice', value: 'Đơn giá' },
    { key: 'vat', value: 'Thuế VAT'},
    { key: 'expiryDate', value: 'Hạn sử dụng'},
]

const EditSalesExport: React.FC = () => {
    const classes = useStyles();
    const { state } = useLocation()
    const staff = getStaff();
    const { isLoading: drugCategoryLoading, data: drugCategories } = useGetDataDrugCategories()
    const {
        handleSubmit: handleSubmitCustomer,
        control: customerControl,
        watch,
        setValue: setValueCustomer,
        clearErrors,
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
    const { handleSubmit, control } = useForm<EditExportForm>({
        defaultValues: defaultValuesExport,
        resolver: yupResolver(exportValidate)
    });
    const [address, setAddress] = useState<string>('');
    const [search, setSearch] = useState<string>('')
    const [exportData, setExportData] = useState<ExportData | null>(null)    
    const [exportDetailData, setExportDetailData] = useState<ExportDetailPdf[] | null>(null)
    const refundAndCreate = useRefundAndCreateNewExport(setExportData, setExportDetailData);
    const [selectedExport, setSelectedExport] = useState<number>(state.exportTodayIndex.export.id)
    let componentRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const refundExport = useRefundExport()
    const [change, setChange] = useState<number>(Math.random())
    const [openConfirmDialog, props] = useConfirmDialog(refundExport.mutate)

    useEffect(() => {
        if (drugCategories && drugCategories.length > 0) {
            console.log(3)
            setAddress(state.exportTodayIndex.export.customer.address)
            setChange(Math.random())
            setSelectedExport(state.exportTodayIndex.export.id)
            setValueCustomer('phoneNumber', state.exportTodayIndex.export.customer.phoneNumber)
            setValueCustomer('name', state.exportTodayIndex.export.customer.name)
            setValueCustomer('gender', state.exportTodayIndex.export.customer.gender)

            const selectDrugIds = state.exportTodayIndex.exportDetail.map((detail: any) => detail.drug.id)
            setSelectedDrugs(state.exportTodayIndex.exportDetail.map((detail: any) => {
                const drug: DrugCategoryHandled|null = drugCategories.find((drug: DrugCategory) => drug.id === detail.drug.id)
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
                    rawQuantity: drug ? drug.rawQuantity : 0,
                    error: ''
                }
            }))
            const data = drugCategories.map((drug: any) => {
                return { ...drug, checked: false }
            });
            const handleDrugs = data.map((drug: any) => {
                return selectDrugIds.includes(drug.id) ? {...drug, checked: true} : drug
            })
            setCloneDrugs(handleDrugs)
            setDrugs(handleDrugs)
        }
    }, [drugCategories, state])

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

    const onSubmit = (data: EditExportForm) => {
        console.log(selectedDrugs);
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
            refundAndCreate.mutate({
                id: selectedExport,
                customer: {
                    name: watch('name'),
                    phoneNumber: watch('phoneNumber'),
                    address: address,
                    gender: watch('gender') 
                },
                type: 2,
                staffId: staff.id,
                exportDate: data.exportDate,
                note: data.note,
                exportDetails: selectedDrugs.map(drug => {
                    return { drugId: drug.id, quantity: drug.exportQuantity}
                })
            })
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
        console.log('quantity', drugCategory.rawQuantity, '---- export quantity', drugCategory.exportQuantity)
        if (drugCategory.exportQuantity > drugCategory.rawQuantity) {
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
            <ConfirmDialog
                content="Vui lòng cân nhắc trước khi hoàn đơn thuốc."
                title="Bạn có thật sự muốn hoàn đơn toàn bộ đơn thuốc này không?"
                { ...props }
            />
            <Paper sx={{ px: 6, py: 4, flex: 3 }}>
                <Typography variant="h4" gutterBottom mb='20px'>
                    Thông tin bán hàng
                </Typography>
                {
                    state.exportTodayIndex.export.type === 1
                    ?
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Grid container spacing={1.5} width='30%' sx={{ flex: 2 }}>
                            <Grid item xs={8} sm={12} sx={{ mt: -2 }}>
                                <Typography
                                    variant="subtitle2"
                                >
                                    <Typography display="inline" sx={{ fontWeight: 'bold' }}>
                                        Mã phiếu:
                                    </Typography>
                                        <Typography display="inline" sx={{ textDecoration: 'none'}}>
                                            { ` ${state.exportTodayIndex.export.id}`}
                                        </Typography>
                                    </Typography>
                                    <Typography
                                        variant="subtitle2"
                                    >
                                    <Typography display="inline" sx={{ fontWeight: 'bold' }}>
                                        Mã đơn thuốc:
                                    </Typography>
                                        <Typography display="inline" sx={{ textDecoration: 'none'}}>
                                            { ` ${state.exportTodayIndex.export.prescriptionId}`}
                                        </Typography>
                                    </Typography>
                            </Grid>

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
                                    name="note"
                                    control={control}
                                    label="Ghi chú"
                                    placeholder='Nhập ghi chú'
                                />
                            </Grid>
                        
                        </Grid>

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
                    </Box>
                : 
                <Grid container spacing={1}>
                    <Grid item xs={8} sm={2}>
                        <Typography
                            variant="subtitle2" 
                        >
                        <Typography display="inline" sx={{ fontWeight: 'bold' }}>
                                Mã đơn:
                            </Typography>
                            <Typography display="inline" sx={{ textDecoration: 'none'}}>
                                { ` ${state.exportTodayIndex.export.id}`}
                            </Typography>
                        </Typography>        
                    </Grid>

                    <Grid item xs={8} sm={4}>
                        <TextShow title="Nhân viên tạo" data={state.exportTodayIndex.export.staff.name} />
                    </Grid>
                            
                    <Grid item xs={8} sm={3}>
                        <TextShow title="Thời gian" data={dayjs(state.exportTodayIndex.export.exportDate).format('HH:mm:ss')} />
                    </Grid>
                    
                    <Grid item xs={8} sm={3} sx={{ marginTop: -0.25 }}>
                        <Typography
                            variant="subtitle2"
                        >
                            <Typography display="inline" sx={{ fontWeight: 'bold' }}>
                                Loại:
                            </Typography>
                            <Typography display="inline" sx={{ textDecoration: 'none'}}>
                                <Chip
                                    sx={{ paddingLeft: 1}}
                                    //@ts-ignore
                                    label={getVairantLabelType(state.exportTodayIndex.export.type)}
                                    //@ts-ignore
                                    color={getVairantColorType(state.exportTodayIndex.export.type)}
                                    variant="outlined"
                                />
                            </Typography>
                        </Typography>       
                    </Grid>
                    
                    <Grid item xs={8} sm={4}>
                        <TextShow title="Mã đơn thuốc" data={state.exportTodayIndex.export.prescriptionId} />
                    </Grid>
                    
                    <Grid item xs={8} sm={4}>
                        <TextShow title="Khách hàng" data={state.exportTodayIndex.export.customer.name} />
                    </Grid>
                    
                    <Grid item xs={8} sm={4}>
                        <TextShow title="Số điện thoại" data={state.exportTodayIndex.export.customer.phoneNumber} />
                    </Grid>
                    
                    <Grid item xs={8} sm={12}>
                        <TextShow title="Địa chỉ" data={handleAddress(state.exportTodayIndex.export.customer.address)} />
                    </Grid>
                    
                    <Grid item xs={8} sm={12}>
                        <TextShow title="Ghi chú" data={state.exportTodayIndex.export.note} />
                    </Grid>
                </Grid>
                }
                    
                {
                    state.exportTodayIndex.export.type === 1
                        ?
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
                                        onClick={() => {openConfirmDialog(selectedExport.toString())}}
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
                :
                <Grid container spacing={2} marginTop={1}>
                    <Grid item xs={12} sm={12} container>
                        <Typography mb='20px' variant="subtitle2" sx={{ fontWeight: 'fontWeightBold', mt: 2, fontSize: 16 }}>
                            Chi tiết
                        </Typography>
                        <TableData
                            keyTable='export-detail'
                            rows={state.exportTodayIndex.exportDetail.map((exportDetail: ExportDetailRawData) => {
                                return {
                                    id: exportDetail.drug.id,
                                    drugName: exportDetail.drug.name,
                                    quantity: `${formatNumber(exportDetail.quantity)} ${exportDetail.drug.minimalUnit}`,
                                    unitPrice: formatCurrency(exportDetail.unitPrice),
                                    vat: `${exportDetail.vat*100}%`,
                                    expiryDate: formatDate(exportDetail.expiryDate)
                                }
                            })}
                            columns={columnsDetail}
                            isLoading={false}
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
                </Grid>
                }

                <div style={{ display: 'none' }}>
                    <ExportBill
                        //@ts-ignore
                        ref={componentRef}
                        exportData={exportData}
                        exportDetail={exportDetailData}
                    />
                </div>
                
            </Paper>
            <Box sx={{ flex: 1, px: 2, py: 1}}></Box>
            <TodaySales exportIdSelected={selectedExport} />
        </Box>
    )
}

export default EditSalesExport