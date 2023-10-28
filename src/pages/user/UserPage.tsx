import { Box, CircularProgress, Divider, Paper, Typography } from "@mui/material";
import TableComponent from "../../components/table/TableComponent";
import { Column } from "../../types/Column";
import { useGetUsers } from "../../hooks/useAccount";

const columns: Column[] = [
  { key: 'id', value: 'Mã tài khoản'},
  { key: 'username', value: 'Tên đăng nhập'},
  { key: 'role', value: 'Quyền'},
  { key: 'createdAt', value: 'Thời gian tạo'},
  { key: 'updatedAt', value: 'Cập nhật'},
]

const UserPage: React.FC<{}> = () => {
    let { data, isLoading } = useGetUsers()

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
                        rows={data}
                        keyTable='user-table'
                        columns={columns}
                    ></TableComponent>
            }
            
        </Paper>
    )
    
}

export default UserPage;