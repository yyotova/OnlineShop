import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductType } from "../../models/product-model";
import Product from "./singleProduct/Product";
import { AppState } from "../../store";
import useStyles from "./styles";
import { fetchProducts } from "../../actions/requests";

const Products = () => {
  const classes = useStyles();
  const products = useSelector((state: AppState) => state.allProducts.products);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProducts(dispatch);
  }, []);

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justifyContent="center" spacing={4}>
        {products &&
          products.map((product: ProductType) => (
            <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
              <Product product={product} />
            </Grid>
          ))}
      </Grid>
    </main>
  );
};

export default Products;
