import { Box, CircularProgress, Divider, Paper, Typography } from "@mui/material";
import TableComponent from "../../components/table/TableComponent";
import { Column } from "../../types/Column";
import { TypeByUse } from "../../types/TypeByUse";
import { useGetTypesQuery } from "../../redux/api/typeByUseApi";
import { formatDateTime } from "../../utils/format";

function createData({id, name, detail, createdAt, updatedAt}: TypeByUse) {
    return {
        id, name, detail, 
        createdAt: formatDateTime(createdAt),
        updatedAt: formatDateTime(updatedAt),
    };
}

const columns: Column[] = [
    { key: 'id', value: 'Mã chức vụ'},
    { key: 'name', value: 'Tên công dụng' },
    { key: 'detail', value: 'Chi tiết' },
    { key: 'createdAt', value: 'Thời gian tạo'},
    { key: 'updatedAt', value: 'Cập nhật'},
]

const TypeByUsePage: React.FC<{}> = () => {
    let { data, error, isLoading } = useGetTypesQuery()
    if (!isLoading) {
        data = {...data,data: data.data.map((type: TypeByUse) => {
            return createData(type)
        })};
    }
    return (
        <Paper>
            <Typography
                variant="h4"
                fontWeight='500'
                sx={{ px:3, py: 2 }}
            >
                Quản lí phân loại công dụng thuốc
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
                        keyTable='type-by-use-table'
                        columns={columns}
                    ></TableComponent>
            }
        </Paper>
    )
    
}

export default TypeByUsePage;