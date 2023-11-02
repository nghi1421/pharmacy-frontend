import { Box,
   Divider,
   Grid,
   Pagination,
   Paper,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableFooter,
   TableHead,
   TableRow,
   Typography,
   styled,
  tableCellClasses
} from "@mui/material"
import { Column } from '../../types/Column'
import React from 'react'
import EmptyImage from '../../assets/images/no-data.jpg'

interface TableProps<T> {
  rows: T[]
  columns: Column[]
  keyTable: string
  action?: any
  hasAction?: boolean
  hasPagination ?: boolean
  page?: number
  totalPage?: number
  actionChangePage?: (n: number) => any
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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },

  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const TableComponent: React.FC<TableProps<any>> =
  ({ rows, keyTable, columns, action, hasAction, page, actionChangePage, totalPage, hasPagination }) => {
  const handleChange = (_: any, value: number) => {
      if (actionChangePage)
        actionChangePage(value)
  }; 
  
  return (
      <TableContainer component={Paper}>
      <Divider />
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                        {
                          hasAction
                            ? <StyledTableCell
                                align="left"
                                key={`header-cell-${keyTable}-${columns.length +1}`}
                              >
                                Hành động
                            </StyledTableCell>
                            : ''
                            }
              </TableRow>
              {
                rows.length === 0
                  ?
              <TableRow key='empty-row'>
                <TableCell colSpan={columns.length + 1}>
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
                                
                                height: 150,
                                width: 150,
                              }}
                              alt="No data."
                              src={EmptyImage}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Typography
                              variant="h6"
                              fontWeight='500'
                              
                            sx={{ opacity: '0.3', pb: 4}}
                          >
                            Không có dữ liệu
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
                        <StyledTableRow
                            key={`row-${keyTable}-${rowIndex}`}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            {columns.map((column, index) => (
                              <TableCell
                                align="left"
                                key={`row-${rowIndex}-${keyTable}-${index}`}>
                                {row[column.key]}
                              </TableCell>
                            ))}
                            {hasAction ? action(row) : ''}
                            
                        </StyledTableRow>
                        ))}
                    </TableBody>
              {
                hasPagination 
                  ?
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={hasAction ? columns.length + 1 : columns.length}>
                          <Box 
                            sx={{ 
                                margin: "auto", 
                                width: "fit-content", 
                                alignItems: "center", 
                            }} 
                          > 
                              <Typography fontSize={24} align="center"> 
                                  Page: {page} 
                              </Typography> 
                              <Pagination
                                count={totalPage}
                                page={page}  
                                onChange={handleChange}
                              /> 
                          </Box>
                        </TableCell> 
                      </TableRow>
                    </TableFooter>
                  :
                  ''
              }
            </Table>
        </TableContainer>
    )
}

export default TableComponent;