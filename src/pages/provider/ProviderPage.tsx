import { Box, CircularProgress, Divider, Paper, Typography } from "@mui/material";
import TableComponent from "../../components/table/TableComponent";
import { Column } from "../../types/Column";
import { Provider } from "../../types/Provider";
import { useGetProvidersQuery } from "../../redux/api/providerApi";
import { formatDateTime } from "../../utils/format";

function createData({id, name, address, createdAt, updatedAt, phoneNumber, email}: Provider) {
    return {
        id, name, phoneNumber, email, address,
        createdAt: formatDateTime(createdAt),
        updatedAt: formatDateTime(updatedAt),
    };
}

const columns: Column[] = [
    { key: 'id', value: 'Mã chức vụ'},
    { key: 'name', value: 'Tên' },
    { key: 'address', value: 'Địa chỉ' },
    { key: 'phoneNumber', value: 'Số điện thoại'},
    { key: 'email', value: 'Email'},
    { key: 'createdAt', value: 'Thời gian tạo'},
    { key: 'updatedAt', value: 'Cập nhật'},
]

const ProviderPage: React.FC<{}> = () => {
    let { data, error, isLoading } = useGetProvidersQuery()
    if (!isLoading) {
        data = {...data,data: data.data.map((provider: Provider) => {
            return createData(provider)
        })};
    }
    return (
        <Paper>
            <Typography
                variant="h4"
                fontWeight='500'
                sx={{ px:3, py: 2 }}
            >
                Quản lí nhà cung cấp
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
                        keyTable='provider-table'
                        columns={columns}
                    ></TableComponent>
            }
        </Paper>
    )
    
}

export default ProviderPage;