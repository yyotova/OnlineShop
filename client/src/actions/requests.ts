import React, { Dispatch } from "react";
import axios from "axios";
import { setCategories } from "./categoryActions";
import {
  addProduct,
  editProduct,
  removeProduct,
  setProducts,
} from "./productActions";
import { ProductType } from "../models/product-model";
import { IdType } from "../models/shared-types";

export const fetchCategories = async (dispatch: Dispatch<any>) => {
  await axios
    .get("http://localhost:3030/api/categories")
    .then((response: any) => {
      dispatch(setCategories(response.data));
    })
    .catch((err: any) => {
      console.log("Error ", err);
    });
};

export const fetchProducts = async (dispatch: Dispatch<any>) => {
  await axios
    .get("http://localhost:3030/api/items")
    .then((response) => {
      dispatch(setProducts(response.data));
      fetchCategories(dispatch);
    })
    .catch((err) => {
      console.log("Error ", err);
    });
};

export const saveProduct = async (
  dispatch: Dispatch<any>,
  product: ProductType
) => {
  await axios
    .post("http://localhost:3030/api/items/manage-items", product)
    .then((response) => {
      dispatch(addProduct(response.data.data));
    })
    .catch((err) => {
      console.log("Error ", err);
    });
};

export const updateProduct = async (
  dispatch: Dispatch<any>,
  product: ProductType
) => {
  await axios
    .put(`http://localhost:3030/api/items/${product._id}`, product)
    .then((response) => {
      dispatch(editProduct(response.data.data));
    })
    .catch((err) => {
      console.log("Error ", err);
    });
};

export const deleteProduct = async (
  dispatch: Dispatch<any>,
  productId: IdType
) => {
  await axios
    .delete(`http://localhost:3030/api/items/${productId}`)
    .then((response) => {
      console.log("res ", response);
      dispatch(removeProduct(productId));
    })
    .catch((err) => {
      console.log("Error ", err);
    });
};
