import { Box, Button, CircularProgress, Divider, Paper, Typography } from "@mui/material";
import TableComponent from "../../components/table/TableComponent";
import { Column } from "../../types/Column";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useGetStaffs } from "../../hooks/useStaff";

const columns: Column[] = [
    { key: 'id', value: 'Mã nhân viên'},
    { key: 'name', value: 'Họ tên' },
    { key: 'gender', value: 'Giới tính'},
    { key: 'phoneNumber', value: 'Số điện thoại'},
    { key: 'dob', value: 'Ngày sinh'},
    { key: 'email', value: 'Email'},
    { key: 'isWorking', value: 'Đang làm việc'},
]

const StaffPage: React.FC<{}> = () => {
    let { data, isLoading } = useGetStaffs()
    const navigate = useNavigate()

    const clickAdd = () => {
        navigate('/staffs/create')
    }
    return (
        <Paper>
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
                    size="small"
                    onClick={clickAdd}
                >
                    <Add></Add>
                    <Typography
                        color="inherit"
                        fontSize='16px'
                        marginLeft='4px'
                    >
                        Thêm mới
                    </Typography>
                </Button>
            </Box>

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
                        keyTable='staff-table'
                        columns={columns}
                    ></TableComponent>
            }
        </Paper>
    )
    
}

export default StaffPage;