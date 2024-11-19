import React from "react";
import styled from "styled-components";
import LoginImg from "../../assets/images/img-login.svg";

const LogoZone = () => {
  return (
    <div>
      <Wrapper></Wrapper>
    </div>
  );
};

export default LogoZone;

const Wrapper = styled.div`
  width: 670px;
  height: 832px;
  background-image: url(${LoginImg});
`;
