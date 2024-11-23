import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Heart, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { bookApi } from "../../apis/bookApi";

const LibraryContent = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [likedBooks, setLikedBooks] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthAndFetchBooks = async () => {
      try {
        console.log("=== 인증 상태 체크 시작 ===");
        setIsLoading(true);

        const token = localStorage.getItem("accessToken");
        console.log("저장된 토큰:", token);

        if (!token) {
          console.log("토큰이 없습니다. 로그인 페이지로 이동합니다.");
          navigate("/login"); // 로그인 페이지로 리다이렉트
          return;
        }

        // 토큰 유효성 테스트를 위한 volunteer API 호출 테스트
        try {
          console.log("토큰 유효성 테스트 중...");
          const testResponse = await bookApi.getBooks();
          console.log("토큰 유효성 테스트 성공:", testResponse);
        } catch (error) {
          console.error("토큰이 유효하지 않습니다:", error);
          localStorage.removeItem("accessToken"); // 잘못된 토큰 제거
          navigate("/login");
          return;
        }

        // 도서 목록 가져오기
        console.log("도서 목록 조회 시작");
        const response = await bookApi.getBooks();

        if (response && response.data) {
          console.log("도서 목록 조회 성공:", response.data);
          setBooks(response.data);
        }
      } catch (error) {
        console.error("도서 목록 조회 실패:", error);
        if (error.response?.status === 403) {
          console.log("인증 에러. 로그인 페이지로 이동합니다.");
          navigate("/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthAndFetchBooks();
  }, [navigate]);

  const handleLike = async (bookId) => {
    try {
      if (likedBooks.has(bookId)) {
        await bookApi.deleteLike(bookId);
        setLikedBooks((prev) => {
          const newSet = new Set(prev);
          newSet.delete(bookId);
          return newSet;
        });
      } else {
        await bookApi.createLike(bookId);
        setLikedBooks((prev) => new Set([...prev, bookId]));
      }

      // 좋아요 업데이트 후 도서 목록 새로고침
      const response = await bookApi.getBooks();
      setBooks(response.data);
    } catch (error) {
      console.error("좋아요 처리 중 오류가 발생했습니다:", error);
    }
  };

  const handleMailClick = (bookId) => {
    navigate(`/letter/list/${bookId}`);
  };

  const handleBookView = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  return (
    <>
      {isLoading ? (
        <div>로딩 중...</div>
      ) : (
        <BookList>
          {books.map((book) => (
            <BookCard key={book.id}>
              <BookInfo>
                <div>
                  <BookTitle>{book.title},</BookTitle>
                  <BookSubtitle>{book.subtitle}</BookSubtitle>
                </div>

                <StatsContainer>
                  <Stat onClick={() => handleLike(book.id)}>
                    <Heart
                      fill={likedBooks.has(book.id) ? "white" : "none"}
                      style={{ cursor: "pointer" }}
                    />
                    <span>{book.likes}</span>
                  </Stat>
                  <Stat onClick={() => handleMailClick(book.id)}>
                    <Mail style={{ cursor: "pointer" }} />
                    <span>{book.messages}</span>
                  </Stat>
                </StatsContainer>
              </BookInfo>

              <ImageContainer>
                <img src={book.image} alt={book.title} />
                <ViewButton onClick={() => handleBookView(book.id)}>
                  도서 보기
                </ViewButton>
              </ImageContainer>
            </BookCard>
          ))}
        </BookList>
      )}
    </>
  );
};

const BookList = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.padding.md};

  ${({ theme }) => theme.media.tablet} {
    gap: ${({ theme }) => theme.spacing.padding.sm};
  }
`;

const BookCard = styled.div`
  display: flex;
  align-items: stretch;
  background-color: ${({ theme }) => theme.colors.primary.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.md};

  ${({ theme }) => theme.media.tablet} {
    flex-direction: column;
  }
`;

const BookInfo = styled.div`
  flex-grow: 1;
  padding: ${({ theme }) => theme.spacing.components.card.padding};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BookTitle = styled.h2`
  color: ${({ theme }) => theme.colors.text.white};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  margin-bottom: ${({ theme }) => theme.spacing.padding.xs};
  font-family: ${({ theme }) => theme.typography.fontFamily.main};
`;

const BookSubtitle = styled.h3`
  color: ${({ theme }) => theme.colors.text.white};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.padding.sm};
  font-family: ${({ theme }) => theme.typography.fontFamily.main};
`;

const StatsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.components.card.gap};
`;

const Stat = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text.white};

  svg {
    width: 1.25rem;
    height: 1.25rem;
    margin-right: ${({ theme }) => theme.spacing.padding.xs};
  }
`;

const ImageContainer = styled.div`
  width: 20rem;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${({ theme }) => theme.media.tablet} {
    width: 100%;
    height: 15rem;
  }
`;

const ViewButton = styled.button`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.padding.sm};
  right: ${({ theme }) => theme.spacing.padding.sm};
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.text.white};
  padding: ${({ theme }) =>
    `${theme.spacing.padding.xs} ${theme.spacing.padding.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  transition: ${({ theme }) => theme.transitions.short};
  font-family: ${({ theme }) => theme.typography.fontFamily.main};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.dark};
  }
`;

export default LibraryContent;
