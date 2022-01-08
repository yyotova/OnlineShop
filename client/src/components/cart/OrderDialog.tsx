import React from 'react';
import { Dialog, Container, DialogTitle, DialogActions, Button } from '@material-ui/core';
import useStyles from '../styles';

interface DialogProps {
  open: boolean;
  onClose: () => void;
}

const OrderDialog = ({open, onClose}: DialogProps) => {
  const classes = useStyles();

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="md">
      <Container maxWidth="md">
        <DialogTitle>
          Finish your order
        </DialogTitle>
        <DialogActions>
          <Container>
            <Button onClick={handleClose} className={classes.btn}>
              Cancel
            </Button>
            {/* <Button
              className={classes.yesAction}
              onClick={handleDeleteWar}
              color="inherit"
              disabled={deleteWarLoading || !!deleteWarError}
            >
              Confirm
            </Button> */}
          </Container>
        </DialogActions>
      </Container>
    </Dialog>   
  );
};

export default OrderDialog;