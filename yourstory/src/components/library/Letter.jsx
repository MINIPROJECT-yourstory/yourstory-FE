import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import MailIcon from "../../assets/images/icon-email.svg";
import DetailLetter from "./DetailLetter";
import { bookApi } from "../../apis/bookApi";

const Letter = () => {
  const [letters, setLetters] = useState({});
  const [selectedLetter, setSelectedLetter] = useState(null);
  const { book_id } = useParams();

  const handleDetail = (id) => {
    setSelectedLetter((prev) => (prev === id ? null : id));
  };
  useEffect(() => {
    const fetchLetters = async () => {
      try {
        const response = await bookApi.getLetters(book_id);
        setLetters(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLetters();
  }, [book_id]);

  return (
    <div>
      {letters?.length > 0 ? (
        [...letters].reverse().map((letter, idx) =>
          selectedLetter === letter.id ? (
            <DetailLetter
              key={letter.id}
              letter={letter}
              isMine={letter.isMine}
              index={letters.length - idx}
              onBtnClick={() => handleDetail(letter.id)}
            />
          ) : (
            <Wrapper key={letter.id} onClick={() => handleDetail(letter.id)}>
              <Order>{letters.length - idx}</Order>
              <Icon src={MailIcon} alt="편지 아이콘" />
              <Title>{letter.title}</Title>
              <Content>{letter.content}</Content>
            </Wrapper>
          )
        )
      ) : (
        <BlankText>
          <Icon src={MailIcon} alt="편지 아이콘" />
          편지를 남기고 우편함을 채워주세요.
        </BlankText>
      )}
    </div>
  );
};

export default Letter;

const Wrapper = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily.main};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.87rem;
  padding: 0.3rem 1rem;
  border-bottom: 1.3px dashed #fafc97;
  cursor: pointer;
`;

const Order = styled.div`
  width: 1rem;
  color: white;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
`;

const Icon = styled.img`
  width: 29px;
  height: 29px;
`;
const Title = styled.div`
  color: white;
  margin-left: 0.93rem;
  width: 9.87rem;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const Content = styled.div`
  width: 38rem;
  color: #fafc97;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  overflow: hidden;
  white-space: ${({ expanded }) => (expanded ? "normal" : "nowrap")};
  text-overflow: ellipsis;
`;

const BlankText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-align: center;
  color: #fafc97;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 5rem 0;
`;
