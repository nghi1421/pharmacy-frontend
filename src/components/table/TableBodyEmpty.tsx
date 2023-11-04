import { Box, Grid, TableCell, TableRow, Typography } from "@mui/material"
import EmptyImage from '../../assets/images/no-data.jpg'
import { Column } from "../../types/Column";

interface TableBodyEmpty {
    columns: Column[];
}

export const TableBodyEmpty: React.FC<TableBodyEmpty> = ({columns}) => {
    return (
        <TableRow key='empty-row'>
            <TableCell colSpan={columns.length + 1}>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    >
                    <Grid item xs={3}>
                        <Box
                            component="img"
                            sx={{
                            
                            height: 150,
                            width: 150,
                            }}
                            alt="No data."
                            src={EmptyImage}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Typography
                            variant="h6"
                            fontWeight='500'
                            
                        sx={{ opacity: '0.3', pb: 4}}
                        >
                        Không có dữ liệu
                        </Typography>
                    </Grid>      
                </Grid>
            </TableCell>
        </TableRow>
    )
}