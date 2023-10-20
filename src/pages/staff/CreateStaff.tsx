import { Box, Button, Checkbox, CircularProgress, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography } from "@mui/material"
import React, { ChangeEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { allProvince, getDistrictsByProvinceCode, getWardsByDistrictCode, getProvinceNameByCode, getDistrictNameByCode, getWardNameByCode } from '../../utils/address'
import { District, Province, Ward } from "../../types/Address";
import { useDidUpdateEffect } from '../../hooks/useDidUpdateEffect'

const CreateStaff: React.FC = () => {
    const navigate = useNavigate()
    const [province, setProvince] = useState<Province>({ name: '', code: '' })
    const [district, setDistrict] = useState<District>({ name: '', code:'' })
    const [ward, setWard] = useState<Ward>({ name: '', code: '' })
    const [provinces, setProvinces] = useState<Province[]>(allProvince())
    const [districts, setDistricts] = useState<District[]>([])
    const [wards, setWards] = useState<Ward[]>([])

    useDidUpdateEffect(() => {
        getDistrictsByProvinceCode(setDistricts, province.code)
        setDistrict({ name: '', code: ''})
        setWard({ name: '', code: ''})
    }, [province])

    useDidUpdateEffect(() => {
        getWardsByDistrictCode(setWards, district.code)
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

    const backToTable = () => {
        navigate('/staffs')
    }
    return (
    <Paper sx={{ px:6, py:4 }}>
        <Typography variant="h6" gutterBottom>
            Shipping address
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
                        <InputLabel id="gender-select-label">Age</InputLabel>
                        <Select
                            labelId="gender-select-label"
                            defaultValue=""
                            id="gender-select"
                        // value={age}
                        label="Age"
                        // onChange={()}
                        >
                            <MenuItem value={0}>Nữ</MenuItem>
                            <MenuItem value={1}>Nam</MenuItem>
                            <MenuItem value={2}>Khác</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Grid>
            <Grid item xs={4}>
                <FormControl fullWidth> 
                    <InputLabel id="province-select-label"> 
                        Tỉnh thành 
                    </InputLabel> 
                    <Select
                        key='province-select'
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
                <FormControl fullWidth disabled={province.name === '' && district.name === ''}> 
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
                required
                id="city"
                name="city"
                label="City"
                fullWidth
                autoComplete="billing address-level2"
            />
            </Grid>
            <Grid item xs={8} sm={4}>
            <TextField id="state" name="state" label="State/Province/Region" fullWidth />
            </Grid>
            <Grid item xs={8} sm={4}>
            <TextField
                required
                id="zip"
                name="zip"
                label="Zip / Postal code"
                fullWidth
                autoComplete="billing postal-code"
            />
            </Grid>
            <Grid item xs={8} sm={4}>
            <TextField
                required
                id="country"
                name="country"
                label="Country"
                fullWidth
                autoComplete="billing country"
            />
            </Grid>
            <Grid item xs={8}>
            <FormControlLabel
                control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                label="Use this address for payment details"
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