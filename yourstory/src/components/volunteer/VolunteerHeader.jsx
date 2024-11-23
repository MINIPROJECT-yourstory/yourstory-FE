import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import theme, { media } from "../../../src/styles/theme";

const VolunteerHeader = ({ currentPage = "apply" }) => {
  const navigate = useNavigate();

  const handleVolunteerClick = () => {
    navigate("/work");
  };

  const handleStatusClick = () => {
    navigate("/wo/my-status");
  };

  return (
    <HeaderContainer>
      <HeaderTitle>
        봉사 활동
        <HeaderLine />
      </HeaderTitle>
      <ButtonGroup>
        <Button
          onClick={handleVolunteerClick}
          $isActive={currentPage === "apply"}
        >
          봉사 신청
        </Button>
        <Button
          onClick={handleStatusClick}
          $isActive={currentPage === "status"}
        >
          봉사 현황
        </Button>
      </ButtonGroup>
      <HeaderLine />
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  padding-bottom: 1rem;
  margin-bottom: 2rem;
`;

const HeaderLine = styled.div`
  border-bottom: 2px solid var(--green);
  flex: 1;
  height: 1px;

  &:last-child {
    margin-top: -1px;
  }
`;

const HeaderTitle = styled.div`
  font-size: 30px;
  font-weight: 400;
  color: var(--green);
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  z-index: 0;

  ${media.tablet} {
    font-size: 24px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: -19px;

  ${media.tablet} {
    margin-top: 20px;
    justify-content: flex-end;
    position: relative;
    z-index: 1;
  }
`;

const Button = styled.button`
  font-size: 20px;
  padding: 1rem;
  cursor: pointer;
  border: none;
  height: 88px;
  width: 175px;
  background-color: ${(props) =>
    props.$isActive ? "var(--green)" : "transparent"};
  color: ${(props) => (props.$isActive ? "white" : "var(--green)")};

  ${media.tablet} {
    height: 50px;
    width: 120px;
    font-size: 16px;
  }

  ${media.mobile} {
    height: 40px;
    width: 100px;
    font-size: 14px;
    padding: 0.5rem;
  }
`;

export default VolunteerHeader;
