import { Dispatch } from "react";
import axios from "axios";
import {
  addCategory,
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
import { UserType } from "../models/user-types";

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
  userInfo: UserType | undefined,
  category: CategoryType
) => {
  if (userInfo) {
    await axios
      .post("http://localhost:3030/api/categories", category, {
        headers: {
          "x-auth": userInfo.token || "",
        },
      })
      .then((response) => {
        dispatch(addCategory(response.data.data));
      })
      .catch((err) => {
        console.error("Error ", err);
      });
  }
};

export const deleteCategory = async (
  dispatch: Dispatch<any>,
  categoryId: IdType,
  userInfo: UserType | undefined
) => {
  if (userInfo) {
    await axios
      .delete(`http://localhost:3030/api/categories/${categoryId}`, {
        headers: {
          "x-auth": userInfo.token || "",
        },
      })
      .then((response) => {
        dispatch(removeCategory(categoryId));
      })
      .catch((err) => {
        console.error("Error ", err);
      });
  }
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
  product: ProductType,
  dispatch: Dispatch<any>,
  userInfo: UserType | undefined
) => {
  if (userInfo) {
    await axios
      .post("http://localhost:3030/api/items/manage-items", product, {
        headers: {
          "x-auth": userInfo.token || "",
        },
      })
      .then((response) => {
        dispatch(addProduct(response.data.data));
      })
      .catch((err) => {
        console.error("Error ", err);
      });
  }
};

export const updateProduct = async (
  product: ProductType,
  dispatch: Dispatch<any>,
  userInfo: UserType | undefined
) => {
  if (userInfo) {
    await axios
      .put(`http://localhost:3030/api/items/${product._id}`, product, {
        headers: {
          "x-auth": userInfo.token || "",
        },
      })
      .then((response) => {
        dispatch(editProduct(response.data.data));
      })
      .catch((err) => {
        console.error("Error ", err);
      });
  }
};

export const deleteProduct = async (
  dispatch: Dispatch<any>,
  productId: IdType,
  userInfo: UserType | undefined
) => {
  if (userInfo) {
    await axios
      .delete(`http://localhost:3030/api/items/${productId}`, {
        headers: {
          "x-auth": userInfo.token || "",
        },
      })
      .then((response) => {
        dispatch(removeProduct(productId));
      })
      .catch((err) => {
        console.error("Error ", err);
      });
  }
};

// --- Cart ---

export const fetchUserCart = async (
  userId: IdType,
  dispatch: Dispatch<any>,
  userInfo: UserType | undefined
) => {
  if (userInfo) {
    await axios
      .get(`http://localhost:3030/api/cart/${userId}`, {
        headers: {
          "x-auth": userInfo.token || "",
        },
      })
      .then((response) => {
        dispatch(setUserCart(response.data));
        fetchCategories(dispatch);
      })
      .catch((err) => {
        console.error("Error ", err);
      });
  }
};

export const updateCart = async (
  cart: CartType,
  dispatch: Dispatch<any>,
  userInfo: UserType | undefined
) => {
  if (userInfo) {
    await axios
      .put(`http://localhost:3030/api/cart/${cart._id}`, cart, {
        headers: {
          "x-auth": userInfo.token || "",
        },
      })
      .then((response) => {
        dispatch(editUserCart(response.data.data));
      })
      .catch((err) => {
        console.error("Error ", err);
      });
  }
};
