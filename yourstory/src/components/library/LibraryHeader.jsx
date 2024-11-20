import React from 'react';
import styled from 'styled-components';

const LibraryHeader = () => {
  return (
    <HeaderContainer>
      <Title>이타적 자서전 도서 목록</Title>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.padding.lg};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

export default LibraryHeader;