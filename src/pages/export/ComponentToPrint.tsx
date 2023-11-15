import { Grid, Paper, Typography } from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import { InfoBox } from "../../components/box/InfoBox";
import TableData from "../../components/table/TableData";
import { Item } from "../../types/props/FormInputListProps";
import { ExportData, ExportDetailData, ExportDetailPdf, ExportPdfData } from "../../types/ExportType";
import globalEvent from "../../utils/emitter";
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
  { key: 'price', value: 'Đơn giá' },
  { key: 'total', value: 'Thành tiền'},
]

const ComponentToPrint = forwardRef((props, ref) => {
  const [exportData, setExportData] = useState<ExportData | null>(null)
  const [exportDetailData, setExportDetailData] = useState<ExportDetailPdf[] | null>(null)
  useEffect(() => {
    if (exportData && exportDetailData) {
      globalEvent.off('send.export-pdf-data')
    }
    else {
      globalEvent.on('send.export-pdf-data', (payload: ExportPdfData) => {
          setExportData(payload.exportData)
          setExportDetailData(payload.exportDetail)
      }) 
    }
  })
    return (
      <div ref={ref} style={{ padding: 4, margin: 4 }}>
        {
          exportData && exportDetailData 
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
                        { ` ${exportData.id}`}
                    </Typography>
                </Typography>
                    <Typography variant="subtitle2">
                        {`Thời gian: ${dayjs().format('DD/MM/YYYY HH:mm:ss')}` }
                    </Typography>
                    <Typography variant="subtitle2">
                        {`Nhân viên: ${exportData.staff.id} - ${exportData.staff.name}` }
                    </Typography>
                    <Typography variant="subtitle2">
                        {`Khách hàng: ${exportData.customer.name}` }
                    </Typography>
                    <Typography variant="subtitle2">
                          {`SĐT: ${exportData.customer.phoneNumber}` }
                      </Typography>
                  </Grid>
                    
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} container>
                        <Typography mb='20px' variant="subtitle2" sx={{ fontWeight: 'fontWeightBold', mt: 2, fontSize: 16 }}>
                            Chi tiết
                        </Typography>
                        
                        <TableData
                            keyTable='export-detail'
                            rows={exportDetailData}
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
                            {`Tổng tiền (chưa tính VAT): ${exportData.totalPrice}` }
                        </Typography>

                        <Typography variant="subtitle2">
                            {`Tiền thuế VAT: ${exportData.vat}`}
                        </Typography>

                        <Typography variant="subtitle2">
                            {`Tổng tiền: ${exportData.totalPriceWithVat}` }
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