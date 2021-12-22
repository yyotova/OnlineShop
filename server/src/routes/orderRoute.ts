import * as express from "express";
import Order from "../models/orderModel";
import Item from "../models/itemModel";
import type { IResponse } from "src/types/Response";

const router = express.Router();

interface ItemOrder {
  item: String;
  quantity: Number;
}

// TODO get orders of a given user

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    return res.status(200).json(orders);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newOrder = new Order({
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      status: req.body.status,
    });

    checkItemIds(newOrder.items, res);

    const newOrderCreated = await newOrder.save();
    return res
      .status(201)
      .json({ message: "New Order Created", data: newOrderCreated });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    checkItemIds(req.body.items, res);

    const orderId = req.params.id;
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { $set: req.body },
      { new: true }
    );

    if (updatedOrder) {
      return res
        .status(200)
        .json({ message: "Order updates successfully!", data: updatedOrder });
    }

    return res
      .status(404)
      .json({ errorMessage: `Order with id '${orderId}' does not exist!` });
  } catch (err: any) {
    return res.status(500).json(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  const orderId = req.params.id;
  const deletedOrder = await Order.findByIdAndDelete(orderId);

  if (deletedOrder) {
    const returnedData: IResponse = {
      message: "Order deleted successfully!",
    };
    return res.json(returnedData);
  }

  const returnedData: IResponse = {
    errorMessage: `Order with id '${orderId}' does not exist!`,
  };
  return res.json(returnedData);
});

function checkItemIds(items: ItemOrder[], res: any) {
  items.forEach(async (itemObj: ItemOrder) => {
    const currentId = itemObj.item.toString();
    const existingItem = await Item.findOne({ _id: currentId });
    if (existingItem == null) {
      return res.status(404).json({
        errorMessage: `Item with id '${currentId}' does not exist!`,
      });
    }
  });
}

export default router;
