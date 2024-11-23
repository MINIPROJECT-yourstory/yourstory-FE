import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import NavBar from "../../components/common/NavBar";
import { storyApi } from "../../apis/storyApi";

const StoryDetail = () => {
  const { id } = useParams();
  const [story, setStory] = useState([]);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await storyApi.getStory(id);
        setStory(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStory();
  });

  return (
    <>
      <NavBar pagename="story" />
      <PageContainer>
        <HeaderTitle>
          {story.category}
          <HeaderLine />
        </HeaderTitle>
        <Title>{story.title}</Title>
        {story.category === "소식과 이야기" ? (
          <PrologueBox>
            <div>
              <Photo src={story.img} alt="소식과 이야기 사진" />
            </div>
            <Prologue>{story.prologue}</Prologue>
          </PrologueBox>
        ) : (
          <PhotoBox src={story.img} alt="나누는 이야기 사진" />
        )}
        <ContentBox>
          <Content>{story.content}</Content>
        </ContentBox>
      </PageContainer>
    </>
  );
};

export default StoryDetail;

const PageContainer = styled.div`
  padding: 5rem 7%;
  margin-left: 16.5625rem;
  font-family: Inter;
`;

const HeaderTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
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

const Title = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: var(--green);
  margin: 4rem 0rem;
`;

const PrologueBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 62px;
`;
const Photo = styled.img`
  width: 464px;
  height: 400px;
  object-fit: cover;
  object-position: center;
`;
const Prologue = styled.div`
  white-space: pre-line;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Inter;
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: 42px;
  letter-spacing: -6%;
  color: ${({ theme }) => theme.colors.primary.dark};
`;

const PhotoBox = styled.img`
  width: 100%;
  height: 365px;
  object-fit: cover;
  object-position: center;
`;
const ContentBox = styled.div`
  margin-top: 6.8125rem;
  white-space: pre-line;
`;
const Content = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  font-family: Inter;
  line-height: 42px;
  letter-spacing: -0.6%;
`;
