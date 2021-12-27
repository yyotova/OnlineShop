import * as express from "express";
import Cart from "../models/cartModel";
import Item from "../models/itemModel";
import type { IResponse } from "src/types/Response";
import {
  notExist,
  successByCreating,
  successByDeleting,
  successByUpdating,
} from "src/utilities/validations/messages";
import { cartObjectName, itemObjectName } from "src/utilities/constants/global";

const router = express.Router();

interface ItemOrder {
  item: String;
  quantity: Number;
}

router.get("/", async (req, res) => {
  try {
    const carts = await Cart.find();
    return res.status(200).json(carts);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newCart = new Cart({
      items: req.body.items,
    });

    checkItemIds(newCart.items, res);

    const newlyCreatedCart = await newCart.save();
    return res.status(201).json({
      message: successByCreating(cartObjectName),
      data: newlyCreatedCart,
    });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    checkItemIds(req.body.items, res);

    const cartId = req.params.id;
    const updatedCart = await Cart.findByIdAndUpdate(
      cartId,
      { $set: req.body },
      { new: true }
    );

    if (updatedCart) {
      return res.status(200).json({
        message: successByUpdating(cartObjectName),
        data: updatedCart,
      });
    }

    return res
      .status(404)
      .json({ errorMessage: notExist(cartObjectName, "id", cartId) });
  } catch (err: any) {
    return res.status(500).json(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const cartId = req.params.id;
    const deletedCart = await Cart.findByIdAndDelete(cartId);

    if (deletedCart) {
      const returnedData: IResponse = {
        message: successByDeleting(cartObjectName),
      };
      return res.json(returnedData);
    }

    const returnedData: IResponse = {
      errorMessage: notExist(cartObjectName, "id", cartId),
    };
    return res.json(returnedData);
  } catch (err: any) {
    return res.status(500).json(err.message);
  }
});

function checkItemIds(items: ItemOrder[], res: any) {
  items.forEach(async (itemObj: ItemOrder) => {
    const currentId = itemObj.item.toString();
    const existingItem = await Item.findOne({ _id: currentId });
    if (existingItem == null) {
      return res.status(404).json({
        errorMessage: notExist(itemObjectName, "id", currentId),
      });
    }
  });
}

export default router;
