import * as express from "express";
import Item from "../models/itemModel";
import type { IItem } from "../types/Item";
import type { IResponse } from "../types/Response";

// Router object
const router = express.Router();

// Get all items
router.get("/", async (req, res) => {
  const items = await Item.find({});
  const returnedData: IResponse = {
    data: items,
  };

  res.json(returnedData);
});

// Get item by id
router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findOne({ _id: req.params.id });

    if (item) {
      const returnedData: IResponse = {
        data: item,
      };
      res.json(returnedData);
    }
  } catch (err: any) {
    const returnedData: IResponse = {
      errorMessage: err.message,
    };
    res.status(404).send(returnedData);
  }
});

// Create item
// TODO:: authentication
router.post("/manage-items", async (req, res) => {
  const reqData = req.body as IItem;
  const item = new Item({
    name: reqData.name,
    description: reqData.description,
    price: reqData.price,
    size: reqData.size,
    imageUrl: reqData.imageUrl,
    itemsInStock: reqData.itemsInStock,
    category: reqData.category,
    numReviews: reqData.numReviews,
  });
  const newItem = await item.save();

  if (newItem) {
    const returnedData: IResponse = {
      data: newItem,
      message: "Item added successfully!",
    };
    return res.status(201).json(returnedData);
  }

  const returnedData: IResponse = {
    errorMessage: "Error while creating item!",
  };
  return res.status(500).json(returnedData);
});

// Update item by id
// TODO:: authentication
router.put("/edit-item/:id", async (req, res) => {
  const itemId = req.params.id;
  const itemToUpdate = await Item.findOne({ _id: itemId });
  const reqData = req.body as IItem;

  if (itemToUpdate) {
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
  }

  return res.status(500).json({ error: "Error while updating the item!" });
});

// Delete item by id
// TODO:: authentication
router.delete("/:id", async (req, res) => {
  const itemId = req.params.id;
  const itemToDelete = await Item.findById(itemId);

  if (itemToDelete) {
    await itemToDelete.remove();
    const returnedData: IResponse = {
      message: "Item deleted successfully!",
    };
    res.json(returnedData);
  } else {
    const returnedData: IResponse = {
      errorMessage: "Error while trying to delete item",
    };
    res.json(returnedData);
  }
});

export default router;
