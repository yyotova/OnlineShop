import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { Formik } from "formik";
import { useHistory, useParams } from "react-router-dom";
import { ProductType } from "../models/product-model";
import { AppState } from "../store";
import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  fetchCategories,
  fetchProducts,
  saveProduct,
  updateProduct,
} from "../actions/requests";
import { useEffect } from "react";
import React from "react";
import { CategoryType } from "../models/category-model";
import { array, number, object, string } from "yup";

interface EditProductParams {
  id: string;
}

interface CategoryOption {
  value: number;
  label: string;
}

interface SizeOption {
  value: number;
  label: string;
}

interface LooseObject {
  [key: string]: any;
}

const ManageProduct = () => {
  const history = useHistory();
  const params = useParams<EditProductParams>();
  const dispatch = useDispatch();

  const [categories, setCategories] = React.useState([]);
  const [sizes, setSizes] = React.useState([]);
  const allCategories = useSelector(
    (state: AppState) => state.allCategories.categories
  );
  const allProducts = useSelector(
    (state: AppState) => state.allProducts.products
  );

  useEffect(() => {
    fetchCategories(dispatch);
  }, []);

  const item: ProductType | undefined = useSelector((state: AppState) => {
    if (params.id) {
      const index = state.allProducts.products.findIndex(
        (i) => i._id === params.id
      );

      if (index >= 0) {
        return state.allProducts.products[index];
      }
    }
    return undefined;
  });

  let catCounter = 1;
  const allCategoryOptions: CategoryOption[] = allCategories.flatMap((c) => ({
    value: catCounter++,
    label: c.name,
  }));

  let sizeCounter = 1;
  const allSizeOptions: SizeOption[] = [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL",
  ].flatMap((value) => ({
    value: sizeCounter++,
    label: value,
  }));

  const initialValues: ProductType = {
    _id: item?._id || "",
    name: item?.name || "",
    description: item?.description || "",
    price: item?.price || 0,
    imageUrl: item?.imageUrl || "",
    itemsInStock: item?.itemsInStock || 0,
    categories: item?.categories || [],
    size: item?.size || [],
  };

  const initialCategories: CategoryType[] = [];
  initialValues.categories.forEach((catId) => {
    const category = allCategories.find((cat) => cat._id === catId);
    if (category) {
      initialCategories.push(category);
    }
  });

  const initialCategoryOptions: CategoryOption[] = [];
  initialCategories.forEach((cat) => {
    const option = allCategoryOptions.find((opt) => opt.label === cat.name);
    if (option) {
      initialCategoryOptions.push(option);
    }
  });

  const initialSizeOptions: SizeOption[] = [];
  initialValues.size.forEach((sizeValue) => {
    const option = allSizeOptions.find((opt) => opt.label === sizeValue);
    if (option) {
      initialSizeOptions.push(option);
    }
  });

  useEffect(() => {
    fetchProducts(dispatch);
  }, []);

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={object({
          name: string().required(),
          description: string().required(),
          price: number().required(),
          imageUrl: string().required(),
          categories: array().required(),
          itemsInStock: number().required(),
          size: array().required(),
        })}
        validate={(values) => {
          let errors: LooseObject = {};

          if (values.name) {
            const product = allProducts.find(
              (product) =>
                product.name === values.name && product._id !== params.id
            );
            if (product) {
              const nameValidationError =
                "A product with this name already exists!";
              errors.name = nameValidationError;
            }
          }

          if (values.price) {
            if (isNaN(values.price)) {
              const priceValidationError =
                "The input value is not of type number!";
              errors.price = priceValidationError;
            }
          }
          return errors;
        }}
        onSubmit={(values) => {
          const result = {
            _id: values._id,
            name: values.name,
            description: values.description,
            price: +values.price,
            imageUrl: values.imageUrl,
            itemsInStock: +values.itemsInStock,
            categories: values.categories,
            size: values.size,
          };

          result.size = sizes.flatMap((s: SizeOption) => s.label);

          result.categories = [];
          categories.forEach((selected: CategoryOption) => {
            const catObj = allCategories.find(
              (cat) => cat.name === selected.label
            );
            if (catObj) {
              result.categories.push(catObj?._id);
            }
          });

          if (params.id) {
            updateProduct(dispatch, result);
          } else {
            saveProduct(dispatch, result);
          }

          history.push("/products");
        }}
      >
        {({ values, errors, handleChange, handleSubmit }) => (
          <Box display="flex" justifyContent="center" margin="100px">
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {values.imageUrl !== "" && (
                  <Grid item xs={6} md={4}>
                    <div>
                      <img src={values.imageUrl} width="100%" alt="" />
                    </div>
                  </Grid>
                )}

                <Grid item xs={6} md={8}>
                  <Grid container direction="column" style={{ height: "100%" }}>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      {params.id ? (
                        <Typography variant="h4">
                          <Box
                            p={3}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            fontWeight="fontWeightBold"
                          >
                            Edit Product
                          </Box>
                          <Divider />
                        </Typography>
                      ) : (
                        <Typography variant="h4">
                          <Box
                            p={3}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            fontWeight="fontWeightBold"
                          >
                            Add Product
                          </Box>
                          <Divider />
                        </Typography>
                      )}
                    </Box>

                    <Box m={3} alignSelf="center">
                      <div style={{ marginTop: "15px", marginBottom: "15px" }}>
                        <TextField
                          name="name"
                          onChange={handleChange}
                          style={{ width: 350 }}
                          value={values.name}
                          variant="standard"
                          label="Enter Product Name"
                          error={!!errors.name}
                          helperText={errors.name}
                        />
                      </div>
                      {console.log("err", !!errors.name)}
                      <div style={{ marginTop: "15px", marginBottom: "15px" }}>
                        <TextField
                          variant="standard"
                          name="description"
                          value={values.description}
                          label="Enter Description"
                          onChange={handleChange}
                          style={{ width: 350 }}
                          error={!!errors.description}
                          helperText={errors.description}
                        />
                      </div>

                      <div style={{ marginTop: "15px", marginBottom: "15px" }}>
                        <TextField
                          variant="standard"
                          name="price"
                          value={values.price}
                          label="Enter Price"
                          onChange={handleChange}
                          style={{ width: 350 }}
                          error={!!errors.price}
                          helperText={errors.price}
                        />
                      </div>

                      <div style={{ marginTop: "15px", marginBottom: "15px" }}>
                        <TextField
                          variant="standard"
                          name="imageUrl"
                          label="Image URL"
                          onChange={handleChange}
                          style={{ width: 350 }}
                          value={values.imageUrl}
                          error={!!errors.imageUrl}
                          helperText={errors.imageUrl}
                        />
                      </div>

                      <div style={{ marginTop: "15px", marginBottom: "15px" }}>
                        <TextField
                          variant="standard"
                          name="itemsInStock"
                          type="number"
                          InputProps={{ inputProps: { min: 0 } }}
                          label="Products Available"
                          onChange={handleChange}
                          style={{ width: 350 }}
                          value={values.itemsInStock}
                          error={!!errors.itemsInStock}
                          helperText={errors.itemsInStock}
                        />
                      </div>

                      <div>
                        <Box m={1}>
                          <h4>Categories:</h4>
                          <div style={{ width: "350px" }}>
                            <Select
                              defaultValue={initialCategoryOptions}
                              isMulti
                              options={allCategoryOptions}
                              onChange={(event: any) => {
                                setCategories(event);
                              }}
                            ></Select>
                          </div>
                        </Box>
                      </div>

                      <div>
                        <Box m={1}>
                          <h4>Sizes:</h4>
                          <div style={{ width: "350px" }}>
                            <Select
                              isDisabled={values.itemsInStock === 0}
                              defaultValue={initialSizeOptions}
                              isMulti
                              options={allSizeOptions}
                              onChange={(event: any) => {
                                setSizes(event);
                              }}
                            ></Select>
                          </div>
                        </Box>
                      </div>

                      <Box
                        display="flex"
                        justifyContent="center"
                        flexDirection="column"
                        m={3}
                      >
                        <Button
                          variant="outlined"
                          color="secondary"
                          type="submit"
                        >
                          Submit
                        </Button>
                        <Button
                          type="button"
                          onClick={() => history.push("/products")}
                        >
                          Cancel
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Box>
        )}
      </Formik>
    </div>
  );
};

export default ManageProduct;
