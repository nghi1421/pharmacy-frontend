import { Box, Pagination, TableCell, TableRow, Typography, TableFooter as MuiTableFooter } from "@mui/material"
import { Column } from "../../types/Column"

interface TableFooterProps {
    columns: Column[]
    hasAction?: boolean
    page?: number
    totalPage?: number
    actionChangePage?: (n: number) => void
}

export const TableFooter: React.FC<TableFooterProps> = (
    {
        hasAction,
        columns,
        page,
        totalPage,
        actionChangePage
    }
) => {
    const handleChange = (_: any, value: number) => {
      if (actionChangePage)
        actionChangePage(value)
    }; 

    return (
        <MuiTableFooter>
            <TableRow>
                <TableCell colSpan={hasAction ? columns.length + 1 : columns.length}>
                    <Box 
                        sx={{ 
                            margin: "auto", 
                            width: "fit-content", 
                            alignItems: "center", 
                        }} 
                    > 
                        <Typography align="center"> 
                            Trang: {page} 
                        </Typography> 
                        <Pagination
                            count={totalPage}
                            page={page}  
                            onChange={handleChange}
                        /> 
                    </Box>
                </TableCell> 
            </TableRow>
        </MuiTableFooter>
    )
}