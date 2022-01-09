import React, { useState } from 'react';
import { Dialog, Container, DialogTitle, DialogActions, Button, TextField } from '@material-ui/core';
import useStyles from '../styles';
import { LoginActions } from '../../models/user-types';
import { useSelector, useDispatch } from 'react-redux';
import { ReduxState } from '../../models/shared-types';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { AppState } from '../../store';
import { Order } from '../../models/order-model';
import { createOrder } from '../../actions/orderActions';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  amount: number;
}

const OrderDialog = ({open, onClose, amount}: DialogProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClose = () => {
    onClose();
  };

  const userLogin: LoginActions = useSelector(
    (state: ReduxState) => state.userLogin
  );

  const { userInfo } = userLogin;
  const [firstName, setFirstName] = useState(userInfo?.firstName);
  const [lastName, setLastName] = useState(userInfo?.lastName);
  const [email, setEmail] = useState(userInfo?.email);
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState('');

  const cartObj = useSelector((state: AppState) => state.userCart.cart);

  const allProducts = useSelector(
    (state: AppState) => state.allProducts.products
  );

  const order: Order = {
    userId: cartObj.userId,
    items: cartObj.items?.flatMap((item) => {
      const product = allProducts.find((p) => p._id === item.itemId);
      return {
        item: product,
        quantity: item?.quantity,
        selectedItemSize: item?.selectedItemSize,
      };
    }),
    amount: amount,
    address: address,
    zipCode: zipCode,
    updatedAt: new Date()
  };

  const handleSubmit = () => {
    dispatch(createOrder(order));
    // order.items.forEach((i) => {
    //   if (i.itemsInStock < i.qty) {
    //     console.log('Not enough');
    //   } else {
    //     updateProduct(dispatch, i);
    //   }
    // });
    handleClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="md">
      <DialogTitle>
          Finish your order
        </DialogTitle>
      <Container maxWidth="md" className={classes.orderContainer}>
        <TextField
          label="First Name"
          variant="outlined"
          size="medium"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          defaultValue={userInfo?.firstName}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          size="medium"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          defaultValue={userInfo?.lastName}
        />
        <TextField
          label="Email"
          variant="outlined"
          size="medium"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          defaultValue={userInfo?.email}
        />
        <TextField
          label="Address"
          variant="outlined"
          size="medium"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        />
        <TextField
          label="Zip code"
          variant="outlined"
          size="medium"
          value={zipCode}
          onChange={(event) => setZipCode(event.target.value)}
        />
        <FormControlLabel
          value="top"
          control={<Checkbox color="primary" />}
          label="Cash on Delivery"
          labelPlacement="end"
        />
      </Container>
      <DialogActions>
          <Container>
            <Button onClick={handleClose} className={classes.btn}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              color="inherit"
            >
              Confirm
            </Button>
          </Container>
        </DialogActions>
    </Dialog>   
  );
};

export default OrderDialog;