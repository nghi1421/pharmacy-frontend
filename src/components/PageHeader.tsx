import { Add } from "@mui/icons-material"
import { Box, Button, Typography } from "@mui/material"
import { green } from "@mui/material/colors"

interface PageHeaderProps {
    clickAdd: () => void;
    title: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ clickAdd, title}) => {
    return (
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
                {title}
            </Typography>
            <Button
                variant="contained"
                sx={{
                    backgroundColor: green[500],
                    '&:hover': {
                        backgroundColor: green[700],
                    }
                }}
                size="small"
                onClick={clickAdd}
            >
                <Add></Add>
                <Typography
                    textTransform='none'
                    variant='button'
                    color='inheric'
                    marginLeft='4px'
                >
                    Thêm mới
                </Typography>
            </Button>
        </Box>
    )
}