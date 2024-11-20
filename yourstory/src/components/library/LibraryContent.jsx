import React from 'react';
import styled from 'styled-components';
import { Heart, Mail } from 'lucide-react';

const LibraryContent = () => {
    const books = [
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
                            <Stat>
                                <Heart />
                                <span>{book.likes}</span>
                            </Stat>
                            <Stat>
                                <Mail />
                                <span>{book.messages}</span>
                            </Stat>
                        </StatsContainer>
                    </BookInfo>
                    
                    <ImageContainer>
                        <img src={book.image} alt={book.title} />
                        <ViewButton 
                            onClick={() => window.location.href = `/book/${book.id}`}
                        >
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
`;

const BookCard = styled.div`
  display: flex;
  align-items: stretch;
  background-color: ${({ theme }) => theme.colors.primary.main};
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const BookInfo = styled.div`
  flex-grow: 1;
  padding: ${({ theme }) => theme.spacing.padding.md};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BookTitle = styled.h2`
  color: ${({ theme }) => theme.colors.text.white};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  margin-bottom: ${({ theme }) => theme.spacing.padding.xs};
`;

const BookSubtitle = styled.h3`
  color: ${({ theme }) => theme.colors.text.white};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.padding.sm};
`;

const StatsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.padding.md};
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
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.dark};
  }
`;

export default LibraryContent;