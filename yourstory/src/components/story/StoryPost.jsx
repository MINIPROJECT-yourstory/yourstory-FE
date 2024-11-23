import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const StoryPost = () => {
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_baseURL;
  const access = localStorage.getItem("access");
  const [storys, setStorys] = useState([]);

  useEffect(() => {
    const fetchStoryList = async () => {
      try {
        const response = await axios.get(`${baseURL}/story`, {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        });
        setStorys(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStoryList();
  });
  return (
    <>
      {Array.isArray(storys) &&
        storys.map((story) => (
          <Wrapper key={story.id} onClick={() => navigate(`${story.id}`)}>
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
  width: 248px;
  height: 248px;
  object-fit: cover;
  object-position: center;
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
