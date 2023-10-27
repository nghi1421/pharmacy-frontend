import { useState } from "react";

interface ConfirmDialog {
    open: boolean
    handleClose: () => void
    handleConfirm: () => void
}

export const useConfirmDialog = (fn: (s: string) => void) => {
    const [open, setOpen] = useState<boolean>(false);
    const [index, setIndex] = useState<string>('')

    const openConfirmDialog = (index: string) => {
        setIndex(index)
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        fn(index)
        setOpen(false);
    };

    const props: ConfirmDialog = {
        open: open,
        handleClose: handleClose,
        handleConfirm: handleConfirm,
    };

    return [openConfirmDialog, props] as const;
};
