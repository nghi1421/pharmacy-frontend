import { Box, Button, CircularProgress, Divider, Paper, Typography } from "@mui/material";
import TableComponent from "../../components/table/TableComponent";
import { Column } from "../../types/Column";
import { useGetDrugsQuery } from "../../redux/api/drugCategoryApi";
import { formatCurrency } from "../../utils/format";
import { DrugCategory } from "../../types/DrugCategory";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function createData({id, name, price, form, unit, vat, type, minimalUnit}: DrugCategory) {
    return {
        id, name, price, form, unit, minimalUnit,
        vat: `${vat*100}%`,
        use: type.name,
        formatedPrice: formatCurrency(parseFloat(price))
    };
}

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
    let { data, isLoading } = useGetDrugsQuery()
    const navigate = useNavigate()
    if (!isLoading) {
        data = {...data,data: data.data.map((drugCategory: DrugCategory) => {
            return createData(drugCategory)
        })};
    }
    
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
                        rows={data.data}
                        keyTable='drug-category-table'
                        columns={columns}
                    ></TableComponent>
            }
        </Paper>
    )
    
}

export default DrugCategoryPage;