import { useRef, useState } from "react";
import { ExportData, ExportDetailPdf } from "../types/ExportType";
import { useReactToPrint } from "react-to-print";

export const useExportPdf = () => {
    const [exportData, setExportData] = useState<ExportData | null>(null)
    const [exportDetailData, setExportDetailData] = useState<ExportDetailPdf[] | null>(null)
    let componentRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    // useEffect(() => {
    //     if (exportData && exportDetailData) {
    //         handlePrint();
    //     }
    // }, [exportData, exportDetailData])

    return {
        exportData,
        exportDetailData,
        setExportData,
        setExportDetailData,
        componentRef,
        handlePrint
    }
}