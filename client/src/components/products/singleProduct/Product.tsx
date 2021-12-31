import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Box,
  Button,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { ProductType } from "../../../models/product-model";
import useStyles from "./styles";
import { useRouteMatch, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../../actions/requests";
import Notification from "../../Notification";

export interface ProductProps {
  product: ProductType;
}

const Product = ({ product }: ProductProps) => {
  const classes = useStyles();
  const match = useRouteMatch();
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    deleteProduct(dispatch, product._id);
    setMessage("Product deleted successfully!");
    setIsOpen(true);
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

      <Notification message={message} isOpen={isOpen} setIsOpen={setIsOpen} />
    </Card>
  );
};

export default Product;
