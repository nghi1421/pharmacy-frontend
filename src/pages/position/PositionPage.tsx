import { Box, CircularProgress, Divider, Paper, Typography } from "@mui/material";
import TableComponent from "../../components/table/TableComponent";
import { Column } from "../../types/Column";
import { Position } from "../../types/Position";
import { useGetPositionsQuery } from "../../redux/api/positionApi";
import { formatDateTime } from "../../utils/format";

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
    let { data, error, isLoading } = useGetPositionsQuery()
    if (!isLoading) {
        data = {...data,data: data.data.map((position: Position) => {
            return createData(position)
        })};
    }
    return (
        <Paper>
            <Typography
                variant="h4"
                fontWeight='500'
                sx={{ px:3, py: 2 }}
            >
                Quản lí chức vụ
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

export default PositionPage;