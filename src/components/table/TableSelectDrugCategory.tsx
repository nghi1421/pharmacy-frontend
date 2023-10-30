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
import { Column } from '../../types/Column'
import React from "react"
import CloseIcon from '@mui/icons-material/Close';
import EmptyImage from '../../assets/images/no-data.jpg'
import { NumericFormat } from "react-number-format";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

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
        fontWeight: 500
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
        fontSize: 13,
        p: 1
    },
}));

const columns: Column[] = [
    { key: 'id', value: 'Mã thuốc'},
    { key: 'name', value: 'Tên thuốc' },
    { key: 'quantity', value: 'Số lượng' },
    { key: 'unit', value: 'Đơn vị nhập' },
    { key: 'importPrice', value: 'Đơn giá nhập' },
    { key: 'expiriDate', value: 'Hạn sử dụng' },
]

const TableSelectDrugCategory: React.FC<TableProps<any>> = ({ rows, keyTable, action, tooltip, update }) => {
 
  return (
      <TableContainer component={Paper}>
          <Divider /> 
            <LocalizationProvider dateAdapter={AdapterDayjs}>
          
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
                                key={`${rowIndex}-${keyTable}-1`}>
                                {row['name']}
                          </CustomTableCell>

                          
                          <CustomTableCell  align="left" key={`2-${rowIndex}-${keyTable}-quantity`}>
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
                                    value={row['quantity']}
                                    defaultValue={0}
                                    label='Số lượng'
                                    placeholder='Nhập số lượng'
                                    thousandSeparator=","
                                    customInput={TextField}
                                    onValueChange={({ value }) => (update({...row, quantity: parseInt(value)}))}
                                />
                          </CustomTableCell>

                          <CustomTableCell
                                align="left"
                                key={`${rowIndex}-${keyTable}-3`}>
                                {row['unit']}
                          </CustomTableCell>
                          
                          <CustomTableCell  align="left" key={`4-${rowIndex}-price`}>
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
                                defaultValue={0}
                                value={row['unitPrice']}
                                label='Đơn giá nhập'
                                placeholder='Nhập đơn giá nhập'
                                suffix=' VND'
                                thousandSeparator=","
                                customInput={TextField}
                                onValueChange={({ value }) => (update({...row, unitPrice: parseInt(value)}))}
                              />
                          </CustomTableCell>
                          
                          <CustomTableCell align="left" key={`5-${rowIndex}-expiryDate`}>
                                  <DatePicker
                                    sx={{ width: '100%' }}
                                    value={dayjs(row['expiryDate'])}
                                    onChange={(e) => (console.log(e))}
                                    minDate={dayjs()}
                                    format="DD-MM-YYYY"
                                    label='Hạn sử dụng'
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            variant: 'outlined',
                                            error: !!row['errors'],
                                            helperText: row['errors'],
                                        },
                                    }}
                                />
                            
                          </CustomTableCell>
                      </TableRow>
                        ))}
                    </TableBody>
              </Table> 
          </LocalizationProvider>
        </TableContainer>
    )
}

export default TableSelectDrugCategory;