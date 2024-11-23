import React from "react";
import styled from "styled-components";
import NavBar from "../components/common/NavBar";
import StoryBanner from "../assets/images/img-story.svg";
import { media } from "../styles/theme";
import StoryPost from "../components/story/StoryPost";

const Story = () => {
  return (
    <div>
      <NavBar pagename="story" />
      <PageContainer>
        <HeaderWrapper>
          <HeaderTitle>
            우리의 이야기
            <HeaderLine />
          </HeaderTitle>
          <BannerImg src={StoryBanner} alt="우리의이야기 배너 사진" />
        </HeaderWrapper>
        <ContentWrapper>
          <StoryPost />
        </ContentWrapper>
      </PageContainer>
    </div>
  );
};

export default Story;

const PageContainer = styled.div`
  padding: 5rem 7%;
  margin-left: 16.5625rem;
  font-family: Inter;

  ${media.laptop} {
    margin-left: 16.5625rem;
    padding: 40px 20px;
  }

  ${media.tablet} {
    padding: 20px 10px;
    margin-left: 16.5625rem;
  }
`;

const HeaderWrapper = styled.div`
  border-bottom: 1px solid #bcbf1f;
  padding-bottom: 1.5rem;
`;
const HeaderTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  color: var(--green);
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const HeaderLine = styled.div`
  border-bottom: 2px solid var(--green);
  flex: 1;
  height: 1px;
`;

const BannerImg = styled.img`
  width: 100%;
`;

const ContentWrapper = styled.div`
  margin-top: 2.125rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3.5rem 2.5rem;
`;
