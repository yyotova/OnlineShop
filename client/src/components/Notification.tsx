import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";

interface NotificationType {
  message: string;
  isOpen: boolean;
  setIsOpen: (value: React.SetStateAction<boolean>) => void;
}

const Notification = ({ message, isOpen, setIsOpen }: NotificationType) => {
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        severity="info"
        onClose={() => {
          setIsOpen(false);
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
