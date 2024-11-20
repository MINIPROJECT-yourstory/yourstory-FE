import React from 'react';
import styled from 'styled-components';

const LibraryHeader = () => {
  return (
    <HeaderContainer>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.padding.lg};
`;


export default LibraryHeader;