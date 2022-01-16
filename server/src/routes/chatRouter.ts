import * as express from "express";
import { authenticate } from "../middlewares/auth";
import moment from "moment";

const formatMessage = (username, text) => {
  return {
    username,
    text,
    time: moment().format("h:mm A"),
  };
};

export { formatMessage };
