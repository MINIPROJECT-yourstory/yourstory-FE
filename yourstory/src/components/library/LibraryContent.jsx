import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Heart, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MOCK_BOOKS = [
    {
        id: 1,
        title: "김금자 어르신의 이야기",
        subtitle: "기쁨으로 맞이하는 내일",
        likes: 78,
        messages: 4,
        image: "/api/placeholder/400/320",
    },
    {
        id: 2,
        title: "최명환 어르신의 이야기",
        subtitle: "손으로 만지는 음악의 세계",
        likes: 63,
        messages: 2,
        image: "/api/placeholder/400/320",
    }
];

const LibraryContent = () => {
    const navigate = useNavigate();
    const [books, setBooks] = useState(MOCK_BOOKS);
    const [likedBooks, setLikedBooks] = useState(new Set());

    // 실제 API 연동 시 사용할 useEffect
    // useEffect(() => {
    //     const fetchBooks = async () => {
    //         try {
    //             const response = await fetch('/book');
    //             if (!response.ok) throw new Error('Failed to fetch books');
    //             const data = await response.json();
    //             setBooks(data);
    //         } catch (error) {
    //             console.error('Error fetching books:', error);
    //         }
    //     };
    //     fetchBooks();
    // }, []);

    const handleLike = async (bookId) => {
        // API 호출 대신 즉시 상태 업데이트
        if (likedBooks.has(bookId)) {
            setLikedBooks(prev => {
                const newSet = new Set(prev);
                newSet.delete(bookId);
                return newSet;
            });
            
            setBooks(books.map(book => 
                book.id === bookId 
                    ? { ...book, likes: book.likes - 1 }
                    : book
            ));
        } else {
            setLikedBooks(prev => new Set([...prev, bookId]));
            setBooks(books.map(book => 
                book.id === bookId 
                    ? { ...book, likes: book.likes + 1 }
                    : book
            ));
        }
    };

    const handleMailClick = (bookId) => {
        navigate(`/letter/${bookId}`);
    };

    const handleBookView = (bookId) => {
        navigate(`/library/book/${bookId}`);
    };

    return (
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
                                    style={{ cursor: 'pointer' }}
                                />
                                <span>{book.likes}</span>
                            </Stat>
                            <Stat onClick={() => handleMailClick(book.id)}>
                                <Mail style={{ cursor: 'pointer' }} />
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
  padding: ${({ theme }) => `${theme.spacing.padding.xs} ${theme.spacing.padding.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  transition: ${({ theme }) => theme.transitions.short};
  font-family: ${({ theme }) => theme.typography.fontFamily.main};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.dark};
  }
`;

export default LibraryContent;