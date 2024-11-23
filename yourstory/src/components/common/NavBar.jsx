import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LogoIcon from "../../assets/images/icon-logo.svg";
import AlertModal from "./AlertModal";
import ConfirmModal from "./ConfirmModal";
import SideMenu from "./SideMenu";
import axios from "axios";

const NavBar = ({ pagename }) => {
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_baseURL;
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [username, setUsername] = useState("");
  const access = localStorage.getItem("access");

  const toggleActiveMenu = (menu) => {
    setActiveMenu((prevMenu) => (prevMenu === menu ? null : menu));
  };

  const handleLogout = () => {
    setIsConfirmOpen(true);
  };

  const onConfirm = () => {
    localStorage.removeItem("access");
    setIsConfirmOpen(false);
    window.location.reload();
  };
  useEffect(() => {
    axios
      .get(`${baseURL}/name`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setUsername(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [access, baseURL]);

  return (
    <Wrapper>
      <Logo src={LogoIcon} onClick={() => navigate("/")} />
      {username ? (
        <>
          <SubText>
            <Name>{username}님</Name>
            <Welcome>환영합니다</Welcome>
          </SubText>
          <Logout onClick={handleLogout}>로그아웃</Logout>
          <NavList>
            {["volunteer", "library", "story"].map((menu) => (
              <NavItem
                key={menu}
                $isActive={activeMenu === menu}
                $isSelected={pagename === menu}
                onClick={() => toggleActiveMenu(menu)}
              >
                <Menu>
                  {menu === "volunteer"
                    ? "봉사활동"
                    : menu === "library"
                    ? "이타적 도서관"
                    : "우리의 이야기"}
                </Menu>
              </NavItem>
            ))}
          </NavList>
          {activeMenu && (
            <SideMenu isVisible={!!activeMenu} menu={activeMenu} />
          )}
        </>
      ) : (
        <>
          <SubText>
            <PointerText onClick={() => navigate("/login")}>로그인</PointerText>
            <PointerText onClick={() => navigate("/register")}>
              회원가입
            </PointerText>
          </SubText>
          <Logout style={{ visibility: "hidden" }}>로그아웃</Logout>
          <NavList>
            {["봉사활동", "이타적 도서관", "우리의 이야기"].map(
              (menu, index) => (
                <NavItem key={index}>
                  <Menu onClick={() => setIsAlertOpen(true)}>{menu}</Menu>
                </NavItem>
              )
            )}
          </NavList>
          {isAlertOpen && <AlertModal isAlertOpen={isAlertOpen} />}
        </>
      )}
      {isConfirmOpen && (
        <ConfirmModal
          isConfirmOpen={isConfirmOpen}
          onConfirm={onConfirm}
          message={"로그아웃 하시겠습니까?"}
          onCancel={() => setIsConfirmOpen(false)}
        />
      )}
    </Wrapper>
  );
};

export default NavBar;

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  background-color: var(--green);
  color: white;
  width: 145px;
  height: 100vh;
  box-shadow: 5px 0px 30px 0px #00000026;
  padding: 64px 60px 0px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 9999;
`;

const NavList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const NavItem = styled.li`
  text-align: center;
  font-weight: ${({ $isActive, $isSelected }) =>
    $isActive || $isSelected ? "700" : "400"};
  color: ${({ $isActive, $isSelected }) =>
    $isActive || $isSelected ? "white" : "#fafc97"};
`;

const Logo = styled.img`
  width: 109px;
  height: 73px;
  margin-bottom: 50px;
  cursor: pointer;
`;

const SubText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  /* margin-bottom: 140px; */
  line-height: 19.36px;
  letter-spacing: -0.06em;
  text-align: center;
  color: #fafc97;
  font-family: Inter;
  font-size: 16px;
`;

const Name = styled.div`
  font-weight: 700;
`;

const Welcome = styled.div`
  font-weight: 400;
`;

const Logout = styled.div`
  margin-top: 32px;
  margin-bottom: 90px;
  cursor: pointer;
  font-family: Inter;
  font-size: 16px;
  font-weight: 400;
  line-height: 19.36px;
  letter-spacing: -0.06em;
  color: #fafc97;
`;
const PointerText = styled.div`
  cursor: pointer;
`;

const Menu = styled.div`
  cursor: pointer;
  font-family: Inter;
  line-height: 21.78px;
  letter-spacing: -0.06em;
  text-decoration: none;
  font-size: 18px;
  &:hover {
    font-weight: 700;
  }
`;
