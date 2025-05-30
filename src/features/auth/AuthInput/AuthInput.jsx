import React from "react";
import style from "./auth-input.module.scss";

const AuthInput = ({ value, onChange, ...props }) => {
  return (
    <input
      className={style["auth-input"]}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

export default AuthInput;
