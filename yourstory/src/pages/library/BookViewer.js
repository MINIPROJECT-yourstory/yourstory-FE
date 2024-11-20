import React from 'react';
import styled from 'styled-components';
import { Book } from 'lucide-react';
import NavBar from '../../components/common/NavBar';

const BookViewer = () => {
  return (
    <div>
      <NavBar pagename="library" />
      <PageContainer>
          <Title>E-북 도서읽기</Title>        
        <ViewerCard>
          <ViewerContent>
            <div className="text-center">
              <Book size={64} color="#DC3545" />
              <ViewerTitle>E-북 도서읽기 기능</ViewerTitle>
              {/* TODO: Add react-pdf viewer component here */}
            </div>
          </ViewerContent>
        </ViewerCard>
      </PageContainer>
    </div>
  );
};

const PageContainer = styled.div`
  margin-left: 16.5625rem;
  padding: 5rem;
  min-height: 100vh;
  background: #fafafa;
`;

const Title = styled.div`
  font-size: 1.875rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 2rem;
`;

const ViewerCard = styled.div`
  background: #F7F7F3;
  padding: 2rem;
  min-height: 600px;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const ViewerContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ViewerTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #DC3545;
  margin-top: 1rem;
`;

export default BookViewer;