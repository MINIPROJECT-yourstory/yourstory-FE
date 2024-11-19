import React from "react";
import styled from "styled-components";
import GreenLogo from "../../assets/images/icon-green.svg";

const HomeIntro = () => {
  return (
    <div>
      <HeaderContainer>
        <HeaderTitle>
          소개
          <HeaderLine />
        </HeaderTitle>
        <HeaderContent>
          당신의 이야기 <Logo src={GreenLogo} /> 의 세 가지 가치
        </HeaderContent>
      </HeaderContainer>
    </div>
  );
};

export default HomeIntro;

const HeaderContainer = styled.div`
  /* padding-bottom: 1rem;
  margin-bottom: 2rem; */
`;

const HeaderTitle = styled.div`
  font-size: 30px;
  font-weight: 400;
  color: var(--green);
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const HeaderLine = styled.div`
  border-bottom: 2px solid var(--green);
  flex: 1;
  height: 1px;
`;

const HeaderContent = styled.div`
  font-size: 30px;
  font-weight: 700;
  color: var(--green);
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: -6%;
  border-bottom: 2px solid var(--green);
  padding: 5rem;
`;
const Logo = styled.img`
  width: 45px;
  height: 45px;
`;
