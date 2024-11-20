import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Heart, Mail } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../../components/common/NavBar';
import LibraryHeader from '../../components/library/LibraryHeader';

const MOCK_BOOK = {
    id: 1,
    title: "김금자 어르신의 이야기",
    subtitle: "기쁨으로 맞이하는 내일",
    likes: 78,
    messages: 4,
    image: "/api/placeholder/400/320",
    contributors: {
        writer: "김OO 청년 봉사자",
        organization: "멋진사자 센터"
    },
    description: "평범한 하루의 소중함을 알게해주는\n따뜻한 삶의 기록!"
};

const MOCK_LETTERS = [
    {
        id: 1,
        content: "김금자 할머니께 안녕하세요. 저는 금산중학교에..."
    },
    {
        id: 2,
        content: "삶을 돌아보는 요즘, 지금까지의 제 삶을..."
    },
    {
        id: 3,
        content: "웃음가득하시길, 김금자 어르신께 안부 인사..."
    },
    {
        id: 4,
        content: "안녕하세요, 김금자 어르신께 편지를 남깁니다..."
    }
];

const BookDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(MOCK_BOOK);
    const [letters, setLetters] = useState(MOCK_LETTERS);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        // const fetchBookDetail = async () => {
        //     try {
        //         const response = await fetch(`/book/${id}`);
        //         if (!response.ok) throw new Error('Failed to fetch book details');
        //         const data = await response.json();
        //         setBook(data);
        //     } catch (error) {
        //         console.error('Error:', error);
        //     }
        // };
        // fetchBookDetail();
    }, [id]);

    useEffect(() => {
        // const fetchLetters = async () => {
        //     try {
        //         const response = await fetch(`/letter/${id}`);
        //         if (!response.ok) throw new Error('Failed to fetch letters');
        //         const data = await response.json();
        //         setLetters(data);
        //     } catch (error) {
        //         console.error('Error:', error);
        //     }
        // };
        // fetchLetters();
    }, [id]);

    const handleLike = async () => {
        // try {
        //     const method = isLiked ? 'DELETE' : 'POST';
        //     const response = await fetch(`/like/${id}`, { method });
        //     if (!response.ok) throw new Error('Failed to toggle like');
        //     setIsLiked(!isLiked);
        //     setBook(prev => ({
        //         ...prev,
        //         likes: isLiked ? prev.likes - 1 : prev.likes + 1
        //     }));
        // } catch (error) {
        //     console.error('Error:', error);
        // }
        setIsLiked(!isLiked);
        setBook(prev => ({
            ...prev,
            likes: isLiked ? prev.likes - 1 : prev.likes + 1
        }));
    };

    const handleEbookView = () => {
        navigate(`/library/book/${id}/view`);
    };

    const handleWriteLetter = () => {
        navigate(`/library/letter/${id}/write`);
    };

    return (
        <>
            <NavBar pagename="library" />
            <HeaderWrapper>
                <LibraryHeader />
            </HeaderWrapper>
            <Container>
                <ContentWrapper>
                    <BookHeader>
                        <ImageAndTitleWrapper>
                            <BookImage src={book.image} alt={book.title} />
                            <TitleSection>
                                <Title>{book.title}</Title>
                            <Subtitle>{book.subtitle}</Subtitle>
                            <Stats onClick={handleLike}>
                                <Heart fill={isLiked ? "white" : "none"} style={{ cursor: 'pointer' }}/>
                                    <span>{book.likes}</span>
                                </Stats>
                            </TitleSection>
                        </ImageAndTitleWrapper>
                        <EbookButton onClick={handleEbookView}>
                            E-북<br/>도서읽기
                        </EbookButton>
                    </BookHeader>

                    <SectionWrapper>
                        <Section>
                            <SectionTitle>함께한 사람들</SectionTitle>
                            <ContributorList>
                                <ContributorItem>
                                    <Label>대필</Label>
                                    <Value>{book.contributors.writer}</Value>
                                </ContributorItem>
                                <ContributorItem>
                                    <Label>주관</Label>
                                    <Value>{book.contributors.organization}</Value>
                                </ContributorItem>
                            </ContributorList>
                            <Description>
                                {book.description}
                            </Description>
                        </Section>

                        <Section>
                            <MailboxHeader>
                                <div>우편함</div>
                                <span>{book.title}께 드리는 우리의 편지</span>
                            </MailboxHeader>
                            <LetterList>
                                {letters.map((letter) => (
                                    <LetterItem key={letter.id}>
                                        <Mail />
                                        <LetterPreview>
                                            {letter.content}
                                        </LetterPreview>
                                    </LetterItem>
                                ))}
                            </LetterList>
                            <WriteLetterButton onClick={handleWriteLetter}>
                                편지 남기기
                            </WriteLetterButton>
                        </Section>
                    </SectionWrapper>
                </ContentWrapper>
            </Container>
        </>
    );
};

const HeaderWrapper = styled.div`
    margin-left: 16.5625rem;
    padding: 81px 5% 0px 5%;
`;

const Container = styled.div`
    padding: 0px 5%;
    margin-left: 16.5625rem;
    font-family: ${({ theme }) => theme.typography.fontFamily.main};
`;

const ContentWrapper = styled.div`
    max-width: ${({ theme }) => theme.breakpoints.desktop};
    margin: 0 auto;
`;

const BookHeader = styled.div`
    display: flex;
    align-items: center; 
    gap: ${({ theme }) => theme.spacing.padding.md}; 
    margin-bottom: ${({ theme }) => theme.spacing.padding.lg};
`;

const BookImage = styled.img`
    width: 400px;
    height: 158px;
    object-fit: cover;
`;

const ImageAndTitleWrapper = styled.div`
    display: flex;
    flex: 1;
    height: 158px;  
    background-color: ${({ theme }) => theme.colors.primary.dark};
    border-radius: ${({ theme }) => theme.borderRadius.lg}; 
    overflow: hidden;
`;

const TitleSection = styled.div`
    display: flex;
    flex-direction: column;
    padding: ${({ theme }) => theme.spacing.padding.md};
    color: ${({ theme }) => theme.colors.text.white};
    flex: 1;
`;

const Title = styled.h1`
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    margin-bottom: ${({ theme }) => theme.spacing.padding.sm};
`;

const Subtitle = styled.h2`
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    margin-bottom: ${({ theme }) => theme.spacing.padding.lg};
`;

const Stats = styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.padding.xs};
`;

const EbookButton = styled.button`
    width: 166px;  
    height: 158px; 
    background-color: ${({ theme }) => theme.colors.primary.light};
    color: ${({ theme }) => theme.colors.text.white};
    padding: ${({ theme }) => theme.spacing.padding.md};
    border-radius: ${({ theme }) => theme.borderRadius.sm};  
    text-align: center;
    border: none;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center;    
    line-height: 1.5;       
`;

const SectionWrapper = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.spacing.padding.sm};  // 14px gap
    width: 100%;
`;

const Section = styled.section`
    background-color: ${({ theme }) => theme.colors.background.paper};
    padding: ${({ theme }) => theme.spacing.padding.lg};
    border-radius: ${({ theme }) => theme.borderRadius.md};

    &:first-child {  // 함께한 사람들 섹션
        flex: 353;   // 353px 비율
    }

    &:last-child {   // 우편함 섹션
        flex: 462;   // 462px 비율
    }
`;


const SectionTitle = styled.h3`
    color: ${({ theme }) => theme.colors.primary.main};
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    margin-bottom: ${({ theme }) => theme.spacing.padding.md};
`;

const ContributorList = styled.div`
    margin-bottom: ${({ theme }) => theme.spacing.padding.md};
`;

const ContributorItem = styled.div`
    display: flex;
    margin-bottom: ${({ theme }) => theme.spacing.padding.sm};
`;

const Label = styled.span`
    background-color: ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.text.white};
    padding: ${({ theme }) => theme.spacing.padding.xs} ${({ theme }) => theme.spacing.padding.sm};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    margin-right: ${({ theme }) => theme.spacing.padding.sm};
`;

const Value = styled.span`
    color: ${({ theme }) => theme.colors.text.primary};
`;

const Description = styled.p`
    text-align: center;
    color: ${({ theme }) => theme.colors.text.primary};
    line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

const MailboxHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${({ theme }) => theme.spacing.padding.md};
    
    div {
        color: ${({ theme }) => theme.colors.primary.main};
        font-size: ${({ theme }) => theme.typography.fontSize.lg};
    }
    
    span {
        color: ${({ theme }) => theme.colors.text.secondary};
    }
`;

const LetterList = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.padding.sm};
`;

const LetterItem = styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.padding.sm};
    padding: ${({ theme }) => theme.spacing.padding.sm};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
`;

const LetterPreview = styled.p`
    color: ${({ theme }) => theme.colors.text.primary};
`;

const WriteLetterButton = styled.button`
    float: right;
    background-color: ${({ theme }) => theme.colors.background.default};
    color: ${({ theme }) => theme.colors.text.primary};
    padding: ${({ theme }) => theme.spacing.padding.xs} ${({ theme }) => theme.spacing.padding.md};
    border-radius: ${({ theme }) => theme.borderRadius.pill};
    border: 1px solid ${({ theme }) => theme.colors.border.main};
    margin-top: ${({ theme }) => theme.spacing.padding.md};
`;

export default BookDetail;