import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Heart, Mail } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../../components/common/NavBar";
import LibraryHeader from "../../components/library/LibraryHeader";
import { bookApi } from "../../apis/bookApi";

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookDetail, setBookDetail] = useState(null);
  const [letters, setLetters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [bookResponse, lettersResponse] = await Promise.all([
          bookApi.getBookDetail(id),
          bookApi.getLetters(id),
        ]);

        setBookDetail(bookResponse.data);
        setLetters(lettersResponse.data);
      } catch (error) {
        console.error("데이터 조회 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleLike = async () => {
    try {
      if (bookDetail.isLike) {
        await bookApi.deleteLike(id);
      } else {
        await bookApi.createLike(id);
      }

      // 좋아요 상태 업데이트를 위해 상세 정보 다시 조회
      const response = await bookApi.getBookDetail(id);
      setBookDetail(response.data);
    } catch (error) {
      console.error("좋아요 처리 실패:", error);
    }
  };

  const handleEbookView = () => {
    navigate(`/book/pdf/${id}`);
  };

  const handleWriteLetter = () => {
    navigate(`/letter/${id}`);
  };

  if (isLoading || !bookDetail) return <div>로딩 중...</div>;

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
              <BookImage src={bookDetail.img} alt={bookDetail.addressee} />
              <TitleSection>
                <Title>{bookDetail.addressee} 어르신의 이야기,</Title>
                <Subtitle>{bookDetail.title}</Subtitle>
                <Stats onClick={handleLike}>
                  <Heart
                    fill={bookDetail.isLike ? "white" : "none"}
                    style={{ cursor: "pointer" }}
                    size={22}
                  />
                  <Likespan>{bookDetail.likes}</Likespan>
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
                    <Value>{bookDetail.writer}</Value>
                  </ContributorItem>
                  <ContributorItem>
                    <Label>주관</Label>
                    <Value>{bookDetail.org}</Value>
                  </ContributorItem>
                </ContributorList>
              </ContributorBox>
              <DescriptionBox>
                <Description>{bookDetail.intro}</Description>
              </DescriptionBox>
            </LeftSection>
            <RightSection>
              <MailboxHeader>
                <div>우편함</div>
                <span>{bookDetail.addressee}님께 드리는 우리의 편지</span>
              </MailboxHeader>
              <LetterList>
                {letters.map((letter, index) => (
                  <LetterItem key={letter.id || index}>
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
  font-size: 24px;
  font-weight: 700;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.25);
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
  background-color: #ced118;
  padding: ${({ theme }) => theme.spacing.padding.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  height: 308px;
  overflow: auto;
`;

const SectionTitle = styled.h3`
  color: ${({ theme }) => theme.colors.primary.main};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  margin: 0;
  align-self: center;
`;

const ContributorBox = styled.div`
  background-color: #ebece1;
  padding: ${({ theme }) => theme.spacing.padding.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  height: calc((297px - 14px - 24px) / 2);
`;

const DescriptionBox = styled.div`
  background-color: #ebece1;
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
  padding: ${({ theme }) => theme.spacing.padding.xs};
  ${({ theme }) => theme.spacing.padding.sm};
  margin-right: ${({ theme }) => theme.spacing.padding.sm};
  border-radius: 9px;
  font-size: 16px;
  font-weight: 700;
`;

const Value = styled.span`
  color: #7f810d;
`;

const Description = styled.p`
  text-align: center;
  color: #7f810d;
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  white-space: pre-line;
`;

const MailboxHeader = styled.div`
  background-color: CED118;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.padding.md};

  div {
    color: ${({ theme }) => theme.colors.text.white};
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    font-weight: 700;
  }

  span {
    color: #fafc97;
  }
`;

const LetterList = styled.div`
  background-color: #ced118;
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
  padding: ${({ theme }) => theme.spacing.padding.xs};
  ${({ theme }) => theme.spacing.padding.md};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  margin-top: ${({ theme }) => theme.spacing.padding.md};
`;

export default BookDetail;
