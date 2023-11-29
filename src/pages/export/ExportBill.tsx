import { Grid, Paper, Typography } from "@mui/material";
import { forwardRef } from "react";
import TableData from "../../components/table/TableData";
import { ExportData, ExportDetailPdf } from "../../types/ExportType";
import dayjs from "dayjs";

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

const ExportBill: React.FC<ExportPDFProps> = forwardRef((props, ref) => {

    return (
      <div ref={ref} style={{ padding: 4, margin: 4 }}>
        {
          props.exportData && props.exportDetail 
            ?
            <Paper sx={{ px: 6, py: 4, width: 800 }}>
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
                        {`Thời gian: ${props.exportData.exportDate}` }
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

export default ExportBill