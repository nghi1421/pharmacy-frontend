import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { FormInputText } from "../../components/form/FormInputText";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "../../utils/yup";
import { SelectableTable } from "../../components/SelectableTable";
import { ModalComponent } from "../../components/Modal";
import { useEffect, useState } from "react";
import { useSeachTrouble } from "../../hooks/useTrouble";
import { InventoryImport } from "../../components/InventoryImportRow";
import { TextShow } from "../../components/TextShow";
import { Error } from "@mui/icons-material";
import { FormInputDate } from "../../components/form/FormInputDate";

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
    const [provider, setProvider] = useState<any>(null)
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
        searchTrouble.mutate(data)
        setValue('batchId', data.batchId)
        setValue('drugId', data.drugId)
    }

    const [rowsData, setRowsData] = useState<any[]>([])
    useEffect(() => {
        if (searchTrouble.data) {
            //@ts-ignore
            setRowsData(searchTrouble.data.historySales)
            //@ts-ignore
            setInventoryImports(searchTrouble.data.inventoryImports)
            //@ts-ignore
            setProvider(searchTrouble.data.provider)
            setChange(Math.random())
        }
    }, [searchTrouble.data])
    return (
        <Box sx={{ display: 'flex', gap: 3, flexDirection: 'column' }}>
            <ModalComponent
                title='Trả thuốc'
                initOpen={openModal}
                
                handleClose={() => setOpenModal(false)}
                children={<RecoveryDrugForm/>}
            ></ModalComponent>
            <Paper sx={{ px: 3, py: 2  }}>
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
                                    <TextShow title="Mã thuốc" data={watch('drugId').toString()} />
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
                                        onClick={handleSubmit(onSubmit)}
                                    >
                                        Tạo sự cố
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                        <Paper sx={{ px:3, py: 2 }}>
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
                            setItem={(row) => {alert(row)}}
                            rows={rowsData}
                            openModal={() => { setOpenModal(true) }}
                        ></SelectableTable>
                    </Paper>
                    :<>No data found</>
        }
        </Box>
    )
    
}

const RecoveryDrugForm = () => {
    const {
        handleSubmit,
        control,
    } = useForm<TroubleForm>({
        resolver: yupResolver(troubleForm)
    });

    return (
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
                label="Mã thuốc"
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
                // onClick={handleSubmit(onSubmit)}
            >
                Trả thuốc
            </Button>
        </Grid>

    </Grid>
    )
}

export default TroublePage;