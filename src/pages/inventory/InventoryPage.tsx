import { Paper, Typography } from "@mui/material";
import TableComponent from "../../components/table/TableComponent";
import { Column } from "../../types/Column";
import { useNavigate } from "react-router-dom";
import { useSearchQuery } from "../../hooks/useSearchQuery";
import { getSearchColums } from "../../utils/helper";
import { GET_ARRAY_OF_KEY, GET_SEARCHABLE_KEY, GET_SEARCHABLE_LIST } from "../../utils/constants";
import { useSearchableList } from "../../hooks/useSearchableList";
import { TableExtension } from "../../components/table/TableExtension";
import { PageHeader } from "../../components/PageHeader";
import { useInventories } from "../../hooks/useInventory";
import dayjs from "dayjs";

const columnsList: Column[] = [
    { key: 'drugId', value: 'Mã thuốc', sortable: true, searchable: true, enableSearch: true},
    { key: 'name', value: 'Tên thuốc' , sortable: true, searchable: true, enableSearch: false},
    { key: 'inventory', value: 'Tồn kho' , sortable: true, searchable: true, enableSearch: false},
    { key: 'salesQuantity', value: 'Số lượng bán', sortable: true, searchable: false},
    { key: 'brokenQuantity', value: 'Số lượng hư hỏng', sortable: true, searchable: false},
    { key: 'importQuantity', value: 'Số lượng nhập', sortable: true, searchable: false},
    { key: 'importId', value: 'Mã nhập', sortable: true, searchable: false},
    { key: 'importDate', value: 'Ngày nhập', sortable: true, searchable: false},
    { key: 'expiryDateSelling', value: 'HSD đang bán', sortable: true, searchable: false},
]

const InventoryPage: React.FC<{}> = () => {
    const navigate = useNavigate()

    const { query, actionChangePage, actionSort, actionSearch, updateQueryParams } =
        useSearchQuery(getSearchColums(columnsList, GET_ARRAY_OF_KEY))
    const { data, isLoading } = useInventories(query)
    const [columns, watchSearchList, control, setValue] = useSearchableList(columnsList, updateQueryParams)
    
    return (
        <Paper>

            <Typography
                variant="h4"
                fontWeight='500'
                sx={{ px:3, py: 2 }}
            >
                Thẻ kho {dayjs().format('MM/YYYY')}
            </Typography>

            <TableExtension
                setValue={setValue}
                initValueSearch={query.searchTerm}
                initSearchColumns={getSearchColums(columns, GET_SEARCHABLE_KEY)}
                searchColumns={getSearchColums(columnsList, GET_SEARCHABLE_LIST)}
                control={control}
                actionSearch={actionSearch}
                watchSearchList={watchSearchList}
            />

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