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
        <TitleContainer>
          <TitleText>이타적 자서전 도서 목록</TitleText>
          <TitleLine />
        </TitleContainer>
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

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 17px;
  margin-bottom: 60px;
  padding: 0;
`;

const TitleText = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: 24px;
  font-weight: 800;
  color: #BCBF1F;
  margin: 0;
  padding: 0;
  white-space: nowrap;
`;

const TitleLine = styled.div`
  flex: 1;
  height: 2px;
  background-color: #BCBF1F;
  margin: 0;
  padding: 0;
`;

export default Library; 