import * as express from "express";
import { IResponse } from "../types/Response";
import { sectionObjectName } from "../utilities/constants/global";
import { lowerCaseFirstLetter } from "../utilities/helperUtil";
import {
  alreadyExist,
  notExist,
  successByCreating,
  successByDeleting,
  successByUpdating,
} from "../utilities/validations/messages";
import Section from "../models/sectionModel";
import { isAdmin, authenticate } from "../middlewares/auth";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const sections = await Section.find();
    return res.status(200).json(sections);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/", authenticate, isAdmin, async (req, res) => {
  try {
    const name = req.body.name as string;
    const existingSection = await Section.findOne({ name: name });

    if (existingSection) {
      const returnedData: IResponse = {
        errorMessage: alreadyExist(
          lowerCaseFirstLetter(sectionObjectName),
          "name",
          name
        ),
      };
      return res.status(409).json(returnedData);
    }

    const newSection = new Section({
      name: name,
    });

    const newlyCreatedSection = await newSection.save();
    return res.status(201).json({
      message: successByCreating(sectionObjectName),
      data: newlyCreatedSection,
    });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
});

router.put("/:id", authenticate, isAdmin, async (req, res) => {
  try {
    const sectionId = req.params.id;
    const name = req.body.name as string;

    const existingSection = await Section.findOne({ name: name });
    if (existingSection && existingSection._id.toString() !== sectionId) {
      const returnedData: IResponse = {
        errorMessage: alreadyExist(
          lowerCaseFirstLetter(sectionObjectName),
          "name",
          name
        ),
      };
      return res.status(409).json(returnedData);
    } else {
      const updatedSection = await Section.findByIdAndUpdate(
        sectionId,
        { $set: req.body },
        { new: true }
      );

      if (updatedSection) {
        return res.status(200).json({
          message: successByUpdating(sectionObjectName),
          data: updatedSection,
        });
      }

      return res
        .status(404)
        .json({ errorMessage: notExist(sectionObjectName, "id", sectionId) });
    }
  } catch (err: any) {
    return res.status(500).json(err.message);
  }
});

router.delete("/:id", authenticate, isAdmin, async (req, res) => {
  try {
    const sectionId = req.params.id;
    const deletedSection = await Section.findByIdAndDelete(sectionId);

    if (deletedSection) {
      const returnedData: IResponse = {
        message: successByDeleting(sectionObjectName),
      };
      return res.json(returnedData);
    }

    const returnedData: IResponse = {
      errorMessage: notExist(sectionObjectName, "id", sectionId),
    };
    return res.json(returnedData);
  } catch (err: any) {
    return res.status(500).json(err.message);
  }
});

export default router;
