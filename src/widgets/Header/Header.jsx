import style from "./header.module.scss";

const Header = () => {
  return (
    <header className={style["header-container"]}>
      <h1 className={style["logo"]}>
        <a>
          <p>S</p>
          -KAI
        </a>
      </h1>

      <nav>
        <ul className={style["menu"]}>
          <li>1단계</li>
          <li>2단계</li>
          <li>3단계</li>
          <li>일기</li>
        </ul>
      </nav>
      <div>
        <button>로그인</button>
      </div>
    </header>
  );
};

export default Header;
