import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

interface ModalProps {
    title: string;
    initOpen: boolean;
    handleClose: () => void;
    children: React.ReactNode
}

export const ModalComponent: React.FC<ModalProps> = ({ title, initOpen, handleClose, children}) => {
    return (
        <div>
            <Modal
                open={initOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        { title }
                    </Typography>
                    
                    { children }
                </Box>
            </Modal>
        </div>
  );
}