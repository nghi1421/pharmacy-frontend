import { Box, CircularProgress, Divider, Paper, Typography } from "@mui/material";
import TableComponent from "../../components/table/TableComponent";
import { useGetUsersQuery } from "../../redux/api/userApi";
import { Column } from "../../types/Column";

function createData(
  id: number,
  username: string,
  createdAt: string,
  updatedAt: string,
) {
  return { id, username, createdAt, updatedAt };
}

// const rows = [
//   createData(1, 'thanhnghi123', 'Quản lí', 'Nguyễn Thanh Nghị', new Date().toLocaleString(), new Date().toLocaleString()),
//   createData(2, 'thanhnghi123', 'Quản lí', 'Nguyễn Thanh Nghị', new Date().toLocaleString(), new Date().toLocaleString()),
//   createData(3, 'thanhnghi123', 'Quản lí', 'Nguyễn Thanh Nghị', new Date().toLocaleString(), new Date().toLocaleString()),
//   createData(4, 'thanhnghi123', 'Quản lí', 'Nguyễn Thanh Nghị', new Date().toLocaleString(), new Date().toLocaleString()),
//   createData(5, 'thanhnghi123', 'Quản lí', 'Nguyễn Thanh Nghị', new Date().toLocaleString(), new Date().toLocaleString()),
//   createData(6, 'thanhnghi123', 'Quản lí', 'Nguyễn Thanh Nghị', new Date().toLocaleString(), new Date().toLocaleString()),
//   createData(7, 'thanhnghi123', 'Quản lí', 'Nguyễn Thanh Nghị', new Date().toLocaleString(), new Date().toLocaleString()),
//   createData(8, 'thanhnghi123', 'Quản lí', 'Nguyễn Thanh Nghị', new Date().toLocaleString(), new Date().toLocaleString()),
//   createData(9, 'thanhnghi123', 'Quản lí', 'Nguyễn Thanh Nghị', new Date().toLocaleString(), new Date().toLocaleString()),
//   createData(10, 'thanhnghi123', 'Quản lí', 'Nguyễn Thanh Nghị', new Date().toLocaleString(), new Date().toLocaleString()),
// ];

const columns: Column[] = [
  { key: 'id', value: 'Mã tài khoản'},
  { key: 'username', value: 'Tên đăng nhập'},
  { key: 'createdAt', value: 'Ngày tạo'},
  { key: 'updatedAt', value: 'Ngày cập nhật'},
]

const UserPage: React.FC<{}> = () => {
    // const { data, error, isLoading } = useGetUsersQuery()
    const isLoading = true
    const data = {data: []}
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
                        columns={columns}
                    ></TableComponent>
            }
            
        </Paper>
    )
    
}

export default UserPage;