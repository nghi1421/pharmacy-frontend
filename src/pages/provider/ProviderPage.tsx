import { Box, Button, CircularProgress, Divider, Paper, Typography } from "@mui/material";
import TableComponent from "../../components/table/TableComponent";
import { Column } from "../../types/Column";
import { Provider } from "../../types/Provider";
import { formatDateTime } from "../../utils/format";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useGetProviders } from "../../api/providerApi";

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
    let { data, isLoading } = useGetProviders()
    const navigate = useNavigate()

    if (!isLoading) {
        data = {...data,data: data.data.map((provider: Provider) => {
            return createData(provider)
        })};
    }

    const clickAdd = () => {
        navigate('/providers/create')
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
                    Thêm công ty dược
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
                        keyTable='provider-table'
                        columns={columns}
                    ></TableComponent>
            }
        </Paper>
    )
    
}

export default ProviderPage;