import React, { useContext } from "react";
import AlertContext from "../context/Alert/AlertContext";

const Alert = () => {
  let context = useContext(AlertContext);

  let { alert } = context;

  const capitalize = (word) => {
    let lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  return (
    <div style={{ height: "50px" }}>
      {alert.message !== "" && (
        <div
          className={`alert alert-${alert.type} alert-dismissable fade show`}
          role="alert"
        >
          <strong>
            {capitalize(alert.type === "success" ? "success" : "error")}
          </strong>{" "}
          : {alert.message}
        </div>
      )}
    </div>
  );
};

export default Alert;
