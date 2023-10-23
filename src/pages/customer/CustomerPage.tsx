import { Box, Button, CircularProgress, Divider, Paper, Typography } from "@mui/material";
import TableComponent from "../../components/table/TableComponent";
import { Column } from "../../types/Column";
import { Customer } from "../../types/Customer";
import { useGetCustomersQuery } from "../../redux/api/customerApi";
import { GenderEnum } from "../../types/GenderEnum";
import { formatDate } from "../../utils/format";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function createData({id, name, gender, dob, phoneNumber, email}: Customer) {
    return {
        id, name, phoneNumber, email,
        gender: GenderEnum[gender],
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
    const navigate = useNavigate()
    let { data, error, isLoading } = useGetCustomersQuery()
    if (!isLoading) {
        data = {...data,data: data.data.map((customer: Customer) => {
            return createData(customer)
        })};
    }

    const clickAdd = () => {
        navigate('/customers/create')
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
                    Quản lí khách hàng
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
                        rows={data.data}
                        keyTable='customer-table'
                        columns={columns}
                    ></TableComponent>
            }
        </Paper>
    )
    
}

export default CustomerPage;