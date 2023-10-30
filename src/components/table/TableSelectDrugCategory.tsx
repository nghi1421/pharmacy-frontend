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

interface TableProps<T> {
    rows: T[]
    keyTable: string
    action: (row: any) => void
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

const columns: Column[] = [
    { key: 'id', value: 'Mã thuốc'},
    { key: 'name', value: 'Tên thuốc' },
    { key: 'quantity', value: 'Số lượng' },
    { key: 'formatedPrice', value: 'Giá' },
    { key: 'vat', value: 'VAT'},
    { key: 'use', value: 'Công dụng'},
]


const TableSelectDrugCategory: React.FC<TableProps<any>> = ({ rows, keyTable, action, tooltip }) => {
 
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
                  
                    row['checked']
                      ? 
                        <></>
                      :
                      <TableRow
                            key={`${keyTable}-${rowIndex}`}
                            sx={{ 
                            '&:last-child td, &:last-child th': { border: 0 },
                            }}
                        >
                        <Tooltip key={`tooltip-${rowIndex}`} title={tooltip} >
                                <TableCell
                                    align="left"
                                    key={`${rowIndex}-uncheck`}>
                                    <IconButton>
                                      <CloseIcon
                                        sx={{ 
                                            
                                        }}
                                      ></CloseIcon>
                                    </IconButton>
                                </TableCell>
                        </Tooltip>
                        
                          {columns.map((column, index) => (
                              column.key === 'quantity' ?
                                  <NumericFormat 
                                    sx={{ width: '100%' }}
                                    label='Số lượng'
                                    placeholder='Nhập số lượng'
                                    thousandSeparator=","
                                    customInput={TextField}
                                    onValueChange={({ value: v }) => (console.log(v))}
                                />
                                  :
                                <TableCell
                                    align="left"
                                    key={`${rowIndex}-${keyTable}-${index}`}>
                                    {row[column.key]}
                                </TableCell>
                            ))}
                      </TableRow>
                     
                        ))}
                    </TableBody>
                </Table> 
        </TableContainer>
    )
}

export default TableSelectDrugCategory;