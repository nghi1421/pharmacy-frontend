import { Box, IconButton, Paper, TableCell, Tooltip, Typography } from "@mui/material";
import TableComponent from "../../components/table/TableComponent";
import { useDeleteAccount, useGetUsers } from "../../hooks/useAccount";
import { useSearchQuery } from '../../hooks/useSearchQuery'
import React from "react";
import { useSearchableList } from "../../hooks/useSearchableList";
import { GET_ARRAY_OF_KEY, GET_SEARCHABLE_KEY, GET_SEARCHABLE_LIST } from "../../utils/constants";
import { getSearchColums } from "../../utils/helper";
import { TableExtension } from "../../components/table/TableExtension";
import ReplayIcon from '@mui/icons-material/Replay';
import DeleteIcon from '@mui/icons-material/Delete';
import { useConfirmDialog } from "../../hooks/useConfirmDialog";
import ConfirmDialog from "../../components/ConfirmDialog";

const columnsList = [
    { key: 'id', value: 'Mã tài khoản', sortable: true, searchable: true, enableSearch: true },
    { key: 'username', value: 'Tên đăng nhập', sortable: true, searchable: true, enableSearch: true },
    { key: 'role', value: 'Quyền', sortable: true, searchable: false, },
    { key: 'createdAt', value: 'Thời gian tạo', sortable: true, searchable: false },
    { key: 'updatedAt', value: 'Cập nhật', sortable: true, searchable: false },
]

const UserPage: React.FC<{}> = () => {
    const { query, actionChangePage, actionSort, actionSearch, updateQueryParams } =
        useSearchQuery(getSearchColums(columnsList, GET_ARRAY_OF_KEY))
    const { data, isLoading } = useGetUsers(query)
    const [columns, watchSearchList, control, setValue] = useSearchableList(columnsList, updateQueryParams)
    const deleteAccount = useDeleteAccount()
    const [openConfirmDialog, props] = useConfirmDialog(deleteAccount.mutate)

    return (
        <Paper>
            <ConfirmDialog
                content="Vui lòng cân nhắc trước thu hồi và xóa tài khoản.
                 Nếu bạn đồng ý thu hồi và xóa tài khoản bạn hãy nhấn Xác nhận."
                title="Bạn có thật sự muốn thu hồi và xóa tài khoản này không?"
                {...props}
            />
            <Typography
                variant="h4"
                fontWeight='500'
                sx={{ px: 3, py: 2 }}
            >
                Quản lí tài khoản
            </Typography>

            <React.Fragment>
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
                    keyTable='user-table'
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
                                    <Tooltip title="Reset mật khẩu">
                                        <IconButton
                                            color='primary'
                                            onClick={() => { }}
                                        >
                                            <ReplayIcon></ReplayIcon>
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Xóa và thu hồi">
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
            </React.Fragment>



        </Paper>
    )

}

export default UserPage;