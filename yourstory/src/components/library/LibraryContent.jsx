import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { Heart, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { bookApi } from "../../apis/bookApi";
import { media } from "../../styles/theme";

const LibraryContent = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBooks = useCallback(async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("access");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await bookApi.getBooks();
      console.log("받아온 도서 데이터:", response);
      if (Array.isArray(response)) {
        setBooks(response);
      } else {
        console.error("예상치 못한 응답 형식:", response);
      }
    } catch (error) {
      console.error("도서 목록 조회 실패:", error);
      if (error.response?.status === 403) {
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleLike = async (bookId) => {
    try {
      const book = books.find((b) => b.id === bookId);
      if (!book) return;

      let updatedLikes;
      if (book.isLike) {
        updatedLikes = await bookApi.deleteLike(bookId);
      } else {
        updatedLikes = await bookApi.createLike(bookId);
      }

      setBooks(
        books.map((book) =>
          book.id === bookId
            ? { ...book, likes: updatedLikes, isLike: !book.isLike }
            : book
        )
      );
    } catch (error) {
      console.error("좋아요 처리 중 오류:", error);
    }
  };

  const handleMailClick = (bookId) => {
    navigate(`/letter/${bookId}`);
  };

  const handleBookView = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  if (isLoading) {
    return <LoadingContainer>도서 목록을 불러오는 중...</LoadingContainer>;
  }

  if (!Array.isArray(books) || books.length === 0) {
    return <EmptyContainer>등록된 도서가 없습니다.</EmptyContainer>;
  }

  return (
    <ContentWrapper>
      <BookList>
        {books.map((book, index) => (
          <React.Fragment key={book.id}>
            <BookCard>
              <BookInfo>
                <Titlediv>
                  <BookTitle>{book.addressee} 어르신의 이야기,</BookTitle>
                  <BookSubtitle>{book.title}</BookSubtitle>
                </Titlediv>

                <StatsContainer>
                  <Stat onClick={() => handleLike(book.id)}>
                    <Heart
                      fill={book.isLike ? "white" : "none"}
                      color="white"
                      size={30}
                    />
                    <span>{book.likes}</span>
                  </Stat>
                  <Stat>
                    <Mail
                      fill={book.isMine ? "white" : "none"}
                      color="white"
                      size={30}
                      onClick={() => handleMailClick(book.id)}
                    />
                    <span>{book.letters}</span>
                  </Stat>
                </StatsContainer>
              </BookInfo>

              <ImageContainer>
                <BookImage src={book.imgPath} alt={book.title} />
                <ViewButton onClick={() => handleBookView(book.id)}>
                  도서 보기
                </ViewButton>
              </ImageContainer>
            </BookCard>
            {index < books.length - 1 && <DashedLine />}
          </React.Fragment>
        ))}
      </BookList>
    </ContentWrapper>
  );
};

const ContentWrapper = styled.div`
  width: 100%;
  margin-top: 2rem;
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: 2rem;
  color: #333;
`;

const EmptyContainer = styled.div`
  text-align: center;
  padding: 2rem;
  color: #333;
`;

const BookList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const BookCard = styled.div`
  display: flex;
  align-items: stretch;
  background-color: #ced118;
  border-radius: 25px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  height: 306px;

  ${media.tablet} {
    flex-direction: column;
  }
`;

const BookInfo = styled.div`
  flex: 1;
  padding: 3.625rem 3.875rem 1.875rem 6.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
  align-items: flex-end;
`;

const Titlediv = styled.div`
  gap: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const BookTitle = styled.div`
  color: white;
  font-size: 20px;
  font-weight: bold;
  font-family: Inter;
  text-shadow: 0px 0px 9.1px rgba(0, 0, 0, 0.16);
`;

const BookSubtitle = styled.div`
  color: white;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 1rem;
  font-family: Inter;
  text-shadow: 0px 0px 9.1px rgba(0, 0, 0, 0.16);
`;

const StatsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Stat = styled.div`
  display: flex;
  align-items: center;
  color: white;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;

  svg {
    margin-right: 0.5rem;
  }
`;

const ImageContainer = styled.div`
  width: 379px;
  position: relative;
  flex-shrink: 0;

  ${media.tablet} {
    width: 100%;
    height: 15rem;
  }
`;

const BookImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ViewButton = styled.button`
  position: absolute;
  width: 170px;
  height: 42.95px;
  bottom: 1rem;
  right: 1rem;
  background-color: #ced118;
  color: white;
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 50px;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: -0.02em;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const DashedLine = styled.div`
  width: 100%;
  height: 2px;
  margin: 70px 0;
  background-image: linear-gradient(to right, #ced118 50%, transparent 50%);
  background-size: 10px 2px;
  background-repeat: repeat-x;
`;

export default LibraryContent;
