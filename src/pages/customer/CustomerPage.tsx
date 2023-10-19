import { Box, CircularProgress, Divider, Paper, Typography } from "@mui/material";
import TableComponent from "../../components/table/TableComponent";
import { Column } from "../../types/Column";
import { Customer } from "../../types/Customer";
import { useGetCustomersQuery } from "../../redux/api/customerApi";
import { GenderEnum } from "../../types/GenderEnum";
import { formatDate } from "../../utils/format";

function createData({id, name, gender, dob, phoneNumber, email}: Customer) {
    return {
        id, name, phoneNumber,
        gender: GenderEnum[gender],
        email,
        dob: !dob ? '_' : formatDate(dob),
    };
}

const columns: Column[] = [
    { key: 'id', value: 'Mã khách hàng'},
    { key: 'name', value: 'Họ tên' },
    { key: 'gender', value: 'Giới tính'},
    { key: 'phoneNumber', value: 'Số điện thoại'},
    { key: 'dob', value: 'Ngày sinh'},
    { key: 'email', value: 'Email'},
]

const CustomerPage: React.FC<{}> = () => {
    let { data, error, isLoading } = useGetCustomersQuery()
    if (!isLoading) {
        data = {...data,data: data.data.map((customer: Customer) => {
            return createData(customer)
        })};
    }
    return (
        <Paper>
            <Typography
                variant="h4"
                fontWeight='500'
                sx={{ px:3, py: 2 }}
            >
                Quản lí khách hàng
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
                        keyTable='customer-table'
                        columns={columns}
                    ></TableComponent>
            }
        </Paper>
    )
    
}

export default CustomerPage;