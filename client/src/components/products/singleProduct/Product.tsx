import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
  Button,
} from "@material-ui/core";
import { AddShoppingCart, Delete } from "@material-ui/icons";
import { ProductType } from "../../../models/product-model";
import useStyles from "./styles";
import { useRouteMatch, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../../actions/requests";

export interface ProductProps {
  product: ProductType;
}

const Product = ({ product }: ProductProps) => {
  const classes = useStyles();
  const match = useRouteMatch();
  const dispatch = useDispatch();

  const handleDelete = () => {
    deleteProduct(dispatch, product._id);
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={product?.imageUrl}
        title={product?.name}
      />
      <CardContent>
        <div className={classes.cardContent}>
          <Typography variant="h5" gutterBottom>
            {product?.name}
          </Typography>
          <Typography variant="h5">{product?.price} €</Typography>
        </div>
        <Typography variant="body2" color="textSecondary">
          {product?.description}
        </Typography>

        <CardActions className={classes.cardActions} disableSpacing>
          <IconButton aria-label="Add to cart">
            <AddShoppingCart />
          </IconButton>

          <Box m={1} display="flex" justifyContent="flex-end">
            <Link
              to={{
                pathname: `${match.url}/${product._id}`,
                state: { selectedProduct: product },
              }}
            >
              <Button type="submit" variant="contained" color="secondary">
                Details
              </Button>
            </Link>
          </Box>

          <Box m={1} display="flex" justifyContent="flex-end">
            <Link
              to={{
                pathname: `edit-products/${product._id}`,
              }}
            >
              <Button type="submit" variant="contained" color="secondary">
                Edit
              </Button>
            </Link>
          </Box>

          <Box>
            <Delete onClick={handleDelete} style={{ color: "	#a70000" }} />
          </Box>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default Product;
