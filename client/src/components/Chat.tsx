import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";
import moment from "moment";
import { ENDPOINT } from "../constants/global";
import socketIOClient from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { LoginActions } from "../models/user-types";
import { ReduxState } from "../models/shared-types";
import { MessageModel, MessageType } from "../models/message-model";
import { setMessageObject } from "../actions/messageActions";
import { AppState } from "../store";

const useStyles = makeStyles({
  chat: {
    minWidth: "20%",
  },
  chatSection: {
    width: "100%",
    height: "80vh",
  },
  headBG: {
    backgroundColor: "#e0e0e0",
  },
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
  },
  messageArea: {
    height: "70vh",
    overflowY: "auto",
  },
});

interface ChatType {
  receiverId: string;
  currentMessages?: MessageType[];
}

const Chat = ({ receiverId }: ChatType) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userLogin: LoginActions = useSelector(
    (state: ReduxState) => state.userLogin
  );
  const { userInfo } = userLogin;
  const [message, setMessage] = useState("");

  const userMessageObject = useSelector(
    (state: AppState) => state.messageList.messageObject
  );
  const timeNow = moment().format("h:mm A");

  let socket;
  useEffect(() => {
    socket = socketIOClient(ENDPOINT);
    socket.connect();
    socket.on("newMessage", (message: MessageType) => {
      userMessageObject.messages = userMessageObject.messages.concat(message);
      dispatch(setMessageObject(userMessageObject));
    });

    socket.on("listMessages", (messageObject: MessageModel) => {
      dispatch(setMessageObject(messageObject));
    });

    if (userInfo && userInfo.token && !userInfo.isAdmin) {
      socket.emit("getUserMessages", userInfo?._id);
    } else if (userInfo && userInfo.isAdmin && receiverId !== "") {
      socket.emit("getUserMessages", receiverId);
    }

    return () => {
      socket.disconnect();
    };
  });

  return (
    <div className={classes.chat}>
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item xs={9}>
          <List className={classes.messageArea}>
            <ListItem key="1">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText primary="We are away, leave us a message!"></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText secondary={timeNow}></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            {userMessageObject &&
              userMessageObject.messages.map(
                (message: MessageType, index: number) => (
                  <ListItem key={index}>
                    <Grid container>
                      <Grid item xs={12}>
                        <ListItemText primary={message.message}></ListItemText>
                      </Grid>
                      <Grid item xs={12}>
                        {userInfo && userInfo.token ? (
                          <ListItemText
                            secondary={
                              message.toAdmin
                                ? `${message.time} ${userMessageObject.username}`
                                : `${message.time} Admin`
                            }
                          ></ListItemText>
                        ) : (
                            <ListItemText secondary={message.time}></ListItemText>
                          )}
                      </Grid>
                    </Grid>
                  </ListItem>
                )
              )}
          </List>
          <Divider />
          <Grid container style={{ padding: "20px" }}>
            <Grid item xs={11}>
              <TextField
                id="outlined-basic-email"
                label="Type Something"
                fullWidth
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />
            </Grid>
            <Grid item xs={1}>
              <Fab
                color="primary"
                aria-label="add"
                style={{ maxWidth: "50px", maxHeight: "50px" }}
                onClick={() => {
                  if (message) {
                    const messageType: MessageType = {
                      message: message,
                      time: moment().format("h:mm A"),
                      toAdmin: !userInfo || !userInfo.isAdmin,
                    };

                    let messageObject: MessageModel;
                    if (messageType.toAdmin) {
                      messageObject = {
                        userId: userInfo._id,
                        messages: [messageType],
                      };
                    } else {
                      messageObject = {
                        userId: receiverId,
                        messages: [messageType],
                      };
                    }

                    userMessageObject.messages =
                      userMessageObject.messages.concat(messageType);
                    if (userInfo) {
                      socket.emit("sendMessage", messageObject);
                    } else {
                      dispatch(setMessageObject(userMessageObject));
                    }

                    setMessage("");
                  }
                }}
              >
                <SendIcon />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Chat;
