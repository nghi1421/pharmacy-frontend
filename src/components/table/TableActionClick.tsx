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
    Typography,
    styled,
    tableCellClasses
} from "@mui/material"
import { Column } from '../../types/Column'
import React from "react"
import EmptyImage from '../../assets/images/no-data.jpg'

interface TableProps<T> {
    rows: T[]
    columns: Column[]
    keyTable: string
    action: (row: any) => void
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
    "&.MuiTableRow-hover:hover": {
        cursor: "pointer",
        backgroundColor: 'primary.300',
    }
}));

const TableComponent: React.FC<TableProps<any>> = ({ rows, keyTable, columns, action }) => {
 
  return (
      <TableContainer component={Paper}>
      <Divider />
          {
            rows.length === 0
            ?
          <React.Fragment>
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
                      
                      height: 200,
                      width: 200,
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
              </React.Fragment>
            :
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
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.map((row, rowIndex) => (
                            <TableRow
                                key={`row-${keyTable}-${rowIndex}`}
                                onClick={() => action(row)}
                                hover={true}
                                sx={{ 
                                    '&:last-child td, &:last-child th': { border: 0 },
                                }}
                            >
                                {columns.map((column, index) => (
                                <TableCell
                                    align="left"
                                    key={`row-${rowIndex}-${keyTable}-${index}`}>
                                    {row[column.key]}
                                </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
          }
            
        </TableContainer>
    )
}

export default TableComponent;