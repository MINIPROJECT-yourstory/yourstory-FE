import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import NavBar from "../../components/common/NavBar";
import Thumbn from "../../assets/images/sample-thumbnail.png";

const MOCK_STORY = [
  {
    id: 1,
    category: "나누는 이야기",
    img: Thumbn,
    title: "기쁨으로 맞이하는 내일, 김금자 어르신의 이야기",
    prologue:
      "김금자 어르신(86)의 이야기, 이타적 자서전을 통해 살펴보았습니다. 현재 86세를 넘긴 금자 어르신은 세월의 무게를 간직한 분이지만, 여전히 하루하루를 활기차게 맞이하며 순간의 기쁨을 찾기 위해 노력하십니다. 이타적 자서전은 경제적 성과나 사회적 지위를 넘어, 어르신 그 자체의 이야기를 담아내는 데 초점을 맞췄습니다. 여기에서는 그런 어르신의 하루와 기쁨을 다채로운 이야기로 엮어 소개합니다.",
    content:
      "금산군은 최근 ‘이타적 자서전 프로젝트’의 일환으로 김금자 어르신(83)의 삶을 담은 자서전 ‘기쁨으로 맞이하는 내일’을 출간했습니다. 이 자서전은 경제적, 사회적 성공과 무관하게 한 사람의 소중한 삶을 조명하는 취지로, 김금자 어르신의 소박하고도 긍정적인 삶의 태도를 담고 있어 감동을 자아내고 있습니다. 김금자 어르신은 매일의 순간을 기쁨으로 맞이하며, 작은 일에도 감사하는 마음으로 살아오셨습니다. 특히 어르신은 “하루를 기쁨으로 시작하고 마무리하는 것이 나에게는 가장 큰 행복”이라며, 일상 속에서 작은 기쁨을 발견하는 법을 알려주셨습니다. 이를 통해 주변 이웃과 가족에게도 긍정적인 영향을 주며 삶의 소중한 가치를 나누고 있습니다.이타적 자서전 작성 과정에 참여한 대학생 봉사자들은 어르신의 이야기에 큰 감명을 받았다고 전했습니다. 한 학생은 “김금자 어르신의 미소 속에서 감사와 긍정의 힘을 배웠다”며, 작은 일상 속에서도 기쁨을 찾으려는 어르신의 태도가 자신에게 큰 깨달음을 주었다고 밝혔습니다.김금자 어르신의 자서전 ‘기쁨으로 맞이하는 내일’은 지역사회에 따뜻한 울림을 주며 많은 이들에게 감동을 선사하고 있습니다.",
  },
];

const StoryDetail = () => {
  const [story, setStory] = useState(MOCK_STORY);
  return (
    <>
      <NavBar pagename="story" />
      <PageContainer>
        <HeaderTitle>
          {story[0].category}
          <HeaderLine />
        </HeaderTitle>
        <Title>{story[0].title}</Title>
        {story[0].category === "소식과 이야기" ? (
          <PrologueBox>
            <Photo src={story[0].img} alt="소식과 이야기 사진" />
            <Prologue>{story[0].prologue}</Prologue>
          </PrologueBox>
        ) : (
          <PhotoBox src={story[0].img} alt="나누는 이야기 사진" />
        )}
        <ContentBox>
          <Content>{story[0].content}</Content>
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
  width: auto;
  height: 365px;
`;
const Prologue = styled.div`
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
`;
const ContentBox = styled.div`
  margin-top: 6.8125rem;
`;
const Content = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  font-family: Inter;
  line-height: 42px;
  letter-spacing: -0.6%;
`;
