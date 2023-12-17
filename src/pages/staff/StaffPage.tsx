import { Box, Button, IconButton, Paper, TableCell, Tooltip, Typography } from "@mui/material";
import TableComponent from "../../components/table/TableComponent";
import { Column } from "../../types/Column";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import WorkOffIcon from '@mui/icons-material/WorkOff';
import WorkOnIcon from '@mui/icons-material/Work';
import { useDeleteStaff, useGetStaff, useGetStaffs, useRevokeAndDeleteAccount, useUpdateStaffStatus } from "../../hooks/useStaff";
import { useConfirmDialog } from "../../hooks/useConfirmDialog";
import ConfirmDialog from "../../components/ConfirmDialog";
import { getSearchColums } from "../../utils/helper";
import { GET_ARRAY_OF_KEY, GET_SEARCHABLE_KEY, GET_SEARCHABLE_LIST } from "../../utils/constants";
import { useSearchableList } from "../../hooks/useSearchableList";
import { useSearchQuery } from "../../hooks/useSearchQuery";
import { TableExtension } from "../../components/table/TableExtension";
import React, { useState } from "react";
import { green } from "@mui/material/colors";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { ModalComponent } from "../../components/Modal";
import { GrantAccount } from "./GrantAccount";
import PersonOffIcon from '@mui/icons-material/PersonOff';
import { enqueueSnackbar } from "notistack";
import { getStaff as getStaffFn } from '../../store/auth'

const columnsList: Column[] = [
    { key: 'id', value: 'Mã nhân viên', sortable: true, searchable: true, enableSearch: true },
    { key: 'name', value: 'Họ tên', sortable: true, searchable: true, enableSearch: false },
    { key: 'gender', value: 'Giới tính', sortable: true, searchable: false },
    { key: 'phoneNumber', value: 'Số điện thoại', sortable: true, searchable: true, enableSearch: false },
    { key: 'dob', value: 'Ngày sinh', sortable: true, searchable: true, enableSearch: false },
    { key: 'email', value: 'Email', sortable: true, searchable: true, enableSearch: false },
    { key: 'isWorking', value: 'Đang làm việc', sortable: true, searchable: false },
]

const StaffPage: React.FC<{}> = () => {
    const navigate = useNavigate()
    const getStaff = useGetStaff()
    const updateStaffStatus = useUpdateStaffStatus()
    const deleteStaff = useDeleteStaff()
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [openConfirmDialog, props] = useConfirmDialog(deleteStaff.mutate)
    const [staffId, setStaffId] = useState<number>(0)
    const revokeAndDeleteAccount = useRevokeAndDeleteAccount()
    const [openConfirmDialogRevokeAccount, revokeProps] = useConfirmDialog(revokeAndDeleteAccount.mutate)
    const { query, actionChangePage, actionSort, actionSearch, updateQueryParams } =
        useSearchQuery(getSearchColums(columnsList, GET_ARRAY_OF_KEY))
    const { data, isLoading } = useGetStaffs(query)
    const [columns, watchSearchList, control, setValue] = useSearchableList(columnsList, updateQueryParams)

    const clickAdd = () => {
        navigate('/admin/staffs/create')
    }
    return (
        <Paper>
            <ConfirmDialog
                content="Vui lòng cân nhắc trước khi xóa dữ liệu. Nếu bạn đồng ý xóa thông tin nhân viên bạn hãy nhấn Xác nhận."
                title="Bạn có thật sự muốn xóa thông tin nhân viên này không?"
                {...props}
            />
            <ConfirmDialog
                content="Bạn có thật sự muốn thu hồi và xóa tài khoản này không?"
                title="Thu hồi và xóa tài khoản"
                {...revokeProps}
            />
            <ModalComponent
                title='Cấp tài khoản'
                initOpen={openModal}
                width={450}
                handleClose={() => setOpenModal(false)}
                children={<GrantAccount closeModal={() => setOpenModal(false)} staffId={staffId} />}
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
                    sx={{ px: 3, py: 2 }}
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
                                    rowValue.user
                                        ?
                                        <Tooltip title="Thu hồi và xóa tài khoản">
                                            <IconButton
                                                color='error'
                                                onClick={() => {
                                                    if (rowValue.id == getStaffFn().id) {
                                                        enqueueSnackbar('Không thể thu hồi tài khoản của bản thân.', {
                                                            autoHideDuration: 3000,
                                                            variant: 'warning'
                                                        })
                                                    }
                                                    else {
                                                        openConfirmDialogRevokeAccount(rowValue.id);
                                                    }
                                                }}
                                            >
                                                <PersonOffIcon></PersonOffIcon>
                                            </IconButton>
                                        </Tooltip>
                                        :
                                        <Tooltip title="Tạo và cấp tài khoản">
                                            <IconButton
                                                color='success'
                                                onClick={() => { setOpenModal(true); setStaffId(rowValue.id) }}
                                            >
                                                <PersonAddAltIcon></PersonAddAltIcon>
                                            </IconButton>
                                        </Tooltip>
                                }
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