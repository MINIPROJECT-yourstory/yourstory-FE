import React from 'react';
import styled from 'styled-components';

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

  &:last-child {  
    margin-top: -1px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end; 
  width: 100%;  
  margin-top: -19px;  
`;

const Button = styled.button`
  font-size: 20px;
  padding: 1rem;
  cursor: pointer;
  border: none;
  height: 88px;
  width: 175px;
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