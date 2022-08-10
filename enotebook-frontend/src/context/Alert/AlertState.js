import { useState } from "react";
import AlertContext from "./AlertContext";

const AlertState = (props) => {
  const [alert, setAlert] = useState({ message: "", type: "" });
  const showAlert = (message, status) => {
    setAlert({
      message: message,
      type: !status ? "danger" : "success",
    });

    setTimeout(() => {
      setAlert({ message: "", type: "" });
    }, 1500);
  };

  return (
    <AlertContext.Provider value={{ alert, setAlert, showAlert }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
