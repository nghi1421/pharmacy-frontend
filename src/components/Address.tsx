import {
    Autocomplete,
    Grid,
    TextField,
    TextFieldPropsSizeOverrides
} from "@mui/material"
import { OverridableStringUnion } from '@mui/types';
import React, {
    ChangeEvent,
    useEffect,
    useState
} from "react"
import {
    allProvince,
    getDistrictsByProvinceCode,
    getWardsByDistrictCode,
} from '../utils/address'

import { District,
     Province,
     Ward } from "../types/Address";
import { Item } from "../types/props/FormInputListProps";

interface AddressProp {
    initAddress?: string,
    setAddress: (address: string) => void;
    size?: OverridableStringUnion<"small" | "medium", TextFieldPropsSizeOverrides>
}

const Address: React.FC<AddressProp> = ({ setAddress, initAddress, size }) => {
    const [province, setProvince] = useState<Item|null>(null)
    const [district, setDistrict] = useState<Item|null>(null)
    const [ward, setWard] = useState<Item|null>(null)
    const [provinces, _] = useState<Province[]>(allProvince())
    const [districts, setDistricts] = useState<District[]>([])
    const [wards, setWards] = useState<Ward[]>([])
    const [detailAddress, setDetailAddress] = useState<string>('')
    const [oldAdress, setOldAddress] = useState<string>('')
    function getFullAddress(): string {
        return `${detailAddress}/${ward ? ward.label : ''}/${district ? district.label : ''}/${province ? province.label : ''}`
    }

    useEffect(() => {
        if (initAddress && initAddress !== oldAdress) {
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
                        const provinceObj: Province | undefined = provinces
                            .find((province) => province.name === splitAddress[3])
                        if (provinceObj) {
                            localDistricts = await getDistrictsByProvinceCode(provinceObj.code)
                            setDistricts(localDistricts)
                            setProvince({ label: provinceObj.name, value: provinceObj.code })
                        }
                    }

                    if (splitAddress[2].length > 0) {
                        const districtObj: District | undefined = localDistricts.find((district) => district.name === splitAddress[2])
                        if (districtObj) {
                            localWards = await getWardsByDistrictCode(districtObj.code)
                            setWards(localWards)
                            setDistrict({label: districtObj.name, value: districtObj.code})
                        }
                    }

                    if (splitAddress[1].length > 0) {
                        const wardObj: Ward | undefined = localWards.find((ward) => ward.name === splitAddress[1])
                        if (wardObj) {
                            setWard({label: wardObj.name, value: wardObj.code})
                        }
                    }
                }
                catch (error) {
                }
            }

            handledExistAddress(splitAddress);
            setOldAddress(initAddress)
        }
        
        if (initAddress.length === 0) {
            setProvince(null)
            setDetailAddress('')
        }
    }, [initAddress, oldAdress])
    
    useEffect(() => {
        if (province) {
            if (!initAddress || (initAddress && province.label !== initAddress.split('/')[3])) {
                async function selectProvince() {
                    const data = await getDistrictsByProvinceCode(province.value)
                    setDistricts(data)
                    setDistrict(null)
                    setWard(null)
                }
                selectProvince()
            }
        }
        else {
            setDistrict(null)
            setWard(null)
        }
    }, [province])

    useEffect(() => {
        if (district !== null) {
            if (!initAddress || (initAddress && district.label !== initAddress.split('/')[2])) {
                async function selectDistrict() {
                    const data = await getWardsByDistrictCode(district.value)
                    setWards(data)
                    setWard(null)
                }
                selectDistrict()
            }
        }
        else {
            setWard(null)
        }
    }, [district])

    useEffect(() => {
        setAddress(getFullAddress())
    })
    
    const handleChangeDetailAddress = (e: ChangeEvent<HTMLInputElement>)=> {
        setDetailAddress(e.target.value)
    }

    return (
        <>
            <Grid item xs={size ? 3 : 4}>
                <Autocomplete
                    options={provinces.map((province) => {return {label: province.name, value: province.code}})}
                    id='autocomplete'
                    value={province}
                    getOptionLabel={(option) => option.label}
                    isOptionEqualToValue={(option, value) => option.value === value.value}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            size={size ? size : 'small'}
                            placeholder={'Chọn tỉnh thành'}
                            label='Tỉnh thành'
                            variant="outlined"
                        />
                    )}
                    onChange={(_, data) => setProvince(data)}
                />

            </Grid>
                
            <Grid item xs={size ? 3 : 4}>
                <Autocomplete
                    key={province === null ? Math.random() : 'district-value'}
                    disabled={province === null ? true : false}
                    options={districts.map((province) => {return {label: province.name, value: province.code}})}
                    id='autocomplete'
                    value={district}
                    getOptionLabel={(option) => option.label}
                    isOptionEqualToValue={(option, value) => option.value === value.value}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            size={size ? size : 'small'}
                            
                            placeholder={'Chọn quận huyện'}
                            label='Quận/Huyện'
                            variant="outlined"
                        />
                    )}
                    onChange={(_, data) => setDistrict(data)}
                />
            </Grid>

            <Grid item xs={size ? 3 : 4}>
                <Autocomplete
                    key={province === null ? Math.random() : 'ward-value'}
                    disabled={district === null ? true : false}
                    options={wards.map((ward) => {return {label: ward.name, value: ward.code}})}
                    id='autocomplete'
                    value={ward}
                    getOptionLabel={(option) => option.label}
                    isOptionEqualToValue={(option, value) => option.value === value.value}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            size={size ? size : 'small'}
                            placeholder={'Chọn xã phường thị'}
                            label='Xã/phường/thị trấn'
                            variant="outlined"
                        />
                    )}
                    onChange={(_, data) => setWard(data)}
                />
            </Grid>
            <Grid item xs={8} sm={size ? 3 : 4}>
                <TextField
                    id="address"
                    size={size ? size : 'small'}
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