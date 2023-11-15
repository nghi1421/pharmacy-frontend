import { Button, Grid, Paper, Typography } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom"
import { InfoBox } from "../../components/box/InfoBox"
import { Item } from "../../types/props/FormInputListProps"
import TableData from "../../components/table/TableData"
import { ErrorMessage } from "@hookform/error-message"
import { FormInputCurrency } from "../../components/form/FormInputCurrency"
import { FormInputDate } from "../../components/form/FormInputDate"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import yup from "../../utils/yup"

const staffRows: Item[] = [
    {value: 'id', label: 'Mã nhân viên'},
    {value: 'name', label: 'Tên nhân viên'},
    {value: 'phoneNumber', label: 'Số điện thoại'},
    {value: 'email', label: 'Email'},
    {value: 'address', label: 'Địa chỉ'},
]

const providerRows: Item[] = [
    {value: 'id', label: 'Mã công ty dược'},
    {value: 'name', label: 'Tên công ty dược'},
    {value: 'phoneNumber', label: 'Số điện thoại'},
    {value: 'email', label: 'Email'},
    {value: 'address', label: 'Địa chỉ'},
]

const columns = [
    { key: 'drugName', value: 'Tên thuốc' },
    { key: 'quantity', value: 'Số lượng nhập'},
    { key: 'unit', value: 'Đơn vị nhập'},
    { key: 'unitPrice', value: 'Đơn giá nhập' },
    { key: 'vat', value: 'Thuế VAT'},
    { key: 'expiryDate', value: 'Hạn sử dụng'},
    { key: 'batchId', value: 'Mã lô thuốc'},
]

interface EditFormImport {
    maturityDate: Date,
    paid: number,
    id: number;
}

 // @ts-ignore
const importValidate: Yup.ObjectSchema<ImportForm> = yup.object({
    paid: yup
        .number()
        .typeError('Số tiền đã thanh toán bắt buộc.')
        .required('Số tiền đã thanh toán bắt buộc.'),
    maturityDate: yup
        .date()
        .typeError('Ngày đáo hạn bắt buộc.')
        .min(new Date(), 'Ngày đáo hạn phải sau hôm nay.'),
})

const DetailPage = () => {
    const { state } = useLocation()
    const navigate = useNavigate()
    const { handleSubmit, control, formState: { errors } } = useForm<EditFormImport>({
        defaultValues: {
            paid: state.importData.import.rawPaid,
            maturityDate: state.importData.import.rawMaturityDate,
            id: state.importData.import.id
        },
        resolver: yupResolver(importValidate)
    });

    const onSubmit = (data: EditFormImport) => {
        console.log('Submit here')
    }

    const backToTable = () => {
        navigate('/admin/imports')
    }
    return (
        <Paper sx={{ px: 6, py: 4 }}>
            <Typography variant="h4" gutterBottom mb='20px'>
                Thông tin phiếu nhập hàng
            </Typography>
            <Grid container spacing={3} >
                <Grid item xs={8} sm={3}>
                    <Typography>
                        <Typography display="inline" sx={{ fontWeight: 600 }}>
                            Mã phiếu nhập: 
                        </Typography>

                        <Typography display="inline" sx={{ pl:1, textDecoration: 'none'}}>
                            { state.importData.import.id}
                        </Typography>
                    </Typography>
                </Grid>    
                <Grid item xs={8} sm={4}>
                    <Typography>
                        <Typography display="inline" sx={{ fontWeight: 600 }}>
                            Ngày nhập: 
                        </Typography>

                        <Typography display="inline" sx={{ pl:1, textDecoration: 'none'}}>
                            { state.importData.import.importDate}
                        </Typography>
                    </Typography>
                </Grid>

                <Grid item xs={8} sm={3}>
                    <Typography>
                        <Typography display="inline" sx={{ fontWeight: 600 }}>
                            Ghi chú: 
                        </Typography>

                        <Typography display="inline" sx={{ pl:1, textDecoration: 'none'}}>
                            { state.importData.import.note}
                        </Typography>
                    </Typography>
                </Grid>

                <Grid item xs={8} sm={4}>
                    <FormInputCurrency
                        size='small'
                        control={control}
                        name='paid'
                        label='Đã thanh toán'
                        placeholder='Nhập số tiền đã thanh toán'
                    />
                    <ErrorMessage
                        errors={errors}
                        name="paid"
                        render={({ message }) =><Typography color='#d32f2f' sx={{ fontSize: 13, mt:0.5 }}>{message}</Typography>}
                    />
                </Grid>

                <Grid item xs={8} sm={4}>
                    <FormInputDate
                        size='small'
                        name="maturityDate"
                        control={control}
                        label="Ngày đáo hạn"
                        placeholder='x'
                    />
                </Grid>

                <Grid item xs={8} sm={6}>
                    <InfoBox
                        data={state.importData.import.staff}
                        rows={staffRows}
                        title='Thông tin nhân viên'
                    />
                    </Grid>
                <Grid item xs={8} sm={6}>
                    <InfoBox
                        data={state.importData.import.provider}
                        rows={providerRows}
                        title='Thông tin công ty dược'
                    />
                </Grid>   
                    
                <Grid container spacing={2} marginTop={1}>
                    <Grid item xs={12} sm={12} container>
                        <Typography mb='20px' variant="subtitle2" sx={{ fontWeight: 'fontWeightBold', mt: 2, fontSize: 16 }}>
                            Chi tiết nhập
                        </Typography>
                        <TableData
                            keyTable='import-detail'
                            rows={state.importData.importDetail}
                            columns={columns}
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
                            {`Tổng tiền (chưa tính VAT): ${state.importData.import.totalPrice}` }
                        </Typography>

                        <Typography variant="subtitle2" sx={{  }}>
                            {`Tiền thuế VAT: ${state.importData.import.vat}`}
                        </Typography>

                        <Typography variant="subtitle2" sx={{ color: "#148c07"  }}>
                            {`Tổng tiền: ${state.importData.import.totalPriceWithVat}` }
                        </Typography>
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
                            Cập nhật
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
            </Grid>
        </Paper>
    )
}

export default DetailPage