import { Box, IconButton, Paper, TableCell } from "@mui/material";
import TableComponent from "../../components/table/TableComponent";
import { Column } from "../../types/Column";
import { useNavigate } from "react-router-dom";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteProvider, useGetProvider, useGetProviders } from "../../hooks/useProvider";
import { useConfirmDialog } from "../../hooks/useConfirmDialog";
import ConfirmDialog from "../../components/ConfirmDialog";
import { useSearchQuery } from "../../hooks/useSearchQuery";
import { getSearchColums } from "../../utils/helper";
import { PageHeader } from "../../components/PageHeader";
import { useSearchableList } from "../../hooks/useSearchableList";
import { GET_ARRAY_OF_KEY, GET_SEARCHABLE_KEY, GET_SEARCHABLE_LIST } from "../../utils/constants";
import { TableExtension } from "../../components/table/TableExtension";

const columnsList: Column[] = [
    { key: 'id', value: 'Mã chức vụ', sortable: true, searchable: true, enableSearch: true},
    { key: 'name', value: 'Tên' , sortable: true, searchable: true, enableSearch: false},
    { key: 'address', value: 'Địa chỉ' , sortable: true, searchable: true, enableSearch: false},
    { key: 'phoneNumber', value: 'Số điện thoại', sortable: true, searchable: true, enableSearch: false},
    { key: 'email', value: 'Email', sortable: true, searchable: true, enableSearch: false},
    { key: 'createdAt', value: 'Thời gian tạo', sortable: true, searchable: false},
    { key: 'updatedAt', value: 'Cập nhật', sortable: true, searchable: false},
]

const ProviderPage: React.FC<{}> = () => {
    const navigate = useNavigate()
    const getProvider = useGetProvider()
    const deleteProvider = useDeleteProvider()
    const [openConfirmDialog, props] = useConfirmDialog(deleteProvider.mutate)
    const { query, actionChangePage, actionSort, actionSearch, updateQueryParams } =
        useSearchQuery(getSearchColums(columnsList, GET_ARRAY_OF_KEY))
    const { data, isLoading } = useGetProviders(query)
    const [columns, watchSearchList, control, setValue] = useSearchableList(columnsList, updateQueryParams)

    const clickAdd = () => {
        navigate('/admin/providers/create')
    }
    return (
        <Paper>
            <ConfirmDialog
                content="Vui lòng cân nhắc trước khi xóa dữ liệu. Nếu bạn đồng ý xóa thông tin công ty dược bạn hãy nhấn Xác nhận."
                title="Bạn có thật sự muốn xóa thông tin công ti dược này không?"
                { ...props }
            />

            <PageHeader
                title='Quản lí thông tin công ty dược'
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
                keyTable='provider-table'
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
                            <IconButton
                                color='success'
                                onClick={() => { getProvider.mutate(rowValue.id) }}
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

export default ProviderPage;