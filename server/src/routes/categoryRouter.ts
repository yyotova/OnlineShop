import * as express from "express";
import { IResponse } from "../types/Response";
import { categoryObjectName } from "../utilities/constants/global";
import { lowerCaseFirstLetter } from "../utilities/helperUtil";
import {
  alreadyExist,
  notExist,
  successByCreating,
  successByDeleting,
  successByUpdating,
} from "../utilities/validations/messages";
import Category from "../models/categoryModel";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json(categories);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const name = req.body.name as string;
    const existingCategory = await Category.findOne({ name: name });

    if (existingCategory) {
      const returnedData: IResponse = {
        errorMessage: alreadyExist(
          lowerCaseFirstLetter(categoryObjectName),
          "name",
          name
        ),
      };
      return res.status(409).json(returnedData);
    }

    const newCategory = new Category({
      name: name,
    });

    const newlyCreatedCategory = await newCategory.save();
    return res.status(201).json({
      message: successByCreating(categoryObjectName),
      data: newlyCreatedCategory,
    });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const categoryId = req.params.id;
    const name = req.body.name as string;

    const existingCategory = await Category.findOne({ name: name });
    if (existingCategory._id.toString() !== categoryId) {
      const returnedData: IResponse = {
        errorMessage: alreadyExist(
          lowerCaseFirstLetter(categoryObjectName),
          "name",
          name
        ),
      };
      return res.status(409).json(returnedData);
    } else {
      const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        { $set: req.body },
        { new: true }
      );

      if (updatedCategory) {
        return res.status(200).json({
          message: successByUpdating(categoryObjectName),
          data: updatedCategory,
        });
      }

      return res
        .status(404)
        .json({ errorMessage: notExist(categoryObjectName, "id", categoryId) });
    }
  } catch (err: any) {
    return res.status(500).json(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const categoryId = req.params.id;
    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (deletedCategory) {
      const returnedData: IResponse = {
        message: successByDeleting(categoryObjectName),
      };
      return res.json(returnedData);
    }

    const returnedData: IResponse = {
      errorMessage: notExist(categoryObjectName, "id", categoryId),
    };
    return res.json(returnedData);
  } catch (err: any) {
    return res.status(500).json(err.message);
  }
});

export default router;
