import React from "react";
import styled from "styled-components";
import logoImg from "../../assets/images/logo-photo.svg";

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
  background-image: url(${logoImg});
`;
