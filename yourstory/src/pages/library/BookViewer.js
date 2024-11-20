import React, { useState } from 'react';
import styled from 'styled-components';
import { Book } from 'lucide-react';
import NavBar from '../../components/common/NavBar';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// 최신 버전의 worker 파일 사용
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const BookViewer = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  // 테스트용 PDF URL 사용
  const pdfUrl = "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf";
  // const pdfUrl = "/sample.pdf";  // 로컬 파일은 나중에 테스트

  function onDocumentLoadSuccess({ numPages }) {
    console.log('PDF 파일 로드 성공! 페이지 수:', numPages);
    setNumPages(numPages);
  }

  return (
    <div>
      <NavBar pagename="library" />
      <PageContainer>
        <Title>E-북 도서읽기</Title>
        <ViewerCard>
          <ViewerContent>
            <PDFWrapper>
              <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={<LoadingMessage />}
                error={<ErrorMessage />}
              >
                <Page 
                  pageNumber={pageNumber} 
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </Document>
              {numPages && (
                <PageControls>
                  <button
                    disabled={pageNumber <= 1}
                    onClick={() => setPageNumber(prev => prev - 1)}
                  >
                    이전
                  </button>
                  <span>
                    {pageNumber} / {numPages}
                  </span>
                  <button
                    disabled={pageNumber >= numPages}
                    onClick={() => setPageNumber(prev => prev + 1)}
                  >
                    다음
                  </button>
                </PageControls>
              )}
            </PDFWrapper>
          </ViewerContent>
        </ViewerCard>
      </PageContainer>
    </div>
  );
};

const LoadingMessage = () => (
  <div style={{ textAlign: 'center', padding: '20px' }}>
    <Book size={64} color="#DC3545" />
    <p>PDF를 불러오는 중입니다...</p>
  </div>
);

const ErrorMessage = () => (
  <div style={{ textAlign: 'center', padding: '20px' }}>
    <Book size={64} color="#DC3545" />
    <p>PDF를 불러오는데 실패했습니다.</p>
  </div>
);

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
  background: #f7f7f3;
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

const PDFWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  .react-pdf__Document {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .react-pdf__Page {
    max-width: 100%;
    height: auto;

    canvas {
      max-width: 100%;
      height: auto !important;
    }
  }
`;

const PageControls = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-top: 1rem;

  button {
    padding: 0.5rem 1rem;
    background: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  }
`;

export default BookViewer;