import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Heart, Mail } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../../components/common/NavBar";
import LibraryHeader from "../../components/library/LibraryHeader";
import Grandma from "../../assets/images/grandma.svg";

const MOCK_BOOK = {
  id: 1,
  title: "김금자 어르신의 이야기",
  subtitle: "기쁨으로 맞이하는 내일",
  likes: 78,
  messages: 4,
  image: Grandma,
  contributors: {
    writer: "김OO 청년 봉사자",
    organization: "멋진사자 센터",
  },
  description: "평범한 하루의 소중함을 알게해주는\n따뜻한 삶의 기록!",
};

const MOCK_LETTERS = [
  {
    id: 1,
    content: "김금자 할머니께 안녕하세요. 저는 금산중학교에...",
  },
  {
    id: 2,
    content: "삶을 돌아보는 요즘, 지금까지의 제 삶을...",
  },
  {
    id: 3,
    content: "웃음가득하시길, 김금자 어르신께 안부 인사...",
  },
  {
    id: 4,
    content: "안녕하세요, 김금자 어르신께 편지를 남깁니다...",
  },
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
    setBook((prev) => ({
      ...prev,
      likes: isLiked ? prev.likes - 1 : prev.likes + 1,
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
          <TitleContainer>
            <TitleHeader>이타적 자서전</TitleHeader>
            <Line />
          </TitleContainer>
          <BookHeader>
            <ImageAndTitleWrapper>
              <BookImage src={book.image} alt={book.title} />
              <TitleSection>
                <Title>{book.title},</Title>
                <Subtitle>{book.subtitle}</Subtitle>
                <Stats onClick={handleLike}>
                  <Heart
                    fill={isLiked ? "white" : "none"}
                    style={{ cursor: "pointer" }}
                    size={22}
                  />
                  <Likespan>{book.likes}</Likespan>
                </Stats>
              </TitleSection>
            </ImageAndTitleWrapper>
            <EbookButton onClick={handleEbookView}>
              E-북
              <br />
              도서읽기
            </EbookButton>
          </BookHeader>
          <DashedLine />
          <SectionContainer>
            <LeftSection>
              <SectionTitle>함께한 사람들</SectionTitle>
              <ContributorBox>
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
              </ContributorBox>
              <DescriptionBox>
                <Description>{book.description}</Description>
              </DescriptionBox>
            </LeftSection>

            <RightSection>
              <MailboxHeader>
                <div>우편함</div>
                <span>{book.title}께 드리는 우리의 편지</span>
              </MailboxHeader>
              <LetterList>
                {letters.map((letter) => (
                  <LetterItem key={letter.id}>
                    <Mail />
                    <LetterPreview>{letter.content}</LetterPreview>
                  </LetterItem>
                ))}
              </LetterList>
              <WriteLetterButton onClick={handleWriteLetter}>
                편지 남기기
              </WriteLetterButton>
            </RightSection>
          </SectionContainer>
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

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.3125rem;
`;

const TitleHeader = styled.div`
  font-size: 24px;
  font-weight: 800;
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

const ImageAndTitleWrapper = styled.div`
  display: flex;
  flex: 1;
  height: 158px;
  background-color: #7f810d;
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

const Title = styled.div`
  font-weight: 400;
  font-size: ${({ theme }) => theme.typography.fontSize.md};
`;

const Subtitle = styled.div`
  margin-top: 8px;
  font-size: 23px;
  font-weight: 500;
`;

const Stats = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.padding.xs};
  margin-top: auto;
`;

const Likespan = styled.span`
  font-size: 18px;
  font-weight: 700;
  margin-left: 3px;
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

const DashedLine = styled.div`
  width: 100%;
  height: 2px;
  margin: 2rem 0;
  background-image: linear-gradient(
    to right,
    ${({ theme }) => theme.colors.primary.light} 50%,
    transparent 50%
  );
  background-size: 10px 2px;
  background-repeat: repeat-x;
`;

const SectionContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 14px;
  margin-bottom: ${({ theme }) => theme.spacing.padding.lg};
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-height: 297px;
`;

const RightSection = styled.div`
  flex: 1.3;
  background-color: ${({ theme }) => theme.colors.background.paper};
  padding: ${({ theme }) => theme.spacing.padding.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  height: 308px;
  overflow: auto;
`;

const SectionTitle = styled.h3`
  color: ${({ theme }) => theme.colors.primary.main};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  margin: 0; // 모든 마진 제거
`;

const ContributorBox = styled.div`
  background-color: ${({ theme }) => theme.colors.background.paper};
  padding: ${({ theme }) => theme.spacing.padding.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  height: calc(
    (297px - 14px - 24px) / 2
  ); // 전체높이에서 gap과 제목 높이를 뺀 후 2로 나눔
`;

const DescriptionBox = styled.div`
  background-color: ${({ theme }) => theme.colors.background.paper};
  padding: ${({ theme }) => theme.spacing.padding.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  height: calc((297px - 14px - 24px) / 2); // ContributorBox와 동일한 높이
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContributorList = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ContributorItem = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing.padding.sm};
`;

const Label = styled.span`
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.text.white};
  padding: ${({ theme }) => theme.spacing.padding.xs}
    ${({ theme }) => theme.spacing.padding.sm};
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
  padding: ${({ theme }) => theme.spacing.padding.xs}
    ${({ theme }) => theme.spacing.padding.md};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  margin-top: ${({ theme }) => theme.spacing.padding.md};
`;

export default BookDetail;
