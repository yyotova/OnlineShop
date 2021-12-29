import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { ProductType } from "../models/product-model";
import { AppState } from "../store";

interface EditProductParams {
  productId: string;
}

const ManageProduct = () => {
  const history = useHistory();
  const params = useParams<EditProductParams>();

  const item: ProductType | undefined = useSelector((state: AppState) => {
    if (params.productId) {
      const index = state.allProducts.products.findIndex(
        (i) => i._id === params.productId
      );
      if (index >= 0) {
        return state.allProducts.products[index];
      }
    }
    return undefined;
  });

  const initialValues: ProductType = {
    _id: item?._id || "",
    name: item?.name || "",
    description: item?.description || "",
    price: item?.price || 0,
    imageUrl: item?.imageUrl || "",
    itemsInStock: item?.itemsInStock || 0,
    category: item?.category || [],
    size: item?.size || [],
  };

  
};

export default ManageProduct;
