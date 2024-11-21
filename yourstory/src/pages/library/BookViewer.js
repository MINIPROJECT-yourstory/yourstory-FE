import React, { useState } from "react";
import styled from "styled-components";
import { Book } from "lucide-react";
import NavBar from "../../components/common/NavBar";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const BookViewer = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  // 테스트용 PDF URL
  const pdfUrl =
    "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf";

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <>
      <NavBar pagename="library" />
      <PageContainer>
        <TitleContainer>
          <Title>E-북 도서읽기</Title>
          <Line />
        </TitleContainer>
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
                  <PageButton
                    disabled={pageNumber <= 1}
                    onClick={() => setPageNumber((prev) => prev - 1)}
                  >
                    이전
                  </PageButton>
                  <PageNumber>
                    {pageNumber} / {numPages}
                  </PageNumber>
                  <PageButton
                    disabled={pageNumber >= numPages}
                    onClick={() => setPageNumber((prev) => prev + 1)}
                  >
                    다음
                  </PageButton>
                </PageControls>
              )}
            </PDFWrapper>
          </ViewerContent>
        </ViewerCard>
      </PageContainer>
    </>
  );
};

const LoadingMessage = () => (
  <div style={{ textAlign: "center", padding: "20px" }}>
    <Book size={64} color="#BCBF1F" />
    <p>PDF를 불러오는 중입니다...</p>
  </div>
);

const ErrorMessage = () => (
  <div style={{ textAlign: "center", padding: "20px" }}>
    <Book size={64} color="#BCBF1F" />
    <p>PDF를 불러오는데 실패했습니다.</p>
  </div>
);

const PageContainer = styled.div`
  margin-left: 16.5625rem;
  padding: 5rem;
  min-height: 100vh;
  background: #fafafa;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.3125rem;
`;

const Title = styled.div`
  font-size: 1.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary.main};
  white-space: nowrap;
  margin-bottom: 2rem;
  line-height: -6%;
`;

const Line = styled.div`
  width: 100%;
  height: 2px;
  margin-top: -1.8rem;
  background-color: ${({ theme }) => theme.colors.primary.light};
`;

const ViewerCard = styled.div`
  background: #f7f7f3;
  padding: 2rem;
  min-height: 600px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
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
  gap: ${({ theme }) => theme.spacing.padding.sm};
  align-items: center;
  margin-top: 1rem;
`;

const PageButton = styled.button`
  width: 103px;
  height: 37px;
  background-color: ${({ disabled }) =>
    disabled ? "#989971" : ({ theme }) => theme.colors.primary.light};
  color: ${({ theme }) => theme.colors.text.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  font-weight: ${({ theme }) => theme.typography.fontWeight.extraBold};
  font-family: ${({ theme }) => theme.typography.fontFamily.main};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

const PageNumber = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.main};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text.primary};
  padding: 0 ${({ theme }) => theme.spacing.padding.sm};
`;

export default BookViewer;
