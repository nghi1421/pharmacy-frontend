import { Box, Divider, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography, styled, tableCellClasses } from "@mui/material"
import { Column } from '../../types/Column'
import React from "react"
import EmptyImage from '../../assets/images/no-data.jpg'
// import { TablePaginationActions } from "./TablePaginationActions";

interface TableProps<T> {
  rows: T[]
  columns: Column[]
  keyTable: string
  action?: any
  hasAction?: boolean
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

const TableComponent: React.FC<TableProps<any>> = ({ rows, keyTable, columns, action, hasAction }) => {
    // const [page, setPage] = useState<number>(0);
    // const [rowsPerPage, setRowsPerPage] = useState<number>(5);

    // const emptyRows =
    //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    // const handleChangePage = (
    //   event: React.MouseEvent<HTMLButtonElement> | null,
    //   newPage: number,
    // ) => {
    //   setPage(newPage);
    // };

    // const handleChangeRowsPerPage = (
    //   event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    // ) => {
    //     setRowsPerPage(parseInt(event.target.value, 10));
    //     setPage(0);
    // };
  
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
            
                        {/* <TableFooter>
                          <TableRow>
                            <TablePagination
                              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                              colSpan={3}
                              count={rows.length}
                              rowsPerPage={rowsPerPage}
                              page={page}
                              SelectProps={{
                                inputProps: {
                                  'aria-label': 'rows per page',
                                },
                                native: true,
                              }}
                              onPageChange={handleChangePage}
                              onRowsPerPageChange={handleChangeRowsPerPage}
                              // ActionsComponent={TablePaginationActions}
                            />
                          </TableRow>
                        </TableFooter> */}
                </Table>
        </TableContainer>
    )
}

export default TableComponent;