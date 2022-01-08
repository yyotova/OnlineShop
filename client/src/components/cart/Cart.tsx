import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import useStyles from "./styles";
import { AppState } from "../../store";
import { useSelector } from "react-redux";
import { IdType } from "../../models/shared-types";
import { ProductType } from "../../models/product-model";
import CartItem from "./CartItem";

export interface CartItemObject {
  item: ProductType;
  quantity: number;
  selectedItemSize: string;
}

interface ICart {
  userId: IdType;
  items: CartItemObject[];
}

const Cart = () => {
  const classes = useStyles();
  const cartObj = useSelector((state: AppState) => state.userCart.cart);
  const allProducts = useSelector(
    (state: AppState) => state.allProducts.products
  );

  const cart: ICart = {
    userId: cartObj.userId,
    items: cartObj.items?.flatMap((item) => {
      const product = allProducts.find((p) => p._id === item.itemId);
      return {
        item: product,
        quantity: item?.quantity,
        selectedItemSize: item?.selectedItemSize,
      };
    }),
  };

  const isEmpty = !cart.items.length;
  const getCartTotalPrice = () => {
    let sum = 0;
    cart.items.forEach((productItem) => {
      sum += +(productItem.item?.price * productItem.quantity);
    });
    return sum;
  };

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography variant="h5" className={classes.title}>
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
          fontWeight="fontWeightBold"
          p={3}
          m={2}
        >
          Your Shopping Cart
        </Box>
      </Typography>

      {isEmpty ? (
        <>
          <Typography variant="subtitle1">
            {" "}
            You have no products in your shopping cart!
          </Typography>
        </>
      ) : (
        <>
          <Grid container spacing={1}>
            <Grid item sm={9}>
              {cart.items.map((product) => (
                <CartItem product={product} />
              ))}
            </Grid>
          </Grid>

          <div className={classes.cardDetails}>
            <Typography variant="h5">
              Subtotal: {getCartTotalPrice()} €
            </Typography>

            <Button
              className={classes.checkoutButton}
              size="large"
              type="button"
              variant="contained"
              color="secondary"
            >
              Checkout
            </Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default Cart;
