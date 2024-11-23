import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { bookApi } from "../../apis/bookApi";
import styled from "styled-components";
import { Book } from "lucide-react";
import NavBar from "../../components/common/NavBar";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const BookViewer = () => {
  const { id } = useParams();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        setIsLoading(true);
        const { data: pdfBlob, headers } = await bookApi.getBookPdf(id);

        // Content-Type 확인
        const contentType = headers["content-type"];
        console.log("PDF Content-Type:", contentType);

        if (!contentType.includes("application/pdf")) {
          throw new Error("서버가 PDF가 아닌 형식으로 응답했습니다");
        }

        const url = URL.createObjectURL(pdfBlob);
        console.log("PDF URL 생성:", url);
        setPdfUrl(url);
      } catch (error) {
        console.error("PDF 로드 실패:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPdf();

    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [id]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    console.log("PDF 로드 성공. 총 페이지:", numPages);
    setNumPages(numPages);
  };

  const onDocumentLoadError = (error) => {
    console.error("PDF 로드 에러:", error);
    setError(error);
  };

  if (isLoading) return <LoadingMessage />;
  if (error) return <ErrorMessage error={error} />;

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
                onLoadError={onDocumentLoadError}
                loading={<LoadingMessage />}
                error={<ErrorMessage error={error} />}
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

// LoadingMessage 컴포넌트 수정
const LoadingMessage = () => (
  <MessageContainer>
    <Book size={64} color="#BCBF1F" />
    <MessageText>PDF를 불러오는 중입니다...</MessageText>
  </MessageContainer>
);

// ErrorMessage 컴포넌트 수정
const ErrorMessage = ({ error }) => (
  <MessageContainer>
    <Book size={64} color="#BCBF1F" />
    <MessageText>PDF를 불러오는데 실패했습니다.</MessageText>
    <ErrorDetails>{error?.message}</ErrorDetails>
  </MessageContainer>
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

const MessageContainer = styled.div`
  text-align: center;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const MessageText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ErrorDetails = styled.p`
  margin: 0;
  color: red;
  font-size: 14px;
`;

export default BookViewer;
