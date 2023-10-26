import { Box, Button, CircularProgress, Divider, IconButton, Paper, TableCell, Typography } from "@mui/material";
import TableComponent from "../../components/table/TableComponent";
import { Column } from "../../types/Column";
import { TypeByUse } from "../../types/TypeByUse";
import { useGetTypesQuery } from "../../redux/api/typeByUseApi";
import { formatDateTime } from "../../utils/format";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { useGetTypeByUses } from "../../api/typeByUseApi";

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
    let { data, isLoading } = useGetTypeByUses()
    const navigate = useNavigate()
    if (!isLoading) {
        data = {...data,data: data.data.map((type: TypeByUse) => {
            return createData(type)
        })};
    }

    const clickAdd = () => {
        navigate('/type-by-uses/create')
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
                    Quản lí phân loại công dụng thuốc
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
                        keyTable='type-by-use-table'
                        columns={columns}
                        hasAction={true}
                        action={(rowValue: any) => 
                                <TableCell
                                    align="left"
                                    key={`row-action-type-by-use-table-${rowValue.id}`}>
                                    <Box sx={{ display: 'flex' }}>
                                    <IconButton color='success' onClick={
                                        () => { navigate({
                                            pathname: `/type-by-uses/${rowValue.id}/edit`,
                                        }) }    
                                    }
                                    >
                                    <CreateIcon></CreateIcon>
                                  </IconButton>
                                  <IconButton color='error'>
                                    <DeleteIcon></DeleteIcon>
                                  </IconButton>
                                </Box>
                            </TableCell>
                        }
                    >

                    </TableComponent>
            }
        </Paper>
    )
    
}

export default TypeByUsePage;