import {
    Box,
    Divider,
    Grid,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
    Typography,
    styled,
    tableCellClasses
} from "@mui/material"
import React from "react"
import CloseIcon from '@mui/icons-material/Close';
import EmptyImage from '../../assets/images/no-data.jpg'
import { NumericFormat } from "react-number-format";
import { ColumnDrugCategory } from "../../pages/import/CreateImport";

interface TableProps<T> {
    rows: T[]
    keyTable: string
    action: (r: any) => void
    update: (r: any) => void
    tooltip: string
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: 'lightBlue',
        color: theme.palette.common.black,
        fontWeight: 600
    },
    [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
    },
}));

const CustomTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: 'white',
        color: theme.palette.common.black,
        fontWeight: 500
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        p: 1
    },
}));

const columns: ColumnDrugCategory[] = [
    { key: 'id', value: 'Mã thuốc'},
    { key: 'name', value: 'Tên thuốc' },
    { key: 'importId', value: 'Mã phiếu nhập' },
    { key: 'exportQuantity', value: 'Số lượng' },
    { key: 'unitPrice', value: 'Đơn giá bán' },
    { key: 'vat', value: 'Thuế VAT' },
    { key: 'use', value: 'Công dụng' },
]

const TableCancelExportDrug: React.FC<TableProps<any>> = ({ rows, keyTable, action, tooltip, update }) => {
 
  return (
      <TableContainer component={Paper}>
          <Divider /> 
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow key={keyTable}>
                        <StyledTableCell
                        align="left"
                        key={`header-cell-${keyTable}-1`}
                        >
                          </StyledTableCell>
                        {columns.map((column, index) => (
                          <StyledTableCell
                            align="left"
                            key={`header-cell-${keyTable}-${index}`}
                          >
                            {column.value}
                          </StyledTableCell>
                        ))}
                    </TableRow>
            {
                rows.length === 0
                ?
                    <TableRow key='empty-row'>
                        <TableCell key='cell-empty' colSpan={columns.length + 2}>
                        <Grid
                            container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                        >
                        <Grid item xs={3}>
                            <Box
                            component="img"
                            sx={{
                                height: 100,
                                width: 100,
                            }}
                            alt="No data."
                            src={EmptyImage}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Typography
                            variant="body1"
                            fontWeight='500'
                            
                            sx={{ opacity: '0.3', pb: 4 }}
                            >
                            Vui lòng chọn danh mục thuốc
                            </Typography>
                        </Grid>
                        </Grid>
                        </TableCell>
                    </TableRow>
                : ''
                }
            </TableHead>
                  <TableBody>
              {rows.map((row, rowIndex) => (

                      <TableRow
                            key={`${keyTable}-${rowIndex}`}
                            sx={{ 
                                '&:last-child td, &:last-child th': { border: 0 },
                                
                            }}
                        >
                        <Tooltip key={`tooltip-${rowIndex}`} title={tooltip} >
                              <TableCell
                                  sx={{ p: 0 }}
                                    align="left"
                                    key={`${rowIndex}-uncheck`}>
                                  <IconButton
                                      onClick={() => action(row)}
                                      sx={{ 
                                            '&:hover': {
                                                transition: "background 0.8s, color 0.8s",
                                                backgroundColor: "#FFFFFF",
                                                color: '#FFFFFF',
                                                '& .MuiSvgIcon-root': {
                                                    transition: "background 0.8s, color 0.8s",
                                                    color: '#e02424',
                                                    stroke: '#e02424',
                                                    fill: '#e02424',
                                                },
                                                
                                        },
                                        '& .MuiSvgIcon-root': {
                                                transition: "background 0.8s, color 0.8s",
                                                color: '#ff0000',
                                                stroke: '#ff0000',
                                                fill: '#ff0000',
                                            },
                                        }}>
                                      <CloseIcon
                                        
                                      ></CloseIcon>
                                    </IconButton>
                                </TableCell>
                        </Tooltip>
                        
                          <CustomTableCell
                                align="left"
                                key={`${rowIndex}-${keyTable}-0`}>
                                {row['id']}
                          </CustomTableCell>

                          <CustomTableCell
                                align="left"
                                key={`${rowIndex}-${keyTable}}-${keyTable}-1`}>
                                {row['name']}
                          </CustomTableCell>

                        <CustomTableCell align="left" key={`3-${rowIndex}-importId`}>
                            <TextField
                                size='small'
                                value={row['importId']}
                                fullWidth
                                label='Mã mã phiếu nhập' 
                                variant="outlined"
                                onChange={(e) => (update({...row, importId: e.target.value as string}))}
                                placeholder='Nhập mã phiếu nhập'
                                helperText={row.errors[0] ? row.errors[0] : null}
                                error={!!row.errors[0]}
                            />
                        </CustomTableCell>
                          
                          <CustomTableCell  align="left" key={`2-${rowIndex}-${keyTable}-exportQuantity`}>
                                <NumericFormat 
                                    size='small'
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        fontSize: '13px',
                                        "& input::placeholder": {
                                            fontSize: "13px"
                                        },
                                        "& input::label": {
                                            fontSize: "13px"
                                        }
                                    }}
                                    value={row['exportQuantity']}
                                    defaultValue={0}
                                    error={row.errors[1]}
                                    label='Số lượng'
                                    placeholder='Nhập số lượng'
                                    thousandSeparator=","
                                    customInput={TextField}
                                    onValueChange={({ value }) => update({...row, exportQuantity: parseInt(value)})}
                                />
                                <Typography color='#d32f2f' sx={{ fontSize: 13, mt:0.5 }}>{row.errors[1]}</Typography>
                          </CustomTableCell>

                          <CustomTableCell
                                align="left"
                                key={`${rowIndex}-${keyTable}-3`}>
                                {row['formatedPrice']}
                          </CustomTableCell>
                          
                          <CustomTableCell
                                align="left"
                                key={`${rowIndex}-${keyTable}-4`}>
                                {row['vat']}
                          </CustomTableCell>
                          <CustomTableCell
                                align="left"
                                key={`${rowIndex}-${keyTable}-5`}>
                                {row['use']}
                        </CustomTableCell>
                                    
                      </TableRow>
                        ))}
                    </TableBody>
              </Table> 
        </TableContainer>
    )
}

export default TableCancelExportDrug;