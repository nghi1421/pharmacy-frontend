import { Box, CircularProgress, Divider, Paper, Typography } from "@mui/material";
import TableComponent from "../../components/table/TableComponent";
import { Column } from "../../types/Column";
import { useGetDrugsQuery } from "../../redux/api/drugCategoryApi";
import { formatCurrency } from "../../utils/format";
import { DrugCategory } from "../../types/DrugCategory";

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
    let { data, error, isLoading } = useGetDrugsQuery()
    if (!isLoading) {
        data = {...data,data: data.data.map((drugCategory: DrugCategory) => {
            return createData(drugCategory)
        })};
    }
    return (
        <Paper>
            <Typography
                variant="h4"
                fontWeight='500'
                sx={{ px:3, py: 2 }}
            >
                Quản lí danh mục thuốc
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
                        keyTable='drug-category-table'
                        columns={columns}
                    ></TableComponent>
            }
        </Paper>
    )
    
}

export default DrugCategoryPage;