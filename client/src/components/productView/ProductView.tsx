import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import { ProductProps } from "../products/singleProduct/Product";

const ProductView = ({ product }: ProductProps) => {
  return (
    <Grid container direction="column" style={{ height: "100%" }}>
      <Box mt={1}>
        <Box p={1}>
          <Typography variant="h6">
            <Box fontWeight="fontWeightMedium">Item:</Box>
          </Typography>
          <Box fontStyle="italic" fontSize={20}>
            {product.name}
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default ProductView;
