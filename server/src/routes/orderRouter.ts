import * as express from "express";
import Order from "../models/orderModel";
import Item from "../models/itemModel";
import type { IResponse } from "../types/Response";
import {
  notExist,
  successByCreating,
  successByDeleting,
  successByUpdating,
} from "../utilities/validations/messages";
import {
  itemObjectName,
  orderObjectName,
} from "../utilities/constants/global";
import { isAdmin, authenticate } from "../middlewares/auth";

const router = express.Router();

interface ItemOrder {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  quantity: number;
  price: number;
  sizselectedItemSize: string;
  itemsInStock: number;
  size: string[];
  categories: string[];
}

// TODO get orders of a given user

router.get("/", authenticate, async (req, res) => {
  try {
    const orders = await Order.find();
    return res.status(200).json(orders);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/", authenticate, async (req, res) => {
  try {
    const newOrder = new Order({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      zipCode: req.body.zipCode,
    });

    checkItemIds(newOrder.items, res);

    const newOrderCreated = await newOrder.save();
    return res.status(201).json({
      message: successByCreating(orderObjectName),
      data: newOrderCreated,
    });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
});

router.put("/:id", authenticate, async (req, res) => {
  try {
    checkItemIds(req.body.items, res);

    const orderId = req.params.id;
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { $set: req.body },
      { new: true }
    );

    if (updatedOrder) {
      return res.status(200).json({
        message: successByUpdating(orderObjectName),
        data: updatedOrder,
      });
    }

    return res
      .status(404)
      .json({ errorMessage: notExist(orderObjectName, "id", orderId) });
  } catch (err: any) {
    return res.status(500).json(err.message);
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  try {
    const orderId = req.params.id;
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (deletedOrder) {
      const returnedData: IResponse = {
        message: successByDeleting(orderObjectName),
      };
      return res.json(returnedData);
    }

    const returnedData: IResponse = {
      errorMessage: notExist(orderObjectName, "id", orderId),
    };
    return res.json(returnedData);
  } catch (err: any) {
    return res.status(500).json(err.message);
  }
});

function checkItemIds(items: ItemOrder[], res: any) {
  items.forEach(async (itemObj: ItemOrder) => {
    const currentId = itemObj._id.toString();
    const existingItem = await Item.findOne({ _id: currentId });
    if (existingItem == null) {
      return res.status(404).json({
        errorMessage: notExist(itemObjectName, "id", currentId),
      });
    }
  });
}

export default router;
