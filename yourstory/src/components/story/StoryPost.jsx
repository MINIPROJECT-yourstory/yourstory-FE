import React, { useState } from "react";
import styled from "styled-components";
import Thumbn from "../../assets/images/sample-thumbnail.png";

const MOCK_STORYS = [
  {
    id: 1,
    category: "나누는 이야기",
    img: Thumbn,
    title: "기쁨으로 맞이하는 내일, 김금자 어르신의 이야기",
    content:
      "김금자 어르신(86)의 이야기, 이타적 자서전을 통해 살펴보았습니다. 현재 86세를 넘긴 금자 어르신은 세월의 무게를 간직한 분이지만, 여전히 하루하루를 활기차게 맞이하며 순간의 기쁨을 찾기 위해 노력하십니다. 이타적 자서전은 경제적 성과나 사회적 지위를 넘어, 어르신 그 자체의 이야기를 담아내는 데 초점을 맞췄습니다. 여기에서는 그런 어르신의 하루와 기쁨을 다채로운 이야기로 엮어 소개합니다.",
  },
  {
    id: 2,
    category: "소식과 이야기",
    img: Thumbn,
    title: "기쁨으로 맞이하는 내일, 김금자 어르신의 이야기",
    content:
      "김금자 어르신(86)의 이야기, 이타적 자서전을 통해 살펴보았습니다. 현재 86세를 넘긴 금자 어르신은 세월의 무게를 간직한 분이지만, 여전히 하루하루를 활기차게 맞이하며 순간의 기쁨을 찾기 위해 노력하십니다. 이타적 자서전은 경제적 성과나 사회적 지위를 넘어, 어르신 그 자체의 이야기를 담아내는 데 초점을 맞췄습니다. 여기에서는 그런 어르신의 하루와 기쁨을 다채로운 이야기로 엮어 소개합니다.",
  },
  {
    id: 3,
    category: "소식과 이야기",
    img: Thumbn,
    title: "기쁨으로 맞이하는 내일, 김금자 어르신의 이야기",
    content:
      "김금자 어르신(86)의 이야기, 이타적 자서전을 통해 살펴보았습니다. 현재 86세를 넘긴 금자 어르신은 세월의 무게를 간직한 분이지만, 여전히 하루하루를 활기차게 맞이하며 순간의 기쁨을 찾기 위해 노력하십니다. 이타적 자서전은 경제적 성과나 사회적 지위를 넘어, 어르신 그 자체의 이야기를 담아내는 데 초점을 맞췄습니다. 여기에서는 그런 어르신의 하루와 기쁨을 다채로운 이야기로 엮어 소개합니다.",
  },
  {
    id: 4,
    category: "소식과 이야기",
    img: Thumbn,
    title: "기쁨으로 맞이하는 내일, 김금자 어르신의 이야기",
    content:
      "김금자 어르신(86)의 이야기, 이타적 자서전을 통해 살펴보았습니다. 현재 86세를 넘긴 금자 어르신은 세월의 무게를 간직한 분이지만, 여전히 하루하루를 활기차게 맞이하며 순간의 기쁨을 찾기 위해 노력하십니다. 이타적 자서전은 경제적 성과나 사회적 지위를 넘어, 어르신 그 자체의 이야기를 담아내는 데 초점을 맞췄습니다. 여기에서는 그런 어르신의 하루와 기쁨을 다채로운 이야기로 엮어 소개합니다.",
  },
  {
    id: 5,
    category: "소식과 이야기",
    img: Thumbn,
    title: "기쁨으로 맞이하는 내일, 김금자 어르신의 이야기",
    content:
      "김금자 어르신(86)의 이야기, 이타적 자서전을 통해 살펴보았습니다. 현재 86세를 넘긴 금자 어르신은 세월의 무게를 간직한 분이지만, 여전히 하루하루를 활기차게 맞이하며 순간의 기쁨을 찾기 위해 노력하십니다. 이타적 자서전은 경제적 성과나 사회적 지위를 넘어, 어르신 그 자체의 이야기를 담아내는 데 초점을 맞췄습니다. 여기에서는 그런 어르신의 하루와 기쁨을 다채로운 이야기로 엮어 소개합니다.",
  },
];
const StoryPost = () => {
  const [storys, setStorys] = useState(MOCK_STORYS);
  return (
    <>
      {storys.map((story) => (
        <Wrapper key={story.id}>
          <Category>{story.category}</Category>
          <Photo src={story.img} alt="썸네일 이미지" />
          <Title>{story.title}</Title>
          <Content>{story.content}</Content>
        </Wrapper>
      ))}
    </>
  );
};

export default StoryPost;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8125rem;
  width: 260px;
  cursor: pointer;
`;

const Category = styled.div`
  font-family: Inter;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary.main};
  line-height: 19.36px;
  letter-spacing: -0.06em;
  text-align: left;
`;

const Photo = styled.img`
  width: 100%;
  height: auto;
`;
const Title = styled.div`
  color: #4b4b4b;
  font-family: Inter;
  font-size: 13px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: 15.74px;
  letter-spacing: -0.09em;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Content = styled.div`
  color: #4b4b4b;
  font-family: Inter;
  font-size: 11.5px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: 13.93px;
  letter-spacing: -0.01em;
  text-align: left;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
