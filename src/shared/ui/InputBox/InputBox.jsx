import style from "./input-box.module.scss";

const InputBox = ({ text }) => {
  return (
    <input className={style["input-style"]} type="text" placeholder={text} />
  );
};

export default InputBox;
