import {
    Box,
    Divider,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
    styled,
    tableCellClasses
} from "@mui/material"
import React from "react"
import EmptyImage from '../../assets/images/no-data.jpg'
import { enqueueSnackbar } from "notistack"
import { ColumnDrugCategory } from "../../pages/export/SalesExport"

interface TableProps<T> {
    rows: T[]
    columns: ColumnDrugCategory[]
    keyTable: string
    action: (row: any) => void
    tooltip: string
    type: string
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

const TableDrugCategories: React.FC<TableProps<any>> = ({ rows, keyTable, columns, action, tooltip, type }) => {
 
  return (
      <TableContainer component={Paper} style={{ maxHeight: 300 }}>
      <Divider /> 
            <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow key={keyTable}>
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
            rows.length - rows.filter(row => row.checked).length === 0
              ?
              <TableRow key='empty-row'>
                <TableCell key='cell-empty' colSpan={columns.length}>
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
                      Danh mục thuốc trống
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
                      <Tooltip key={`tooltip-${rowIndex}`} title={tooltip}>
                            {
                      type && type === 'export' ?
                          <TableRow
                                key={`${keyTable}-${rowIndex}`}
                                onClick={() => {
                                  if (row.quantity == 0) {
                                    enqueueSnackbar(`Số lượng tồn thuốc ${row.name} đã hết không thể chọn.`, {variant: 'warning', autoHideDuration: 3000})
                                  } 
                                  else {
                                    action(row)
                                  }
                                }}
                                hover={true}
                                sx={{ 
                                  '&:last-child td, &:last-child th': { border: 0 },
                                  '&.MuiTableRow-root:hover': {
                                      cursor: row.quantity == 0 ? 'not-allowed' :'pointer',
                                      backgroundColor: row.quantity == 0 ? '#f2ccc9' :'#daf0ee' 
                                    },
                                }}
                              >
                                  {columns.map((column, index) => (
                                    <TableCell
                                        align="left"
                                        key={`${rowIndex}-${keyTable}-${index}`}>
                                        {row[column.key]}
                                    </TableCell>
                                  ))}
                        </TableRow>
                        :
                        <TableRow
                                  key={`${keyTable}-${rowIndex}`}
                                  onClick={() => {
                                    action(row)
                                  }}
                                  hover={true}
                                  sx={{ 
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    '&.MuiTableRow-root:hover': {
                                        cursor: 'pointer',
                                        backgroundColor: '#daf0ee' 
                                      },
                                  }}
                              >
                                  {columns.map((column, index) => (
                                    <TableCell
                                        align="left"
                                        key={`${rowIndex}-${keyTable}-${index}`}>
                                        {row[column.key]}
                                    </TableCell>
                                  ))}
                        </TableRow>
                      
                            }
                          </Tooltip>
                        ))}
                    </TableBody>
                </Table> 
        </TableContainer>
    )
}

export default TableDrugCategories;