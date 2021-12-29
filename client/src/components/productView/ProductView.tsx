import React from "react";
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import { ProductType } from "../../models/product-model";
import Select from "react-select";

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

const ProductView = ({ p }: any) => {
  const history = useHistory();
  const location = useLocation<ProductView>();
  const { selectedProduct } = location.state;
  const { itemsInStock, size } = selectedProduct;
  const arrQty = [...Array(+itemsInStock).keys()];

  const optionsQty = arrQty.map((qty) => ({
    label: qty + 1,
    value: qty + 1,
  })) as OptionQtyType[];

  const optionsSize = size.map((s) => ({
    label: s,
    value: s,
  })) as OptionSizeType[];

  return (
    <Box style={{ maxWidth: 1000, margin: "0 auto" }}>
      <Box m={10}>
        <Grid container spacing={1}>
          <Grid item sm={5}>
            <div>
              <img src={selectedProduct?.imageUrl} width="100%" alt="" />
              {selectedProduct?.category &&
                selectedProduct?.category.map((categoryValue: string) => (
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

                  {itemsInStock && itemsInStock > 0 ? (
                    <Box m={1}>
                      <Typography variant="h6">Qty:</Typography>
                      <div style={{ width: "50%" }}>
                        <Select options={optionsQty} />
                      </div>
                      <Typography variant="h6">Size:</Typography>
                      <div style={{ width: "50%" }}>
                        <Select options={optionsSize} />
                      </div>
                    </Box>
                  ) : (
                    <Box m={3}>
                      <Typography variant="h4">Out Of Stock!</Typography>
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
                        onClick={() => history.push("/products")}
                      >
                        Back
                      </Button>
                    </Box>
                  )}
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
