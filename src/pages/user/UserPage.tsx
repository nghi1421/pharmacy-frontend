import { Box, CircularProgress, Divider, Paper, Typography } from "@mui/material";
import TableComponent from "../../components/table/TableComponent";
import { Column } from "../../types/Column";
import { useGetUsers } from "../../hooks/useAccount";
import { useSearchQuery } from '../../hooks/useSearchQuery'

const columns: Column[] = [
  { key: 'id', value: 'Mã tài khoản', sortable: true},
  { key: 'username', value: 'Tên đăng nhập', sortable: true},
  { key: 'role', value: 'Quyền', sortable: true},
  { key: 'createdAt', value: 'Thời gian tạo', sortable: true},
  { key: 'updatedAt', value: 'Cập nhật', sortable: true},
]

const UserPage: React.FC<{}> = () => {
    const { query, actionChangePage, actionSort } = useSearchQuery()
    const { data, isLoading } = useGetUsers(query)

    return (
        <Paper>
            <Typography
                variant="h4"
                fontWeight='500'
                sx={{ px:3, py: 2 }}
            >
                Quản lí tài khoản
            </Typography>
            <Divider></Divider>
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
                    data
                    ?
                        <TableComponent
                            rows={data.data}
                            keyTable='user-table'
                            columns={columns}
                            hasPagination={true}
                            page={query.page}
                            query={{ orderBy: query.orderBy, orderDirection: query.orderDirection }}
                            actionSort={actionSort}
                            actionChangePage={actionChangePage}
                            totalPage={data.meta.totalPage}
                        ></TableComponent>
                    :
                    <>No response</>
            }
            
        </Paper>
    )
    
}

export default UserPage;