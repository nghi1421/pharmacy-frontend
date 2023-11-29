import { Box, Button, InputAdornment, Paper, TextField, Typography } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { TodaySalesRow } from "./TodaySalesRow";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  customTextField: {
    "& input::placeholder": {
      fontSize: "15px"
    }
    },
})

export interface SalesTodayType {
    id: number
    type: number
    exportDate: string
    total: string
    checked: boolean
}

interface TodaySalesProps {
    setSelectedExport: (n: number|null) => void
}

export const TodaySales: React.FC<TodaySalesProps> = ({setSelectedExport}) => {
    const classes = useStyles();
    const navigate = useNavigate()
    const [cloneSalesToday, setCloneSalesToday] = useState<SalesTodayType[]>([{
        id: 1,
        type: 1,
        exportDate: '11:22:02',
        total: '10,000đ',
        checked: false,
    },
    {
        id: 2,
        type: 2,
        exportDate: '11:22:02',
        total: '10,000đ',
        checked: false,
        },
    {
        id: 3,
        type: 1,
        exportDate: '11:22:02',
        total: '10,000đ',
        checked: false,
    },{
        id: 4,
        type: 1,
        exportDate: '11:22:02',
        total: '10,000đ',
        checked: false,
    }])
    const [salesToday, setSalesToday] = useState<SalesTodayType[]>([{
        id: 1,
        type: 1,
        exportDate: '11:22:02',
        total: '10,000đ',
        checked: false,
    },
    {
        id: 2,
        type: 2,
        exportDate: '11:22:02',
        total: '10,000đ',
        checked: false,
        },
    {
        id: 3,
        type: 1,
        exportDate: '11:22:02',
        total: '10,000đ',
        checked: false,
    },{
        id: 4,
        type: 1,
        exportDate: '11:22:02',
        total: '10,000đ',
        checked: false,
    }])
    const [search, setSearch] = useState<string>('');

    const handleSearchData = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = event.target.value as string
        if (searchTerm.trim().length > 0) {
            setSalesToday(cloneSalesToday.filter(
                sale => sale.id === parseInt(searchTerm.trim())
            ))
        }
        else {
            setSalesToday(cloneSalesToday)
        }
        setSearch(event.target.value as string);
    }

    const updateSalesToday = (saleToday: SalesTodayType) => {
        setSelectedExport(saleToday.id)
        setSalesToday(salesToday.map((sale: SalesTodayType) => sale.id === saleToday.id
            ? { ...sale, checked: true }
            : {...sale, checked: false}))
        setCloneSalesToday(cloneSalesToday.map((sale: SalesTodayType) => sale.id === saleToday.id
            ? { ...sale, checked: true }
            : {...sale, checked: false}))
    }

    const reset = () => {
        setSalesToday(salesToday.map((sale: SalesTodayType) => { return {  ...sale, checked: false }}))
        setCloneSalesToday(cloneSalesToday.map((sale: SalesTodayType) => { return {  ...sale, checked: false }}))
    }
    return (
        <Paper sx={{
            position: 'fixed',
            right: 20,
            px: 2,
            py: 1,
            width: '25%',
            zIndex: 10000, 
        }}
        >
            <Typography variant="h5" mt='10px' mb='10px' fontWeight='bold'>
                Đơn hàng trong ngày
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                    onChange={handleSearchData}
                    classes={{ root: classes.customTextField }}
                    size='small'
                    sx={{ flexGrow: 1, my :'auto', flex: 3, mb: 2}}
                    label="Tìm kiếm"
                    value={search}
                    placeholder="Tìm kiếm theo mã"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment
                                position='end'
                            >
                                <SearchIcon />
                            </InputAdornment>
                        )
                    }}
                />
                <Button
                    variant="contained"
                    sx={{  height: 40, textTransform: 'none' }}
                    color='success'
                    onClick={() => {
                            setSelectedExport(null)
                            reset()
                            navigate('/sales/create')
                        }
                    }
                >Tạo mới</Button>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: 'lightBlue',
                p: 1,
                borderRadius: 1,
            }}>
                <Typography sx={{ flex: 1, fontWeight: 600 }}>Mã đơn</Typography>
                <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 600 }}>Thời gian</Typography>
                <Typography sx={{ flex: 2, textAlign: 'right', pr: 1, fontWeight: 600 }}>Tổng tiền</Typography>
            </Box>
            <Box sx={{ overflowY: 'auto', height: '55vh', boxShadow: 1 }}>
                {
                    salesToday.map(sale => 
                        <TodaySalesRow updateSalesToday={updateSalesToday} saleToday={sale} />
                    )
                }
            </Box>
            <Typography variant="body2" sx={{ fontWeight: 'bold', pt: 3, px: 2, pb: 1 }}>
                Tổng tiền: 120,000đ
            </Typography>
        </Paper>
    )
}