import { Box, IconButton, Paper, TableCell } from "@mui/material";
import TableComponent from "../../components/table/TableComponent";
import { Column } from "../../types/Column";
import { useNavigate } from "react-router-dom";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteTypeByUse, useGetTypeByUse, useGetTypeByUses } from "../../hooks/useTypeByUse";
import ConfirmDialog from "../../components/ConfirmDialog";
import { useConfirmDialog } from "../../hooks/useConfirmDialog";
import { useSearchQuery } from "../../hooks/useSearchQuery";
import { getSearchColums } from "../../utils/helper";
import { GET_ARRAY_OF_KEY, GET_SEARCHABLE_KEY, GET_SEARCHABLE_LIST } from "../../utils/constants";
import { useSearchableList } from "../../hooks/useSearchableList";
import { TableExtension } from "../../components/table/TableExtension";
import { PageHeader } from "../../components/PageHeader";

const columnsList: Column[] = [
    { key: 'id', value: 'Mã chức vụ', sortable: true, searchable: true, enableSearch: true},
    { key: 'name', value: 'Tên công dụng' , sortable: true, searchable: true, enableSearch: false},
    { key: 'detail', value: 'Chi tiết' , sortable: true, searchable: true, enableSearch: false},
    { key: 'createdAt', value: 'Thời gian tạo', sortable: true, searchable: false},
    { key: 'updatedAt', value: 'Cập nhật', sortable: true, searchable: false},
]

const TypeByUsePage: React.FC<{}> = () => {
    const navigate = useNavigate()
    const getTypeByUse = useGetTypeByUse()
    const deleteTypeByUse = useDeleteTypeByUse()
    const [openConfirmDialog, props] = useConfirmDialog(deleteTypeByUse.mutate)
    const { query, actionChangePage, actionSort, actionSearch, updateQueryParams } =
        useSearchQuery(getSearchColums(columnsList, GET_ARRAY_OF_KEY))
    const { data, isLoading } = useGetTypeByUses(query)
    const [columns, watchSearchList, control, setValue] = useSearchableList(columnsList, updateQueryParams)
    
    const clickAdd = () => {
        navigate('/type-by-uses/create')
    }
    return (
        <Paper>
            <ConfirmDialog
                content="Vui lòng cân nhắc trước khi xóa dữ liệu. Nếu bạn đồng ý xóa phân loại công dụng thuốc bạn hãy nhấn Xác nhận."
                title="Bạn có thật sự muốn xóa công dụng?"
                { ...props }
            />
            <PageHeader
                title='Quản lí phân loại công dụng'
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
                hasAction={true}
                action={(rowValue: any) => 
                        <TableCell
                            align="left"
                            key={`row-action-type-by-use-table-${rowValue.id}`}>
                            <Box sx={{ display: 'flex' }}>
                            <IconButton
                                color='success'
                                onClick={() => { getTypeByUse.mutate(rowValue.id) }}
                            >
                                <CreateIcon></CreateIcon>
                            </IconButton>
                            <IconButton
                                color='error'
                                onClick={() => { openConfirmDialog(rowValue.id) }}
                            >
                                <DeleteIcon></DeleteIcon>
                            </IconButton>
                        </Box>
                    </TableCell>
                }
            />
        </Paper>
    )
    
}

export default TypeByUsePage;