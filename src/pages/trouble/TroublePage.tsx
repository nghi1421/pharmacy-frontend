import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { FormInputText } from "../../components/form/FormInputText";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "../../utils/yup";
import { SelectableTable } from "../../components/SelectableTable";
import { ModalComponent } from "../../components/Modal";
import { useEffect, useState } from "react";
import { useSeachTrouble } from "../../hooks/useTrouble";
import { InventoryImport } from "../../components/InventoryImportRow";

export interface TroubleForm {
    batchId: string
    drugId: number
}

 // @ts-ignore
const troubleForm: Yup.ObjectSchema<TroubleForm> = yup.object({
    batchId: yup
        .string()
        .required(),
    drugId: yup
        .number()
        .required(),
});

const TroublePage: React.FC<{}> = () => {
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [change, setChange] = useState<number>(Math.random())
    const [inventoryImports, setInventoryImports] = useState<any[]>([])
    const searchTrouble = useSeachTrouble()
    const {
        handleSubmit,
        control,
    } = useForm<TroubleForm>({
        resolver: yupResolver(troubleForm)
    });

    const onSubmit = (data: TroubleForm) => {
        searchTrouble.mutate(data)
    }

    const [rowsData, setRowsData] = useState<any[]>([])
    useEffect(() => {
        if (searchTrouble.data) {

            setRowsData(searchTrouble.data.historySales)
            setInventoryImports(searchTrouble.data.inventoryImports)
            setChange(Math.random())
        }
    }, [searchTrouble.data])
    return (
        <Box sx={{ display: 'flex', gap: 3, flexDirection: 'column' }}>
            <ModalComponent
                title='Trả thuốc'
                initOpen={openModal}
                
                handleClose={() => setOpenModal(false)}
                children={<RecoveryDrugForm/>}
            ></ModalComponent>
            <Paper sx={{ px: 3, py: 2  }}>
                <Typography
                    variant="h4"
                    fontWeight='500'
                    marginBottom={2}
                >
                    Sự cố
                </Typography>

                <Grid spacing={2} container>
                    <Grid item xs={8} sm={3}>
                        <FormInputText
                            name="batchId"
                            control={control}
                            label="Mã lô thuốc"
                            placeholder='Nhập mã lô thuốc'
                        />
                    </Grid>
                    <Grid item xs={8} sm={3}>
                        <FormInputText
                            name="drugId"
                            control={control}
                            label="Mã thuốc"
                            placeholder='Nhập mã danh mục thuốc'
                        />
                    </Grid>
                    <Grid item xs={8} sm={3}>
                        <Button
                            variant="contained"
                            color="success"
                            sx={{
                                height: 40,
                                m: 'auto',
                                textTransform: 'none',
                            }}
                            onClick={handleSubmit(onSubmit)}
                        >
                            Tìm kiếm
                        </Button>
                    </Grid>

                </Grid>
           </Paper>
            <Paper sx={{ px:3, py: 2, }}>
                <Grid container spacing={3} >
                <Grid item xs={8} sm={6}>
                     <Typography
                        variant="h5"
                        marginBottom={2}
                        fontWeight='500'
                    >
                        Tồn kho
                    </Typography>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        backgroundColor: 'lightBlue',
                        p: 1,
                        borderRadius: 1,
                    }}>
                        <Typography sx={{ flex: 1, fontWeight: 600 }}>Mã phiếu nhập</Typography>
                        <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 600 }}>Thời gian nhập</Typography>
                        <Typography sx={{ flex: 2, textAlign: 'right', pr: 1, fontWeight: 600 }}>Tồn</Typography>
                    </Box>
                    <Box>
                        {
                            inventoryImports.map(inventoryImport => 
                                <InventoryImport inventoryImport={inventoryImport} />
                            )
                        }
                    </Box>
                </Grid>  
                  
                </Grid>
            </Paper>
            <SelectableTable
                key={change}
                setItem={(row) => {alert(row)}}
                rows={rowsData}
                openModal={() => { setOpenModal(true) }}
            ></SelectableTable>
        </Box>
    )
    
}

const RecoveryDrugForm = () => {
    const {
        handleSubmit,
        control,
    } = useForm<TroubleForm>({
        resolver: yupResolver(troubleForm)
    });

    return (
        <Grid spacing={2} container>
        <Grid item xs={8} sm={3}>
            <FormInputText
                name="batchId"
                control={control}
                label="Mã lô thuốc"
                placeholder='Nhập mã lô thuốc'
            />
        </Grid>
        <Grid item xs={8} sm={3}>
            <FormInputText
                name="drugId"
                control={control}
                label="Mã thuốc"
                placeholder='Nhập mã danh mục thuốc'
            />
        </Grid>
        <Grid item xs={8} sm={3}>
            <Button
                variant="contained"
                color="success"
                sx={{
                    height: 40,
                    m: 'auto',
                    textTransform: 'none',
                }}
                // onClick={handleSubmit(onSubmit)}
            >
                Trả thuốc
            </Button>
        </Grid>

    </Grid>
    )
}

export default TroublePage;