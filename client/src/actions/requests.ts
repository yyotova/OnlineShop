import React, { Dispatch } from "react";
import axios from "axios";
import {
  addCategory,
  editCategory,
  removeCategory,
  setCategories,
} from "./categoryActions";
import {
  addProduct,
  editProduct,
  removeProduct,
  setProducts,
} from "./productActions";
import { ProductType } from "../models/product-model";
import { IdType } from "../models/shared-types";
import { CategoryType } from "../models/category-model";
import { editUserCart, setUserCart } from "./cartActions";
import { CartType } from "../models/cart-model";

// --- Category ---

export const fetchCategories = async (dispatch: Dispatch<any>) => {
  await axios
    .get("http://localhost:3030/api/categories")
    .then((response: any) => {
      dispatch(setCategories(response.data));
    })
    .catch((err: any) => {
      console.error("Error ", err);
    });
};

export const saveCategory = async (
  dispatch: Dispatch<any>,
  category: CategoryType
) => {
  await axios
    .post("http://localhost:3030/api/categories", category)
    .then((response) => {
      dispatch(addCategory(response.data.data));
    })
    .catch((err) => {
      console.error("Error ", err);
    });
};

export const updateCategory = async (
  dispatch: Dispatch<any>,
  category: CategoryType
) => {
  await axios
    .put(`http://localhost:3030/api/categories/${category._id}`, category)
    .then((response) => {
      dispatch(editCategory(response.data.data));
    })
    .catch((err) => {
      console.error("Error ", err);
    });
};

export const deleteCategory = async (
  dispatch: Dispatch<any>,
  categoryId: IdType
) => {
  await axios
    .delete(`http://localhost:3030/api/categories/${categoryId}`)
    .then((response) => {
      dispatch(removeCategory(categoryId));
    })
    .catch((err) => {
      console.error("Error ", err);
    });
};

// --- Product ---
export const fetchProducts = async (dispatch: Dispatch<any>) => {
  await axios
    .get("http://localhost:3030/api/items")
    .then((response) => {
      dispatch(setProducts(response.data));
      fetchCategories(dispatch);
    })
    .catch((err) => {
      console.error("Error ", err);
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
      console.error("Error ", err);
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
      console.error("Error ", err);
    });
};

export const deleteProduct = async (
  dispatch: Dispatch<any>,
  productId: IdType
) => {
  await axios
    .delete(`http://localhost:3030/api/items/${productId}`)
    .then((response) => {
      dispatch(removeProduct(productId));
    })
    .catch((err) => {
      console.error("Error ", err);
    });
};

// --- Cart ---

export const fetchUserCart = async (
  dispatch: Dispatch<any>,
  userId: IdType
) => {
  await axios
    .get(`http://localhost:3030/api/cart/${userId}`)
    .then((response) => {
      dispatch(setUserCart(response.data));
      fetchCategories(dispatch);
    })
    .catch((err) => {
      console.error("Error ", err);
    });
};

export const updateCart = async (dispatch: Dispatch<any>, cart: CartType) => {
  await axios
    .put(`http://localhost:3030/api/cart/${cart._id}`, cart)
    .then((response) => {
      dispatch(editUserCart(response.data.data));
    })
    .catch((err) => {
      console.error("Error ", err);
    });
};
