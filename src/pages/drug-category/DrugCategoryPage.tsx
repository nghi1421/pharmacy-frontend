import { Box, Button, CircularProgress, Divider, Paper, Typography } from "@mui/material";
import TableComponent from "../../components/table/TableComponent";
import { Column } from "../../types/Column";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useGetDrugCategories } from "../../hooks/useDrugCategory";

const columns: Column[] = [
    { key: 'id', value: 'Mã thuốc'},
    { key: 'name', value: 'Tên thuốc' },
    { key: 'formatedPrice', value: 'Giá' },
    { key: 'minimalUnit', value: 'Đơn vị bán'},
    { key: 'unit', value: 'Đơn vị nhập'},
    { key: 'vat', value: 'VAT'},
    { key: 'form', value: 'Dạng thuốc'},
    { key: 'use', value: 'Công dụng'},
]

const DrugCategoryPage: React.FC<{}> = () => {
    let { data, isLoading } = useGetDrugCategories()
    const navigate = useNavigate()
    
    const clickAdd = () => {
        navigate('/drug-categories/create')
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
                    Quản lí danh mục thuốc
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
                        keyTable='drug-category-table'
                        columns={columns}
                    ></TableComponent>
            }
        </Paper>
    )
    
}

export default DrugCategoryPage;