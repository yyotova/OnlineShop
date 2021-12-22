import * as express from "express";
import Item from "../models/itemModel";
import type { IItem } from "../types/Item";
import type { IResponse } from "../types/Response";

const router = express.Router();

router.get("/", async (req, res) => {
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

  const returnedData: IResponse = {
    data: items,
  };
  return res.json(returnedData);
});

router.get("/:id", async (req, res) => {
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
        errorMessage: `Item with id '${id}' does not exist!`,
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

// TODO:: authentication
router.post("/manage-items", async (req, res) => {
  const reqData = req.body as IItem;
  const existingItem = await Item.findOne({ name: reqData.name });

  if (existingItem) {
    const returnedData: IResponse = {
      errorMessage: "The provided item name already exists!",
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
    category: reqData.category,
  });
  const savedItem = await item.save();

  if (savedItem) {
    const returnedData: IResponse = {
      data: savedItem,
      message: "Item added successfully!",
    };
    return res.status(201).json(returnedData);
  }

  const returnedData: IResponse = {
    errorMessage: "Error while creating item!",
  };
  return res.status(500).json(returnedData);
});

// TODO:: authentication
router.put("/:id", async (req, res) => {
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
        errorMessage: `Item with name '${reqData.name}' already exists!`,
      });
    }

    itemToUpdate.name = reqData.name;
    itemToUpdate.description = reqData.description;
    itemToUpdate.price = reqData.price;
    itemToUpdate.size = reqData.size;
    itemToUpdate.imageUrl = reqData.imageUrl;
    itemToUpdate.itemsInStock = reqData.itemsInStock;
    itemToUpdate.category = reqData.category;

    const updatedItem = await itemToUpdate.save();

    if (updatedItem) {
      const returnedData: IResponse = {
        data: updatedItem,
        message: "Item updated successfully!",
      };
      return res.status(200).json(returnedData);
    }

    return res
      .status(500)
      .json({ errorMessage: "Error while updating the item!" });
  }

  return res
    .status(404)
    .json({ errorMessage: `Item with id '${itemId}' does not exist!` });
});

// TODO:: authentication
router.delete("/:id", async (req, res) => {
  const itemId = req.params.id;
  const itemToDelete = await Item.findById(itemId);

  if (itemToDelete) {
    const deletedItem = await itemToDelete.remove();

    if (deletedItem) {
      const returnedData: IResponse = {
        message: "Item deleted successfully!",
      };
      return res.json(returnedData);
    }

    const returnedData: IResponse = {
      errorMessage: "Error while trying to delete item",
    };
    return res.json(returnedData);
  }

  return res
    .status(404)
    .json({ errorMessage: `Item with id '${itemId}' does not exist!` });
});

export default router;
