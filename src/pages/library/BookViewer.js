import React from 'react';
import styled from 'styled-components';
import NavBar from '../../components/common/NavBar';
import { media } from '../../styles/theme';

const BookViewer = () => {
    return (
        <div>
            <NavBar pagename="library" />
            <PageContainer>
                <Title>E-book 도서 읽기</Title>
                <ViewerContent>
                    북 뷰어
                </ViewerContent>
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

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.padding.lg};
`;

const ViewerContent = styled.div`
  background-color: ${({ theme }) => theme.colors.background.paper};
  padding: ${({ theme }) => theme.spacing.padding.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

export default BookViewer; 