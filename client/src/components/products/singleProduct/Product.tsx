import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import { ProductType } from "../../../models/product-model";
import useStyles from "./styles";

export interface ProductProps {
  product: ProductType;
}

const Product = ({ product }: ProductProps) => {
  const classes = useStyles();

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
          <Typography variant="h5">{product?.price}$</Typography>
        </div>
        <Typography variant="body2" color="textSecondary">
          {product?.description}
        </Typography>

        <CardActions className={classes.cardActions} disableSpacing>
          <IconButton aria-label="Add to cart">
            <AddShoppingCart />
          </IconButton>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default Product;
