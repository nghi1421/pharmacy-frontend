import { useState } from "react";


export const useFilter = (): any[] => {
    const [filterEl, setFilterEl] = useState<HTMLButtonElement | null>(null);

    const openSetting = Boolean(filterEl);

    const onOpenFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
        setFilterEl(e.currentTarget);
    };

    const onCloseFilter = () => {
        setFilterEl(null);
    };

    return [filterEl, openSetting, onOpenFilter, onCloseFilter]
}