import { 
  Box,
   CircularProgress,
   Divider,
   Paper,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableRow,
   styled,
} from "@mui/material"
import { TableFooter as CustomTableFooter } from './TableFooter' 
import { TableHeader as CustomTableHeader } from './TableHeader' 
import { Column } from '../../types/Column'
import React from 'react'
import { TableBodyEmpty } from "./TableBodyEmpty";

export interface QuerySort {
  orderBy: string
  orderDirection: 'asc' | 'desc'
}

interface TableProps {
  rows: any[] | undefined
  columns: Column[]
  isLoading: boolean
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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },

  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const TableComponent: React.FC<TableProps> = ({
    rows,
    isLoading,
    keyTable,
    columns,
    action,
    hasAction,
    page,
    actionChangePage,
    actionSort,
    totalPage,
    hasPagination,
  query
}) => {

  return (
    <TableContainer component={Paper}>
        <Divider />
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <CustomTableHeader
                columns={columns}
                keyTable= {keyTable}
                query= {query}
                hasAction= {hasAction}
                actionSort= {actionSort}
              />
        {
          isLoading ?
              <Box sx={{
                  display: 'flex',
                  backgroundColor: 'white',
                  p: 4,
                  justifyContent: 'center'
              }}>
                  <CircularProgress />
              </Box> 
            :
              rows && rows.length === 0
              ?
                <TableBodyEmpty
                  columns={columns} />
              : 
              <React.Fragment>
                <TableBody>
                  {
                    rows ?
                    rows.map((row, rowIndex) => (
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
                    ))
                    :
                    <></>
                  }
                    </TableBody>
                    {
                      hasPagination 
                        ?
                        <CustomTableFooter
                          columns={columns}
                          actionChangePage={actionChangePage}
                          page={page}
                          totalPage={totalPage}
                          hasAction={hasAction}
                        />
                        :
                        ''
                    }
              </React.Fragment>
          }
                
        </Table>
      </TableContainer>
  )
}

export default TableComponent;