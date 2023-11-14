import { Paper, Typography } from "@mui/material"

const DetailPage = () => {
    return (
        <Paper sx={{ px: 6, py: 4 }}>
            <h1>This is detail page</h1>
            {/* <Typography variant="h4" gutterBottom mb='20px'>
                Thông tin phiếu xuất hàng
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Grid container spacing={1.5} width='70%' sx={{ flex: 5 }}>
                    <Grid item xs={8} sm={4}>
                        <Controller
                            name='phoneNumber'
                            control={customerControl}
                            render={({
                                field: { onChange, value },
                                fieldState: { error },
                            }) => (
                            <TextField
                                size='small'
                                type='text'
                                helperText={error ? error.message : null}
                                error={!!error}
                                onChange={onChange}
                                onBlur={() => {
                                    searchCustomer.mutate(watch('phoneNumber'))
                                }
                                }
                                value={value}
                                fullWidth
                                label="Số điện thoại khách hàng"
                                variant="outlined"
                                placeholder='Nhập số điện thoại khách hàng'
                            />
                            )}
                        />
                    </Grid>
                    <Grid item xs={8} sm={6}>
                        <FormInputText
                            size="small"
                            name="name"     
                            control={customerControl}
                            label="Họ và tên khách hàng"
                            placeholder='Nhập họ và tên khách hàng'
                        />
                    </Grid>
                    <Grid item xs={8} sm={2}>
                        <FormInputDropdown
                            name="gender"
                            control={customerControl}
                            label="Giới tính"
                            placeholder='Giới tính'
                            list={genders}
                        />
                    </Grid>
                    <Address setAddress={setAddress} size='small' initAddress={address} />
                    
                </Grid>

                <Grid container spacing={1.5} width='30%' sx={{ flex: 2 }}>
                    <Grid item xs={8} sm={6}>
                        <FormInputDate
                            name="exportDate"
                            control={control}
                            label="Ngày xuất hàng"
                            placeholder='x'
                        />
                    </Grid>

                    <Grid item xs={8} sm={6}>
                        <FormInputText
                            name="prescriptionId"
                            control={control}
                            label="Mã đơn thuốc"
                            placeholder='Nhập mã đơn thuốc/toa thuốc'
                        />
                    </Grid>

                    <Grid item xs={8} sm={12}>
                        <FormInputText
                            name="note"
                            control={control}
                            label="Ghi chú"
                            placeholder='Nhập ghi chú'
                        />
                    </Grid>
                </Grid>
            </Box>
                
                
            <Grid container spacing={3} marginTop={2}>
                <Grid item xs={12} sm={12} container>
                    <Typography mb='20px' variant="subtitle2" sx={{ fontWeight: 'fontWeightBold', mt: 2, fontSize: 16 }}>
                        Thuốc đã chọn
                    </Typography>
                    <TableExportSelectDrug
                        rows={selectedDrugs}
                        tooltip='Nhấn để bỏ chọn thuốc'
                        keyTable='selected-drug-export-category-table-key'
                        action={unCheckDrugCategory}
                        update={updateQuantity}
                    /> 
                </Grid>

                <Grid item xs={12} sm={12} container 
                    sx={{
                        display: 'flex',
                        justifyContent: "end",
                        gap: 4
                    }}
                >
                    <Typography variant="subtitle2" sx={{  }}>
                        Tổng tiền (chưa tính VAT): { pay[0] ? pay[0].toLocaleString() : '_'} VND
                    </Typography>

                    <Typography variant="subtitle2" sx={{  }}>
                        Tiền thuế VAT: { pay[1] ? pay[1].toLocaleString() : '_'} VND
                    </Typography>

                    <Typography variant="subtitle2" sx={{ color: "#148c07"  }}>
                        Tổng tiền: { pay[2] ? pay[2].toLocaleString() : '_'} VND
                    </Typography>
                </Grid>

            </Grid> */}
        </Paper>
    )
}

export default DetailPage