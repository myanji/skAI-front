import style from "./auth-btn.module.scss";

const AuthBtn = ({ text, disabled, canSubmit, ...props }) => {
  return (
    <button
      className={`${style["btn-container"]} ${
        canSubmit ? style["select"] : ""
      }`}
      disabled={disabled}
      {...props}
    >
      {text}
    </button>
  );
};

export default AuthBtn;
