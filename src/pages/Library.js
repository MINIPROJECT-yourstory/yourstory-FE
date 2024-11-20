import React from 'react';
import styled from 'styled-components';
import NavBar from '../components/common/NavBar';
import LibraryHeader from '../components/library/LibraryHeader';
import LibraryContent from '../components/library/LibraryContent';
import { media } from '../styles/theme';

const Library = () => {
  return (
    <div>
      <NavBar pagename="library" />
      <PageContainer>
        <LibraryHeader />
        <TitleWrapper>
          <TitleText>이타적 자서전 도서 목록</TitleText>
          <TitleLine />
        </TitleWrapper>
        <LibraryContent />
      </PageContainer>
    </div>
  );
};

const PageContainer = styled.div`
  padding: 81px 5%;
  margin-left: 16.5625rem;
  font-family: Inter;

  ${media.laptop} {
    margin-left: 16.5625rem;
    padding: 40px 20px;
  }

  ${media.tablet} {
    padding: 20px 10px;
    margin-left: 16.5625rem;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.padding.md};
  margin-bottom: 60px;
`;

const TitleText = styled.div`
  font-family: 'Inter';
  font-size: 24px;
  font-weight: 800;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  color: #BCBF1F;
  white-space: nowrap;
`;

const TitleLine = styled.div`
  flex: 1;
  height: 2px;
  background-color: #BCBF1F;
`;

export default Library; 