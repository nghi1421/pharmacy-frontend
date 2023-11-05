import { Box, Button, IconButton, Paper, TableCell, Typography } from "@mui/material";
import TableComponent from "../../components/table/TableComponent";
import { Column } from "../../types/Column";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteCustomer, useGetCustomer, useGetCustomers } from "../../hooks/useCustomer";
import { useConfirmDialog } from "../../hooks/useConfirmDialog";
import ConfirmDialog from "../../components/ConfirmDialog";
import { green } from "@mui/material/colors";
import { TableExtension } from "../../components/table/TableExtension";
import { useSearchQuery } from "../../hooks/useSearchQuery";
import { getSearchColums } from "../../utils/helper";
import { GET_ARRAY_OF_KEY, GET_SEARCHABLE_KEY, GET_SEARCHABLE_LIST } from "../../utils/constants";
import { useSearchableList } from "../../hooks/useSearchableList";

const columnsList: Column[] = [
    { key: 'id', value: 'Mã khách hàng', sortable: true, searchable: true, enableSearch: true},
    { key: 'name', value: 'Họ tên' , sortable: true, searchable: true, enableSearch: true},
    { key: 'gender', value: 'Giới tính', sortable: true, searchable: true, enableSearch: true},
    { key: 'phoneNumber', value: 'Số điện thoại', sortable: true, searchable: true, enableSearch: true},
    { key: 'dob', value: 'Ngày sinh', sortable: true, searchable: true, enableSearch: true},
    { key: 'email', value: 'Email', sortable: true, searchable: true, enableSearch: true},
]

const CustomerPage: React.FC<{}> = () => {
    const navigate = useNavigate()
    const getCustomer = useGetCustomer()
    const deleteCustomer = useDeleteCustomer()
    const [openConfirmDialog, props] = useConfirmDialog(deleteCustomer.mutate)
    const { query, actionChangePage, actionSort, actionSearch, updateQueryParams } =
        useSearchQuery(getSearchColums(columnsList, GET_ARRAY_OF_KEY))
    const { data, isLoading } = useGetCustomers(query)
    const [columns, watchSearchList, control, setValue ] = useSearchableList(columnsList, updateQueryParams)
    const clickAdd = () => {
        navigate('/customers/create')
    }
    return (
        <Paper>
            <ConfirmDialog
                content="Vui lòng cân nhắc trước khi xóa dữ liệu. Nếu bạn đồng ý xóa thông tin khách hàng bạn hãy nhấn Xác nhận."
                title="Bạn có thật sự muốn xóa thông tin khách hàng này không?"
                { ...props }
            />
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                p: 1,
                m: 1,
                bgcolor: 'background.paper',
                borderRadius: 1,
            }}
            >
                <Typography
                    variant="h4"
                    fontWeight='500'
                    sx={{ px:3, py: 2 }}
                >
                    Quản lí khách hàng
                </Typography>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: green[500],
                        '&:hover': {
                            backgroundColor: green[700],
                        }
                    }}
                    size="small"
                    onClick={clickAdd}
                >
                    <Add></Add>
                    <Typography
                        textTransform='none'
                        variant='button'
                        color='inheric'
                        marginLeft='4px'
                    >
                        Thêm mới
                    </Typography>
                </Button>
            </Box>

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
                            key={`row-action-customer-table-${rowValue.id}`}>
                            <Box sx={{ display: 'flex' }}>
                            <IconButton
                                color='success'
                                onClick={() => { getCustomer.mutate(rowValue.id) }}
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

export default CustomerPage;