import { Box, Button, Divider, Grid, Paper } from "@material-ui/core";
import React from "react";
import { CartItemObject } from "./Cart";
import { Link } from "react-router-dom";
import { AppState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { IdType } from "../../models/shared-types";
import { updateCart } from "../../actions/requests";

interface CartItemProps {
  product: CartItemObject;
}

const CartItem = ({ product }: CartItemProps) => {
  const dispatch = useDispatch();
  const cartObj = useSelector((state: AppState) => state.userCart.cart);
  const item = product.item;

  const handleDelete = (itemId: IdType) => {
    const updatedCart = {
      _id: cartObj._id,
      items: cartObj.items.filter(
        (i) =>
          i.itemId !== itemId || i.selectedItemSize !== product.selectedItemSize
      ),
      userId: cartObj.userId,
    };

    updateCart(dispatch, updatedCart);
  };

  return (
    <Box m={3} key={item?._id} style={{ minHeight: 150 }}>
      <Paper style={{ backgroundColor: "transparent" }}>
        <Grid container>
          <Grid item sm={2}>
            <img
              src={item?.imageUrl}
              style={{ maxWidth: "9rem", maxHeight: "9rem" }}
            />
          </Grid>
          <Grid item sm={8}>
            <div style={{ padding: 5 }}>
              <Link
                to={{
                  pathname: `/products/${item?._id}`,
                  state: { selectedProduct: product.item },
                }}
              >
                {item?.name}
              </Link>
            </div>
            <div style={{ padding: 5 }}>{item?.description}</div>
            <div style={{ padding: 5 }}>Size: {product?.selectedItemSize}</div>
            <div style={{ padding: 5 }}>Quantity: {product?.quantity}</div>
            <h4> Price: {item?.price * product?.quantity} €</h4>

            <Box m={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleDelete(item?._id)}
              >
                Delete
              </Button>
            </Box>
          </Grid>
          <Divider />
        </Grid>
      </Paper>
    </Box>
  );
};

export default CartItem;
