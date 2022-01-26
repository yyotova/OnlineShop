import {
  Grid,
  Container,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Box,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { ProductType } from "../../models/product-model";
import Product from "./singleProduct/Product";
import { AppState } from "../../store";
import useStyles from "./styles";
import Chat from "../Chat";
import { LoginActions } from "../../models/user-types";
import { ReduxState } from "../../models/shared-types";
import { ENDPOINT } from "../../constants/global";
import socketIOClient from "socket.io-client";
import Select from "react-select";
import { MessageModel } from "../../models/message-model";

interface ReceiverType {
  label: string;
  value: string;
}

const Products = () => {
  const classes = useStyles();
  const products = useSelector((state: AppState) => state.allProducts.products);

  const userLogin: LoginActions = useSelector(
    (state: ReduxState) => state.userLogin
  );
  const { userInfo } = userLogin;

  const [receiver, setReceiver] = useState({ label: "", value: "" });
  const [receiverOptions, setReceiverOptions] = useState(new Array());

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.connect();
    socket.on("listAllMessageObjects", (messageObjects: MessageModel[]) => {
      console.log(messageObjects);
      let options: ReceiverType[] = [];
      messageObjects.forEach((obj) => {
        options = options.concat({ value: obj.userId, label: obj.username });
      });
      setReceiverOptions(options);
    });

    if (userInfo && userInfo.isAdmin) {
      socket.emit("getAllMessageObjects");
    }

    return () => {
      socket.disconnect();
    };
  }, [userInfo]);

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Container maxWidth="xl" className={classes.items}>
        <Grid container justifyContent="center" spacing={3}>
          {products &&
            products.map((product: ProductType) => (
              <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                <Product product={product} />
              </Grid>
            ))}
        </Grid>
      </Container>
      <div style={{ display: "flex" }}>
        <div className={classes.chat}>
          <Accordion
            disabled={userInfo && userInfo.isAdmin && receiver.value === ""}
          >
            <AccordionSummary
              expandIcon={<ExpandLessIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Customer Service Chat</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Chat receiverId={receiver.value} />
            </AccordionDetails>
          </Accordion>
        </div>
        <div
          style={{
            bottom: 0,
            right: "380px",
            position: "fixed",
            width: "200px",
          }}
        >
          {userInfo && userInfo.isAdmin && (
            <Box m={0.5}>
              <Select
                menuPlacement="top"
                value={receiver}
                options={receiverOptions}
                onChange={(value: ReceiverType) => {
                  setReceiver(value);
                }}
              ></Select>
            </Box>
          )}
        </div>
      </div>
    </main>
  );
};

export default Products;
