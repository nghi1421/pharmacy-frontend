import { Box, Grid, Paper, Typography } from "@mui/material"
import { useLocation } from "react-router-dom"
import { InfoBox } from "../../components/box/InfoBox"
import { Item } from "../../types/props/FormInputListProps"

const staffRows: Item[] = [
    {value: 'id', label: 'Mã nhân viên'},
    {value: 'name', label: 'Tên nhân viên'},
    {value: 'phoneNumber', label: 'Số điện thoại'},
    {value: 'email', label: 'Email'},
    {value: 'address', label: 'Địa chỉ'},
]

const customerRows: Item[] = [
    {value: 'id', label: 'Mã khách hàng'},
    {value: 'name', label: 'Tên khách hàng'},
    {value: 'phoneNumber', label: 'Số điện thoại'},
    {value: 'gender', label: 'Giới tính'},
    {value: 'address', label: 'Địa chỉ'},
]

const DetailPage = () => {
    const { state } = useLocation()
    console.log(state.exportData.exportDetail)
    return (
        <Paper sx={{ px: 6, py: 4 }}>
            <Typography variant="h4" gutterBottom mb='20px'>
                Thông tin phiếu xuất hàng
            </Typography>
            <Grid container spacing={3} >
                <Grid item xs={8} sm={6} sx={{ pb: 2 }}>
                    <InfoBox
                        data={state.exportData.export.staff}
                        rows={staffRows}
                        title='Thông tin nhân viên'
                    />
                </Grid>
            <Grid item xs={8} sm={6} sx={{ pb: 2 }}>
                    <InfoBox
                        data={state.exportData.export.customer}
                        rows={customerRows}
                        title='Thông tin khách hàng'
                    />
                </Grid>    
                <Grid container spacing={3} marginTop={2}>
                    <Grid item xs={12} sm={12} container>
                        <Typography mb='20px' variant="subtitle2" sx={{ fontWeight: 'fontWeightBold', mt: 2, fontSize: 16 }}>
                            Thuốc đã chọn
                        </Typography>
                        {/* <TableExportSelectDrug
                            rows={selectedDrugs}
                            tooltip='Nhấn để bỏ chọn thuốc'
                            keyTable='selected-drug-export-category-table-key'
                            action={unCheckDrugCategory}
                            update={updateQuantity}
                        />  */}
                    </Grid>

                    <Grid item xs={12} sm={12} container 
                        sx={{
                            display: 'flex',
                            justifyContent: "end",
                            gap: 4
                        }}
                    >
                        <Typography variant="subtitle2" sx={{  }}>
                            Tổng tiền (chưa tính VAT):
                            {state.exportData.export.totalPrice }
                        </Typography>

                        <Typography variant="subtitle2" sx={{  }}>
                            Tiền thuế VAT:
                            {state.exportData.export.vat}
                        </Typography>

                        <Typography variant="subtitle2" sx={{ color: "#148c07"  }}>
                            Tổng tiền: { state.exportData.export.totalPriceWithVat }
                        </Typography>
                    </Grid>
                
                </Grid>
            </Grid>
        </Paper>
    )
}

export default DetailPage