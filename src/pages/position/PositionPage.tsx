import { Box, Button, CircularProgress, Divider, Paper, Typography } from "@mui/material";
import TableComponent from "../../components/table/TableComponent";
import { Column } from "../../types/Column";
import { Position } from "../../types/Position";
import { formatDateTime } from "../../utils/format";
import { useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";
import { useGetPositions } from "../../api/postionApi";

function createData({id, name, createdAt, updatedAt}: Position) {
    return {
        id, name,
        createdAt: formatDateTime(createdAt),
        updatedAt: formatDateTime(updatedAt),
    };
}

const columns: Column[] = [
    { key: 'id', value: 'Mã chức vụ'},
    { key: 'name', value: 'Tên' },
    { key: 'createdAt', value: 'Thời gian tạo'},
    { key: 'updatedAt', value: 'Cập nhật'},
]

const PositionPage: React.FC<{}> = () => {
    let { data, isLoading } = useGetPositions()
    const navigate = useNavigate()
    if (!isLoading) {
        data = {...data,data: data.data.map((position: Position) => {
            return createData(position)
        })};
    }

    const clickAdd = () => {
        navigate('/positions/create')
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
                    Quản lí chức vụ
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

export default PositionPage;