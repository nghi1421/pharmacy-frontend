import { Button, Grid, Paper, Typography } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom"
import { InfoBox } from "../../components/box/InfoBox"
import { Item } from "../../types/props/FormInputListProps"
import TableData from "../../components/table/TableData"

const staffRows: Item[] = [
    { value: 'id', label: 'Mã nhân viên' },
    { value: 'name', label: 'Tên nhân viên' },
    { value: 'phoneNumber', label: 'Số điện thoại' },
    { value: 'email', label: 'Email' },
    { value: 'address', label: 'Địa chỉ' },
]

const providerRows: Item[] = [
    { value: 'id', label: 'Mã công ty dược' },
    { value: 'name', label: 'Tên công ty dược' },
    { value: 'phoneNumber', label: 'Số điện thoại' },
    { value: 'email', label: 'Email' },
    { value: 'address', label: 'Địa chỉ' },
]

const columns = [
    { key: 'drugName', value: 'Tên thuốc' },
    { key: 'quantity', value: 'Số lượng nhập' },
    { key: 'unit', value: 'Đơn vị nhập' },
    { key: 'unitPrice', value: 'Đơn giá nhập' },
    { key: 'vat', value: 'Thuế VAT' },
    { key: 'expiryDate', value: 'Hạn sử dụng' },
    { key: 'batchId', value: 'Mã lô thuốc' },
]

const DetailPage = () => {
    const { state } = useLocation()
    const navigate = useNavigate()

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

                        <Typography display="inline" sx={{ pl: 1, textDecoration: 'none' }}>
                            {state.importData.import.id}
                        </Typography>
                    </Typography>
                </Grid>
                <Grid item xs={8} sm={4}>
                    <Typography>
                        <Typography display="inline" sx={{ fontWeight: 600 }}>
                            Ngày nhập:
                        </Typography>

                        <Typography display="inline" sx={{ pl: 1, textDecoration: 'none' }}>
                            {state.importData.import.importDate}
                        </Typography>
                    </Typography>
                </Grid>

                <Grid item xs={8} sm={3}>
                    <Typography>
                        <Typography display="inline" sx={{ fontWeight: 600 }}>
                            Ghi chú:
                        </Typography>

                        <Typography display="inline" sx={{ pl: 1, textDecoration: 'none' }}>
                            {state.importData.import.note}
                        </Typography>
                    </Typography>
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
                        <Typography variant="subtitle2" sx={{}}>
                            {`Tổng tiền (chưa tính VAT): ${state.importData.import.totalPrice}`}
                        </Typography>

                        <Typography variant="subtitle2" sx={{}}>
                            {`Tiền thuế VAT: ${state.importData.import.vat}`}
                        </Typography>

                        <Typography variant="subtitle2" sx={{ color: "#148c07" }}>
                            {`Tổng tiền: ${state.importData.import.totalPriceWithVat}`}
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