// Mailbox.jsx
import React from "react";
import styled from "styled-components";
import EmailIcon from "../../assets/images/icon-email.svg";

const Mailbox = ({ addressee, letters, onWriteLetter }) => {
  return (
    <MailboxContainer>
      <MailboxHeader>
        <div>우편함</div>
        <span>{addressee}&nbsp;어르신께 드리는 우리의 편지</span>
      </MailboxHeader>
      <LetterList>
        {[...letters].reverse().map((letter, index) => (
          <LetterItem key={letter.id}>
            <LetterNumber>{letters.length - index}</LetterNumber>
            <EmailImg src={EmailIcon} alt="email" />
            <LetterContent>
              <LetterTitle>{letter.title}</LetterTitle>
              <LetterText>{letter.content}</LetterText>
            </LetterContent>
          </LetterItem>
        ))}
      </LetterList>
      <WriteLetterButton onClick={onWriteLetter}>편지 남기기</WriteLetterButton>
    </MailboxContainer>
  );
};

const MailboxContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const MailboxHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.padding.md};
  position: relative;

  div {
    color: ${({ theme }) => theme.colors.text.white};
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    font-weight: 700;
    margin-right: 10px;
  }

  span {
    color: #fafc97;
    margin-left: 0;
    font-size: 15px;
    font-weight: 700;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: rgba(255, 255, 255, 0.8);
  }
`;

const LetterList = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  padding-right: 0.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.padding.lg};

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 3px;
  }
`;

const LetterItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0.3rem 1rem;
  border-bottom: 1.3px dashed #fafc97;

  &:last-child {
    border-bottom: none;
  }
`;

const LetterNumber = styled.div`
  width: 1rem;
  color: white;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
`;

const EmailImg = styled.img`
  width: 28px;
  height: 28px;
`;

const LetterContent = styled.div`
  display: flex;
  gap: 0.93rem;
  overflow: hidden;
  flex: 1;
`;

const LetterTitle = styled.div`
  color: white;
  margin-right: 0.1em;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LetterText = styled.div`
  flex: 1;
  color: #fafc97;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const WriteLetterButton = styled.button`
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;
  width: 110px;
  height: 37px;
  font-size: 16px;
  letter-spacing: -0.06em;
  background-color: white;
  color: #bcbf1f;
  border-radius: 50px;
  border: none;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #f8f8f8;
  }
`;

export default Mailbox;
