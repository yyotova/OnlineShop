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
import { MessageModel } from "../models/message-model";
import { IconButton } from "@material-ui/core";
import { setMessages } from "../actions/messageActions";
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

const Chat = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userLogin: LoginActions = useSelector(
    (state: ReduxState) => state.userLogin
  );
  const { userInfo } = userLogin;
  const [message, setMessage] = useState("");

  const allUserMessages = useSelector(
    (state: AppState) => state.messageList.messages
  );
  const timeNow = moment().format("h:mm A");

  const socket = socketIOClient(ENDPOINT);
  socket.on("returnedFromServerMessage", (message: MessageModel) => {
    dispatch(setMessages(allUserMessages.concat(message)));
  });

  socket.on("listMessages", (messages: MessageModel[]) => {
    dispatch(setMessages(messages));
  });

  useEffect(() => {
    if (userInfo && userInfo.token) {
      socket.emit("getUserMessages", userInfo?._id);
    }
  }, [userInfo]);

  return (
    <div className={classes.chat}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" className="header-message">
            Chat
          </Typography>
        </Grid>
      </Grid>
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
            {allUserMessages &&
              allUserMessages.map((message: MessageModel, index: number) => (
                <ListItem key={index}>
                  <Grid container>
                    <Grid item xs={12}>
                      <ListItemText primary={message.message}></ListItemText>
                    </Grid>
                    <Grid item xs={12}>
                      <ListItemText secondary={message.time}></ListItemText>
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
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
              >
                <IconButton
                  onClick={() => {
                    if (message) {
                      const messageObject: MessageModel = {
                        userId: "",
                        message: message,
                        time: moment().format("h:mm A"),
                      };

                      if (userInfo) {
                        messageObject.userId = userInfo._id;
                        socket.emit("chatMessage", messageObject);
                      } else {
                        dispatch(
                          setMessages(allUserMessages.concat(messageObject))
                        );
                      }

                      setMessage("");
                    }
                  }}
                >
                  <SendIcon />
                </IconButton>
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Chat;
