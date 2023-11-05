import { Box, Button, IconButton, Paper, TableCell, Tooltip, Typography } from "@mui/material";
import TableComponent from "../../components/table/TableComponent";
import { Column } from "../../types/Column";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import WorkOffIcon from '@mui/icons-material/WorkOff';
import WorkOnIcon from '@mui/icons-material/Work';
import { useDeleteStaff, useGetStaff, useGetStaffs, useUpdateStaffStatus } from "../../hooks/useStaff";
import { useConfirmDialog } from "../../hooks/useConfirmDialog";
import ConfirmDialog from "../../components/ConfirmDialog";
import { getSearchColums } from "../../utils/helper";
import { GET_ARRAY_OF_KEY, GET_SEARCHABLE_KEY, GET_SEARCHABLE_LIST } from "../../utils/constants";
import { useSearchableList } from "../../hooks/useSearchableList";
import { useSearchQuery } from "../../hooks/useSearchQuery";
import { TableExtension } from "../../components/table/TableExtension";
import React from "react";
import { green } from "@mui/material/colors";

const columnsList: Column[] = [
    { key: 'id', value: 'Mã nhân viên', sortable: true, searchable: true, enableSearch: true},
    { key: 'name', value: 'Họ tên', sortable: true, searchable: true, enableSearch: true},
    { key: 'gender', value: 'Giới tính', sortable: true, searchable: false},
    { key: 'phoneNumber', value: 'Số điện thoại', sortable: true, searchable: true, enableSearch: true},
    { key: 'dob', value: 'Ngày sinh', sortable: true, searchable: true, enableSearch: true},
    { key: 'email', value: 'Email', sortable: true, searchable: true, enableSearch: true},
    { key: 'isWorking', value: 'Đang làm việc', sortable: true, searchable: false},
]

const StaffPage: React.FC<{}> = () => {
    const navigate = useNavigate()
    const getStaff = useGetStaff()
    const updateStaffStatus = useUpdateStaffStatus()
    const deleteStaff = useDeleteStaff()
    const [openConfirmDialog, props] = useConfirmDialog(deleteStaff.mutate)
    const { query, actionChangePage, actionSort, actionSearch, updateQueryParams } =
        useSearchQuery(getSearchColums(columnsList, GET_ARRAY_OF_KEY))
    const { data, isLoading } = useGetStaffs(query)
    const [columns, watchSearchList, control, setValue ] = useSearchableList(columnsList, updateQueryParams)

    const clickAdd = () => {
        navigate('/staffs/create')
    }
    return (
        <Paper>
            <ConfirmDialog
                content="Vui lòng cân nhắc trước khi xóa dữ liệu. Nếu bạn đồng ý xóa thông tin nhân viên bạn hãy nhấn Xác nhận."
                title="Bạn có thật sự muốn xóa thông tin nhân viên này không?"
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
                    Quản lí nhân viên
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
                action={
                    (rowValue: any) => 
                        <TableCell
                            align="left"
                            key={`row-action-provider-table-${rowValue.id}`}>
                            <Box sx={{ display: 'flex' }}>
                                <Tooltip title="Xem thông tin chi tiết">
                                    <IconButton
                                        color='success'
                                        onClick={() => { getStaff.mutate(rowValue.id) }}
                                    >
                                        <CreateIcon></CreateIcon>
                                    </IconButton>
                                </Tooltip>
                            {
                                rowValue.status ?
                                    <Tooltip title="Cho nghỉ việc">
                                        <IconButton
                                            color='error'
                                            onClick={() => {
                                                updateStaffStatus.mutate(rowValue.id)
                                            }}
                                        >
                                            <WorkOffIcon></WorkOffIcon>
                                        </IconButton>
                                    </Tooltip>
                                    
                                    :
                                    <Tooltip title="Làm việc">
                                        <IconButton
                                            color='success'
                                            onClick={() => {
                                                updateStaffStatus.mutate(rowValue.id)
                                            }}
                                        >
                                        <WorkOnIcon></WorkOnIcon>
                                        </IconButton>
                                    </Tooltip >
                                    
                            }
                            <Tooltip title="Xóa thông tin nhân viên">
                                <IconButton
                                    color='error'
                                    onClick={() => { openConfirmDialog(rowValue.id) }}
                                >
                                    <DeleteIcon></DeleteIcon>
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </TableCell>
                }
            />
        </Paper>
    )
    
}

export default StaffPage;