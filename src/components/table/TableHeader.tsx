import { Box, TableCell, TableHead, TableRow, TableSortLabel, styled, tableCellClasses } from "@mui/material"
import { QuerySort } from "./TableComponent"
import { Column } from "../../types/Column"
import { visuallyHidden } from '@mui/utils';
import { grey } from "@mui/material/colors";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

interface TableHeaderProps {
  columns: Column[]
  keyTable: string
  query?: QuerySort
  hasAction?: boolean
  actionSort?: (q: QuerySort) => void
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

export const TableHeader: React.FC<TableHeaderProps> = ({
    keyTable,
    columns,
    query,
    hasAction,
    actionSort,
}) => {

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
                    ? 
                    <StyledTableCell
                        align="left"
                        key={`header-cell-${keyTable}-${columns.length +1}`}
                        >
                        Hành động
                    </StyledTableCell>
                    : ''
                }
            </TableRow>
        </TableHead>
    )
}