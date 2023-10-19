import { Box, CircularProgress, Divider, Paper, Typography } from "@mui/material";
import TableComponent from "../../components/table/TableComponent";
import { Column } from "../../types/Column";
import { Staff } from "../../types/Staff";
import { useGetStaffsQuery } from "../../redux/api/staffApi";
import { GenderEnum } from "../../types/GenderEnum";
import { formatDate } from "../../utils/format";

function createData({id, name, gender, dob, phoneNumber, email, isWorking}: Staff) {
    return {
        id, name, phoneNumber,
        gender: GenderEnum[gender],
        email,
        dob: formatDate(dob),
        isWorking: isWorking ? '✔️' : '❌'
    };
}

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
    let { data, error, isLoading } = useGetStaffsQuery()
    if (!isLoading) {
        data = {...data,data: data.data.map((staff: Staff) => {
            return createData(staff)
        })};
    }
    return (
        <Paper>
            <Typography
                variant="h4"
                fontWeight='500'
                sx={{ px:3, py: 2 }}
            >
                Quản lí nhân viên
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

export default StaffPage;