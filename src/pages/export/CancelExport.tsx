import { Box, Button, CircularProgress, Grid, InputAdornment, Paper, TextField, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
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
import yup from "../../utils/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateCancelExport } from "../../hooks/useExport";
import { useReactToPrint } from "react-to-print";
import { enqueueSnackbar } from "notistack";
import { ExportData, ExportDetailPdf } from "../../types/ExportType";
import dayjs from "dayjs";

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

export interface CancelExportForm {
    note: string;
    exportDate: Date
    exportDetails: any[]
    staffId: number;
    type: number
}

const defaultValuesExport = {
    note: '',
    exportDate: new Date(dayjs().format('YYYY-MM-DD HH:mm:ss')),
    prescriptionId: '',
    exportDetails: [],
    staffId: 0,
    type: 1,
}

 // @ts-ignore
const exportValidate: Yup.ObjectSchema<CancelExportForm> = yup.object({
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

const CancelExport: React.FC = () => {
    const navigate = useNavigate()
    const classes = useStyles();
    const staff = getStaff();
    const { isLoading: drugCategoryLoading, data: drugCategories, refetch } = useGetDataDrugCategories()
    
    const [drugs, setDrugs] = useState<any[]>([])
    const [cloneDrugs, setCloneDrugs] = useState<any[]>([])
    const [selectedDrugs, setSelectedDrugs] = useState<any[]>([])
    const [pay, setPay] = useState<number[]>([0 , 0, 0])
    const { handleSubmit, control, reset } = useForm<CancelExportForm>({
        defaultValues: defaultValuesExport,
        resolver: yupResolver(exportValidate)
    });
    const [search, setSearch] = useState<string>('')
    const [exportData, setExportData] = useState<ExportData | null>(null)    
    const [exportDetailData, setExportDetailData] = useState<ExportDetailPdf[] | null>(null)    
    const createExport = useCreateCancelExport(setExportData, setExportDetailData);
    let componentRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

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
        if (drugCategories && drugCategories.length > 0) {
            const data = drugCategories.map((drug: any) => {
                return { ...drug, checked: false }
            });
            setDrugs(data)
            setCloneDrugs(data)
        }
    }, [drugCategories])

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

    const onSubmit = (data: CancelExportForm) => {
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
                type: 0,
                staffId: staff.id,
                exportDate: data.exportDate,
                note: data.note,
                exportDetails: selectedDrugs.map(drug => {
                    return { drugId: drug.id, quantity: drug.exportQuantity}
                })
            })
            setSelectedDrugs([]),
            setDrugs(cloneDrugs)
            setSearch(''),
            reset()
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

    const backToTable = () => {
        navigate('/admin/exports')
    }

    return (
        <Paper sx={{ px: 6, py: 4 }}>
            <Typography variant="h4" gutterBottom mb='20px'>
                Thông tin phiếu hủy hàng
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Grid container spacing={1.5} width='30%' sx={{ flex: 2 }}>
                    <Grid item xs={8} sm={12}>
                        <FormInputDate
                            name="exportDate"
                            control={control}
                            label="Ngày hủy"
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
                            Tạo phiếu & Xuất hóa đơn
                        </Button>

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
        </Paper>
    )
}

export default CancelExport