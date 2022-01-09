import * as express from "express";
import Cart from "../models/cartModel";
import Item from "../models/itemModel";
import User from "../models/user";
import type { IResponse } from "../types/Response";
import {
  alreadyExist,
  notExist,
  successByCreating,
  successByDeleting,
  successByUpdating,
} from "../utilities/validations/messages";
import {
  cartObjectName,
  itemObjectName,
  userObjectName,
} from "../utilities/constants/global";
import { lowerCaseFirstLetter } from "../utilities/helperUtil";
import { authenticate } from "../middlewares/auth";

const router = express.Router();

interface ItemOrder {
  itemId: String;
  quantity: Number;
}

router.get("/:userId", authenticate, async (req, res) => {
  try {
    const userId = req.params.userId;
    const cart = await Cart.findOne({ userId: userId });
    return res.status(200).json(cart);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/", authenticate, async (req, res) => {
  try {
    const newCart = new Cart({
      userId: req.body.userId,
      items: req.body.items,
    });

    await checkUserId(newCart.userId);

    const existingUserCart = await Cart.findOne({ userId: newCart.userId });
    if (existingUserCart) {
      throw new Error(
        alreadyExist(
          lowerCaseFirstLetter(cartObjectName),
          "userId",
          newCart.userId
        )
      );
    }

    for (const i of newCart.items) {
      await checkItemId(i);
    }

    const newlyCreatedCart = await newCart.save();
    return res.status(201).json({
      message: successByCreating(cartObjectName),
      data: newlyCreatedCart,
    });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
});

router.put("/:id", authenticate, async (req, res) => {
  try {
    for (const i of req.body.items) {
      await checkItemId(i);
    }

    const cartId = req.params.id;
    let updatedCart = await Cart.findById(cartId);

    if (updatedCart) {
      updatedCart.items = req.body.items as ItemOrder[];
      updatedCart = await updatedCart.save();
      return res.status(200).json({
        message: successByUpdating(cartObjectName),
        data: updatedCart,
      });
    } else {
      throw new Error(notExist(cartObjectName, "id", cartId));
    }
  } catch (err: any) {
    return res.status(500).json(err.message);
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  try {
    const cartId = req.params.id;
    const deletedCart = await Cart.findByIdAndDelete(cartId);

    if (deletedCart) {
      const returnedData: IResponse = {
        message: successByDeleting(cartObjectName),
      };
      return res.json(returnedData);
    } else {
      throw new Error(notExist(cartObjectName, "id", cartId));
    }
  } catch (err: any) {
    return res.status(500).json(err.message);
  }
});

async function checkItemId(itemObj: ItemOrder) {
  const currentId = itemObj.itemId.toString();
  const existingItem = await Item.findOne({ _id: currentId });

  if (existingItem == null) {
    throw new Error(notExist(itemObjectName, "id", currentId));
  }
}

async function checkUserId(userId: string) {
  const user = await User.findById(userId);

  if (user == null) {
    throw new Error(notExist(userObjectName, "id", userId));
  }
}

export default router;
