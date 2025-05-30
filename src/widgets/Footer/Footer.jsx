import style from "./footer.module.scss";
import giticon from "./giticon.svg";

const Footer = () => {
  return (
    <section className={style["footer-container"]}>
      <div className={style["explanation"]}>
        <h1>SK-AI</h1>
        <h3>AI 국어 교육 웹 서비스</h3>
      </div>
      <img src={giticon} alt="깃허브 주소" />
    </section>
  );
};

export default Footer;
