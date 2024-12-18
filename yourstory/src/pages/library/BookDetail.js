import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../../components/common/NavBar";
import LibraryHeader from "../../components/library/LibraryHeader";
import { bookApi } from "../../apis/bookApi";
import Mailbox from "../../components/library/MailBox";
import HeartFillIcon from "../../assets/images/icon-heart-fill.svg";
import HeartEmptyIcon from "../../assets/images/icon-heart-empty.svg";

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
      let updatedLikes;
      if (bookDetail.isLike) {
        const response = await bookApi.deleteLike(id);
        updatedLikes = response.data;
      } else {
        const response = await bookApi.createLike(id);
        updatedLikes = response.data;
      }

      setBookDetail((prev) => ({
        ...prev,
        likes: updatedLikes,
        isLike: !prev.isLike,
      }));
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

  const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    color: ${({ theme }) => theme.colors.text.primary};
  `;

  if (isLoading || !bookDetail) {
    return <LoadingContainer>도서 상세 정보를 불러오는 중...</LoadingContainer>;
  }

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
                  <HeartImg
                    src={bookDetail.isLike ? HeartFillIcon : HeartEmptyIcon}
                    alt="heart"
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
              <Mailbox
                addressee={bookDetail.addressee}
                letters={letters}
                onWriteLetter={handleWriteLetter}
              />
            </RightSection>
          </SectionContainer>
        </ContentWrapper>
        <Footer />
      </Container>
    </>
  );
};

const HeaderWrapper = styled.div`
  margin-left: ${({ theme }) => theme.spacing.components.sidebar.width};
  padding: 81px 5% 0px 5%;
`;

const Container = styled.div`
  padding: 0px 5%;
  margin-left: ${({ theme }) => theme.spacing.components.sidebar.width};
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
  height: 300px;

  ${({ theme }) => theme.media.tablet} {
    flex-direction: column;
    height: auto;
    gap: 20px;
  }
`;

const LeftSection = styled.div`
  width: 430px;
  display: flex;
  flex-direction: column;
  height: 300px;
  flex-shrink: 0;

  ${({ theme }) => theme.media.laptop} {
    width: calc(40% - 7px);
    min-width: 300px;
  }

  ${({ theme }) => theme.media.tablet} {
    width: 100%;
    height: auto;
  }
`;

const RightSection = styled.div`
  width: 462px;
  height: 248px;
  background-color: ${({ theme }) => theme.colors.primary.light};
  padding: ${({ theme }) => theme.spacing.padding.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  position: relative;
  flex-grow: 1;

  ${({ theme }) => theme.media.laptop} {
    width: calc(60% - 7px);
    min-width: 400px;
  }

  ${({ theme }) => theme.media.tablet} {
    width: 100%;
    height: auto;
    min-height: 300px;
  }
`;

const SectionTitle = styled.div`
  color: ${({ theme }) => theme.colors.primary.main};
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.06em;
  height: 29px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
`;

const ContributorBox = styled.div`
  background-color: #ebece1;
  padding: ${({ theme }) => theme.spacing.padding.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  height: 144px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  ${({ theme }) => theme.media.tablet} {
    height: auto;
    min-height: 144px;
  }
`;

const DescriptionBox = styled.div`
  background-color: #ebece1;
  padding: 25px 66px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  height: 93px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ theme }) => theme.media.tablet} {
    height: auto;
    min-height: 93px;
  }
`;

const ContributorList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ContributorItem = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.span`
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.text.white};
  margin-right: ${({ theme }) => theme.spacing.padding.sm};
  border-radius: 9px;
  font-size: 16px;
  font-weight: 700;
  width: 80px;
  height: 37px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Value = styled.span`
  color: #7f810d;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

const Description = styled.p`
  text-align: center;
  color: #7f810d;
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
  padding: 0 1rem;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  word-break: keep-all;
  word-wrap: break-word;
  max-width: 17em;
`;

const Footer = styled.div`
  height: 100px;
`;

const HeartImg = styled.img`
  width: 28px;
  height: 28px;
  margin-right: -6px;
  cursor: pointer;
`;

export default BookDetail;
