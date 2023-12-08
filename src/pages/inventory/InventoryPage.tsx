import { FormControl, InputAdornment, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import TableComponent from "../../components/table/TableComponent";
import { Column } from "../../types/Column";
import { useSearchQuery } from "../../hooks/useSearchQuery";
import { getSearchColums } from "../../utils/helper";
import { GET_ARRAY_OF_KEY } from "../../utils/constants";
import { useSearchableList } from "../../hooks/useSearchableList";
import SearchIcon from '@mui/icons-material/Search';
import { useInventories } from "../../hooks/useInventory";
import dayjs from "dayjs";
import { useState } from "react";

const monthYears = [
     {
        value: '102023',
        label: 'Tháng 10/2023'
    },
    {
        value: '112023',
        label: 'Tháng 11/2023'
    },
    {
        value: '122023',
        label: 'Tháng 12/2023'
    }
]

const columnsList: Column[] = [
    { key: 'drugId', value: 'Mã thuốc', sortable: true, searchable: false, enableSearch: false},
    { key: 'name', value: 'Tên thuốc' , sortable: false, searchable: true, enableSearch: true},
    { key: 'inventory', value: 'Tồn kho' , sortable: true, searchable: false, enableSearch: false},
    { key: 'salesQuantity', value: 'Số lượng bán', sortable: true, searchable: false},
    { key: 'brokenQuantity', value: 'Số lượng hư hỏng', sortable: true, searchable: false},
    { key: 'importQuantity', value: 'Số lượng nhập', sortable: true, searchable: false},
    { key: 'importId', value: 'Mã nhập', sortable: false, searchable: false},   
    { key: 'importDate', value: 'Ngày nhập', sortable: true, searchable: false},
    { key: 'expiryDateSelling', value: 'HSD đang bán', sortable: false, searchable: false},
]

const InventoryPage: React.FC<{}> = () => {
    const { query, actionChangePage, actionSort, actionSearch, updateQueryParams, actionFilter } =
        useSearchQuery(getSearchColums(columnsList, GET_ARRAY_OF_KEY))
    const { data, isLoading } = useInventories(query)
    const [columns, watchSearchList] = useSearchableList(columnsList, updateQueryParams)
    
    const [search, setSearch] = useState<string>('')
    const [time, setTime] = useState<number>(0)
    const [monthYear, getMonthYear] = useState('122023');

    const handleChange = (event: SelectChangeEvent) => {
        getMonthYear(event.target.value as string);
        actionFilter({
            filterValue: event.target.value as string,
            filterColumn: 'monthYear'
        })
    };
    
    const handleSearchData = (event: React.ChangeEvent<HTMLInputElement>) => {
        clearTimeout(time);
        setSearch(event.target.value as string)
        setTime(setTimeout(() => {
            actionSearch({
                searchTerm: event.target.value as string,
                searchColumns: watchSearchList
            })
            }, 500)
        )
    }

    return (
        <Paper>

            <Typography
                variant="h4"
                fontWeight='500'
                sx={{ px:3, py: 2 }}
            >
                Thẻ kho {dayjs().format('MM/YYYY')}
            </Typography>

            <Paper sx={{ px: 3, py: 1, display: 'flex', gap: 2, justifyItems: 'between' }}>

            <TextField
                onChange={handleSearchData}
                onClick={() =>
                    console.log(123)
                }
                sx={{ width: '80%' }}
                size='small'
                label="Tìm kiếm"
                value={search}
                disabled={watchSearchList.length === 0}
                placeholder="Nhập tên thuốc cần tìm kiếm"
                InputProps={{
                    endAdornment: (
                        <InputAdornment
                            position='end'
                        >
                            <SearchIcon />
                        </InputAdornment>
                    )
                }}
            />
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" size='small'>Tháng năm</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    size='small'
                    value={monthYear}
                    label="Tháng năm"
                    onChange={handleChange}
                >
                    {
                        monthYears.map(monthYear => (
                         <MenuItem value={monthYear.value}>{monthYear.label}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </Paper>

            <TableComponent
                isLoading={isLoading}
                rows={data ? data.data : undefined}
                keyTable='type-by-uses-table'
                columns={columns}
                hasPagination={true}
                page={query.page}
                query={{ orderBy: query.orderBy, orderDirection: query.orderDirection }}
                actionSort={actionSort}
                actionChangePage={actionChangePage}
                totalPage={data ? data.meta.totalPage : undefined}
            />
        </Paper>
    )
    
}

export default InventoryPage;