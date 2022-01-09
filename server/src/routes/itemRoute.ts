import * as express from "express";
import {
  alreadyExist,
  errorByCreating,
  errorByDeleting,
  errorByUpdating,
  notExist,
  successByCreating,
  successByDeleting,
  successByUpdating,
} from "../utilities/validations/messages";
import { itemObjectName } from "../utilities/constants/global";
import Item from "../models/itemModel";
import type { IItem } from "../types/Item";
import type { IResponse } from "../types/Response";
import { lowerCaseFirstLetter } from "../utilities/helperUtil";
import Cart from "../models/cartModel";
import { isAdmin, authenticate } from "../middlewares/auth";

const router = express.Router();

router.get("/", authenticate, async (req, res) => {
  const qCategory = req.query.category;
  let items;

  if (qCategory) {
    items = await Item.find({
      categories: {
        $in: [qCategory],
      },
    });
  } else {
    items = await Item.find();
  }

  return res.json(items);
});

router.get("/:id", authenticate, async (req, res) => {
  try {
    const id = req.params.id;
    const item = await Item.findOne({ _id: id });

    if (item) {
      const returnedData: IResponse = {
        data: item,
      };
      return res.json(returnedData);
    } else {
      const returnedData: IResponse = {
        errorMessage: notExist(itemObjectName, "id", id),
      };
      return res.status(404).json(returnedData);
    }
  } catch (err: any) {
    const returnedData: IResponse = {
      errorMessage: err.message,
    };
    res.status(404).send(returnedData);
  }
});

router.post("/manage-items", authenticate, isAdmin, async (req, res) => {
  const reqData = req.body as IItem;
  const existingItem = await Item.findOne({ name: reqData.name });

  if (existingItem) {
    const returnedData: IResponse = {
      errorMessage: alreadyExist(
        lowerCaseFirstLetter(itemObjectName),
        "name",
        reqData.name
      ),
    };
    // 409 - Conflict
    return res.status(409).json(returnedData);
  }

  const item = new Item({
    name: reqData.name,
    description: reqData.description,
    price: reqData.price,
    size: reqData.size,
    imageUrl: reqData.imageUrl,
    itemsInStock: reqData.itemsInStock,
    categories: reqData.categories,
  });
  const savedItem = await item.save();

  if (savedItem) {
    const returnedData: IResponse = {
      data: savedItem,
      message: successByCreating(itemObjectName),
    };
    return res.status(201).json(returnedData);
  }

  const returnedData: IResponse = {
    errorMessage: errorByCreating(lowerCaseFirstLetter(itemObjectName)),
  };
  return res.status(500).json(returnedData);
});

router.put("/:id", authenticate, isAdmin, async (req, res) => {
  const itemId = req.params.id;
  const itemToUpdate = await Item.findOne({ _id: itemId });
  const reqData = req.body as IItem;

  if (itemToUpdate) {
    const existingItemWithName = await Item.findOne({ name: reqData.name });
    if (
      existingItemWithName &&
      existingItemWithName._id.toString() !== itemId
    ) {
      return res.status(500).json({
        errorMessage: alreadyExist(
          lowerCaseFirstLetter(itemObjectName),
          "name",
          reqData.name
        ),
      });
    }

    itemToUpdate.name = reqData.name;
    itemToUpdate.description = reqData.description;
    itemToUpdate.price = reqData.price;
    itemToUpdate.size = reqData.size;
    itemToUpdate.imageUrl = reqData.imageUrl;
    itemToUpdate.itemsInStock = reqData.itemsInStock;
    itemToUpdate.categories = reqData.categories;

    const updatedItem = await itemToUpdate.save();

    if (updatedItem) {
      const returnedData: IResponse = {
        data: updatedItem,
        message: successByUpdating(itemObjectName),
      };
      return res.status(200).json(returnedData);
    }

    return res.status(500).json({
      errorMessage: errorByUpdating(lowerCaseFirstLetter(itemObjectName)),
    });
  }

  return res
    .status(404)
    .json({ errorMessage: notExist(itemObjectName, "id", itemId) });
});

router.delete("/:id", authenticate, isAdmin, async (req, res) => {
  const itemId = req.params.id;
  const itemToDelete = await Item.findById(itemId);

  if (itemToDelete) {
    const deletedItem = await itemToDelete.remove();

    if (deletedItem) {
      const carts = await Cart.find({
        items: { $elemMatch: { itemId: itemId } },
      });
      for (const cart of carts) {
        cart.items = cart.items.filter((i) => i.itemId.toString() !== itemId);
        await cart.save();
      }

      const returnedData: IResponse = {
        message: successByDeleting(itemObjectName),
      };
      return res.json(returnedData);
    }

    const returnedData: IResponse = {
      errorMessage: errorByDeleting(lowerCaseFirstLetter(itemObjectName)),
    };
    return res.json(returnedData);
  }

  return res
    .status(404)
    .json({ errorMessage: notExist(itemObjectName, "id", itemId) });
});

export default router;
