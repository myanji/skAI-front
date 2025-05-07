const Header = () => {
  return (
    <header className="">
      <h1>
        <a>S-KAI</a>
      </h1>

      <nav>
        {/**/}
        <ul className="">
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
