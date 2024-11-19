import React from "react";
import styled from "styled-components";

const AccountButton = ({ txt, onBtnClick, type, color, backgroundColor }) => {
  return (
    <div>
      <ButtonBox
        onClick={onBtnClick}
        type={type}
        color={color}
        backgroundColor={backgroundColor}
      >
        {txt || "버튼"}
      </ButtonBox>
    </div>
  );
};

export default AccountButton;

const ButtonBox = styled.button`
  font-family: "Intel";
  background-color: ${(props) => props.backgroundColor || "#363721"};
  width: ${(props) => props.width || "151px"};
  height: 49px;
  border-radius: 60px;
  border: none;
  color: ${(props) => props.color || "#D1D36D"};
  font-weight: 700;
  cursor: pointer;
  font-size: 20px;
`;
