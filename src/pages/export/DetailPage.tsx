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

const customerRows: Item[] = [
    { value: 'id', label: 'Mã khách hàng' },
    { value: 'name', label: 'Tên khách hàng' },
    { value: 'phoneNumber', label: 'Số điện thoại' },
    { value: 'gender', label: 'Giới tính' },
    { value: 'address', label: 'Địa chỉ' },
]

const columns = [
    { key: 'drugName', value: 'Tên thuốc' },
    { key: 'quantity', value: 'Số lượng bán' },
    { key: 'unit', value: 'Đơn vị bán' },
    { key: 'unitPrice', value: 'Đơn giá' },
    { key: 'vat', value: 'Thuế VAT' },
    { key: 'expiryDate', value: 'Hạn sử dụng' },
]

const DetailPage = () => {
    const { state } = useLocation()
    const navigate = useNavigate()

    const backToTable = () => {
        navigate('/admin/exports')
    }
    return (
        <Paper sx={{ px: 6, py: 4 }}>
            <Typography variant="h4" gutterBottom mb='20px'>
                Thông tin phiếu xuất hàng
            </Typography>
            <Grid container spacing={3} >
                <Grid item xs={8} sm={2}>
                    <Typography>
                        <Typography display="inline" sx={{ fontWeight: 600 }}>
                            Mã phiếu xuất:
                        </Typography>

                        <Typography display="inline" sx={{ pl: 1, textDecoration: 'none' }}>
                            {state.exportData.export.id}
                        </Typography>
                    </Typography>
                </Grid>
                <Grid item xs={8} sm={3}>
                    <Typography>
                        <Typography display="inline" sx={{ fontWeight: 600 }}>
                            Ngày bán:
                        </Typography>

                        <Typography display="inline" sx={{ pl: 1, textDecoration: 'none' }}>
                            {state.exportData.export.exportDate}
                        </Typography>
                    </Typography>
                </Grid>

                <Grid item xs={8} sm={3}>

                    {
                        state.exportData.export.prescriptionId ?
                            <Typography>
                                <Typography display="inline" sx={{ fontWeight: 600 }}>
                                    Mã toa thuốc:
                                </Typography>

                                <Typography display="inline" sx={{ pl: 1, textDecoration: 'none' }}>
                                    {state.exportData.export.prescriptionId}
                                </Typography>
                            </Typography>
                            :
                            <></>
                    }
                </Grid>

                <Grid item xs={8} sm={3}>
                    <Typography>
                        <Typography display="inline" sx={{ fontWeight: 600 }}>
                            Ghi chú:
                        </Typography>

                        <Typography display="inline" sx={{ pl: 1, textDecoration: 'none' }}>
                            {state.exportData.export.note}
                        </Typography>
                    </Typography>
                </Grid>

                <Grid item xs={8} sm={6}>
                    <InfoBox
                        data={state.exportData.export.staff}
                        rows={staffRows}
                        title='Thông tin nhân viên'
                    />
                </Grid>
                <Grid item xs={8} sm={6}>
                    {
                        state.exportData.export.customer ?
                            <InfoBox
                                data={state.exportData.export.customer}
                                rows={customerRows}
                                title='Thông tin khách hàng'
                            />
                            : <></>
                    }

                </Grid>

                <Grid container spacing={2} marginTop={1}>
                    <Grid item xs={12} sm={12} container>
                        <Typography mb='20px' variant="subtitle2" sx={{ fontWeight: 'fontWeightBold', mt: 2, fontSize: 16 }}>
                            Chi tiết xuất
                        </Typography>
                        <TableData
                            keyTable='export-detail'
                            rows={state.exportData.exportDetail}
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
                            {`Tổng tiền (chưa tính VAT): ${state.exportData.export.totalPrice}`}
                        </Typography>

                        <Typography variant="subtitle2" sx={{}}>
                            {`Tiền thuế VAT: ${state.exportData.export.vat}`}
                        </Typography>

                        <Typography variant="subtitle2" sx={{ color: "#148c07" }}>
                            {`Tổng tiền: ${state.exportData.export.totalPriceWithVat}`}
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