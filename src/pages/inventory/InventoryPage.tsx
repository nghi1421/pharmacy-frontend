import { InputAdornment, Paper, TextField, Typography } from "@mui/material";
import TableComponent from "../../components/table/TableComponent";
import { Column } from "../../types/Column";
import { useNavigate } from "react-router-dom";
import { useSearchQuery } from "../../hooks/useSearchQuery";
import { getSearchColums } from "../../utils/helper";
import { GET_ARRAY_OF_KEY } from "../../utils/constants";
import { useSearchableList } from "../../hooks/useSearchableList";
import SearchIcon from '@mui/icons-material/Search';
import { useInventories } from "../../hooks/useInventory";
import dayjs from "dayjs";
import { useState } from "react";

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
    const { query, actionChangePage, actionSort, actionSearch, updateQueryParams } =
        useSearchQuery(getSearchColums(columnsList, GET_ARRAY_OF_KEY))
    const { data, isLoading } = useInventories(query)
    const [columns, watchSearchList, control, setValue] = useSearchableList(columnsList, updateQueryParams)
    
    const [search, setSearch] = useState<string>('')
    const [time, setTime] = useState<number>(0)
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

            <Paper sx={{ px: 3, py: 1, display: 'flex', gap: 2 }}>

            <TextField
                onChange={handleSearchData}
                onClick={() =>
                    console.log(123)
                }
                sx={{ width: '40%' }}
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