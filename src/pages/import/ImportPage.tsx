import { Box, Button, CircularProgress, Divider, IconButton, Paper, TableCell, Tooltip, Typography } from "@mui/material";
import TableComponent from "../../components/table/TableComponent";
import { Column } from "../../types/Column";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CreateIcon from '@mui/icons-material/Create';
import { useGetImport, useGetImports } from "../../hooks/useImport";
import globalEvent from "../../utils/emitter";
import { PageHeader } from "../../components/PageHeader";
import { TableExtension } from "../../components/table/TableExtension";
import { getSearchColums } from "../../utils/helper";
import { GET_ARRAY_OF_KEY, GET_SEARCHABLE_KEY, GET_SEARCHABLE_LIST } from "../../utils/constants";
import { useSearchableList } from "../../hooks/useSearchableList";
import { useSearchQuery } from "../../hooks/useSearchQuery";

const columnsList: Column[] = [
    { key: 'id', value: 'Mã phiếu nhập', sortable: false, searchable: false},
    { key: 'staffName', value: 'Được tạo bởi' , sortable: false, searchable: false},
    { key: 'providerName', value: 'Đối tác', sortable: false, searchable: false},
    { key: 'note', value: 'Ghi chú', sortable: false, searchable: false},
    { key: 'paid', value: 'Đã thanh toán', sortable: false, searchable: false},
    { key: 'maturityDate', value: 'Ngày đáo hạn', sortable: false, searchable: false},
    { key: 'importDate', value: 'Ngày nhập hàng', sortable: false, searchable: false},
]

const ImportPage: React.FC<{}> = () => {
    const navigate = useNavigate()
    const getImport = useGetImport()
    const { query, actionChangePage, actionSort, actionSearch, updateQueryParams } =
        useSearchQuery(getSearchColums(columnsList, GET_ARRAY_OF_KEY))
    const { data, isLoading } = useGetImports(query)
    const [columns, watchSearchList, control, setValue] = useSearchableList(columnsList, updateQueryParams)

    const clickAdd = () => {
        globalEvent.emit('close-sidebar');
        navigate('/admin/imports/create')
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
                        keyTable='import-table'
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

export default ImportPage;