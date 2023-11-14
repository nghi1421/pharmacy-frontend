import { Box, Button, CircularProgress, Divider, IconButton, Paper, TableCell, Tooltip, Typography } from "@mui/material";
import TableComponent from "../../components/table/TableComponent";
import { Column } from "../../types/Column";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CreateIcon from '@mui/icons-material/Create';
import { useGetExport, useGetExports } from "../../hooks/useExport";
import { PageHeader } from "../../components/PageHeader";
import { TableExtension } from "../../components/table/TableExtension";
import { GET_ARRAY_OF_KEY, GET_SEARCHABLE_KEY, GET_SEARCHABLE_LIST } from "../../utils/constants";
import { getSearchColums } from "../../utils/helper";
import { useSearchQuery } from "../../hooks/useSearchQuery";
import { useSearchableList } from "../../hooks/useSearchableList";

const columnsList: Column[] = [
    { key: 'id', value: 'Mã xuất thuốc', sortable: false, searchable: false},
    { key: 'staffName', value: 'Được tạo bởi' , sortable: false, searchable: false},
    { key: 'customerName', value: 'Người mua hàng', sortable: false, searchable: false},
    { key: 'note', value: 'Ghi chú', sortable: false, searchable: false},
    { key: 'prescriptionId', value: 'Mã lô hàng', sortable: false, searchable: false},
    { key: 'exportDate', value: 'Ngày xuất hàng', sortable: false, searchable: false},
]

const ExportPage: React.FC<{}> = () => {
    const navigate = useNavigate()
    const getImport = useGetExport()
    const { query, actionChangePage, actionSort, actionSearch, updateQueryParams } =
        useSearchQuery(getSearchColums(columnsList, GET_ARRAY_OF_KEY))
    const { data, isLoading } = useGetExports(query)
    const [columns, watchSearchList, control, setValue] = useSearchableList(columnsList, updateQueryParams)

    const clickAdd = () => {
        navigate('/admin/exports/create')
    }
    return (
        <Paper>
            <PageHeader
                title='Quản lí xuất hàng'
                clickAdd={clickAdd}
            />

            <TableExtension
                setValue={setValue}
                initValueSearch={query.searchTerm}
                initSearchColumns={getSearchColums(columns, GET_SEARCHABLE_KEY)}
                searchColumns={getSearchColums(columnsList, GET_SEARCHABLE_LIST)}
                control={control}
                actionSearch={actionSearch}
                watchSearchList={watchSearchList}
            />
            {
                isLoading
                ?   <Box sx={{
                        display: 'flex',
                        backgroundColor: 'white',
                        p: 4,
                        justifyContent: 'center'
                    }}>
                        <CircularProgress />
                    </Box> 
                :
                    <TableComponent
                        isLoading={isLoading}
                        rows={data ? data.data : undefined}
                        keyTable='export-table'
                        columns={columns}
                        hasPagination={true}
                        page={query.page}
                        query={{ orderBy: query.orderBy, orderDirection: query.orderDirection }}
                        actionSort={actionSort}
                        actionChangePage={actionChangePage}
                        totalPage={data ? data.meta.totalPage : undefined}
                        hasAction={true}
                        action={(rowValue: any) => 
                                <TableCell
                                    align="left"
                                    key={`row-action-provider-table-${rowValue.id}`}>
                                    <Box sx={{ display: 'flex' }}>
                                        <Tooltip title="Xem thông tin chi tiết">
                                            <IconButton
                                                color='success'
                                                onClick={() => { getImport.mutate(rowValue.id) }}
                                            >
                                                <CreateIcon></CreateIcon>
                                            </IconButton>
                                        </Tooltip>
                                </Box>
                            </TableCell>
                        }
                    ></TableComponent>
            }
        </Paper>
    )
    
}

export default ExportPage;