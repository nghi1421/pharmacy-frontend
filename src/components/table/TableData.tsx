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
import { TableHeader as CustomTableHeader } from './TableHeader' 
import React from 'react'
import { TableBodyEmpty } from "./TableBodyEmpty";

export interface QuerySort {
  orderBy: string
  orderDirection: 'asc' | 'desc'
}

type Column = {
    key: string
    value: string
}

interface TableProps {
    rows: any[] | undefined
    columns: Column[]
    isLoading: boolean
    keyTable: string
}
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },

  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const TableData: React.FC<TableProps> = ({
    rows,
    isLoading,
    keyTable,
    columns,
}) => {

  return (
    <TableContainer component={Paper}>
        <Divider />
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <CustomTableHeader
                columns={columns}
                keyTable= {keyTable}
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
                                    sx={{ overflowX: 'auto' }}
                                    key={`row-${rowIndex}-${keyTable}-${index}`}>
                                    {row[column.key]}
                                  </TableCell>
                                ))}
                            </StyledTableRow>
                          ))
                          :
                          <></>
                          }
                      </TableBody>
                    }
                
        </Table>
      </TableContainer>
  )
}

export default TableData;