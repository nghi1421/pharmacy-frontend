import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface ConfirmDiaLogProps {
    content: string;
    title: string;
    open: boolean;
    handleClose: () => void;
    handleConfirm: () => void;
}

const ConfirmDialog: React.FC<ConfirmDiaLogProps> =
    ({ content, title, open, handleClose, handleConfirm }) => {

  return (
    <div>
      <Dialog
        open={open}
        onClose={ handleClose }
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button
                color='primary'
                variant="contained"
                sx={{
                    textTransform: 'none',
                }}
                onClick={handleConfirm}
            >
                Xác nhận
            </Button>
            <Button
                variant="outlined"
                color='primary'
                sx={{
                    textTransform: 'none',
                }}
                onClick={handleClose}
            >
                Trở về
            </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfirmDialog