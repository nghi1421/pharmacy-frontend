import { Box, Button, CircularProgress, Grid, InputAdornment, Paper, TextField, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import React, { useContext, useState } from "react";
import { Controller, PathString, useForm } from "react-hook-form";
import { getStaff } from "../../store/auth";
import { FormInputText } from "../../components/form/FormInputText";
import { FormInputDate } from "../../components/form/FormInputDate";
import TableExportSelectDrug from "../../components/table/TableExportSelectDrug";
import TableDrugCategories from "../../components/table/TableDrugCategories";
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from "@mui/styles";
import ReplayIcon from '@mui/icons-material/Replay';
import { FormInputDropdown } from "../../components/form/FormInputDropdown";
import { genders } from "../../utils/constants";
import Address from "../../components/Address";
import { useSearchCustomer } from '../../hooks/useCustomer'
import yup from "../../utils/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateExport } from "../../hooks/useExport";
import ExportBill from "./ExportBill";
import { enqueueSnackbar } from "notistack";
import dayjs from "dayjs";
import { TodaySales } from "../../components/TodaySales";
import { useSalesExport } from "../../hooks/useSalesExport";
import { useExportPdf } from "../../hooks/useExportPdf";
import { AuthContext } from "../../App";

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
    exportDetails: any[]
    staffId: number;
    type: number
}

export interface CustomerForm {
    name: string;
    phoneNumber: string;
    gender: string;
    email: PathString
    address: string;
}

const defaultValuesCustomer = {
    name: "",
    phoneNumber: "",
    email: '',
    gender: '1',
    address: ''
};

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
        .max(255, 'Tên khách hàng tối đa 255 kí tự'),
    phoneNumber: yup
        .string()
        .required('Số điện thoại bắt buộc.')
        // @ts-ignore
        .phoneNumber('Số điện thoại không hợp lệ.')
        .max(15, 'Số điện thoại tối đa 15 kí tự'),
    email: yup
        .string()
        .required('Email bắt buộc.')
        .email('Email không hợp lệ.')
        .max(255, 'Email tối đa 255 kí tự'),
    gender: yup
        .string()
        .required('Giới tính bắt buộc')
        .oneOf(['0', '1', '2'], 'Giới tinh không hợp lệ.'),
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
    { key: 'id', value: 'Mã thuốc' },
    { key: 'name', value: 'Tên thuốc' },
    { key: 'quantity', value: 'Số lượng tồn' },
    { key: 'formatedPrice', value: 'Đơn giá bán' },
    { key: 'minimalUnit', value: 'Đơn vị bán' },
    { key: 'vat', value: 'Thuế VAT' },
    { key: 'use', value: 'Công dụng' },
]

const SalesExport: React.FC = () => {
    const navigate = useNavigate()
    const { roleId } = useContext(AuthContext)
    const classes = useStyles();
    const staff = getStaff();
    const {
        handleSubmit: handleSubmitCustomer,
        control: customerControl,
        watch,
        setValue: setValueCustomer,
        clearErrors,
        reset: resetCustomer,
        formState: { errors }
    } = useForm<CustomerForm>({
        defaultValues: defaultValuesCustomer,
        resolver: yupResolver(customerFormValidate)
    });
    const setCustomer = (customer: CustomerForm) => {
        setValueCustomer('phoneNumber', customer.phoneNumber)
        setValueCustomer('name', customer.name)
        setValueCustomer('email', customer.email)
        setValueCustomer('gender', customer.gender)
        setAddress(customer.address)
        clearErrors('phoneNumber'),
            clearErrors('name')
        clearErrors('email')
    }
    const searchCustomer = useSearchCustomer(setCustomer)
    const { handleSubmit, control, reset, setValue } = useForm<ExportForm>({
        defaultValues: defaultValuesExport,
        resolver: yupResolver(exportValidate)
    });
    const [address, setAddress] = useState<string>('');

    const { exportData, exportDetailData, componentRef, setExportData, setExportDetailData } = useExportPdf()
    const createExport = useCreateExport(setExportData, setExportDetailData);
    const {
        handleSearchData,
        checkDrugCategory,
        unCheckDrugCategory,
        updateQuantity,
        setSelectedDrugs,
        setDrugs,
        setSearch,
        drugCategoryLoading,
        drugs,
        selectedDrugs,
        pay,
        search,
        cloneDrugs
    } = useSalesExport()

    const onSubmit = (data: ExportForm) => {
        handleSubmitCustomer((_) => { })()
        if (Object.keys(errors).length > 0) {
            return;
        }
        const isInvalid = selectedDrugs.length === 0
            || selectedDrugs.some(drug => drug.error.length > 0);

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
                    email: watch('email'),
                    address: address,
                    gender: watch('gender')
                },
                type: 1,
                staffId: staff.id,
                exportDate: data.exportDate,
                note: data.note,
                exportDetails: selectedDrugs.map(drug => {
                    return { drugId: drug.id, quantity: drug.exportQuantity }
                })
            })
            setSelectedDrugs([]),
                setDrugs(cloneDrugs)
            setSearch(''),
                reset()
            setValue('exportDate', new Date())
            resetCustomer()
            setAddress('')
        }
    };

    const backToTable = () => {
        navigate('/admin/exports')
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
                        <Grid item xs={8} sm={4}>
                            <FormInputText
                                size="small"
                                name="name"
                                control={customerControl}
                                label="Họ và tên"
                                placeholder='Nhập họ và tên'
                            />
                        </Grid>
                        <Grid item xs={8} sm={4}>
                            <FormInputText
                                size="small"
                                name="email"
                                control={customerControl}
                                label="Email"
                                placeholder='Nhập Email'
                            />
                        </Grid>

                        <Address gridSize={6} setAddress={setAddress} size='small' initAddress={address} />

                    </Grid>

                    <Grid container spacing={1.5} width='30%' sx={{ flex: 2 }}>
                        <Grid item xs={8} sm={12}>
                            <FormInputDropdown
                                name="gender"
                                control={customerControl}
                                label="Giới tính"
                                placeholder='Giới tính'
                                list={genders}
                            />
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
                </Box>


                <Grid container spacing={3} marginTop={2}>
                    <Grid item xs={12} sm={12} container>
                        <Typography mb='20px' variant="subtitle2" sx={{ fontWeight: 'fontWeightBold', mt: 2, fontSize: 20 }}>
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
                        <Typography variant="subtitle2" sx={{}}>
                            Tổng tiền (chưa tính VAT): {pay[0] ? pay[0].toLocaleString() : '_'} VND
                        </Typography>

                        <Typography variant="subtitle2" sx={{}}>
                            Tiền thuế VAT: {pay[1] ? pay[1].toLocaleString() : '_'} VND
                        </Typography>

                        <Typography variant="subtitle2" sx={{ color: "#148c07" }}>
                            Tổng tiền: {pay[2] ? pay[2].toLocaleString() : '_'} VND
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={12} container
                    >
                        <Box sx={{ display: 'flex', width: '100%', gap: 1 }}>
                            <Typography mb='20px' variant="subtitle2" sx={{ fontWeight: 'fontWeightBold', mt: 2, fontSize: 20 }}>
                                Danh mục thuốc
                            </Typography>
                            <TextField
                                onChange={handleSearchData}
                                classes={{ root: classes.customTextField }}
                                size='small'
                                sx={{ flexGrow: 1, my: 'auto', mr: '0%', ml: 2 }}
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
                                disabled={selectedDrugs.length === 0
                                    || selectedDrugs.some(drug => drug.error.length > 0)}
                                variant="contained"
                                color="primary"
                                sx={{
                                    height: '70%',
                                    m: 'auto',
                                    textTransform: 'none',
                                }}
                                onClick={handleSubmit(onSubmit)}
                            >
                                Tạo phiếu & Xuất hóa đơn
                            </Button>

                            {
                                roleId === 1
                                    ?
                                    <>
                                        <Button
                                            variant='contained'
                                            color="success"
                                            aria-label="Delete"
                                            sx={{
                                                height: '70%',
                                                m: 'auto',
                                                textTransform: 'none',
                                            }}
                                            onClick={() => { }}
                                        >
                                            <ReplayIcon />
                                            Làm mới
                                        </Button>

                                        <Button
                                            variant="contained"
                                            color="error"
                                            sx={{
                                                height: '70%',
                                                m: 'auto',
                                                textTransform: 'none',
                                            }}
                                            onClick={backToTable}
                                        >
                                            Quay về
                                        </Button>
                                    </>
                                    : <></>
                            }

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
                        //@ts-ignore
                        ref={componentRef}
                        exportData={exportData}
                        exportDetail={exportDetailData}
                    />
                </div>

            </Paper>
            <Box sx={{ flex: 1, px: 2, py: 1 }}></Box>
            <TodaySales />
        </Box>
    )
}

export default SalesExport