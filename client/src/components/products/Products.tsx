import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setProducts } from "../../actions/productActions";
import { ProductType } from "../../models/product-model";
import Product from "./singleProduct/Product";
import { AppState } from "../../store";
import useStyles from "./styles";

const Products = () => {
  const classes = useStyles();
  const products = useSelector((state: AppState) => state.allProducts.products);
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    await axios
      .get("http://localhost:3030/api/items")
      .then((response) => {
        console.log(response.data);
        dispatch(setProducts(response.data));
      })
      .catch((err) => {
        console.log("Error ", err);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justifyContent="center" spacing={4}>
        {products &&
          products.map((product: ProductType) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Product product={product} />
            </Grid>
          ))}
      </Grid>
    </main>
  );
};

export default Products;
