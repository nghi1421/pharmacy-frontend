import { Box, Button, Checkbox, CircularProgress, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { allProvince, getDistrictsByProvinceCode, getWardsByDistrictCode, getProvinceNameByCode, getDistrictNameByCode, getWardNameByCode } from '../../utils/address'
import { District, Province, Ward } from "../../types/Address";
import { useIsFirstRender } from "../../hooks/firstRender";
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useGetPositionsQuery } from "../../redux/api/positionApi";
import { Position } from "../../types/Position";

const CreateStaff: React.FC = () => {
    const navigate = useNavigate()
    const isFirst = useIsFirstRender()
    const [province, setProvince] = useState<Province>({ name: '', code: '' })
    const [district, setDistrict] = useState<District>({ name: '', code:'' })
    const [ward, setWard] = useState<Ward>({ name: '', code: '' })
    const [provinces, setProvinces] = useState<Province[]>(allProvince())
    const [districts, setDistricts] = useState<District[]>([])
    const [wards, setWards] = useState<Ward[]>([])
    const [dob, setDob] = React.useState<Dayjs | null>(null);
    let { data, error, isLoading } = useGetPositionsQuery()
    const [position, setPosition] = useState<number>(1)

    
    useEffect(() => {
        if (!isFirst) {
            getDistrictsByProvinceCode(setDistricts, province.code)
            setWard({ name: '', code: ''})
        }
    }, [province])

    useEffect(() => {
        if (!isFirst) {
            getWardsByDistrictCode(setWards, district.code)
        }
    }, [district])

    const handleProvinceChange = (e: SelectChangeEvent) =>{
        setProvince({
            code: e.target.value as string,
            name: getProvinceNameByCode(e.target.value as string, provinces)
        })
    }

    const handleDistrictChange = (e: SelectChangeEvent) =>{
        setDistrict({
            code: e.target.value as string,
            name: getDistrictNameByCode(e.target.value as string, districts)
        })
    }

    const handleWardChange = (e: SelectChangeEvent) =>{
        setWard({
            code: e.target.value as string,
            name: getWardNameByCode(e.target.value as string, wards)
        })
    }

    const handlePositionChange = (e: SelectChangeEvent) =>{
        setPosition(parseInt(e.target.value))
    }

    const backToTable = () => {
        navigate('/staffs')
    }
    return (
    <Paper sx={{ px:6, py:4 }}>
        <Typography variant="h6" gutterBottom mb='20px'>
            Thông tin nhân viên
        </Typography>
        <Grid container spacing={4}>
                
            <Grid item xs={8} sm={5}>
                <TextField
                    required
                    id="name"
                    name="name"
                    label="Họ và tên"
                    placeholder="Nhập họ và tên nhân viên"
                    fullWidth
                    autoComplete="name"
                />
            </Grid>
                
            <Grid item xs={8} sm={5}>
                <TextField
                    required
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Số điện thoại"
                    placeholder="Nhập số điện thoại nhân viên"
                    fullWidth
                    autoComplete="phoneNumber"
                /> 
            </Grid>
                
            <Grid item xs={2}>
                <Box sx={{ minWidth: 10 }}>
                    <FormControl fullWidth>
                        <InputLabel id="gender-select-label">Giới tính</InputLabel>
                        <Select
                            labelId="gender-select-label"
                            defaultValue=""
                            id="gender-select"
                        // value={age}
                        label="Giới tính"
                        // onChange={()}
                        >
                            <MenuItem value={0}>Nữ</MenuItem>
                            <MenuItem value={1}>Nam</MenuItem>
                            <MenuItem value={2}>Khác</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Grid>
                
            <Grid item xs={8} sm={4}>
                <TextField
                    required
                    id="email"
                    name="email"
                    label="Email"
                    placeholder="Nhập email nhân viên"
                    type="email"
                    fullWidth
                    autoComplete="email"
                /> 
            </Grid>
                
            <Grid item xs={8} sm={4}>
                <TextField
                    required
                    id="identification"
                    name="identification"
                    label="CCCD"
                    placeholder="Nhập số CCCD"
                    type="text"
                    fullWidth
                    autoComplete="identification"
                /> 
            </Grid>
                
            <Grid item xs={4}>
                <FormControl fullWidth > 
                    <InputLabel id="position-select-label"> 
                        Chức vụ
                    </InputLabel> 
                    <Select 
                        labelId="position-select-label"
                        id="position-select-label"
                        fullWidth
                        label="Chức vụ"
                        value={position}
                        onChange={handlePositionChange}    
                    > 
                        {
                            !isLoading ?
                            data.data.map((position: Position) => (
                                <MenuItem value={position.id}>{ position.name }</MenuItem>                                     
                            )) 
                            : <CircularProgress sx={{ margin: 'auto'}}/>
                        }
                    </Select> 
                </FormControl>
            </Grid>
                
            <Grid item xs={4}>
                <FormControl fullWidth> 
                    <InputLabel key='12312321dsfdsfsdfct' id="province-select-label"> 
                        Tỉnh thành 
                    </InputLabel> 
                    <Select
                        labelId="province-select-label"
                        id="province-select-label"
                        fullWidth
                        label="Tỉnh thành"
                        onChange={handleProvinceChange} 
                        > 
                            {
                                provinces.length > 0 ? 
                                provinces.map((province) => (
                                    <MenuItem value={province.code}>{ province.name }</MenuItem>                                     
                                )) 
                                : <CircularProgress sx={{ margin: 'auto'}}/>
                            }
                    </Select> 
                </FormControl> 
            </Grid>
                
            <Grid item xs={4}>
                <FormControl fullWidth disabled={province.name === ''}> 
                    <InputLabel id="district-select-label"> 
                        Quận/Huyện
                    </InputLabel> 
                    <Select 
                        labelId="district-select-label"
                        defaultValue=""
                        id="district-simple-select"
                        fullWidth
                        label="Quận/Huyện"
                        onChange={handleDistrictChange} 
                        > 
                            {
                                districts.length > 0 ?
                                districts.map((district) => (
                                    <MenuItem value={district.code}>{ district.name }</MenuItem>                                     
                                )) : <CircularProgress sx={{ margin: 'auto'}} />
                            }
                    </Select> 
                </FormControl>  
            </Grid>
                
            <Grid item xs={4}>
                <FormControl fullWidth disabled={district.name.length === 0}> 
                    <InputLabel id="ward-select-label"> 
                        Phường/Xã/Thị trấn
                    </InputLabel> 
                    <Select 
                        labelId="ward-select-label"
                        id="ward-select-label"
                        fullWidth
                        label="Phường/Xã/Thị trấn"
                        onChange={handleWardChange} 
                    > 
                        {
                            wards.length > 0 ?
                            wards.map((ward) => (
                                <MenuItem value={ward.code}>{ ward.name }</MenuItem>                                     
                            )) 
                            : <CircularProgress sx={{ margin: 'auto'}}/>
                        }
                    </Select> 
                </FormControl>
            </Grid>
                
            <Grid item xs={8} sm={4}>
                <TextField
                    id="address"
                    name="address"
                    label="Tên đường, hẻm, số nhà"
                    placeholder="Nhập số nhà"
                    type="text"
                    fullWidth
                    autoComplete="address"
                /> 
            </Grid>
                
            <Grid item xs={8} sm={4}>
                <DatePicker
                    value={dob}
                    onChange={(newValue) => setDob(newValue)}
                    label="Ngày sinh"
                    maxDate={dayjs().subtract(18, 'year')}
                    format="DD-MM-YYYY"
                />
            </Grid>
            
            <Grid item xs={8}>
            <FormControlLabel
                control={<Checkbox color="secondary" name="saveAddress" value="1" defaultChecked />}
                label="Nhân viên đang làm việc"
            />
            </Grid>
            </Grid>

            <Grid container sx={{
                display: 'flex',
                justifyContent: "end",
                gap: 2
            }}>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        textTransform: 'none',
                    }}
                >
                    Thêm
                </Button>

                <Button
                    variant="contained"
                    color="error"
                    sx={{
                        textTransform: 'none',
                    }}
                    onClick={backToTable}
                >
                    Quay về
                </Button>
            </Grid>
           
            
    </Paper>)
}

export default CreateStaff