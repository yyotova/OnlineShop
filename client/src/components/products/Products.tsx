import { Grid, Container, Accordion, AccordionSummary, Typography, AccordionDetails } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { ProductType } from "../../models/product-model";
import Product from "./singleProduct/Product";
import { AppState } from "../../store";
import useStyles from "./styles";
import Chat from "../Chat";

const Products = () => {
  const classes = useStyles();
  const products = useSelector((state: AppState) => state.allProducts.products);

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Container maxWidth="xl" className={classes.items}>
        <Grid container justifyContent="center" spacing={3}>
          {products &&
            products.map((product: ProductType) => (
              <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                <Product product={product} />
              </Grid>
            ))}
        </Grid>
      </Container>
      <Accordion className={classes.chat}>
        <AccordionSummary
          expandIcon={<ExpandLessIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Chat with an admin</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Chat />
        </AccordionDetails>
      </Accordion>
    </main>
  );
};

export default Products;
