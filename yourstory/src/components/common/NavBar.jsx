import React from "react";

const NavBar = () => {
  return (
    <div>
      <h1>당신의 이야기</h1>
      <nav>
        <ul>
          <li>
            <Link to="/volunteer">봉사활동</Link>
          </li>
          <li>
            <Link to="/library">이타적 도서관</Link>
          </li>
          <li>
            <Link to="/story">우리의 이야기</Link>
          </li>
          <li>
            <Link to="/login">로그인</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
