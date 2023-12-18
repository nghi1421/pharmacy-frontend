import { useRef, useState } from "react";
import { ExportData, ExportDetailPdf } from "../types/ExportType";
import { useReactToPrint } from "react-to-print";
import { useLocation } from "react-router-dom";

export const useExportPdf = () => {
    const { state } = useLocation()
    const [exportData, setExportData] = useState<ExportData | null>(state?.exportTodayIndex.export ?? null)
    const [exportDetailData, setExportDetailData] = useState<ExportDetailPdf[] | null>(state?.exportTodayIndex.exportDetail ?? null)
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