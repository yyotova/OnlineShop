import React, { useState } from "react";
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import { ProductType } from "../models/product-model";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import { Formik } from "formik";
import { number, object, string } from "yup";
import { updateCart } from "../actions/requests";
import { CartItemType, CartType } from "../models/cart-model";
import { LooseObject } from "../models/shared-types";

interface ProductView {
  selectedProduct: ProductType;
}

interface OptionQtyType {
  label: number;
  value: number;
}

interface OptionSizeType {
  label: string;
  value: string;
}

interface FormProps {
  size: string;
  quantity: number;
}

const ProductView = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<ProductView>();
  const { selectedProduct } = location.state;
  const { itemsInStock, size } = selectedProduct;
  const arrQty = [...Array(+itemsInStock).keys()];
  const cartObj = useSelector((state: AppState) => state.userCart.cart);

  const allCategories = useSelector(
    (state: AppState) => state.allCategories.categories
  );
  const categoryIds = selectedProduct.categories;
  const categories: string[] = [];
  categoryIds.forEach((id) => {
    const currentCategory = allCategories.find(
      (cat) => cat._id === id.toString()
    );
    if (currentCategory) {
      categories.push(currentCategory.name);
    }
  });

  const optionsQty = arrQty.map((qty) => ({
    label: qty + 1,
    value: qty + 1,
  })) as OptionQtyType[];

  const optionsSize = size.map((s) => ({
    label: s,
    value: s,
  })) as OptionSizeType[];

  const formInitialValues: FormProps = {
    size: "",
    quantity: undefined,
  };

  return (
    <Box style={{ maxWidth: 1000, margin: "0 auto" }}>
      <Box m={10}>
        <Grid container spacing={1}>
          <Grid item sm={5}>
            <div>
              <img src={selectedProduct?.imageUrl} width="100%" alt="" />
              {categories &&
                categories.map((categoryValue: string) => (
                  <Chip
                    style={{ margin: "5px" }}
                    label={categoryValue}
                    variant="outlined"
                    color="secondary"
                  />
                ))}
            </div>
          </Grid>
          <Grid item sm={7}>
            <Grid container direction="column" style={{ height: "100%" }}>
              <Box mt={1}>
                <Box p={1}>
                  <Box p={1} fontStyle="italic" fontSize={20}>
                    Item: {selectedProduct?.name}
                  </Box>

                  <Box p={1} fontStyle="italic" fontSize={20}>
                    Description: {selectedProduct?.description}
                  </Box>

                  <Box p={1} fontStyle="italic" fontSize={20}>
                    Price: {selectedProduct?.price} €
                  </Box>
                  <Divider />

                  <div>
                    <Formik
                      initialValues={formInitialValues}
                      validationSchema={object({
                        size: string().required(),
                        quantity: number().required(),
                      })}
                      validate={(values) => {
                        let errors: LooseObject = {};

                        const alreadyAddedItem: CartItemType =
                          cartObj.items.find(
                            (i) =>
                              i.itemId === selectedProduct._id &&
                              i.selectedItemSize === values.size
                          );

                        if (alreadyAddedItem) {
                          if (
                            alreadyAddedItem.quantity + values.quantity >
                            selectedProduct.itemsInStock
                          ) {
                            errors.quantity = `There are ${alreadyAddedItem.quantity} item(s) of this size in your cart!
                            The maximum quantity of the given item in size ${alreadyAddedItem.selectedItemSize} is ${selectedProduct.itemsInStock}.`;
                          }
                        }

                        return errors;
                      }}
                      onSubmit={(values) => {
                        const updatedCart: CartType = JSON.parse(
                          JSON.stringify(cartObj)
                        );

                        const alreadyAddedItem: CartItemType =
                          updatedCart.items.find(
                            (i) =>
                              i.itemId === selectedProduct._id &&
                              i.selectedItemSize === values.size
                          );
                        if (alreadyAddedItem) {
                          alreadyAddedItem.quantity += +values.quantity;
                          updatedCart.items = updatedCart.items.filter(
                            (i) => i.itemId === selectedProduct._id
                          );
                          updatedCart.items.concat(alreadyAddedItem);
                        } else {
                          updatedCart.items = updatedCart.items.concat({
                            itemId: selectedProduct._id,
                            quantity: values.quantity,
                            selectedItemSize: values.size,
                          });
                        }
                        updateCart(dispatch, updatedCart);
                        history.push("/products");
                      }}
                    >
                      {({ values, errors, handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                          {itemsInStock && itemsInStock > 0 ? (
                            <Box m={1}>
                              <Typography variant="h6">Size:</Typography>
                              <div style={{ width: "50%" }}>
                                <Select
                                  name="size"
                                  options={optionsSize}
                                  onChange={(sizeObj: OptionSizeType) => {
                                    values.size = sizeObj.value;
                                  }}
                                />
                                {!!errors.size && (
                                  <div
                                    style={{ color: "red", marginTop: ".5rem" }}
                                  >
                                    {errors.size}
                                  </div>
                                )}
                              </div>
                              <Typography variant="h6">Quantity:</Typography>
                              <div style={{ width: "50%" }}>
                                <Select
                                  name="quantity"
                                  options={optionsQty}
                                  onChange={(qtyObj: OptionQtyType) => {
                                    values.quantity = qtyObj.value;
                                  }}
                                />
                                {!!errors.quantity && (
                                  <div
                                    style={{ color: "red", marginTop: ".5rem" }}
                                  >
                                    {errors.quantity}
                                  </div>
                                )}
                              </div>
                            </Box>
                          ) : (
                            <Box m={3}>
                              <Typography variant="h4">
                                Out Of Stock!
                              </Typography>
                            </Box>
                          )}

                          {itemsInStock && itemsInStock > 0 && (
                            <Box m={1} mt={2}>
                              <Button
                                variant="contained"
                                type="submit"
                                color="secondary"
                              >
                                Purchase
                              </Button>
                              <Button
                                type="button"
                                onClick={() => history.goBack()}
                              >
                                Back
                              </Button>
                            </Box>
                          )}
                        </form>
                      )}
                    </Formik>
                  </div>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductView;
