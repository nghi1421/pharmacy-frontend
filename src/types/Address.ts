export type Province = {
    code: string
    name: string
}

export type District = {
    code: string
    name: string
}

export type Ward = {
    code: string
    name: string
}

export class Address {
    province: Province;

    district: District;

    ward: Ward;

    detail: string;

    constructor() {
        this.province = { code: '', name: ''}
        this.district = { code: '', name: ''}
        this.ward = { code: '', name: '' }
        this.detail = ''
    }
    
    public setProvince(province: Province): this {
        this.province = province
        return this
    }

    public setDistrict(district: District): this {
        this.district = district
        return this
    }

    public setWard(province: Province): this {
        this.province = province
        return this
    }

    public getFullAddress(): string {
        return `${this.detail}, ${this.ward.name}, ${this.district.name}, ${this.province.name}`
    }
}