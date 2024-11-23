import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Heart, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { bookApi } from "../../apis/bookApi";
import { media } from "../../styles/theme";

const LibraryContent = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, [navigate]);

  const fetchBooks = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("access");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await bookApi.getBooks();
      console.log("받아온 도서 데이터:", response);
      if (response.data && Array.isArray(response.data)) {
        setBooks(response.data);
      }
    } catch (error) {
      console.error("도서 목록 조회 실패:", error);
      if (error.response?.status === 403) {
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

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

  if (!books || books.length === 0) {
    return <EmptyContainer>등록된 도서가 없습니다.</EmptyContainer>;
  }

  return (
    <ContentWrapper>
      <BookList>
        {books.map((book) => (
          <BookCard key={book.id}>
            <BookInfo>
              <div>
                <BookTitle>{book.addressee} 어르신의 이야기,</BookTitle>
                <BookSubtitle>{book.title}</BookSubtitle>
              </div>

              <StatsContainer>
                <Stat onClick={() => handleLike(book.id)}>
                  <Heart
                    fill={book.isLike ? "white" : "none"}
                    color="white"
                    size={20}
                  />
                  <span>{book.likes}</span>
                </Stat>
                <Stat>
                  <Mail
                    fill={book.isMine ? "white" : "none"}
                    color="white"
                    size={20}
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
  display: grid;
  gap: 1.5rem;
`;

const BookCard = styled.div`
  display: flex;
  align-items: stretch;
  background-color: #ced118;
  border-radius: 17px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

  ${media.tablet} {
    flex-direction: column;
  }
`;

const BookInfo = styled.div`
  flex-grow: 1;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BookTitle = styled.h2`
  color: white;
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
  font-family: Inter;
`;

const BookSubtitle = styled.h3`
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  font-family: Inter;
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

  svg {
    margin-right: 0.5rem;
  }
`;

const ImageContainer = styled.div`
  width: 20rem;
  position: relative;

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
  bottom: 1rem;
  right: 1rem;
  background-color: #ced118;
  color: white;
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

export default LibraryContent;
