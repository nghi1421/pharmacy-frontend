import { Grid, Paper, Typography } from "@mui/material";
import { forwardRef } from "react";
import TableData from "../../components/table/TableData";
import { Item } from "../../types/props/FormInputListProps";
import { ExportData, ExportDetailPdf } from "../../types/ExportType";
import dayjs from "dayjs";

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

const columns = [
  { key: 'drugName', value: 'Tên thuốc' },
  { key: 'quantity', value: 'SL' },
  { key: 'unitPrice', value: 'Đơn giá' },
  { key: 'total', value: 'Thành tiền'},
]

interface ExportPDFProps {
    exportData: null | ExportData
    exportDetail: null | ExportDetailPdf[]
}

const ComponentToPrint: React.FC<ExportPDFProps> = forwardRef((props, ref) => {

    return (
      <div ref={ref} style={{ padding: 4, margin: 4 }}>
        {
          props.exportData && props.exportDetail 
            ?
            <Paper sx={{ px: 6, py: 4, width: 400 }}>
              <Typography variant="h5" fontWeight='bold' gutterBottom align="center" marginBottom={2}>
                  Hóa đơn bán hàng
              </Typography>
            <Grid container spacing={3} >
                <Grid item xs={12} sm={12} container 
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: "end",
                            gap: 1
                        }}
                >
                  <Typography
                    variant="subtitle2"
                  >
                    <Typography display="inline" sx={{ fontWeight: 'bold' }}>
                        ĐƠN HÀNG:
                    </Typography>
                    <Typography display="inline" sx={{ textDecoration: 'none'}}>
                        { ` ${props.exportData.id}`}
                    </Typography>
                </Typography>
                    <Typography variant="subtitle2">
                        {`Thời gian: ${dayjs().format('DD/MM/YYYY HH:mm:ss')}` }
                    </Typography>
                    <Typography variant="subtitle2">
                        {`Nhân viên: ${props.exportData.staff.id} - ${props.exportData.staff.name}` }
                    </Typography>
                    <Typography variant="subtitle2">
                        {`Khách hàng: ${props.exportData.customer.name}` }
                    </Typography>
                    <Typography variant="subtitle2">
                          {`SĐT: ${props.exportData.customer.phoneNumber}` }
                      </Typography>
                  </Grid>
                    
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} container>
                        <Typography mb='20px' variant="subtitle2" sx={{ fontWeight: 'fontWeightBold', mt: 2, fontSize: 16 }}>
                            Chi tiết
                        </Typography>
                        
                        <TableData
                            keyTable='export-detail'
                            rows={props.exportDetail}
                            columns={columns}
                            isLoading={false}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} container 
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: "end",
                            gap: 1
                        }}
                    >
                        <Typography variant="subtitle2">
                            {`Tổng tiền (chưa tính VAT): ${props.exportData.totalPrice}` }
                        </Typography>

                        <Typography variant="subtitle2">
                            {`Tiền thuế VAT: ${props.exportData.vat}`}
                        </Typography>

                        <Typography variant="subtitle2">
                            {`Tổng tiền: ${props.exportData.totalPriceWithVat}` }
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
            : 
            <>No export pdf</>
        }
      </div>
    );
})

export default ComponentToPrint