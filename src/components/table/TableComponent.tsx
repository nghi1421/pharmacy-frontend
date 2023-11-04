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
   TableSortLabel,
   Typography,
   styled,
  tableCellClasses
} from "@mui/material"
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { Column } from '../../types/Column'
import React from 'react'
import EmptyImage from '../../assets/images/no-data.jpg'
import { visuallyHidden } from '@mui/utils';
import { grey } from "@mui/material/colors";

export interface QuerySort {
  orderBy: string
  orderDirection: 'asc' | 'desc'
}

interface TableProps {
  rows: any[]
  columns: Column[]
  keyTable: string
  query?: QuerySort
  action?: any
  hasAction?: boolean
  hasPagination ?: boolean
  page?: number
  totalPage?: number
  actionChangePage?: (n: number) => void
  actionSort?: (q: QuerySort) => void
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

const TableComponent: React.FC<TableProps> =
  ({ rows, keyTable, columns, action, hasAction, page, actionChangePage, actionSort, totalPage, hasPagination, query }) => {
    const handleChange = (_: any, value: number) => {
      if (actionChangePage)
        actionChangePage(value)
    }; 
    
    const onSort = (column: Column) => {
      let orderDirection: 'asc' | 'desc' = 'asc'
      if (query && query.orderBy === column.key) {
        orderDirection = query.orderDirection === 'asc' ? 'desc' : 'asc'
      }
      if (actionSort) {
        actionSort({ orderBy: column.key, orderDirection });
      }
    } 
  
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
                                {
                                  query && column.sortable
                                ?
                                  <TableSortLabel
                                    active={query.orderBy === column.key}
                                    direction={ query.orderDirection }
                                    onClick={() => { onSort(column)}}
                                  >
                                    {
                                      column.enableSearch ? <ManageSearchIcon sx={{ color: grey[700] }}/> : <></>
                                    }
                                    {column.value}
                                    {query.orderBy === column.key ? (
                                      <Box component="span" sx={visuallyHidden}>
                                        {query.orderDirection === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                      </Box>
                                    ) : null}
                                  </TableSortLabel>
                                :
                                    column.value
                                }
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