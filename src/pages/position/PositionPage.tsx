import { Box, IconButton, Paper, TableCell } from "@mui/material";
import TableComponent from "../../components/table/TableComponent";
import { Column } from "../../types/Column";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import { useDeletePosition, useGetPosition, useGetPositions } from "../../hooks/usePosition";
import { useConfirmDialog } from "../../hooks/useConfirmDialog";
import ConfirmDialog from "../../components/ConfirmDialog";
import { PageHeader } from "../../components/PageHeader";
import { TableExtension } from "../../components/table/TableExtension";
import { getSearchColums } from "../../utils/helper";
import { useSearchQuery } from "../../hooks/useSearchQuery";
import { GET_ARRAY_OF_KEY, GET_SEARCHABLE_KEY, GET_SEARCHABLE_LIST } from "../../utils/constants";
import { useSearchableList } from "../../hooks/useSearchableList";

const columnsList: Column[] = [
    { key: 'id', value: 'Mã chức vụ', sortable: true, searchable: true, enableSearch: true},
    { key: 'name', value: 'Tên' , sortable: true, searchable: true, enableSearch: true},
    { key: 'createdAt', value: 'Thời gian tạo', sortable: true, searchable: false},
    { key: 'updatedAt', value: 'Cập nhật', sortable: true, searchable: false},
]

const PositionPage: React.FC<{}> = () => {
    const getPosition = useGetPosition()
    const deletePosition = useDeletePosition()
    const [openConfirmDialog, props] = useConfirmDialog(deletePosition.mutate)
    const navigate = useNavigate()
    const { query, actionChangePage, actionSort, actionSearch, updateQueryParams } =
        useSearchQuery(getSearchColums(columnsList, GET_ARRAY_OF_KEY))
    const { data, isLoading } = useGetPositions(query)
    const [columns, watchSearchList, control, setValue] = useSearchableList(columnsList, updateQueryParams)

    const clickAdd = () => {
        navigate('/positions/create')
    }
    return (
        <Paper>
            <ConfirmDialog
                content="Vui lòng cân nhắc trước khi xóa dữ liệu. Nếu bạn đồng ý xóa phân chức vụ bạn hãy nhấn Xác nhận."
                title="Bạn có thật sự muốn xóa chức vụ?"
                { ...props }
            />
            <PageHeader
                title='Quản lí thông tin chức vụ'
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
                keyTable='staff-table'
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
                                onClick={() => { getPosition.mutate(rowValue.id) }}
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
            ></TableComponent>
            
        </Paper>
    )
    
}

export default PositionPage;