import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { FormInputText } from "../../components/form/FormInputText";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "../../utils/yup";
import { SelectableTable } from "../../components/SelectableTable";
import { ModalComponent } from "../../components/Modal";
import React, { useEffect, useState } from "react";
import { useSeachTrouble } from "../../hooks/useTrouble";
import { InventoryImport } from "../../components/InventoryImportRow";
import { TextShow } from "../../components/TextShow";
import { Error } from "@mui/icons-material";
import { FormInputDate } from "../../components/form/FormInputDate";
import { DrugCategory } from "../../types/DrugCategory";
import { FormInputNumber } from "../../components/form/FormInputNumber";
import { Trouble } from "../../types/Trouble";
import { enqueueSnackbar } from "notistack";
import { formatDateTime } from "../../utils/format";

export interface TroubleForm {
    batchId: string
    drugId: number
}


export interface CreateTroubleForm {
    batchId: string
    drugId: number
    note: string
    troubleDate: Date
}

const defaultValues = {
    batchId: '',
    drugId: 0,
    note: '',
    troubleDate: new Date(),
}

// @ts-ignore
const troubleForm: Yup.ObjectSchema<TroubleForm> = yup.object({
    batchId: yup
        .string()
        .required('Mã lô thuốc bắt buộc'),
    drugId: yup
        .number()
        .required()
        .typeError('Mã danh mục thuốc bắt buộc'),
});

const now = new Date()

// @ts-ignore
const createTroubleForm: Yup.ObjectSchema<CreateTroubleForm> = yup.object({
    batchId: yup
        .string()
        .required('Mã lô thuốc bắt buộc'),
    drugId: yup
        .number()
        .required()
        .typeError('Mã danh mục thuốc bắt buộc'),
    note: yup
        .string(),
    troubleDate: yup
        .date()
        .max(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59), 'Ngày tạo sự cố không thể sau hôm nay.')
        .required()
        .typeError('Ngày sự cố không hợp lệ.')
});

const TroublePage: React.FC<{}> = () => {
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [change, setChange] = useState<number>(Math.random())
    const [inventoryImports, setInventoryImports] = useState<any[]>([])
    const [drugCategory, setDrugCategory] = useState<DrugCategory>()
    const [provider, setProvider] = useState<any>(null)
    const [item, setItem] = useState<any>()
    const [trouble, setTrouble] = useState<Trouble | null>(null)
    const searchTrouble = useSeachTrouble()
    const {
        handleSubmit,
        control,
    } = useForm<TroubleForm>({
        resolver: yupResolver(troubleForm)
    });

    const {
        handleSubmit: handleSumitCreateTroubleForm,
        control: troubleControl,
        setValue,
        watch
    } = useForm<CreateTroubleForm>({
        defaultValues: defaultValues,
        resolver: yupResolver(createTroubleForm)
    });

    const onSubmit = (data: TroubleForm) => {
        setTrouble(null)
        searchTrouble.mutate(data)
        setValue('batchId', data.batchId)
        setValue('drugId', data.drugId)
    }

    const handleOpenModal = () => {
        if (trouble) {
            setOpenModal(true)
        }
        else {
            enqueueSnackbar('Vui lòng tạo sự cố.', {
                variant: 'warning',
                autoHideDuration: 3000
            })
        }
    }

    const sendNotification = (list: number[]) => {
        if (trouble) {
            if (list.length > 0) {
                enqueueSnackbar('Gửi thông báo thành công.', {
                    variant: 'success',
                    autoHideDuration: 3000
                })
            }
            else {
                enqueueSnackbar('Vui lòng chọn phiếu mua hàng gửi thông báo', {
                    variant: 'warning',
                    autoHideDuration: 3000
                })
            }
        }
        else {
            enqueueSnackbar('Vui lòng tạo sự cố.', {
                variant: 'warning',
                autoHideDuration: 3000
            })
        }
    }
    const onSubmitCreateTrouble = (data: CreateTroubleForm) => {
        alert(JSON.stringify(data));
    }
    const [rowsData, setRowsData] = useState<any[]>([])
    useEffect(() => {
        if (searchTrouble.data) {
            //@ts-ignore
            if (searchTrouble.data.trouble) {
                //@ts-ignore
                setRowsData(searchTrouble.data.historySales)
                //@ts-ignore
                setInventoryImports(searchTrouble.data.inventoryImports)
                //@ts-ignore
                setProvider(searchTrouble.data.provider)
                //@ts-ignore
                setDrugCategory(searchTrouble.data.drugCategory)
                //@ts-ignore
                setTrouble(searchTrouble.data.trouble)
                setChange(Math.random())
            }
            else {
                //@ts-ignore
                setRowsData(searchTrouble.data.historySales)
                //@ts-ignore
                setInventoryImports(searchTrouble.data.inventoryImports)
                //@ts-ignore
                setProvider(searchTrouble.data.provider)
                //@ts-ignore
                setDrugCategory(searchTrouble.data.drugCategory)
                setChange(Math.random())
            }
        }
    }, [searchTrouble.data])
    return (
        <Box sx={{ display: 'flex', gap: 3, flexDirection: 'column' }}>
            <ModalComponent
                title='Trả thuốc'
                initOpen={openModal}
                handleClose={() => setOpenModal(false)}
                children={
                    <RecoveryDrugForm
                        item={item}
                        //@ts-ignore
                        drugCategory={drugCategory}
                        closeModal={() => setOpenModal(false)}
                    />
                }
            ></ModalComponent>
            <Paper sx={{ px: 3, py: 2 }}>
                <Typography
                    variant="h4"
                    fontWeight='500'
                    marginBottom={2}
                >
                    Sự cố
                </Typography>

                <Grid spacing={2} container>
                    <Grid item xs={8} sm={3}>
                        <FormInputText
                            name="batchId"
                            control={control}
                            label="Mã lô thuốc"
                            placeholder='Nhập mã lô thuốc'
                        />
                    </Grid>
                    <Grid item xs={8} sm={3}>
                        <FormInputText
                            name="drugId"
                            control={control}
                            label="Mã danh mục thuốc"
                            placeholder='Nhập mã danh mục thuốc'
                        />
                    </Grid>
                    <Grid item xs={8} sm={3}>
                        <Button
                            variant="contained"
                            color="success"
                            sx={{
                                height: 40,
                                m: 'auto',
                                textTransform: 'none',
                            }}
                            onClick={handleSubmit(onSubmit)}
                        >
                            Tìm kiếm
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
            {
                searchTrouble.data ?
                    <Paper>
                        {
                            trouble
                                ?
                                <Box >
                                    <Typography
                                        variant="h4"
                                        fontWeight='500'
                                        marginBottom={2}
                                    >
                                        Thông tin sự cố
                                    </Typography>
                                    <Grid spacing={2} container marginTop={2} sx={{ px: 2 }}>
                                        <Grid item xs={8} sm={6} sx={{ my: 'auto' }}>
                                            <TextShow title="Mã lô thuốc" data={watch('batchId')} />
                                            <TextShow title="Tên thuốc" data={drugCategory?.name} />
                                            <TextShow title="Nhân viên tạo" data={trouble.staff.name} />
                                            <TextShow title="Thời gian tạo" data={formatDateTime(trouble.troubleDate)} />
                                            <TextShow title="Ghi chú" data={trouble.note ?? '_'} />
                                        </Grid>
                                    </Grid>
                                </Box>
                                :
                                <Box >
                                    <Typography
                                        sx={{ bgcolor: '#f0f9ff', p: 2, borderRadius: 2, my: 'auto' }}
                                        variant="body2"
                                        fontWeight={600}
                                        marginBottom={2}
                                    >
                                        <Error sx={{ mr: 1 }}></Error>
                                        Báo cáo sự cố chưa được tạo. Vui lòng ấn tạo sự cố để hủy ngay lập tức tồn kho thuốc lỗi.
                                    </Typography>
                                    <Grid spacing={2} container marginTop={2} sx={{ px: 2 }}>
                                        <Grid item xs={8} sm={2} sx={{ my: 'auto' }}>
                                            <TextShow title="Mã lô thuốc" data={watch('batchId')} />
                                        </Grid>
                                        <Grid item xs={8} sm={2} sx={{ my: 'auto' }}>
                                            <TextShow title="Tên thuốc" data={drugCategory?.name} />
                                        </Grid>
                                        <Grid item xs={8} sm={3}>
                                            <FormInputDate
                                                name="troubleDate"
                                                control={troubleControl}
                                                label="Ngày tạo sự cố"
                                                placeholder='x'
                                                withTime={true}
                                            />
                                        </Grid>
                                        <Grid item xs={8} sm={3}>
                                            <FormInputText
                                                name="note"
                                                control={troubleControl}
                                                label="Ghi chú"
                                                placeholder='Nhập ghi chú'
                                            />
                                        </Grid>
                                        <Grid item xs={8} sm={3}>
                                            <Button
                                                variant="contained"
                                                color="success"
                                                sx={{
                                                    height: 40,
                                                    m: 'auto',
                                                    textTransform: 'none',
                                                }}
                                                onClick={handleSumitCreateTroubleForm(onSubmitCreateTrouble)}
                                            >
                                                Tạo sự cố
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                        }
                        <Paper sx={{ px: 3, py: 2 }}>
                            <Grid container spacing={2} >
                                <Grid item xs={8} sm={6}>
                                    <Typography
                                        variant="h5"
                                        marginBottom={2}
                                        fontWeight='500'
                                    >
                                        Thông tin công ty dược
                                    </Typography>
                                    <TextShow title="Mã công ty dược" data={provider?.id} />
                                    <TextShow title="Tên" data={provider?.name} />
                                    <TextShow title="Số điện thoại" data={provider?.phoneNumber} />
                                    <TextShow title="Email" data={provider?.email} />
                                    <TextShow title="Địa chỉ" data={provider?.address} />
                                </Grid>
                                <Grid item xs={8} sm={6}>
                                    <Typography
                                        variant="h5"
                                        marginBottom={2}
                                        fontWeight='500'
                                    >
                                        Tồn kho
                                    </Typography>

                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        backgroundColor: 'lightBlue',
                                        p: 1,
                                        borderRadius: 1,
                                    }}>
                                        <Typography sx={{ flex: 1, textAlign: 'left', fontWeight: 600 }}>Mã phiếu nhập</Typography>
                                        <Typography sx={{ flex: 1, textAlign: 'left', fontWeight: 600 }}>Thời gian nhập</Typography>
                                        <Typography sx={{ flex: 1, textAlign: 'left', pr: 1, fontWeight: 600 }}>Tồn</Typography>
                                    </Box>
                                    <Box>
                                        {
                                            inventoryImports.map(inventoryImport =>
                                                <InventoryImport inventoryImport={inventoryImport} />
                                            )
                                        }
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>
                        <SelectableTable
                            key={change}
                            sendNotification={sendNotification}
                            setItem={(row: any) => { setItem(row) }}
                            rows={rowsData}
                            openModal={() => { handleOpenModal() }}
                        ></SelectableTable>
                    </Paper>
                    : <>No data found</>
            }
        </Box>
    )

}

export interface BackDrugCategory {
    quantity: number
    recoveryTime: Date
}

// @ts-ignore
const backdrugCategory: Yup.ObjectSchema<BackDrugCategory> = yup.object({
    quantity: yup
        .number()
        .required()
        .typeError('Mã danh mục thuốc bắt buộc'),
    recoveryTime: yup
        .date()
        .max(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59), 'Thời gian trả thuốc không thể sau hôm nay.')
        .typeError('Thời gian trả thuốc không hợp lệ.')
});

interface RecoveryDrugProps {
    item: any
    drugCategory: DrugCategory
    closeModal: () => void
}

const RecoveryDrugForm: React.FC<RecoveryDrugProps> = ({ item, drugCategory, closeModal }) => {
    const {
        handleSubmit,
        control,
        reset,
        watch
    } = useForm<BackDrugCategory>({
        defaultValues: {
            quantity: 0,
            recoveryTime: new Date(),
        },
        resolver: yupResolver(backdrugCategory)
    });
    const [errorMessage, setErrorMessage] = useState<string>('')
    const refreshForm = () => {
        reset();
    }

    const onSubmit = (data: BackDrugCategory) => {
        alert(data.quantity)
    }
    const getError = () => {
        const quantity = watch('quantity')

        if (quantity) {
            if (quantity < 0) {
                setErrorMessage('Số lượng trả phải lớn hơn bằng 0.')
            }
        }
        else {
            setErrorMessage('Số lượng trả bắt buộc.')
        }
    }
    return (
        <Grid spacing={2} container marginTop={1}>
            <Grid item xs={8} sm={12}>
                <TextShow title="Mã phiếu xuất" data={item.exportId} />
                <TextShow title="Tên khách hàng" data={item.name} />
                <TextShow title="Số điện thoại" data={item.phoneNumber} />
                <TextShow title="Email" data={item.email} />
                <TextShow title="Địa chỉ" data={item.address} />
            </Grid>
            <Grid item xs={8} sm={4}>
                <FormInputNumber
                    name="quantity"
                    control={control}
                    label="Số lượng trả"
                    suffix={' ' + drugCategory.minimalUnit}
                    placeholder='Nhập số lượng trả'
                />
            </Grid>
            <Grid item xs={8} sm={4}>
                <FormInputDate
                    name="recoveryTime"
                    control={control}
                    label="Thời gian thu hồi"
                    placeholder='x'
                    withTime={true}
                />
            </Grid>
            <Grid item xs={8} sm={12} sx={{ display: 'flex', justifyContent: 'end', gap: 2 }}>
                <Button
                    color='success'
                    variant="contained"
                    sx={{ textTransform: 'none' }}
                    onClick={handleSubmit(onSubmit)}
                >
                    Cập nhật
                </Button>

                <Button
                    color='primary'
                    variant="outlined"
                    sx={{ textTransform: 'none' }}
                    onClick={() => refreshForm()}
                >
                    Làm mới
                </Button>

                <Button
                    color='error'
                    variant="outlined"
                    sx={{ textTransform: 'none' }}
                    onClick={() => closeModal()}
                >
                    Quay về
                </Button>
            </Grid>

        </Grid>
    )
}

export default TroublePage;