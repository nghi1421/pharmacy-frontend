import {
    CircularProgress,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material"
import React, {
    ChangeEvent,
    useEffect,
    useState
} from "react"
import {
    allProvince,
    getDistrictsByProvinceCode,
    getWardsByDistrictCode,
    getProvinceNameByCode,
    getDistrictNameByCode,
getWardNameByCode
} from '../utils/address'

import { District,
     Province,
     Ward } from "../types/Address";

interface AddressProp {
    initAddress?: string,
    setAddress: (address: string) => void;
}

const Address: React.FC<AddressProp> = ({setAddress, initAddress}) => {
    const [province, setProvince] = useState<Province>({ name: '', code: '' })
    const [district, setDistrict] = useState<District>({ name: '', code:'' })
    const [ward, setWard] = useState<Ward>({ name: '', code: '' })
    const [provinces, _] = useState<Province[]>(allProvince())
    const [districts, setDistricts] = useState<District[]>([])
    const [wards, setWards] = useState<Ward[]>([])
    const [detailAddress, setDetailAddress] = useState<string>('')

    function getFullAddress(): string {
        return `${detailAddress}/${ward.name}/${district.name}/${province.name}`
    }

    
    useEffect(() => {
        if (initAddress) {
            const splitAddress = initAddress.split('/')

            async function handledExistAddress(splitAddress: string[]) {
                try {
                    _(allProvince())
                    if (splitAddress[0].length > 0) {
                        setDetailAddress(splitAddress[0])
                    }
                    let localDistricts: District[] = []
                    let localWards: Ward[] = []
                    if (splitAddress[3].length > 0) {
                        const provinceObj: Province | undefined = provinces.find((province) => province.name === splitAddress[3])
                        if (provinceObj) {
                            localDistricts = await getDistrictsByProvinceCode(provinceObj.code)
                            setDistricts(localDistricts)
                            setProvince(provinceObj)
                        }
                    }

                    if (splitAddress[2].length > 0) {
                        const districtObj: District | undefined = localDistricts.find((district) => district.name === splitAddress[2])
                        if (districtObj) {
                            localWards = await getWardsByDistrictCode(districtObj.code)
                            setWards(localWards)
                            setDistrict(districtObj)
                        }
                    }

                    if (splitAddress[1].length > 0) {
                        const wardObj: Ward | undefined = localWards.find((ward) => ward.name === splitAddress[1])
                        if (wardObj) {
                            setWard(wardObj)
                        }
                    }
                }
                catch (error) {
                }
            }

            handledExistAddress(splitAddress);
        }
    }, [])
    
    useEffect(() => {
        setAddress(getFullAddress())
    })

    const handleProvinceChange = async (e: SelectChangeEvent) => {
        const data = await getDistrictsByProvinceCode(e.target.value as string)
        setDistricts(data)
        setProvince((prevProvines) => {
            if (prevProvines.code.length > 0) {
                setDistrict({name: '', code: ''})
                setWard({name: '', code: ''})
            }
            return {
                code: e.target.value as string,
                name: getProvinceNameByCode(e.target.value as string, provinces)
            }
        })
    }

    const handleDistrictChange = async (e: SelectChangeEvent) => {
        const data = await getWardsByDistrictCode(e.target.value as string)
        setWards(data)
        setDistrict({
            code: e.target.value as string,
            name: getDistrictNameByCode(e.target.value as string, districts)
        })
    }

    const handleWardChange = (e: SelectChangeEvent)=> {
        setWard({
            code: e.target.value as string,
            name: getWardNameByCode(e.target.value as string, wards)
        })
    }
    
    const handleChangeDetailAddress = (e: ChangeEvent<HTMLInputElement>)=> {
        setDetailAddress(e.target.value)
    }

    return (
        <>
            <Grid item xs={4}>
                <FormControl fullWidth> 
                    <InputLabel id="province-select-label"> 
                        Tỉnh thành 
                    </InputLabel> 
                    <Select
                        labelId="province-select-label"
                        id="province-select-label"
                        fullWidth
                        label="Tỉnh thành"
                        value={province.code}
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
                        value={district.code}
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
                        value={ward.code}
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
                    value={detailAddress}
                    onChange={handleChangeDetailAddress}
                /> 
            </Grid>
        </>
    )
}

export default Address