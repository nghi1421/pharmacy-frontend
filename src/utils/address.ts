import provinces from '../../node_modules/hanhchinhvn/dist/tinh_tp.json'
import districts from '../../node_modules/hanhchinhvn/dist/quan_huyen.json'
import wards from '../../node_modules/hanhchinhvn/dist/xa_phuong.json'
import { District, Province, Ward } from '../types/Address';

const allProvince = () => {
    let array: Province[] = [];
    for (let key in provinces) {
        array.push({
            code: provinces[key].code,
            name: provinces[key].name_with_type,
        })
    }
    return array
}

// const getDistrictsByProvinceCode = (provinceCode: string) => {
//     return fetch(`../../../node_modules/hanhchinhvn/dist/quan-huyen/${provinceCode}.json`,{
//         headers : { 
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//         }
//     })
//     .then((response) => {
//         return response.json()
//     })
//     .then((data) => {
//         let array: District[] = [];
//         for (let key in data) {
//             array.push({
//                 code: data[key].code,
//                 name: data[key].name_with_type,
//             })
//         }
//         return array
//     })
// }

// const getWardsByDistrictCode = (districtCode: string) => {
//     return fetch(`../../../node_modules/hanhchinhvn/dist/xa-phuong/${districtCode}.json`,{
//         headers : { 
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//         }
//     })
//     .then((response) => {
//         return response.json()
//     })
//     .then((data) => {
//         let array: District[] = [];
//         for (let key in data) {
//             array.push({
//                 code: data[key].code,
//                 name: data[key].name_with_type,
//             })
//         }
//         return array
//     })
// }

const getDistrictsByProvinceCode = (provinceCode: string) => {
    let array: District[] = [];
    for (let key in districts) {
        if (districts[key].parent_code === provinceCode)
        array.push({
            code: districts[key].code,
            name: districts[key].name_with_type,
        })
    }
    return array
}

const getWardsByDistrictCode = (districtCode: string) => {
    let array: Ward[] = [];
    for (let key in wards) {
        if (wards[key].parent_code === districtCode)
        array.push({
            code: wards[key].code,
            name: wards[key].name_with_type,
        })
    }
    return array
}


const getProvinceNameByCode = (provinceCode: string, provinces: Province[]) => {
    const province: Province | undefined =
        provinces.find((province: Province) => province.code === provinceCode);
    return province ? province.name : ''
}

const getDistrictNameByCode = (districtCode: string, districts: District[]) => {
    const district: District | undefined =
        districts.find((district: District) => district.code === districtCode);
    return district ? district.name : ''
}

const getWardNameByCode = (wardCode: string, wards: Ward[]) => {
    const ward: Ward | undefined =
        wards.find((ward: Ward) => ward.code === wardCode);
    return ward ? ward.name : ''
}

const handleAddress = (address: string): string => {
    const splitAddress: string[] = address.split('/')
    return splitAddress.filter((data) => data.length > 0).join(', ');
}

export {
    allProvince,
    getDistrictsByProvinceCode,
    getWardsByDistrictCode,
    getProvinceNameByCode,
    getDistrictNameByCode,
    getWardNameByCode,
    handleAddress
}