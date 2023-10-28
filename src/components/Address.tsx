// import {
//     CircularProgress,
//     FormControl,
//     Grid,
//     InputLabel,
//     MenuItem,
//     Select,
//     SelectChangeEvent,
//     TextField
// } from "@mui/material"
// import React, {
//     ChangeEvent,
//     useEffect,
//     useState
// } from "react"
// import {
//     allProvince,
//     getDistrictsByProvinceCode,
//     getWardsByDistrictCode,
//     getProvinceNameByCode,
//     getDistrictNameByCode,
// getWardNameByCode
// } from '../utils/address'

// import { District,
//      Province,
//      Ward } from "../types/Address";

// interface AddressProp {
//     address?: string;
//     setAddress: (address: string) => void;
// }

// const Address: React.FC<AddressProp> = ({ address, setAddress }) => {
//     const addressList: string[] = address.split(', ');
//     const [province, setProvince] = useState<Province>({ name: '', code: '' })
//     const [district, setDistrict] = useState<District>({ name: '', code:'' })
//     const [ward, setWard] = useState<Ward>({ name: '', code: '' })
//     const [provinceCode, setProvinceCode] = useState<string>('0');
//     const [districtCode, setDistrictCode] = useState<string>('0');
//     const [wardCode, setWardCode] = useState<string>('0');
//     const [provinces, _] = useState<Province[]>(allProvince())
//     const [districts, setDistricts] = useState<District[]>([])
//     const [wards, setWards] = useState<Ward[]>([])
//     const [detailAddress, setDetailAddress] = useState<string>('')

//     function getFullAddress(): string {
//         if (detailAddress.length > 0
//             && province.name.length > 0
//             && district.name.length > 0
//             && ward.name.length > 0) {
            
//             return `${detailAddress}, ${ward.name}, ${district.name}, ${province.name}`
//         }
//         else {
//             if (detailAddress.length > 0) {
//                 if (province.name.length > 0) {
//                     if (district.name.length > 0) {
//                         if (ward.name.length === 0) {
//                             return `${detailAddress}, ${district.name}, ${province.name}`
//                         }
//                         return `${detailAddress}, ${ward.name}, ${district.name}, ${province.name}`
//                     }
//                     else {
//                         return `${detailAddress}, ${province.name}`
//                     }
//                 }
//                 else {
//                     return `${detailAddress}`
//                 }
//             }
//             else {
//                 if (province.name.length > 0) {
//                     if (district.name.length > 0) {
//                         if (ward.name.length === 0) {
//                             return `${district.name}, ${province.name}`
//                         }
//                         return `${ward.name} , ${district.name}, ${province.name}`
//                     }
//                     else {
//                         return `${province.name}`
//                     }
//                 }
//                 else {
//                     return ``
//                 }
//             }
//         }
//     }

//     useEffect(() => {
//         if (address && address.length > 0) {
//             const addressList: string[] = address.split(', ');
//             if (addressList.length === 4) {
//                 setDetailAddress(addressList[0])
//                 const provinceObj: Province | undefined = provinces.find((province) => province.name === addressList[3])
//                 if (provinceObj) {
//                     setProvince(provinceObj)
//                     setProvinceCode(provinceObj.code)
//                 }
//         }
//     }
//     }, [])

//     useEffect(() => {
//         getDistrictsByProvinceCode(setDistricts, province.code)
//         setProvinceCode(province.code)
//         if (address && districts.length > 0) {
//             const districtObj: District | undefined = districts.find((district) => district.name === addressList[2])
//             if (districtObj) {
//                 setDistrict(districtObj)
//             }
//         }
//     }, [province])

//     useEffect(() => {
//         getWardsByDistrictCode(setWards, district.code)
//         setDistrictCode(district.code)
//         if (address && wards.length > 0) {
//             const wardObj: Ward | undefined = wards.find((ward) => ward.name === addressList[1])
//             console.log(wardObj)
//             if (wardObj) {
//                 setWard(wardObj)
//             }
//         }
//     }, [district])

//     useEffect(() => {
//         setAddress(getFullAddress())
//     })

//     const handleProvinceChange = (e: SelectChangeEvent) =>{
//         setProvince((prevProvines) => {
//             if (prevProvines.code.length > 0) {
//                 setDistrict({name: '', code: ''})
//                 setWard({name: '', code: ''})
//             }
//             return {
//                 code: e.target.value as string,
//                 name: getProvinceNameByCode(e.target.value as string, provinces)
//             }
//         })
//         setProvinceCode(e.target.value as string)
//     }

//     const handleDistrictChange = (e: SelectChangeEvent)=> {
//         setDistrict({
//             code: e.target.value as string,
//             name: getDistrictNameByCode(e.target.value as string, districts)
//         })
//         setDistrictCode(e.target.value as string)
//     }

//     const handleWardChange = (e: SelectChangeEvent)=> {
//         setWard({
//             code: e.target.value as string,
//             name: getWardNameByCode(e.target.value as string, wards)
//         })
//         setWardCode(e.target.value as string)
//     }
    
//     const handleChangeDetailAddress = (e: ChangeEvent<HTMLInputElement>)=> {
//         setDetailAddress(e.target.value)
//     }

//     return (
//         <>
//             <Grid item xs={4}>
//                 <FormControl fullWidth>
//                     <InputLabel id="province-select-label">
//                         Tỉnh thành
//                     </InputLabel>
//                     <Select
//                         labelId="province-select-label"
//                         id="province-select-label"
//                         fullWidth
//                         label="Tỉnh thành"
//                         onChange={handleProvinceChange}
//                         value={provinceCode}
//                         >
//                             {
//                                 provinces.length > 0 ?
//                                 provinces.map((province) => (
//                                     <MenuItem
//                                         key={`province-${province.code}`}
//                                         value={province.code}
//                                     >
//                                         {province.name}
//                                     </MenuItem>
//                                 ))
//                                 : <CircularProgress sx={{ margin: 'auto'}}/>
//                             }
//                     </Select>
//                 </FormControl>
//             </Grid>
                
//             <Grid item xs={4}>
//                 <FormControl fullWidth disabled={province.name === ''}>
//                     <InputLabel id="district-select-label">
//                         Quận/Huyện
//                     </InputLabel>
//                     <Select
//                         labelId="district-select-label"
//                         defaultValue=""
//                         id="district-simple-select"
//                         fullWidth
//                         label="Quận/Huyện"
//                         value={districtCode}
//                         onChange={handleDistrictChange}
//                         >
//                             {
//                                 districts.length > 0 ?
//                                 districts.map((district) => (
//                                     <MenuItem key={`district-${district.code}`} value={district.code}>{ district.name }</MenuItem>
//                                 )) : <CircularProgress sx={{ margin: 'auto'}} />
//                             }
//                     </Select>
//                 </FormControl>
//             </Grid>

//             <Grid item xs={4}>
//                 <FormControl fullWidth disabled={district.name.length === 0}>
//                     <InputLabel id="ward-select-label">
//                         Phường/Xã/Thị trấn
//                     </InputLabel>
//                     <Select
//                         labelId="ward-select-label"
//                         id="ward-select-label"
//                         fullWidth
//                         label="Phường/Xã/Thị trấn"
//                         value={wardCode}
//                         onChange={handleWardChange}
//                     >
//                         {
//                             wards.length > 0 ?
//                             wards.map((ward) => (
//                                 <MenuItem key={`ward-${ward.code}`} value={ward.code}>{ ward.name }</MenuItem>
//                             ))
//                             : <CircularProgress sx={{ margin: 'auto'}}/>
//                         }
//                     </Select>
//                 </FormControl>
//             </Grid>
//             <Grid item xs={8} sm={4}>
//                 <TextField
//                     id="address"
//                     name="address"
//                     label="Tên đường, hẻm, số nhà"
//                     placeholder="Nhập số nhà"
//                     type="text"
//                     fullWidth
//                     autoComplete="address"
//                     value={detailAddress}
//                     onChange={handleChangeDetailAddress}
//                 />
//             </Grid>
//         </>
//     )
// }

// export default Address

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
    setAddress: (address: string) => void;
}

const Address: React.FC<AddressProp> = ({setAddress}) => {
    const [province, setProvince] = useState<Province>({ name: '', code: '' })
    const [district, setDistrict] = useState<District>({ name: '', code:'' })
    const [ward, setWard] = useState<Ward>({ name: '', code: '' })
    const [provinces, _] = useState<Province[]>(allProvince())
    const [districts, setDistricts] = useState<District[]>([])
    const [wards, setWards] = useState<Ward[]>([])
    const [detailAddress, setDetailAddress] = useState<string>('')

    function getFullAddress(): string {
        return `${detailAddress}, ${ward.name}, ${district.name}, ${province.name}`
    }

    useEffect(() => {
        getDistrictsByProvinceCode(setDistricts, province.code)
    }, [province])

    useEffect(() => {
        getWardsByDistrictCode(setWards, district.code)
    }, [district])

    useEffect(() => {
        setAddress(getFullAddress())
    })

    const handleProvinceChange = (e: SelectChangeEvent) =>{
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

    const handleDistrictChange = (e: SelectChangeEvent)=> {
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
                    value={detailAddress}
                    onChange={handleChangeDetailAddress}
                /> 
            </Grid>
        </>
    )
}

export default Address