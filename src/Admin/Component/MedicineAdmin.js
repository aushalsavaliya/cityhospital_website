import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function MedicineAdmin(props) {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <h1>Medicine Admin</h1>
      <br />
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Medicine
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Medicine</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Madicine"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="Pirce"
            name="Pirce"
            label="Pirce"
            type="Pirce"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="qnt"
            name="qnt"
            label="Qntity"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="expiry"
            name="expiry"
            label="Expiry"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>

  );
}

export default MedicineAdmin;