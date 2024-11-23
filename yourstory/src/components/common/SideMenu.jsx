import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Line from "../../assets/images/line-menu.svg";

const SideMenu = ({ isVisible, menu }) => {
  const SideContent = () => {
    if (menu === "volunteer") {
      return (
        <>
          <Container>
            <Title>봉사 활동</Title>
            <HrImg src={Line} alt="line" />
            <br />
            <LinkBox>
              <TitleLink to={"/volunteer"}>
                {">"}&nbsp;&nbsp;봉사 신청
              </TitleLink>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.7rem",
                }}
              >
                <TitleLink to={"/volunteer/status"}>
                  {">"}&nbsp;&nbsp;봉사 현황
                </TitleLink>
                <SubLink to={"/volunteer/status"}>진행 중인 봉사활동</SubLink>
                <SubLink to={"/volunteer/diary"}>자서전 기록장</SubLink>
              </div>
            </LinkBox>
          </Container>
        </>
      );
    }
    if (menu === "library") {
      return (
        <>
          <Container>
            <Title>이타적 도서관</Title>
            <HrImg src={Line} alt="line" />
            <br />
            <TitleLink to={"/library"}>
              {">"}&nbsp;&nbsp;이타적 자서전
            </TitleLink>
          </Container>
        </>
      );
    }
    if (menu === "story") {
      return (
        <>
          <Container>
            <Title>우리의 이야기</Title>
            <HrImg src={Line} alt="line" />
            <br />
            <TitleLink to={"/story"}>{">"}&nbsp;&nbsp;우리의 이야기</TitleLink>
          </Container>
        </>
      );
    }
    return null;
  };

  return <Wrapper isVisible={isVisible}>{SideContent()}</Wrapper>;
};

export default SideMenu;

const Wrapper = styled.div`
  position: fixed;
  width: 726px;
  height: 100vh;
  top: 0;
  left: ${(props) => (props.isVisible ? "265px" : "-726px")};
  background: #bcbf1fde;
  font-family: Inter;
  font-size: 20px;
  font-weight: 400;
  line-height: 24.2px;
  letter-spacing: -0.06em;
  z-index: 9998;
`;

const Container = styled.div`
  margin-left: 60px;
`;

const Title = styled.div`
  margin-top: 279px;
  font-family: Inter;
  font-size: 20px;
  font-weight: 400;
  line-height: 24.2px;
  letter-spacing: -0.06em;
`;
const HrImg = styled.img`
  margin: 17px 0px;
`;
const LinkBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 7.1875rem;
`;

const TitleLink = styled(Link)`
  width: 80px;
  color: #fafc97;
  text-decoration: none;
  font-family: Inter;
  font-size: 16px;
  font-weight: 400;
  line-height: 19.36px;
  letter-spacing: -0.06em;
  text-align: left;
  &:hover {
    font-weight: 700;
  }
`;

const SubLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  font-family: Inter;
  font-size: 16px;
  font-weight: 400;
  line-height: 19.36px;
  letter-spacing: -0.06em;
  margin-left: 0.8rem;
  &:hover {
    font-weight: 700;
  }
`;
