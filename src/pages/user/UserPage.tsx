import { Box, CircularProgress, Divider, Paper, Typography } from "@mui/material";
import TableComponent from "../../components/table/TableComponent";
import { useGetUsersQuery } from "../../redux/api/userApi";
import { Column } from "../../types/Column";
import { User } from '../../types/User';
import { formatDateTime } from "../../utils/format";
import { Role } from "../../types/Role";
import { useGetUsers } from "../../api/userApi";

function createData(
    id: number,
    username: string,
    role: Role, 
    createdAt: string,
    updatedAt: string,
) {
    return {
        id, username,
        role: role.name,
        createdAt: formatDateTime(createdAt),
        updatedAt: formatDateTime(updatedAt),
    };
}

const columns: Column[] = [
  { key: 'id', value: 'Mã tài khoản'},
  { key: 'username', value: 'Tên đăng nhập'},
  { key: 'role', value: 'Quyền'},
  { key: 'createdAt', value: 'Thời gian tạo'},
  { key: 'updatedAt', value: 'Cập nhật'},
]

const UserPage: React.FC<{}> = () => {
    let { data, isLoading } = useGetUsers()

    if (!isLoading) {
        data = {...data,data: data.data.map((user: User) => {
            return createData(user.id, user.username, user.role, user.createdAt, user.updatedAt)
        })};
    }
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
                    <TableComponent
                        rows={data.data}
                        keyTable='user-table'
                        columns={columns}
                    ></TableComponent>
            }
            
        </Paper>
    )
    
}

export default UserPage;