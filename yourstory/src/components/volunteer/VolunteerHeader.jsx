import React from 'react';
import styled from 'styled-components';

const VolunteerHeader = () => {
  return (
    <HeaderContainer>
      <ButtonGroup>
        <ActiveButton>봉사 신청</ActiveButton>
        <InactiveButton>봉사 현황</InactiveButton>
      </ButtonGroup>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
  margin-bottom: 2rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
`;

const ActiveButton = styled(Button)`
  background-color: #C5D82D;
  color: white;
`;

const InactiveButton = styled(Button)`
  background: none;
`;

export default VolunteerHeader;