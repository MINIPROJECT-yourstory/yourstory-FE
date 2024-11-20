import React from 'react';
import styled from 'styled-components';
import { media } from '../../styles/theme';

const VolunteerHeader = () => {
  return (
    <HeaderContainer>
    <HeaderTitle>
      봉사 활동
      <HeaderLine />
    </HeaderTitle>
    <ButtonGroup>
      <ActiveButton>봉사 신청</ActiveButton>
      <InactiveButton>봉사 현황</InactiveButton>
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

const ActiveButton = styled(Button)`
  background-color: var(--green);
  color: white;
`;

const InactiveButton = styled(Button)`
  background: none;
  color: var(--green);
`;

export default VolunteerHeader;