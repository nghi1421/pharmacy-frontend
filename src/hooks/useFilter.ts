import { useState } from "react";

export const useFilter = (): any[] => {
    const [filterEl, setFilterEl] = useState<HTMLButtonElement | null>(null);

    const openSetting = Boolean(filterEl);

    const onClickFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
        setFilterEl(e.currentTarget);
    };

    const onCloseFilter = () => {
        setFilterEl(null);
    };

    return [filterEl, openSetting, onClickFilter, onCloseFilter]
}